import { google } from 'googleapis';
import { storage } from '../storage';
import type { InsertReview, InsertReviewStats } from '@shared/schema';

// Note: This is the building address Place ID, we need to find the business Place ID
const BUILDING_PLACE_ID = 'ChIJ61JUcaAx-4kRZbBEtxohYrw';
const BUSINESS_NAME = "Jack's Pizza";
const BUSINESS_ADDRESS = "373 West Main Street, Hyannis, MA";

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
        console.error('Failed to initialize Google Places API:', error);
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
      // First, find the correct Place ID for the business
      const placeId = await this.findBusinessPlaceId();
      if (!placeId) {
        return { success: false, error: 'Could not find business Place ID' };
      }

      console.log(`Found business Place ID: ${placeId}`);
      return await this.fetchFromPlacesAPI(placeId);
    } catch (error) {
      console.error('Error fetching Google reviews:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  private async findBusinessPlaceId(): Promise<string | null> {
    try {
      console.log(`Searching for "${BUSINESS_NAME}" at ${BUSINESS_ADDRESS}...`);
      
      const authClient = await this.auth!.getClient();
      const accessToken = await authClient.getAccessToken();
      
      if (!accessToken.token) {
        throw new Error('Failed to obtain access token');
      }

      const response = await fetch(
        'https://places.googleapis.com/v1/places:searchText',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken.token}`,
            'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress',
          },
          body: JSON.stringify({
            textQuery: `${BUSINESS_NAME} ${BUSINESS_ADDRESS}`,
            maxResultCount: 1,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Text Search API error: ${response.status} - ${errorText}`);
        return null;
      }

      const data = await response.json();
      console.log('Text Search result:', JSON.stringify(data, null, 2));

      if (data.places && data.places.length > 0) {
        return data.places[0].id;
      }

      console.warn('No business found in text search results');
      return null;
    } catch (error) {
      console.error('Error finding business Place ID:', (error as Error).message);
      return null;
    }
  }

  private async fetchFromPlacesAPI(placeId: string): Promise<{ success: boolean; error?: string; stats?: any }> {
    try {
      console.log(`Fetching reviews for Place ID: ${placeId}`);
      
      const authClient = await this.auth!.getClient();
      const accessToken = await authClient.getAccessToken();
      
      if (!accessToken.token) {
        throw new Error('Failed to obtain access token');
      }

      const response = await fetch(
        `https://places.googleapis.com/v1/places/${placeId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken.token}`,
            'X-Goog-FieldMask': '*',
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Places API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Places API response:', JSON.stringify(data, null, 2));

      if (!data.reviews || data.reviews.length === 0) {
        console.warn('No reviews found in API response. Full response:', data);
        throw new Error('No reviews found in Places API response');
      }

      console.log(`Successfully fetched ${data.reviews.length} reviews from Places API (max 5)`);

      return await this.processPlacesAPIReviews(data);
    } catch (error) {
      console.error('Places API error:', (error as Error).message);
      return { success: false, error: (error as Error).message };
    }
  }

  private async processPlacesAPIReviews(data: any): Promise<{ success: boolean; stats: any }> {
    const platform = 'google';
    const reviews = data.reviews || [];
    
    console.log(`Processing ${reviews.length} reviews from Places API`);

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
