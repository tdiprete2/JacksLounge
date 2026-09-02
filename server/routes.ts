import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { createHash, timingSafeEqual } from "crypto";
import { storage } from "./storage";
import { emailService } from "./services/email";
import { getGoogleRating } from "./services/google-rating";
import { insertContactRequestSchema } from "@shared/schema";
import { z } from "zod";

declare module "express-session" {
  interface SessionData {
    isAdmin?: boolean;
  }
}

const contactSubmissionSchema = insertContactRequestSchema.extend({
  website: z.string().max(0).optional(),
}).strict();

const loginSchema = z.object({
  password: z.string().min(1).max(1024),
}).strict();

const submissions = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function contactOriginIsAllowed(req: Request): boolean {
  const origin = req.get("origin");
  if (!origin) return true;
  try {
    const originUrl = new URL(origin);
    const host = req.get("host");
    if (host && originUrl.host === host) return true;
    return [
      "https://www.jackspizzahyannis.com",
      "https://jackspizzahyannis.com",
    ].includes(origin) || /\.replit\.(app|dev)$/.test(originUrl.hostname);
  } catch {
    return false;
  }
}

function isRateLimited(req: Request): boolean {
  const key = req.ip || "unknown";
  const now = Date.now();
  const existing = submissions.get(key);
  if (!existing || existing.resetAt <= now) {
    submissions.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  existing.count += 1;
  return existing.count > RATE_LIMIT_MAX;
}

function configuredPasswordMatches(candidate: string): boolean {
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured) return false;
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(candidate), digest(configured));
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.isAdmin) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/google-rating", async (_req, res) => {
    try {
      const rating = await getGoogleRating();
      res.set("Cache-Control", "public, max-age=300, s-maxage=21600, stale-while-revalidate=86400");
      res.json(rating);
    } catch (error) {
      console.warn(
        "Google rating unavailable:",
        error instanceof Error ? error.message : "Unknown error",
      );
      res.status(503).json({ error: "Google rating is temporarily unavailable" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    if (!contactOriginIsAllowed(req) || isRateLimited(req)) {
      return res.status(400).json({ error: "Unable to submit contact request" });
    }

    const parsed = contactSubmissionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Unable to submit contact request" });
    }

    if (parsed.data.website) {
      return res.json({ success: true, message: "Contact request received" });
    }

    const { website: _website, ...contact } = parsed.data;
    try {
      const contactRequest = await storage.createContactRequest(contact);
      const emailSent = await emailService.sendContactNotification(contact);
      res.json({
        success: true,
        message: "Contact request received",
        id: contactRequest.id,
        emailSent,
      });
    } catch {
      res.status(500).json({ error: "Unable to submit contact request" });
    }
  });

  app.post("/api/admin/login", async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success || !configuredPasswordMatches(parsed.data.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    req.session.regenerate((error) => {
      if (error) return res.status(500).json({ error: "Unable to log in" });
      req.session.isAdmin = true;
      req.session.save((saveError) => {
        if (saveError) return res.status(500).json({ error: "Unable to log in" });
        res.json({ authenticated: true });
      });
    });
  });

  app.post("/api/admin/logout", requireAdmin, (req, res) => {
    req.session.destroy(() => {
      res.clearCookie("jackslounge.sid");
      res.json({ authenticated: false });
    });
  });

  app.get("/api/admin/session", (req, res) => {
    res.json({ authenticated: Boolean(req.session?.isAdmin) });
  });

  app.get("/api/contacts", requireAdmin, async (_req, res) => {
    try {
      const [contacts, unreadCount] = await Promise.all([
        storage.getAllContactRequests(),
        storage.getUnreadContactRequestsCount(),
      ]);
      res.json({ contacts, unreadCount });
    } catch {
      res.status(500).json({ error: "Unable to fetch contacts" });
    }
  });

  app.post("/api/contacts/:id/mark-read", requireAdmin, async (req, res) => {
    try {
      const contact = await storage.markContactRequestAsRead(req.params.id);
      if (!contact) return res.status(404).json({ error: "Contact not found" });
      res.json({ success: true, contact });
    } catch {
      res.status(500).json({ error: "Unable to update contact" });
    }
  });

  return createServer(app);
}