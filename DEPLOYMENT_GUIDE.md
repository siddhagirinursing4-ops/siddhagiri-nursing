# Deployment Guide - Render (Backend) + Vercel (Frontend)

## Overview
This project uses a split deployment architecture:
- **Frontend (Vercel):** React app + static assets (PDFs)
- **Backend (Render):** Express API + MongoDB

---

## Prerequisites

1. GitHub account with this repository
2. Vercel account (sign up at https://vercel.com)
3. Render account (sign up at https://render.com)
4. MongoDB Atlas database (or any MongoDB instance)
5. Cloudinary account for image uploads

---

## Part 1: Deploy Backend to Render

### Step 1: Create Web Service on Render

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select this repository: `siddhagiri-nursing-institute`

### Step 2: Configure Web Service

Fill in the following settings:

- **Name:** `siddhagiri-backend` (or any name you prefer)
- **Region:** Choose closest to your users
- **Branch:** `main`
- **Root Directory:** `server`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Instance Type:** `Free` (or paid if needed)

### Step 3: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add these:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
COOKIE_EXPIRE=7

CLIENT_URL=https://your-frontend-url.vercel.app

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Important Notes:**
- Replace `your_mongodb_connection_string` with your MongoDB Atlas URI
- Generate a strong random string for `JWT_SECRET` (use: https://randomkeygen.com/)
- You'll update `CLIENT_URL` after deploying the frontend

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment to complete (3-5 minutes)
3. Copy your backend URL: `https://siddhagiri-backend.onrender.com`

### Step 5: Test Backend

Visit: `https://your-backend-url.onrender.com/api/health`

You should see:
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2026-01-27T..."
}
```

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Push Updated Code

First, ensure all changes are committed:

```bash
git add .
git commit -m "Configure split deployment for Render and Vercel"
git push origin main
```

### Step 2: Create Vercel Project

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. **Important:** Keep Root Directory as `.` (root)

### Step 3: Configure Build Settings

Vercel should auto-detect Vite. Verify these settings:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Step 4: Add Environment Variables

Click **"Environment Variables"** and add:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

Replace `your-backend-url.onrender.com` with your actual Render backend URL.

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for deployment (2-3 minutes)
3. Copy your frontend URL: `https://your-project.vercel.app`

---

## Part 3: Connect Frontend and Backend

### Step 1: Update Backend CORS

1. Go back to Render Dashboard
2. Open your backend service
3. Go to **"Environment"** tab
4. Update `CLIENT_URL` to your Vercel frontend URL:
   ```
   CLIENT_URL=https://your-project.vercel.app
   ```
5. Save changes (this will trigger a redeploy)

### Step 2: Update Local Environment

Create/update `.env` file in your project root:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## Part 4: Initial Setup (One-time)

### Create Super Admin Account

1. Go to Render Dashboard → Your backend service
2. Click **"Shell"** tab (or use Render's console)
3. Run:
   ```bash
   npm run setup
   ```
4. Follow prompts to create admin account

**Alternative:** Use the API directly:
```bash
curl -X POST https://your-backend-url.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@example.com",
    "password": "YourSecurePassword123!",
    "role": "admin"
  }'
```

---

## Verification Checklist

- [ ] Backend health check works: `https://your-backend.onrender.com/api/health`
- [ ] Frontend loads: `https://your-frontend.vercel.app`
- [ ] Can login to admin panel
- [ ] PDFs are accessible (check any mandate PDF link)
- [ ] Image uploads work (test gallery upload)
- [ ] Forms submit successfully

---

## Troubleshooting

### Backend Issues

**Problem:** "Application failed to respond"
- Check Render logs: Dashboard → Your Service → Logs
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

**Problem:** CORS errors in browser console
- Verify `CLIENT_URL` in Render matches your Vercel URL exactly
- Check browser console for the exact origin being blocked

### Frontend Issues

**Problem:** "Network Error" or API calls fail
- Verify `VITE_API_URL` in Vercel environment variables
- Check if backend is running (visit health endpoint)
- Redeploy frontend after adding environment variables

**Problem:** PDFs not loading
- Check if files exist in `public/` folder
- Verify build includes public folder (check Vercel build logs)

### Database Issues

**Problem:** "MongooseServerSelectionError"
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check MongoDB URI format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`
- Ensure database user has read/write permissions

---

## Updating Your Application

### Update Frontend
```bash
git add .
git commit -m "Update frontend"
git push origin main
```
Vercel auto-deploys on push to main branch.

### Update Backend
```bash
git add server/
git commit -m "Update backend"
git push origin main
```
Render auto-deploys on push to main branch.

### Manual Redeploy
- **Vercel:** Dashboard → Your Project → Deployments → "Redeploy"
- **Render:** Dashboard → Your Service → "Manual Deploy" → "Deploy latest commit"

---

## Cost Breakdown

### Free Tier Limits

**Render (Free):**
- 750 hours/month
- Spins down after 15 min inactivity (first request takes ~30s)
- 512 MB RAM
- Upgrade to $7/month for always-on

**Vercel (Free):**
- 100 GB bandwidth/month
- Unlimited deployments
- Serverless functions: 100 GB-hours

**MongoDB Atlas (Free):**
- 512 MB storage
- Shared cluster
- Upgrade to $9/month for dedicated

---

## Production Recommendations

1. **Upgrade Render to Paid Plan** ($7/month) - Keeps backend always-on
2. **Add Custom Domain** - Configure in Vercel and Render dashboards
3. **Enable HTTPS** - Both platforms provide free SSL certificates
4. **Set up Monitoring** - Use Render's built-in metrics
5. **Configure Backups** - Enable MongoDB Atlas automated backups
6. **Add Error Tracking** - Consider Sentry or similar service

---

## Support

If you encounter issues:
1. Check Render logs: Dashboard → Service → Logs
2. Check Vercel logs: Dashboard → Project → Deployments → View Function Logs
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly

---

## Quick Reference

### Important URLs
- Backend: `https://your-backend.onrender.com`
- Frontend: `https://your-frontend.vercel.app`
- Admin Panel: `https://your-frontend.vercel.app/admin`

### Important Commands
```bash
# Local development
npm run dev                    # Frontend
cd server && npm run dev       # Backend

# Database setup
cd server && npm run setup     # Create super admin
```

### Environment Variables Summary

**Backend (Render):**
- `NODE_ENV`, `PORT`, `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRE`
- `COOKIE_EXPIRE`, `CLIENT_URL`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

**Frontend (Vercel):**
- `VITE_API_URL`
