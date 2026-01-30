# Deployment Guide

## Overview
- **Frontend**: DirectAdmin (Static HTML/CSS/JS)
- **Backend**: Render.com (Free tier - stays awake 24/7)

---

## Part 1: Deploy Backend to Render (Free Tier)

### Step 1: Prepare Backend for Render

1. Your backend is already configured correctly with `server/package.json` having:
   - `"start": "node server.js"` ✓
   - `"type": "module"` ✓

### Step 2: Create Render Account & Deploy

1. Go to [render.com](https://render.com) and sign up (free)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub/GitLab repository
4. Configure the service:
   - **Name**: `your-school-backend` (or any name)
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### Step 3: Add Environment Variables on Render

In the Render dashboard, go to **Environment** tab and add these variables:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_key_min_32_chars
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d
JWT_COOKIE_EXPIRE=7
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
CLIENT_URL=https://yourdomain.com
```

**Important Notes:**
- Get MongoDB URI from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier)
- Get Cloudinary credentials from [Cloudinary](https://cloudinary.com) (free tier)
- Replace `CLIENT_URL` with your DirectAdmin domain

### Step 4: Keep Render Backend Awake 24/7 (Free)

Render free tier sleeps after 15 minutes of inactivity. To keep it awake:

**Option A: Use Cron-Job.org (Recommended)**
1. Go to [cron-job.org](https://cron-job.org) (free)
2. Create account and add a new cron job:
   - **URL**: `https://your-render-app.onrender.com/health`
   - **Schedule**: Every 10 minutes
   - **Title**: Keep Backend Awake

**Option B: Use UptimeRobot**
1. Go to [uptimerobot.com](https://uptimerobot.com) (free)
2. Add New Monitor:
   - **Monitor Type**: HTTP(s)
   - **URL**: `https://your-render-app.onrender.com/health`
   - **Monitoring Interval**: 5 minutes

### Step 5: Get Your Backend URL

After deployment, Render will give you a URL like:
```
https://your-school-backend.onrender.com
```

Save this URL - you'll need it for the frontend!

---

## Part 2: Deploy Frontend to DirectAdmin

### Step 1: Build Frontend for Production

1. Open terminal in your project root
2. Create `.env` file in root directory with:
   ```
   VITE_API_URL=https://your-render-backend.onrender.com/api
   ```
   Replace with your actual Render backend URL

3. Build the frontend:
   ```bash
   npm install
   npm run build
   ```

This creates a `dist` folder with optimized static files.

### Step 2: Upload to DirectAdmin

1. Log in to your DirectAdmin panel
2. Go to **File Manager**
3. Navigate to `public_html` (or your domain's root folder)
4. **Delete** any existing files in `public_html` (or create a subdirectory)
5. Upload ALL contents from the `dist` folder:
   - `index.html`
   - `assets/` folder
   - `favicon.svg`
   - `logo.png`
   - All PDF folders (2022-2023-Mandates, etc.)

### Step 3: Configure DirectAdmin for React Router

React Router needs special configuration. Create `.htaccess` file:

1. In DirectAdmin File Manager, create new file: `.htaccess`
2. Add this content (already created for you - see `.htaccess` file)
3. Upload to `public_html` root

### Step 4: Verify Deployment

1. Visit your domain: `https://yourdomain.com`
2. Check if the site loads
3. Test navigation (should work without 404 errors)
4. Test admin login and API calls

---

## Part 3: Post-Deployment Checklist

### Backend Verification
- [ ] Backend is deployed on Render
- [ ] All environment variables are set
- [ ] Health check works: `https://your-backend.onrender.com/health`
- [ ] Cron job is pinging every 10 minutes
- [ ] MongoDB connection is working

### Frontend Verification
- [ ] Frontend is uploaded to DirectAdmin
- [ ] `.htaccess` is in place
- [ ] Site loads at your domain
- [ ] React Router navigation works
- [ ] API calls connect to backend
- [ ] Admin panel works
- [ ] Images and PDFs load correctly

---

## Troubleshooting

### Backend Issues

**Problem**: Backend sleeps after 15 minutes
- **Solution**: Verify cron-job.org or UptimeRobot is pinging `/health` endpoint

**Problem**: CORS errors
- **Solution**: Add your DirectAdmin domain to `CLIENT_URL` in Render environment variables

**Problem**: MongoDB connection fails
- **Solution**: Check MongoDB Atlas whitelist (allow all IPs: `0.0.0.0/0`)

### Frontend Issues

**Problem**: 404 errors on page refresh
- **Solution**: Verify `.htaccess` file is uploaded and configured correctly

**Problem**: API calls fail
- **Solution**: Check `VITE_API_URL` in `.env` before build, rebuild if needed

**Problem**: Images don't load
- **Solution**: Ensure `public` folder contents are in the root of `dist` folder

---

## Updating Your Site

### Update Backend
1. Push changes to GitHub
2. Render auto-deploys (if enabled) or click "Manual Deploy"

### Update Frontend
1. Update code
2. Run `npm run build`
3. Upload new `dist` folder contents to DirectAdmin
4. Clear browser cache

---

## Cost Summary

- **Render Backend**: FREE (with cron job to keep awake)
- **MongoDB Atlas**: FREE (512MB storage)
- **Cloudinary**: FREE (25GB storage, 25GB bandwidth)
- **Cron-Job.org**: FREE
- **DirectAdmin**: Your existing hosting

**Total: $0/month** 🎉

---

## Support Resources

- Render Docs: https://render.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
- DirectAdmin: Your hosting provider's documentation
- Cron-Job.org: https://cron-job.org/en/documentation/

---

## Security Notes

1. Never commit `.env` files to Git
2. Use strong JWT secrets (32+ characters)
3. Keep MongoDB Atlas IP whitelist updated
4. Enable HTTPS on DirectAdmin (Let's Encrypt)
5. Regularly update dependencies

---

Good luck with your deployment! 🚀
