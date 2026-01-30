# 🎯 START HERE - Deployment Guide

## Welcome! 👋

This guide will help you deploy your school website with:
- **Frontend** on DirectAdmin (your hosting)
- **Backend** on Render (FREE, always online 24/7)

**Total time: ~35 minutes**  
**Total cost: $0/month**

---

## 📚 Choose Your Guide

### 🚀 Option 1: Quick Start (Recommended)
**File**: [QUICK_START.md](./QUICK_START.md)

Best for: Getting deployed fast with clear steps

### 📋 Option 2: Checklist Approach
**File**: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

Best for: Tracking progress step-by-step

### 📖 Option 3: Detailed Guide
**File**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

Best for: Understanding everything in detail + troubleshooting

---

## 🎬 Deployment Overview

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  1. Deploy Backend to Render (15 min)                  │
│     ↓                                                   │
│  2. Setup Cron Job to Keep Awake (5 min)              │
│     ↓                                                   │
│  3. Build & Upload Frontend to DirectAdmin (10 min)    │
│     ↓                                                   │
│  4. Test Everything (5 min)                            │
│     ↓                                                   │
│  ✅ DONE! Your site is live 24/7                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ What You Need

### Accounts (All FREE)
- [ ] [Render.com](https://render.com) - Backend hosting
- [ ] [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database
- [ ] [Cloudinary](https://cloudinary.com) - Image storage
- [ ] [Cron-Job.org](https://cron-job.org) - Keep backend awake

### Already Have
- [x] DirectAdmin hosting (for frontend)
- [x] Domain name
- [x] This code repository

---

## 🔧 Helper Tools Created

### Generate JWT Secrets
```bash
node generate-secrets.js
```
Generates secure secrets for your backend.

### Build Frontend (Windows)
```bash
build-for-deployment.bat
```
Automatically builds your frontend for DirectAdmin.

---

## 📁 Important Files

| File | What It Does |
|------|--------------|
| `.htaccess` | Makes React Router work on DirectAdmin |
| `.env.production` | Template for frontend API URL |
| `render.yaml` | Optional one-click Render deployment |
| `server/.env.example` | Template for backend environment variables |

---

## 🎯 Quick Commands

### Generate Secrets
```bash
node generate-secrets.js
```

### Build Frontend
```bash
npm install
npm run build
```

### Test Backend Locally
```bash
cd server
npm install
npm start
```

---

## ⚡ Fast Track (If You're Experienced)

1. **Backend**: Deploy `server/` folder to Render with env vars
2. **Keep Awake**: Cron job pinging `/health` every 10 min
3. **Frontend**: Build with `npm run build`, upload `dist/` to DirectAdmin
4. **Done**: Test at your domain

---

## 🆘 Troubleshooting

### Backend sleeps after 15 minutes?
→ Setup cron job at cron-job.org to ping `/health` endpoint

### 404 errors on page refresh?
→ Upload `.htaccess` file to DirectAdmin public_html root

### API calls not working?
→ Check `VITE_API_URL` in `.env` before building

### CORS errors?
→ Add your domain to `CLIENT_URL` in Render environment variables

---

## 📞 Need More Help?

1. **Quick answers**: Check [QUICK_START.md](./QUICK_START.md)
2. **Detailed help**: Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
3. **Track progress**: Use [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

---

## 🎉 What You'll Get

After deployment:
- ✅ Website live 24/7 on your domain
- ✅ Backend always awake (no cold starts)
- ✅ Admin panel working
- ✅ All features functional
- ✅ 100% FREE hosting
- ✅ Easy to update

---

## 🚀 Ready to Start?

**Click here**: [QUICK_START.md](./QUICK_START.md)

Good luck! You've got this! 💪

---

**Questions?** All answers are in the deployment guides! 📚
