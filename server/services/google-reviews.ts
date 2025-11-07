import { google } from 'googleapis';
import { storage } from '../storage';
import type { InsertReview, InsertReviewStats } from '@shared/schema';

export class GoogleReviewsService {
  private mybusiness;
  private initialized = false;

  constructor() {
    // Initialize with credentials if available
    const credentials = process.env.GOOGLE_CREDENTIALS;
    if (credentials) {
      try {
        const auth = new google.auth.GoogleAuth({
          credentials: JSON.parse(credentials),
          scopes: ['https://www.googleapis.com/auth/business.manage'],
        });
        this.mybusiness = google.mybusinessaccountmanagement({ version: 'v1', auth });
        this.initialized = true;
      } catch (error) {
        console.error('Failed to initialize Google API:', error);
      }
    }
  }

  async fetchAndStoreReviews(): Promise<{ success: boolean; error?: string; stats?: any }> {
    if (!this.initialized) {
      console.log('Google API not initialized - using mock data for development');
      return this.useMockData();
    }

    try {
      // In production, fetch from Google Business Profile API
      // For now, we'll use mock data as placeholder
      return this.useMockData();
    } catch (error) {
      console.error('Error fetching Google reviews:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  private async useMockData(): Promise<{ success: boolean; stats: any }> {
    // Mock data for development - simulates Google Business Profile reviews
    const mockReviews = [
      {
        externalId: 'review1',
        authorName: 'Sarah M.',
        authorPhoto: null,
        rating: 5,
        reviewText: 'Best pizza in Hyannis! The hot honey pizza is absolutely amazing. Been coming here for years!',
        reviewDate: new Date('2024-11-15'),
      },
      {
        externalId: 'review2',
        authorName: 'John D.',
        authorPhoto: null,
        rating: 5,
        reviewText: 'Great wings and fantastic service. The BBQ ribs are fall-off-the-bone tender!',
        reviewDate: new Date('2024-11-10'),
      },
      {
        externalId: 'review3',
        authorName: 'Lisa K.',
        authorPhoto: null,
        rating: 4,
        reviewText: 'Love the signature honey on the pizza! Family favorite spot for over 10 years.',
        reviewDate: new Date('2024-11-05'),
      },
      {
        externalId: 'review4',
        authorName: 'Mike R.',
        authorPhoto: null,
        rating: 5,
        reviewText: 'The Meat Lovers pizza is loaded! Generous portions and great late-night hours.',
        reviewDate: new Date('2024-10-28'),
      },
      {
        externalId: 'review5',
        authorName: 'Emily P.',
        authorPhoto: null,
        rating: 5,
        reviewText: 'Best local pizza place on Cape Cod. Fresh ingredients and the staff is always friendly!',
        reviewDate: new Date('2024-10-20'),
      },
      {
        externalId: 'review6',
        authorName: 'Tom B.',
        authorPhoto: null,
        rating: 4,
        reviewText: 'Great gluten-free options! The crispy wings are perfect for game day.',
        reviewDate: new Date('2024-10-15'),
      },
    ];

    const platform = 'google';
    
    // Calculate overall rating
    const totalRating = mockReviews.reduce((sum, r) => sum + r.rating, 0);
    const overallRating = totalRating / mockReviews.length;

    // Clear existing reviews for this platform
    await storage.deleteReviewsByPlatform(platform);

    // Store new reviews
    for (const mockReview of mockReviews) {
      const insertReview: InsertReview = {
        platform,
        ...mockReview,
      };
      await storage.createReview(insertReview);
    }

    // Store stats
    const stats: InsertReviewStats = {
      platform,
      overallRating,
      totalReviews: mockReviews.length,
    };
    await storage.upsertReviewStats(stats);

    return {
      success: true,
      stats: {
        overallRating: overallRating.toFixed(1),
        totalReviews: mockReviews.length,
        platform,
      },
    };
  }
}

export const googleReviewsService = new GoogleReviewsService();
