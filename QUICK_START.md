# Quick Start Deployment Guide

Follow these steps in order:

## 🚀 Step 1: Deploy Backend to Render (15 minutes)

1. **Sign up at [render.com](https://render.com)** - It's FREE!

2. **Click "New +" → "Web Service"**

3. **Connect your Git repository** (GitHub/GitLab)

4. **Configure:**
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: **Free**

5. **Add Environment Variables** (click "Environment" tab):
   ```
   NODE_ENV=production
   MONGODB_URI=<get from MongoDB Atlas>
   JWT_SECRET=<random 32+ character string>
   JWT_REFRESH_SECRET=<another random 32+ character string>
   JWT_EXPIRE=7d
   JWT_REFRESH_EXPIRE=30d
   JWT_COOKIE_EXPIRE=7
   CLOUDINARY_CLOUD_NAME=<from cloudinary.com>
   CLOUDINARY_API_KEY=<from cloudinary.com>
   CLOUDINARY_API_SECRET=<from cloudinary.com>
   CLIENT_URL=<your DirectAdmin domain>
   ```

6. **Click "Create Web Service"** - Wait for deployment (5-10 min)

7. **Copy your Render URL**: `https://your-app.onrender.com`

---

## 🔄 Step 2: Keep Backend Awake 24/7 (5 minutes)

1. **Go to [cron-job.org](https://cron-job.org)** - FREE account

2. **Create New Cron Job:**
   - URL: `https://your-render-app.onrender.com/health`
   - Schedule: Every 10 minutes
   - Save

✅ Your backend will now stay awake 24/7 for FREE!

---

## 🌐 Step 3: Build & Deploy Frontend (10 minutes)

### A. Build Frontend

1. **Create `.env` file** in project root:
   ```
   VITE_API_URL=https://your-render-app.onrender.com/api
   ```
   (Use your actual Render URL from Step 1)

2. **Run build command:**
   ```bash
   npm install
   npm run build
   ```

3. **Check `dist` folder** - it should contain your built files

### B. Upload to DirectAdmin

1. **Login to DirectAdmin**

2. **Go to File Manager** → `public_html`

3. **Delete old files** (backup first if needed)

4. **Upload ALL files from `dist` folder:**
   - index.html
   - assets/ folder
   - All images and PDFs

5. **Upload `.htaccess` file** (from project root) to `public_html`

---

## ✅ Step 4: Test Everything (5 minutes)

1. **Visit your domain**: `https://yourdomain.com`
2. **Test navigation** - click around, refresh pages
3. **Test admin login** - go to `/admin/login`
4. **Check backend**: `https://your-render-app.onrender.com/health`

---

## 🎉 Done!

Your website is now live with:
- ✅ Frontend on DirectAdmin
- ✅ Backend on Render (always awake)
- ✅ 100% FREE hosting
- ✅ 24/7 uptime

---

## 📝 Need Help?

### Get MongoDB (FREE):
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Whitelist all IPs: `0.0.0.0/0`

### Get Cloudinary (FREE):
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free
3. Get credentials from dashboard

### Generate JWT Secrets:
Run in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🔄 How to Update

### Update Backend:
- Push to Git → Render auto-deploys

### Update Frontend:
1. Make changes
2. Run `npm run build`
3. Upload new `dist` folder to DirectAdmin

---

**Total Time: ~35 minutes**  
**Total Cost: $0/month** 🎉
