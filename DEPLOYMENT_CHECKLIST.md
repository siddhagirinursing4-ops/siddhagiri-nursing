# Deployment Checklist ✅

Use this checklist to ensure everything is set up correctly.

---

## 📋 Pre-Deployment Setup

### MongoDB Atlas (FREE)
- [ ] Created account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- [ ] Created free cluster (M0 tier)
- [ ] Created database user with password
- [ ] Whitelisted all IPs (`0.0.0.0/0`) in Network Access
- [ ] Copied connection string
- [ ] Replaced `<password>` in connection string with actual password

### Cloudinary (FREE)
- [ ] Created account at [cloudinary.com](https://cloudinary.com)
- [ ] Copied Cloud Name from dashboard
- [ ] Copied API Key from dashboard
- [ ] Copied API Secret from dashboard

### JWT Secrets
- [ ] Generated JWT_SECRET (32+ characters)
- [ ] Generated JWT_REFRESH_SECRET (32+ characters)
- [ ] Saved both securely

---

## 🚀 Backend Deployment (Render)

### Render Setup
- [ ] Created account at [render.com](https://render.com)
- [ ] Connected Git repository
- [ ] Created new Web Service
- [ ] Set Root Directory to `server`
- [ ] Set Build Command to `npm install`
- [ ] Set Start Command to `npm start`
- [ ] Selected Free tier

### Environment Variables on Render
- [ ] NODE_ENV=production
- [ ] PORT=10000
- [ ] MONGODB_URI=(from MongoDB Atlas)
- [ ] JWT_SECRET=(generated secret)
- [ ] JWT_REFRESH_SECRET=(generated secret)
- [ ] JWT_EXPIRE=7d
- [ ] JWT_REFRESH_EXPIRE=30d
- [ ] JWT_COOKIE_EXPIRE=7
- [ ] CLOUDINARY_CLOUD_NAME=(from Cloudinary)
- [ ] CLOUDINARY_API_KEY=(from Cloudinary)
- [ ] CLOUDINARY_API_SECRET=(from Cloudinary)
- [ ] CLIENT_URL=(your DirectAdmin domain)

### Deployment
- [ ] Clicked "Create Web Service"
- [ ] Waited for deployment to complete
- [ ] Copied Render URL (e.g., https://your-app.onrender.com)
- [ ] Tested health endpoint: https://your-app.onrender.com/health
- [ ] Verified response shows "Server is running"

---

## 🔄 Keep Backend Awake (Cron-Job.org)

- [ ] Created account at [cron-job.org](https://cron-job.org)
- [ ] Created new cron job
- [ ] Set URL to: https://your-render-app.onrender.com/health
- [ ] Set schedule to: Every 10 minutes
- [ ] Enabled the cron job
- [ ] Verified it's running (check execution history)

---

## 🌐 Frontend Deployment (DirectAdmin)

### Build Frontend
- [ ] Created `.env` file in project root
- [ ] Added: VITE_API_URL=https://your-render-app.onrender.com/api
- [ ] Ran: `npm install`
- [ ] Ran: `npm run build`
- [ ] Verified `dist` folder was created
- [ ] Checked `dist` folder contains index.html and assets

### Upload to DirectAdmin
- [ ] Logged into DirectAdmin panel
- [ ] Navigated to File Manager
- [ ] Went to `public_html` folder
- [ ] Backed up existing files (if any)
- [ ] Deleted old files from `public_html`
- [ ] Uploaded ALL files from `dist` folder
- [ ] Uploaded `.htaccess` file to `public_html` root
- [ ] Verified all files are uploaded correctly

---

## ✅ Testing & Verification

### Backend Tests
- [ ] Health check works: https://your-render-app.onrender.com/health
- [ ] API health works: https://your-render-app.onrender.com/api/health
- [ ] No errors in Render logs
- [ ] MongoDB connection successful (check logs)
- [ ] Cron job is pinging every 10 minutes

### Frontend Tests
- [ ] Homepage loads: https://yourdomain.com
- [ ] Navigation works (click different pages)
- [ ] Page refresh doesn't show 404 errors
- [ ] Images load correctly
- [ ] PDFs are accessible
- [ ] Admin login page loads: https://yourdomain.com/admin/login

### Integration Tests
- [ ] Admin login works (if you have credentials)
- [ ] API calls succeed (check browser console)
- [ ] No CORS errors in browser console
- [ ] Forms submit successfully
- [ ] Image uploads work (if applicable)

---

## 🔧 Troubleshooting

### If Backend Sleeps
- ✅ Verify cron-job.org is active
- ✅ Check cron job execution history
- ✅ Ensure URL is correct with `/health` endpoint

### If CORS Errors
- ✅ Check CLIENT_URL in Render environment variables
- ✅ Ensure it matches your DirectAdmin domain exactly
- ✅ Restart Render service after changing env vars

### If 404 on Page Refresh
- ✅ Verify `.htaccess` file is uploaded
- ✅ Check `.htaccess` is in `public_html` root
- ✅ Ensure DirectAdmin has mod_rewrite enabled

### If API Calls Fail
- ✅ Check VITE_API_URL in `.env` before build
- ✅ Rebuild frontend: `npm run build`
- ✅ Re-upload `dist` folder to DirectAdmin
- ✅ Clear browser cache

---

## 📊 Monitoring

### Daily Checks (First Week)
- [ ] Backend is responding: https://your-render-app.onrender.com/health
- [ ] Frontend loads correctly
- [ ] Cron job is running (check cron-job.org)
- [ ] No errors in Render logs

### Weekly Checks (After First Week)
- [ ] Check Render logs for errors
- [ ] Verify cron job execution history
- [ ] Test critical functionality
- [ ] Check MongoDB storage usage

---

## 🎉 Success Criteria

Your deployment is successful when:
- ✅ Backend responds 24/7 without sleeping
- ✅ Frontend loads on your domain
- ✅ Navigation works without 404 errors
- ✅ Admin panel is accessible
- ✅ API calls work correctly
- ✅ No CORS errors
- ✅ Images and PDFs load
- ✅ Forms submit successfully

---

## 📝 Important URLs to Save

- **Frontend**: https://yourdomain.com
- **Backend**: https://your-render-app.onrender.com
- **Backend Health**: https://your-render-app.onrender.com/health
- **Render Dashboard**: https://dashboard.render.com
- **Cron-Job Dashboard**: https://cron-job.org/en/members/jobs/
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Cloudinary**: https://cloudinary.com/console

---

## 🔄 Future Updates

### Update Backend
1. Push changes to Git
2. Render auto-deploys (if enabled)
3. Or click "Manual Deploy" in Render dashboard

### Update Frontend
1. Make code changes
2. Run `npm run build`
3. Upload new `dist` folder contents to DirectAdmin
4. Clear browser cache and test

---

**Deployment Date**: _______________  
**Backend URL**: _______________  
**Frontend URL**: _______________  
**Deployed By**: _______________

---

Good luck! 🚀
