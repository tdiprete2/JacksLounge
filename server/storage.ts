import { type User, type InsertUser, type ReviewStats, type InsertReviewStats, type Review, type InsertReview } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Review Stats
  getReviewStatsByPlatform(platform: string): Promise<ReviewStats | undefined>;
  upsertReviewStats(stats: InsertReviewStats): Promise<ReviewStats>;
  
  // Reviews
  getRecentReviews(platform: string, limit: number): Promise<Review[]>;
  getAllReviews(platform: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  deleteReviewsByPlatform(platform: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private reviewStats: Map<string, ReviewStats>;
  private reviews: Map<string, Review>;

  constructor() {
    this.users = new Map();
    this.reviewStats = new Map();
    this.reviews = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getReviewStatsByPlatform(platform: string): Promise<ReviewStats | undefined> {
    return Array.from(this.reviewStats.values()).find(
      (stats) => stats.platform === platform
    );
  }

  async upsertReviewStats(insertStats: InsertReviewStats): Promise<ReviewStats> {
    const existing = await this.getReviewStatsByPlatform(insertStats.platform);
    const id = existing?.id || randomUUID();
    const stats: ReviewStats = {
      ...insertStats,
      id,
      lastUpdated: new Date(),
    };
    this.reviewStats.set(id, stats);
    return stats;
  }

  async getRecentReviews(platform: string, limit: number): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter((review) => review.platform === platform)
      .sort((a, b) => b.reviewDate.getTime() - a.reviewDate.getTime())
      .slice(0, limit);
  }

  async getAllReviews(platform: string): Promise<Review[]> {
    return Array.from(this.reviews.values())
      .filter((review) => review.platform === platform)
      .sort((a, b) => b.reviewDate.getTime() - a.reviewDate.getTime());
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = {
      ...insertReview,
      id,
      authorPhoto: insertReview.authorPhoto || null,
      reviewText: insertReview.reviewText || null,
      createdAt: new Date(),
    };
    this.reviews.set(id, review);
    return review;
  }

  async deleteReviewsByPlatform(platform: string): Promise<void> {
    const toDelete = Array.from(this.reviews.entries())
      .filter(([_, review]) => review.platform === platform)
      .map(([id]) => id);
    
    toDelete.forEach(id => this.reviews.delete(id));
  }
}

export const storage = new MemStorage();
