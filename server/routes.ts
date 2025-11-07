import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { googleReviewsService } from "./services/google-reviews";

export async function registerRoutes(app: Express): Promise<Server> {
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
