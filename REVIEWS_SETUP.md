# Google Business Profile Reviews Integration

## Overview
Your website now automatically fetches and displays reviews from Google Business Profile with weekly updates.

## Features ✨
- **Automatic Updates**: Reviews refresh every Sunday at 2 AM
- **Aggregated Rating**: Overall star rating displayed prominently
- **Recent Reviews**: Shows latest 6 reviews on homepage
- **Admin Panel**: Manual refresh capability at `/admin`

## Setup Instructions

### 1. Set Admin Password (REQUIRED - No Default!)
The admin panel is password-protected. You **MUST** set an admin password as an environment variable:

```bash
# In Replit Secrets
ADMIN_PASSWORD=your_secure_password_here
```

**⚠️ IMPORTANT**: There is NO default password. The admin panel will not work until you set `ADMIN_PASSWORD` in your Replit Secrets.

**How to set it in Replit**:
1. Click on "Tools" → "Secrets" in the left sidebar
2. Add a new secret with key: `ADMIN_PASSWORD`
3. Set a strong password value
4. Restart your application

### 2. Access Admin Panel
Visit `https://your-site.com/admin` and log in with your admin password to:
- View review statistics
- Manually refresh reviews
- Monitor last update time

### 3. Connect Google Business Profile API (Optional)
Currently using **mock data** for development. To connect real Google reviews:

#### Prerequisites:
- Google Business Profile account
- Verified business location
- Google Cloud Project

#### Steps:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable "Google Business Profile API"
3. Create OAuth 2.0 credentials
4. Download credentials JSON
5. Add to Replit Secrets:
   ```
   GOOGLE_CREDENTIALS={"type":"service_account","project_id":"..."}
   ```

## How It Works

### Automatic Weekly Updates
- **Schedule**: Every Sunday at 2:00 AM
- **Process**: Fetches reviews from Google API
- **Storage**: Saves in-memory (MemStorage)
- **Display**: Updates automatically on homepage

### Manual Refresh
1. Go to `/admin`
2. Log in with admin password
3. Click "Refresh Reviews Now"

## API Endpoints

### Get Reviews
```
GET /api/reviews?platform=google&limit=6
```
Returns reviews and statistics for display.

### Refresh Reviews (Protected)
```
POST /api/reviews/refresh
Content-Type: application/json

{
  "password": "your_admin_password"
}
```
Manually triggers review fetch from Google.

## Current Data (Mock Reviews)
The system is using 6 mock reviews with:
- **Overall Rating**: 4.7/5.0 ⭐
- **Total Reviews**: 6
- **Sample reviewers**: Sarah M., John D., Lisa K., Mike R., Emily P., Tom B.

## Security Notes ⚠️

### Current Protection Level
- **Basic password auth**: Simple password check for admin panel
- **Session storage**: Password saved in browser session
- **Environment variable**: ADMIN_PASSWORD stored securely in Replit Secrets

### Production Recommendations
For a production deployment, implement:
1. **Proper authentication system**:
   - User accounts with hashed passwords
   - JWT tokens or session management
   - Role-based access control (RBAC)

2. **Rate limiting**:
   - Limit refresh requests (e.g., max 1 per hour)
   - Track IP addresses
   - Implement CAPTCHA for repeated failed logins

3. **API key management**:
   - Rotate Google API credentials regularly
   - Use service accounts with minimal permissions
   - Monitor API usage quotas

4. **Data validation**:
   - Sanitize review text before display
   - Validate review ratings (1-5 range)
   - Check for duplicate reviews

## Troubleshooting

### Reviews not updating?
1. Check server logs for scheduler messages
2. Verify cron job is running: Look for "📅 Review scheduler initialized"
3. Check last update time in admin panel

### Can't access admin panel?
1. Ensure ADMIN_PASSWORD is set in secrets
2. Check browser console for errors
3. Verify you're using correct password

### Mock data still showing?
This is expected! To use real Google reviews:
1. Set up Google Cloud Project
2. Add GOOGLE_CREDENTIALS to secrets
3. Restart application

## File Structure
```
server/
  ├── services/
  │   └── google-reviews.ts    # Google API integration
  ├── routes.ts                 # API endpoints
  ├── scheduler.ts              # Weekly cron job
  └── storage.ts                # Review data storage

client/src/
  ├── pages/
  │   └── Admin.tsx             # Admin panel
  └── components/
      └── Testimonials.tsx      # Reviews display

shared/
  └── schema.ts                 # Review data types
```

## Next Steps
1. ✅ Set ADMIN_PASSWORD in Replit Secrets
2. ✅ Test admin panel at `/admin`
3. ⏳ (Optional) Connect real Google Business Profile API
4. ⏳ (Production) Implement robust authentication system

## Support
For Google Business Profile API help: https://developers.google.com/my-business
For Replit Secrets: https://docs.replit.com/programming-ide/workspace-features/secrets
