import cron from 'node-cron';
import { googleReviewsService } from './services/google-reviews';

export function initializeScheduler() {
  // Run every Sunday at 2 AM
  cron.schedule('0 2 * * 0', async () => {
    console.log('⏰ Running weekly review update...');
    try {
      const result = await googleReviewsService.fetchAndStoreReviews();
      if (result.success) {
        console.log('✅ Weekly review update completed:', result.stats);
      } else {
        console.error('❌ Weekly review update failed:', result.error);
      }
    } catch (error) {
      console.error('❌ Error in scheduled review update:', error);
    }
  });

  console.log('📅 Review scheduler initialized - runs every Sunday at 2 AM');

  // Fetch reviews immediately on startup if none exist
  setTimeout(async () => {
    try {
      const result = await googleReviewsService.fetchAndStoreReviews();
      if (result.success) {
        console.log('✅ Initial reviews loaded:', result.stats);
      }
    } catch (error) {
      console.error('Error loading initial reviews:', error);
    }
  }, 2000);
}
