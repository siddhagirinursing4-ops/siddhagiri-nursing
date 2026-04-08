# Siddhagiri Nursing College - Full Stack Application

A modern, production-ready full-stack web application for Siddhagiri Nursing College with admin panel, student applications, gallery management, and dynamic content management.

## Tech Stack

### Backend
- Node.js + Express.js
- MongoDB (Atlas)
- JWT Authentication
- Cloudinary (Image Management)
- Security: Helmet, Rate Limiting, CORS, Sanitization

### Frontend
- React 18
- Vite
- React Router v6
- Tailwind CSS
- Zustand (State Management)
- Axios

## Features

- � Secure Admin Authentication
- 📝 Student Application Management
- 🖼️ Gallery Management with Cloudinary
- 📋 Programme Management (BSc, GNM, MSc, PB-BSc Nursing)
- 📄 Mandate Document Management
- 🎯 Dynamic Content Management (Announcements, Banners)
- 📱 Responsive Design
- 🔒 Production-grade Security

## Project Structure

```
.
├── backend/              # Node.js/Express API
│   ├── config/          # Database & Cloudinary config
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth, security, upload middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── scripts/         # Seed & setup scripts
│   └── server.js        # Entry point
│
├── frontend/            # React/Vite application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── store/       # Zustand stores
│   │   └── lib/         # Utilities
│   └── public/          # Static assets
│
└── dist/                # Production build output
```

## Setup Instructions

### Prerequisites
- Node.js v16+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account

### 1. Clone Repository

```bash
git clone https://github.com/siddhagirinursing4-ops/siddhagiri-nursing.git
cd siddhagiri-nursing
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env` file:

```env
NODE_ENV=production
PORT=5000

# MongoDB Atlas
MONGODB_URI=your_mongodb_connection_string

# JWT Secrets (generate secure random strings)
JWT_SECRET=your_jwt_secret_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_min_32_chars
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Web3Forms (Contact Form)
WEB3FORMS_ACCESS_KEY=your_web3forms_key

# Client URL (Frontend URL)
CLIENT_URL=https://yourdomain.com

# Super Admin
SUPER_ADMIN_EMAIL=admin@yourdomain.com
SUPER_ADMIN_PASSWORD=secure_password
```

Create super admin:
```bash
npm run setup
```

Start backend:
```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in project root:

```env
VITE_API_URL=https://your-backend-url.com/api
```

Build for production:
```bash
npm run build
```

## Development

### Backend Development
```bash
cd backend
npm run dev
```

### Frontend Development
```bash
cd frontend
npm run dev
```

## Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Build: `npm run build --prefix frontend`
2. Deploy `dist/` folder
3. Set environment variable: `VITE_API_URL`

### DirectAdmin/cPanel Deployment

Use the provided script:
```bash
build-for-deployment.bat
```

Then upload contents of `dist/` folder to `public_html/`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout

### Programmes
- `GET /api/programmes` - Get all programmes
- `POST /api/programmes` - Create programme (Admin)
- `PUT /api/programmes/:id` - Update programme (Admin)
- `DELETE /api/programmes/:id` - Delete programme (Admin)

### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications` - Get all applications (Admin)
- `PATCH /api/applications/:id/status` - Update status (Admin)

### Gallery
- `GET /api/gallery` - Get gallery images
- `POST /api/gallery` - Upload image (Admin)
- `DELETE /api/gallery/:id` - Delete image (Admin)

### Mandates
- `GET /api/mandates` - Get mandates
- `POST /api/mandates` - Create mandate (Admin)

### Dynamic Content
- `GET /api/dynamic-content/:type` - Get content
- `PUT /api/dynamic-content/:type` - Update content (Admin)

## Security Features

- JWT-based authentication
- HTTP-only cookies
- Rate limiting
- CORS protection
- MongoDB sanitization
- Helmet security headers
- HPP protection
- Input validation

## Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server
- `npm run setup` - Create super admin
- `npm run seed-programmes` - Seed programmes
- `npm run seed-announcements` - Seed announcements
- `npm run seed-banner` - Seed banner

### Frontend
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Environment Variables

See `.env.example` files in `backend/` for complete list of required environment variables.

## License

Private - All rights reserved

## Support

For issues or questions, contact: admin@snik.edu.in
