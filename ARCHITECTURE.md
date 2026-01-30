# 🏗️ Deployment Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         YOUR USERS                              │
│                    (Browser / Mobile)                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ HTTPS
                         │
         ┌───────────────┴────────────────┐
         │                                │
         │                                │
         ▼                                ▼
┌─────────────────┐              ┌─────────────────┐
│   DIRECTADMIN   │              │     RENDER      │
│   (Frontend)    │─────────────▶│   (Backend)     │
│                 │   API Calls  │                 │
│  - React App    │              │  - Node.js      │
│  - Static HTML  │              │  - Express API  │
│  - CSS/JS       │              │  - REST API     │
│  - Images/PDFs  │              │                 │
└─────────────────┘              └────────┬────────┘
                                          │
                                          │
                         ┌────────────────┼────────────────┐
                         │                │                │
                         ▼                ▼                ▼
                  ┌──────────┐    ┌──────────┐    ┌──────────┐
                  │ MongoDB  │    │Cloudinary│    │Cron-Job  │
                  │  Atlas   │    │  (FREE)  │    │   .org   │
                  │  (FREE)  │    │          │    │  (FREE)  │
                  │          │    │ - Images │    │          │
                  │ - Data   │    │ - Files  │    │ - Pings  │
                  │ - Users  │    │          │    │   /health│
                  └──────────┘    └──────────┘    └──────────┘
```

---

## Data Flow

### 1. User Visits Website
```
User Browser
    ↓
DirectAdmin (yourdomain.com)
    ↓
Serves React App (HTML/CSS/JS)
    ↓
React App Loads in Browser
```

### 2. User Interacts (e.g., Login, View Data)
```
React App (Browser)
    ↓
API Call to: https://your-backend.onrender.com/api
    ↓
Render Backend (Node.js/Express)
    ↓
MongoDB Atlas (Database)
    ↓
Response back to React App
    ↓
UI Updates
```

### 3. User Uploads Image
```
React App
    ↓
API Call with Image
    ↓
Render Backend
    ↓
Cloudinary (Image Storage)
    ↓
Returns Image URL
    ↓
Saves URL to MongoDB
    ↓
Response to React App
```

### 4. Keep Backend Awake
```
Cron-Job.org (Every 10 minutes)
    ↓
Pings: https://your-backend.onrender.com/health
    ↓
Render Backend Responds
    ↓
Backend Stays Awake 24/7
```

---

## Technology Stack

### Frontend (DirectAdmin)
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State**: Zustand
- **HTTP Client**: Axios

### Backend (Render)
- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT (JSON Web Tokens)
- **File Upload**: Multer + Cloudinary
- **Security**: Helmet, CORS, Rate Limiting

### Database (MongoDB Atlas)
- **Type**: NoSQL Document Database
- **Tier**: M0 (Free)
- **Storage**: 512MB
- **Hosting**: Cloud (AWS/GCP/Azure)

### File Storage (Cloudinary)
- **Type**: Cloud Media Storage
- **Tier**: Free
- **Storage**: 25GB
- **Bandwidth**: 25GB/month

### Keep-Alive (Cron-Job.org)
- **Type**: Scheduled HTTP Requests
- **Frequency**: Every 10 minutes
- **Purpose**: Prevent Render free tier sleep

---

## Deployment Locations

```
┌─────────────────────────────────────────────────────────┐
│                    DEPLOYMENT MAP                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Frontend (DirectAdmin)                                 │
│  ├─ Location: Your hosting server                      │
│  ├─ Files: dist/ folder contents                       │
│  └─ URL: https://yourdomain.com                        │
│                                                         │
│  Backend (Render)                                       │
│  ├─ Location: Render cloud (US/EU)                     │
│  ├─ Files: server/ folder                              │
│  └─ URL: https://your-app.onrender.com                 │
│                                                         │
│  Database (MongoDB Atlas)                               │
│  ├─ Location: Cloud (your choice)                      │
│  ├─ Cluster: M0 Free Tier                              │
│  └─ Connection: Via MONGODB_URI                        │
│                                                         │
│  Images (Cloudinary)                                    │
│  ├─ Location: Cloudinary CDN                           │
│  ├─ Storage: Cloud                                     │
│  └─ Access: Via API keys                               │
│                                                         │
│  Keep-Alive (Cron-Job.org)                             │
│  ├─ Location: Cron-Job.org servers                     │
│  ├─ Schedule: Every 10 minutes                         │
│  └─ Target: /health endpoint                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Security Features

### Frontend
- ✅ HTTPS (via DirectAdmin)
- ✅ Environment variables for API URL
- ✅ JWT token storage in localStorage
- ✅ Automatic token refresh
- ✅ Protected routes

### Backend
- ✅ Helmet (Security headers)
- ✅ CORS (Cross-Origin protection)
- ✅ Rate Limiting (100 req/10min)
- ✅ MongoDB Sanitization
- ✅ HPP (HTTP Parameter Pollution)
- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Cookie Parser
- ✅ Request Timeout (30s)

### Database
- ✅ Encrypted connections
- ✅ IP Whitelist
- ✅ User authentication
- ✅ Automatic backups

---

## Performance Optimizations

### Frontend
- ✅ Code splitting (React.lazy)
- ✅ Vendor chunk separation
- ✅ Gzip compression (.htaccess)
- ✅ Browser caching (.htaccess)
- ✅ Optimized images

### Backend
- ✅ Connection pooling (MongoDB)
- ✅ Response compression
- ✅ Efficient queries
- ✅ CDN for images (Cloudinary)
- ✅ Always-on (no cold starts)

---

## Scalability

### Current Setup (FREE)
- **Users**: Up to 1000s/day
- **Storage**: 512MB database + 25GB images
- **Bandwidth**: Sufficient for small-medium sites
- **Uptime**: 99.9% (with keep-alive)

### Future Scaling (If Needed)
- **Frontend**: Already on DirectAdmin (scalable)
- **Backend**: Upgrade Render plan ($7/month for more resources)
- **Database**: Upgrade MongoDB Atlas tier
- **Images**: Upgrade Cloudinary plan

---

## Monitoring

### Health Checks
- **Backend**: `/health` endpoint
- **API**: `/api/health` endpoint
- **Cron Job**: Execution history
- **Render**: Built-in logs and metrics

### Logs
- **Frontend**: Browser console
- **Backend**: Render logs dashboard
- **Database**: MongoDB Atlas logs
- **Cron**: Execution history

---

## Backup Strategy

### Automatic Backups
- **MongoDB Atlas**: Daily automatic backups (free tier)
- **Cloudinary**: Permanent storage
- **Code**: Git repository

### Manual Backups
- **Database**: Export via MongoDB Compass
- **Images**: Download from Cloudinary
- **Code**: Git commits

---

## Cost Breakdown

| Service | Tier | Cost | Limits |
|---------|------|------|--------|
| DirectAdmin | Your Plan | Your Cost | Your Limits |
| Render | Free | $0 | 750 hrs/month |
| MongoDB Atlas | M0 | $0 | 512MB storage |
| Cloudinary | Free | $0 | 25GB storage |
| Cron-Job.org | Free | $0 | Unlimited |
| **TOTAL** | - | **$0/month** | Sufficient for most sites |

---

## Why This Architecture?

### ✅ Advantages
1. **100% Free** (except DirectAdmin you already have)
2. **Always Online** (no cold starts with cron job)
3. **Scalable** (easy to upgrade when needed)
4. **Secure** (multiple security layers)
5. **Fast** (CDN for images, optimized code)
6. **Reliable** (99.9% uptime)
7. **Easy to Update** (simple deployment process)

### ⚠️ Limitations
1. **Render Free Tier**: 750 hours/month (but cron keeps it awake)
2. **MongoDB Free**: 512MB storage (upgrade if needed)
3. **Cloudinary Free**: 25GB storage (upgrade if needed)

### 🚀 When to Upgrade
- **Traffic**: >10,000 users/day
- **Storage**: >400MB database or >20GB images
- **Performance**: Need faster response times
- **Features**: Need advanced features

---

## Deployment Timeline

```
Day 1: Setup & Deploy
├─ Hour 1: Create accounts (Render, MongoDB, Cloudinary, Cron-Job)
├─ Hour 2: Deploy backend to Render
├─ Hour 3: Setup cron job & build frontend
└─ Hour 4: Upload to DirectAdmin & test

Day 2-7: Monitor
├─ Check logs daily
├─ Verify cron job is working
├─ Test all features
└─ Fix any issues

Week 2+: Maintain
├─ Weekly log checks
├─ Monthly updates
└─ Scale as needed
```

---

This architecture provides a solid foundation for your school website with room to grow! 🚀
