import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { googleReviewsService } from "./services/google-reviews";
import { emailService } from "./services/email";
import { insertContactRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact endpoints
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactRequestSchema.parse(req.body);
      
      // Save to database
      const contactRequest = await storage.createContactRequest(validatedData);
      
      // Send email notification
      await emailService.sendContactNotification(validatedData);
      
      res.json({
        success: true,
        message: 'Contact request received',
        id: contactRequest.id,
      });
    } catch (error) {
      console.error('Error handling contact request:', error);
      if (error instanceof Error && 'issues' in error) {
        res.status(400).json({ error: 'Invalid form data', details: error });
      } else {
        res.status(500).json({ error: 'Failed to submit contact request' });
      }
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      // Require admin authentication
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (!adminPassword) {
        return res.status(503).json({
          error: 'Admin password not configured',
        });
      }

      const providedPassword = req.headers['x-admin-password'] as string;
      if (!providedPassword || providedPassword !== adminPassword) {
        return res.status(401).json({
          error: 'Unauthorized',
        });
      }

      const contacts = await storage.getAllContactRequests();
      const unreadCount = await storage.getUnreadContactRequestsCount();

      res.json({
        contacts,
        unreadCount,
      });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  });

  app.post("/api/contacts/:id/mark-read", async (req, res) => {
    try {
      // Require admin authentication
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (!adminPassword) {
        return res.status(503).json({
          error: 'Admin password not configured',
        });
      }

      const providedPassword = req.body.password || req.headers['x-admin-password'];
      if (!providedPassword || providedPassword !== adminPassword) {
        return res.status(401).json({
          error: 'Unauthorized',
        });
      }

      const { id } = req.params;
      const contact = await storage.markContactRequestAsRead(id);

      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      res.json({
        success: true,
        contact,
      });
    } catch (error) {
      console.error('Error marking contact as read:', error);
      res.status(500).json({ error: 'Failed to mark contact as read' });
    }
  });

  // Reviews endpoints
  app.get("/api/reviews", async (req, res) => {
    try {
      const platform = (req.query.platform as string) || 'google';
      const limit = parseInt(req.query.limit as string) || 6;

      const stats = await storage.getReviewStatsByPlatform(platform);
      const reviews = await storage.getRecentReviews(platform, limit);

      res.json({
        stats: stats || null,
        reviews,
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  });

  app.post("/api/reviews/refresh", async (req, res) => {
    try {
      // Require ADMIN_PASSWORD to be set
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (!adminPassword) {
        return res.status(503).json({
          success: false,
          error: 'Admin password not configured - Set ADMIN_PASSWORD environment variable',
        });
      }

      const providedPassword = req.body.password || req.headers['x-admin-password'];
      
      if (!providedPassword || providedPassword !== adminPassword) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized - Invalid admin password',
        });
      }

      const result = await googleReviewsService.fetchAndStoreReviews();
      
      if (result.success) {
        res.json({
          success: true,
          message: 'Reviews refreshed successfully',
          stats: result.stats,
        });
      } else {
        res.status(500).json({
          success: false,
          error: result.error || 'Failed to refresh reviews',
        });
      }
    } catch (error) {
      console.error('Error refreshing reviews:', error);
      res.status(500).json({ error: 'Failed to refresh reviews' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
