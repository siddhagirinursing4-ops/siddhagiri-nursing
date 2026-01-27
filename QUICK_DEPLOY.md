# Quick Deploy - 5 Minutes

## Step 1: Push Code (30 seconds)
```bash
git add .
git commit -m "Configure split deployment"
git push origin main
```

## Step 2: Deploy Backend to Render (2 minutes)

1. Go to https://render.com → **New +** → **Web Service**
2. Select your GitHub repo
3. Settings:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add Environment Variables:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_random_secret
   CLIENT_URL=https://your-frontend.vercel.app
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```
5. Click **Create Web Service**
6. Copy backend URL: `https://your-app.onrender.com`

## Step 3: Deploy Frontend to Vercel (2 minutes)

1. Go to https://vercel.com → **Add New** → **Project**
2. Import your GitHub repo
3. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```
4. Click **Deploy**
5. Copy frontend URL: `https://your-app.vercel.app`

## Step 4: Update Backend CORS (30 seconds)

1. Go back to Render → Your Service → Environment
2. Update `CLIENT_URL` to your Vercel URL
3. Save (auto-redeploys)

## Done! 🎉

- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`
- Admin: `https://your-app.vercel.app/admin`

**Next:** Run `npm run setup` in Render Shell to create admin account.

See `DEPLOYMENT_GUIDE.md` for detailed instructions.
