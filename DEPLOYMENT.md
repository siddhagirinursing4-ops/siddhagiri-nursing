# Deployment Guide

This guide covers deploying the Siddhagiri Nursing College application to production.

## Architecture Overview

- **Backend**: Node.js/Express API (deployed on Render/Railway/Heroku)
- **Frontend**: React/Vite SPA (deployed on Vercel/Netlify or DirectAdmin)
- **Database**: MongoDB Atlas
- **Storage**: Cloudinary (images)

## Prerequisites

Before deploying, ensure you have:

1. MongoDB Atlas cluster (free tier available)
2. Cloudinary account (free tier available)
3. GitHub repository (already set up)
4. Hosting accounts (Render for backend, Vercel for frontend)

## Backend Deployment (Render)

### Step 1: Create MongoDB Atlas Cluster

1. Go to https://cloud.mongodb.com/
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs (0.0.0.0/0) for production
5. Get connection string

### Step 2: Set Up Cloudinary

1. Go to https://cloudinary.com/
2. Sign up for free account
3. Get your credentials from dashboard:
   - Cloud Name
   - API Key
   - API Secret

### Step 3: Deploy to Render

1. Go to https://render.com/
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository: `siddhagirinursing4-ops/siddhagiri-nursing`
5. Configure:
   - **Name**: siddhagiri-nursing-backend
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

6. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=<your_mongodb_atlas_connection_string>
   JWT_SECRET=<generate_random_32_char_string>
   JWT_REFRESH_SECRET=<generate_random_32_char_string>
   JWT_EXPIRE=15m
   JWT_REFRESH_EXPIRE=7d
   JWT_COOKIE_EXPIRE=7
   CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
   CLOUDINARY_API_KEY=<your_cloudinary_api_key>
   CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
   WEB3FORMS_ACCESS_KEY=<your_web3forms_key>
   CLIENT_URL=<your_frontend_url>
   SUPER_ADMIN_EMAIL=admin@snik.edu.in
   SUPER_ADMIN_PASSWORD=<secure_password>
   ```

7. Click "Create Web Service"
8. Wait for deployment (5-10 minutes)
9. Note your backend URL: `https://siddhagiri-nursing-backend.onrender.com`

### Step 4: Initialize Database

After deployment, run setup script:

```bash
# SSH into Render or use Render Shell
npm run setup
```

This creates the super admin user.

## Frontend Deployment (Vercel)

### Step 1: Deploy to Vercel

1. Go to https://vercel.com/
2. Sign in with GitHub
3. Click "Add New" → "Project"
4. Import `siddhagirinursing4-ops/siddhagiri-nursing`
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. Add Environment Variable:
   ```
   VITE_API_URL=https://siddhagiri-nursing-backend.onrender.com/api
   ```

7. Click "Deploy"
8. Wait for deployment (2-3 minutes)
9. Your site will be live at: `https://your-project.vercel.app`

### Step 2: Update Backend CORS

Update backend environment variable on Render:
```
CLIENT_URL=https://your-project.vercel.app
```

Redeploy backend for changes to take effect.

### Step 3: Add Custom Domain (Optional)

1. In Vercel, go to Project Settings → Domains
2. Add your custom domain (e.g., snik.in)
3. Update DNS records as instructed
4. Update `CLIENT_URL` in backend environment variables

## Alternative: DirectAdmin Deployment

### Backend (Render/Railway)

Follow the same steps as above for backend deployment.

### Frontend (DirectAdmin/cPanel)

1. Create `.env` file in project root:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

2. Run build script:
   ```bash
   build-for-deployment.bat
   ```

3. Upload to DirectAdmin:
   - Go to File Manager
   - Navigate to `public_html`
   - Delete existing files
   - Upload all files from `dist/` folder
   - Upload `.htaccess` file

4. Your site will be live at your domain

## Post-Deployment

### 1. Test the Application

- Visit frontend URL
- Test user registration/login
- Test admin panel login
- Upload test images
- Submit test application

### 2. Create Super Admin

If not done automatically:

```bash
# On Render Shell or via SSH
cd backend
npm run setup
```

### 3. Seed Initial Data (Optional)

```bash
npm run seed-programmes
npm run seed-announcements
npm run seed-banner
```

### 4. Monitor Application

- Check Render logs for backend errors
- Check Vercel logs for frontend errors
- Monitor MongoDB Atlas metrics
- Check Cloudinary usage

## Environment Variables Reference

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| NODE_ENV | Environment | production |
| PORT | Server port | 10000 |
| MONGODB_URI | MongoDB connection | mongodb+srv://... |
| JWT_SECRET | JWT secret key | random_32_char_string |
| JWT_REFRESH_SECRET | Refresh token secret | random_32_char_string |
| JWT_EXPIRE | Token expiry | 15m |
| JWT_REFRESH_EXPIRE | Refresh expiry | 7d |
| JWT_COOKIE_EXPIRE | Cookie expiry (days) | 7 |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | your_cloud_name |
| CLOUDINARY_API_KEY | Cloudinary API key | 123456789012345 |
| CLOUDINARY_API_SECRET | Cloudinary API secret | your_api_secret |
| WEB3FORMS_ACCESS_KEY | Contact form key | your_web3forms_key |
| CLIENT_URL | Frontend URL | https://yourdomain.com |
| SUPER_ADMIN_EMAIL | Admin email | admin@snik.edu.in |
| SUPER_ADMIN_PASSWORD | Admin password | secure_password |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | https://api.yourdomain.com/api |

## Troubleshooting

### Backend Issues

**MongoDB Connection Failed**
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Ensure cluster is not paused

**CORS Errors**
- Verify CLIENT_URL matches frontend URL exactly
- Check CORS configuration in server.js
- Ensure credentials are enabled

**Authentication Issues**
- Verify JWT secrets are set
- Check cookie settings
- Ensure HTTPS is enabled

### Frontend Issues

**API Calls Failing**
- Verify VITE_API_URL is correct
- Check backend is running
- Inspect network tab for errors

**Build Failures**
- Clear node_modules and reinstall
- Check for syntax errors
- Verify all dependencies are installed

**Images Not Loading**
- Check Cloudinary credentials
- Verify image URLs
- Check CORS settings on Cloudinary

## Security Checklist

- [ ] All environment variables are set
- [ ] .env files are not committed to Git
- [ ] Strong JWT secrets (32+ characters)
- [ ] Strong admin password
- [ ] MongoDB IP whitelist configured
- [ ] HTTPS enabled on both frontend and backend
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Security headers enabled (Helmet)
- [ ] Input validation enabled

## Maintenance

### Regular Tasks

1. **Monitor Logs**: Check Render/Vercel logs weekly
2. **Database Backups**: MongoDB Atlas auto-backups (verify)
3. **Update Dependencies**: Monthly security updates
4. **Check Cloudinary Usage**: Monitor storage limits
5. **Review Applications**: Process student applications regularly

### Updating the Application

1. Make changes locally
2. Test thoroughly
3. Commit and push to GitHub
4. Render/Vercel auto-deploys from main branch
5. Verify deployment successful

## Support

For deployment issues:
- Backend: Check Render logs
- Frontend: Check Vercel logs
- Database: Check MongoDB Atlas metrics
- Email: admin@snik.edu.in

## Costs

### Free Tier Limits

- **Render**: 750 hours/month (sleeps after 15 min inactivity)
- **Vercel**: 100 GB bandwidth/month
- **MongoDB Atlas**: 512 MB storage
- **Cloudinary**: 25 GB storage, 25 GB bandwidth/month

### Upgrade Recommendations

When to upgrade:
- Backend sleeps too often → Render Starter ($7/month)
- Storage limits reached → MongoDB Atlas M2 ($9/month)
- Image storage full → Cloudinary Plus ($99/month)
