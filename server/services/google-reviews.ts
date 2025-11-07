import { google } from 'googleapis';
import { storage } from '../storage';
import type { InsertReview, InsertReviewStats } from '@shared/schema';

const PLACE_ID = 'ChIJ61JUcaAx-4kRZbBEtxohYrw';

export class GoogleReviewsService {
  private auth;
  private initialized = false;

  constructor() {
    const credentials = process.env.GOOGLE_CREDENTIALS;
    if (credentials) {
      try {
        this.auth = new google.auth.GoogleAuth({
          credentials: JSON.parse(credentials),
          scopes: ['https://www.googleapis.com/auth/cloud-platform'],
        });
        this.initialized = true;
        console.log('Google Places API initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Google API:', error);
      }
    } else {
      console.warn('GOOGLE_CREDENTIALS not found - reviews will not be fetched');
    }
  }

  async fetchAndStoreReviews(): Promise<{ success: boolean; error?: string; stats?: any }> {
    if (!this.initialized) {
      const error = 'Google API not initialized - GOOGLE_CREDENTIALS missing';
      console.error(error);
      return { success: false, error };
    }

    try {
      console.log(`Fetching reviews for Place ID: ${PLACE_ID}`);
      
      const authClient = await this.auth!.getClient();
      const accessToken = await authClient.getAccessToken();
      
      if (!accessToken.token) {
        throw new Error('Failed to obtain access token');
      }

      console.log('Successfully obtained access token');

      const response = await fetch(
        `https://places.googleapis.com/v1/places/${PLACE_ID}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken.token}`,
            'X-Goog-FieldMask': 'reviews,rating,userRatingCount',
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Places API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Google Places API response:', JSON.stringify(data, null, 2));

      if (!data.reviews || data.reviews.length === 0) {
        console.warn('No reviews found in Places API response');
        return { success: false, error: 'No reviews available' };
      }

      return await this.processAndStoreReviews(data);
    } catch (error) {
      console.error('Error fetching Google reviews:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  private async processAndStoreReviews(data: any): Promise<{ success: boolean; stats: any }> {
    const platform = 'google';
    const reviews = data.reviews || [];
    
    console.log(`Processing ${reviews.length} reviews from Google Places API`);

    const processedReviews: InsertReview[] = reviews.map((review: any) => {
      const authorName = review.authorAttribution?.displayName || 'Anonymous';
      const authorPhoto = review.authorAttribution?.photoUri || null;
      const rating = review.rating || 0;
      const reviewText = review.text?.text || review.originalText?.text || '';
      const publishTime = review.publishTime || new Date().toISOString();
      const reviewDate = new Date(publishTime);
      const externalId = review.name || `review-${Date.now()}-${Math.random()}`;

      return {
        platform,
        externalId,
        authorName,
        authorPhoto,
        rating,
        reviewText,
        reviewDate,
      };
    });

    const overallRating = data.rating || (processedReviews.reduce((sum, r) => sum + r.rating, 0) / processedReviews.length);
    const totalReviews = data.userRatingCount || processedReviews.length;

    await storage.deleteReviewsByPlatform(platform);

    for (const review of processedReviews) {
      await storage.createReview(review);
    }

    const stats: InsertReviewStats = {
      platform,
      overallRating,
      totalReviews,
    };
    await storage.upsertReviewStats(stats);

    console.log(`Successfully stored ${processedReviews.length} reviews with overall rating ${overallRating.toFixed(1)}`);

    return {
      success: true,
      stats: {
        overallRating: overallRating.toFixed(1),
        totalReviews,
        platform,
      },
    };
  }
}

export const googleReviewsService = new GoogleReviewsService();
