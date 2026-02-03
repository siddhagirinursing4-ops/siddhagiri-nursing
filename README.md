# Siddhagiri Nursing Institute Website

Full-stack web application for Siddhagiri Nursing Institute, Kaneri.

## 🚀 Deployment Status

- **Frontend**: https://snik.in (DirectAdmin)
- **Backend**: https://siddhagiri-nursing-backend.onrender.com (Render)
- **Status**: ✅ Live

## 📁 Project Structure

```
├── src/                    # Frontend React application
├── server/                 # Backend Node.js API
├── public/                 # Static assets (PDFs, images)
├── dist/                   # Production build (generated)
└── .htaccess              # Apache config for React Router
```

## 🛠️ Development

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
npm run dev
```

## 📦 Build for Production

```bash
npm run build
```

This creates a `dist` folder with production-ready files.

## 🌐 Deployment

### Frontend (DirectAdmin)
1. Run `npm run build`
2. Upload all files from `dist/` folder to `public_html`
3. Upload `.htaccess` file to `public_html` root

### Backend (Render)
- Auto-deploys from GitHub `main` branch
- Environment variables configured in Render dashboard

## 🔑 Environment Variables

### Frontend (.env)
```
VITE_API_URL=https://siddhagiri-nursing-backend.onrender.com/api
```

### Backend (Render Dashboard)
- `NODE_ENV=production`
- `PORT=10000`
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_REFRESH_SECRET` - Refresh token secret
- `CLOUDINARY_*` - Image upload credentials
- `CLIENT_URL=https://snik.in`

## 📞 Support

- **Phone**: +91 9356872628
- **Email**: siddhaginursingcollege@gmail.com
- **Address**: Kaneri, Tal. Karveer, Dist. Kolhapur - 416234

## 🔧 Tech Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express, MongoDB
- **Hosting**: DirectAdmin (Frontend), Render (Backend)
- **Database**: MongoDB Atlas
- **Storage**: Cloudinary

---

© 2026 Siddhagiri Nursing Institute, Kaneri
