# 🔧 Troubleshooting Guide

Common issues and their solutions during deployment.

---

## 🚨 Backend Issues (Render)

### Issue 1: Backend Sleeps After 15 Minutes

**Symptoms:**
- First request after inactivity is slow
- Backend shows "Starting..." in Render dashboard
- 503 errors intermittently

**Solutions:**
1. ✅ **Setup Cron Job** (Primary Solution)
   - Go to [cron-job.org](https://cron-job.org)
   - Create job: `https://your-app.onrender.com/health`
   - Schedule: Every 10 minutes
   - Verify execution history shows successful pings

2. ✅ **Verify Health Endpoint**
   - Visit: `https://your-app.onrender.com/health`
   - Should return: `{"success":true,"message":"Server is running"}`

3. ✅ **Check Cron Job Status**
   - Login to cron-job.org
   - Check execution history
   - Ensure no failures

---

### Issue 2: CORS Errors

**Symptoms:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solutions:**
1. ✅ **Check CLIENT_URL in Render**
   - Go to Render dashboard → Environment
   - Verify `CLIENT_URL` matches your domain exactly
   - Example: `https://yourdomain.com` (no trailing slash)

2. ✅ **Restart Render Service**
   - After changing environment variables
   - Click "Manual Deploy" or wait for auto-restart

3. ✅ **Check Frontend API URL**
   - Verify `.env` has correct Render URL
   - Should be: `VITE_API_URL=https://your-app.onrender.com/api`

4. ✅ **Rebuild Frontend**
   - After changing `.env`
   - Run: `npm run build`
   - Re-upload to DirectAdmin

---

### Issue 3: MongoDB Connection Failed

**Symptoms:**
```
MongooseServerSelectionError: connect ECONNREFUSED
```

**Solutions:**
1. ✅ **Check MongoDB URI**
   - Verify `MONGODB_URI` in Render environment
   - Ensure password is correct (no special characters issues)
   - Format: `mongodb+srv://user:password@cluster.mongodb.net/dbname`

2. ✅ **Whitelist All IPs in MongoDB Atlas**
   - Go to MongoDB Atlas → Network Access
   - Add IP: `0.0.0.0/0` (allow all)
   - Wait 2-3 minutes for changes to apply

3. ✅ **Check Database User**
   - Go to MongoDB Atlas → Database Access
   - Verify user exists and has read/write permissions
   - Password is correct

4. ✅ **Test Connection Locally**
   ```bash
   cd server
   npm install
   # Add MONGODB_URI to server/.env
   npm start
   ```

---

### Issue 4: Environment Variables Not Working

**Symptoms:**
- Backend crashes on startup
- Missing required environment variables error

**Solutions:**
1. ✅ **Verify All Required Variables**
   Required in Render:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=...
   JWT_SECRET=...
   JWT_REFRESH_SECRET=...
   JWT_EXPIRE=7d
   JWT_REFRESH_EXPIRE=30d
   JWT_COOKIE_EXPIRE=7
   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   CLIENT_URL=...
   ```

2. ✅ **Check for Typos**
   - Variable names are case-sensitive
   - No extra spaces
   - No quotes around values in Render

3. ✅ **Redeploy After Changes**
   - Click "Manual Deploy" in Render
   - Or push to Git to trigger auto-deploy

---

### Issue 5: Build Fails on Render

**Symptoms:**
```
npm install failed
Build failed
```

**Solutions:**
1. ✅ **Check Root Directory**
   - Should be set to: `server`
   - Not empty or `/`

2. ✅ **Verify package.json**
   - Exists in `server/` folder
   - Has `"start": "node server.js"`
   - Has `"type": "module"`

3. ✅ **Check Node Version**
   - Render uses latest Node.js by default
   - Add `.node-version` file if needed

4. ✅ **Check Render Logs**
   - View detailed error messages
   - Fix specific npm errors

---

## 🌐 Frontend Issues (DirectAdmin)

### Issue 6: 404 Error on Page Refresh

**Symptoms:**
- Homepage works
- Navigation works
- Refreshing any page shows 404

**Solutions:**
1. ✅ **Upload .htaccess File**
   - File should be in `public_html` root
   - Not inside a subfolder
   - Check file exists: `public_html/.htaccess`

2. ✅ **Verify .htaccess Content**
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule ^ index.html [L]
   </IfModule>
   ```

3. ✅ **Check mod_rewrite is Enabled**
   - Contact DirectAdmin support if needed
   - Most hosts have it enabled by default

4. ✅ **Clear Browser Cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

### Issue 7: API Calls Not Working

**Symptoms:**
```
Network Error
Failed to fetch
```

**Solutions:**
1. ✅ **Check .env Before Build**
   - File: `.env` in project root
   - Content: `VITE_API_URL=https://your-render-app.onrender.com/api`
   - Must be set BEFORE running `npm run build`

2. ✅ **Rebuild Frontend**
   ```bash
   npm run build
   ```
   - Environment variables are baked into build
   - Must rebuild after changing .env

3. ✅ **Verify Backend is Running**
   - Visit: `https://your-render-app.onrender.com/health`
   - Should return JSON response

4. ✅ **Check Browser Console**
   - F12 → Console tab
   - Look for specific error messages
   - Check Network tab for failed requests

---

### Issue 8: Images/PDFs Not Loading

**Symptoms:**
- Broken image icons
- 404 errors for PDFs
- Missing assets

**Solutions:**
1. ✅ **Upload public Folder Contents**
   - After build, `dist/` contains everything
   - Upload ALL files from `dist/` to `public_html`
   - Don't forget subfolders (2022-2023-Mandates, etc.)

2. ✅ **Check File Paths**
   - Paths should be relative
   - Example: `/logo.png` not `C:/project/logo.png`

3. ✅ **Verify File Permissions**
   - Files: 644
   - Folders: 755
   - Set in DirectAdmin File Manager

4. ✅ **Check File Names**
   - Case-sensitive on Linux servers
   - `Logo.png` ≠ `logo.png`

---

### Issue 9: Blank White Page

**Symptoms:**
- Site loads but shows nothing
- No errors in console
- Just white screen

**Solutions:**
1. ✅ **Check Browser Console**
   - F12 → Console tab
   - Look for JavaScript errors
   - Check for missing files

2. ✅ **Verify index.html**
   - Should be in `public_html` root
   - Not in a subfolder
   - Check file uploaded correctly

3. ✅ **Check Base URL**
   - In `vite.config.js`
   - Should be `/` for root domain
   - Or `/subfolder/` if in subfolder

4. ✅ **Clear Browser Cache**
   - Hard refresh
   - Try incognito mode
   - Try different browser

---

### Issue 10: Styles Not Loading

**Symptoms:**
- Site loads but looks broken
- No CSS styling
- Plain HTML only

**Solutions:**
1. ✅ **Upload assets Folder**
   - From `dist/assets/` to `public_html/assets/`
   - Contains all CSS and JS files
   - Check folder exists and has files

2. ✅ **Check File Paths in index.html**
   - Open `public_html/index.html`
   - Verify paths to CSS/JS files
   - Should be relative: `/assets/...`

3. ✅ **Check File Permissions**
   - CSS files: 644
   - assets folder: 755

4. ✅ **Clear Browser Cache**
   - Ctrl+Shift+R (Windows)
   - Cmd+Shift+R (Mac)

---

## 🔐 Authentication Issues

### Issue 11: Login Not Working

**Symptoms:**
- Login form submits but nothing happens
- "Invalid credentials" error
- Can't access admin panel

**Solutions:**
1. ✅ **Create Super Admin**
   - SSH into Render or use Render Shell
   - Run: `npm run setup`
   - Follow prompts to create admin user

2. ✅ **Check JWT Secrets**
   - Verify `JWT_SECRET` and `JWT_REFRESH_SECRET` in Render
   - Must be 32+ characters
   - Generate new: `node generate-secrets.js`

3. ✅ **Check Backend Logs**
   - Render dashboard → Logs
   - Look for authentication errors
   - Check MongoDB connection

4. ✅ **Verify API Endpoint**
   - Should be: `/api/auth/login`
   - Check Network tab in browser
   - Verify request is reaching backend

---

### Issue 12: Token Expired Errors

**Symptoms:**
```
Token expired
Unauthorized
401 errors
```

**Solutions:**
1. ✅ **Clear Browser Storage**
   - F12 → Application → Local Storage
   - Delete `token` and `refreshToken`
   - Try logging in again

2. ✅ **Check Token Expiry Settings**
   - `JWT_EXPIRE=7d` in Render
   - `JWT_REFRESH_EXPIRE=30d` in Render
   - Adjust if needed

3. ✅ **Verify Token Refresh Logic**
   - Check `src/lib/axios.js`
   - Should auto-refresh expired tokens
   - Check browser console for errors

---

## 🗄️ Database Issues

### Issue 13: Data Not Saving

**Symptoms:**
- Forms submit but data doesn't save
- No errors shown
- Data disappears after refresh

**Solutions:**
1. ✅ **Check MongoDB Connection**
   - Render logs should show "MongoDB connected"
   - No connection errors

2. ✅ **Verify Database Permissions**
   - MongoDB Atlas → Database Access
   - User has "Read and write to any database"

3. ✅ **Check Collection Names**
   - MongoDB Atlas → Browse Collections
   - Verify collections exist
   - Check data is being written

4. ✅ **Check Backend Logs**
   - Look for validation errors
   - Check for schema mismatches

---

## 📸 Image Upload Issues

### Issue 14: Image Upload Fails

**Symptoms:**
- Upload button doesn't work
- "Upload failed" error
- Images don't appear

**Solutions:**
1. ✅ **Check Cloudinary Credentials**
   - Verify all three in Render:
     - `CLOUDINARY_CLOUD_NAME`
     - `CLOUDINARY_API_KEY`
     - `CLOUDINARY_API_SECRET`

2. ✅ **Check File Size**
   - Max: 10MB (set in server.js)
   - Reduce image size if needed

3. ✅ **Check File Type**
   - Allowed: jpg, jpeg, png, gif, webp
   - Check multer configuration

4. ✅ **Check Backend Logs**
   - Look for Cloudinary errors
   - Verify upload endpoint is working

---

## 🔍 Debugging Tips

### Check Backend Health
```bash
curl https://your-render-app.onrender.com/health
```

### Check API Health
```bash
curl https://your-render-app.onrender.com/api/health
```

### Test MongoDB Connection
```bash
# In server folder
node -e "require('dotenv').config(); require('./config/db.js').default()"
```

### View Render Logs
1. Go to Render dashboard
2. Click your service
3. Click "Logs" tab
4. Watch real-time logs

### Check Browser Console
1. F12 or Right-click → Inspect
2. Console tab for errors
3. Network tab for API calls
4. Application tab for storage

---

## 📞 Still Stuck?

### Checklist
- [ ] Read error message carefully
- [ ] Check Render logs
- [ ] Check browser console
- [ ] Verify all environment variables
- [ ] Test backend health endpoint
- [ ] Clear browser cache
- [ ] Try incognito mode
- [ ] Check MongoDB Atlas status
- [ ] Verify cron job is running
- [ ] Review deployment checklist

### Get Help
1. **Render Support**: https://render.com/docs
2. **MongoDB Support**: https://www.mongodb.com/docs/
3. **DirectAdmin**: Your hosting provider
4. **Stack Overflow**: Search for specific errors

---

## 🎯 Prevention Tips

1. ✅ **Always test locally first**
2. ✅ **Keep environment variables documented**
3. ✅ **Monitor logs regularly**
4. ✅ **Test after each deployment**
5. ✅ **Keep dependencies updated**
6. ✅ **Backup database regularly**
7. ✅ **Use version control (Git)**
8. ✅ **Document any custom changes**

---

Good luck! Most issues are simple configuration problems that are easy to fix. 🚀
