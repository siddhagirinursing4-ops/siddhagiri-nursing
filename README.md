# Siddhagiri Nursing Institute Website

A full-stack web application for Siddhagiri Nursing Institute with admin panel, student applications, gallery management, and dynamic content.

## Tech Stack

### Frontend
- React 18 + Vite
- React Router v6
- Tailwind CSS
- Axios
- Zustand (State Management)
- React Hook Form

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (Image Storage)
- Multer (File Uploads)

## Project Structure

```
├── src/                    # Frontend React application
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── lib/               # Utilities (axios config)
│   └── store/             # Zustand stores
├── server/                # Backend Express API
│   ├── config/            # Database & config
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Auth & error handling
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── scripts/           # Setup scripts
├── public/                # Static assets (PDFs, images)
└── dist/                  # Production build (generated)
```

## Local Development

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Cloudinary account

### Setup

1. **Clone repository**
   ```bash
   git clone <your-repo-url>
   cd siddhagiri-nursing-institute
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   npm install
   
   # Backend
   cd server
   npm install
   cd ..
   ```

3. **Configure environment variables**
   
   Create `.env` in root:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   
   Create `server/.env`:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=7d
   COOKIE_EXPIRE=7
   CLIENT_URL=http://localhost:5173
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

4. **Create admin account**
   ```bash
   cd server
   npm run setup
   ```

5. **Run development servers**
   
   Terminal 1 (Frontend):
   ```bash
   npm run dev
   ```
   
   Terminal 2 (Backend):
   ```bash
   cd server
   npm run dev
   ```

6. **Access application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api
   - Admin Panel: http://localhost:5173/admin

## Deployment

This project uses split deployment:
- **Frontend:** Vercel (static hosting)
- **Backend:** Render (Node.js hosting)

### Quick Deploy (5 minutes)
See `QUICK_DEPLOY.md` for step-by-step instructions.

### Detailed Guide
See `DEPLOYMENT_GUIDE.md` for comprehensive deployment documentation.

## Features

### Public Features
- Programme information (GNM, ANM, PBBSC Nursing)
- Mandate documents (yearly PDFs)
- Photo gallery
- Online application forms
- Contact information

### Admin Features
- Dashboard with statistics
- Student application management
- Gallery management (upload/delete photos)
- Programme content management
- Announcement management
- Banner management
- User authentication & authorization

## API Endpoints

### Public Routes
- `GET /api/programmes` - Get all programmes
- `GET /api/mandates` - Get mandate documents
- `GET /api/gallery` - Get gallery images
- `POST /api/applications` - Submit application

### Protected Routes (Admin)
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/applications` - Manage applications
- `POST /api/gallery` - Upload images
- `PUT /api/dynamic-content` - Update content

See backend routes for complete API documentation.

## Scripts

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
npm run dev                    # Start dev server with nodemon
npm start                      # Start production server
npm run setup                  # Create super admin
npm run seed-programmes        # Seed programme data
npm run seed-announcements     # Seed announcements
npm run seed-banner           # Seed banner
```

## Environment Variables

### Frontend (.env)
- `VITE_API_URL` - Backend API URL

### Backend (server/.env)
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRE` - JWT expiration time
- `COOKIE_EXPIRE` - Cookie expiration (days)
- `CLIENT_URL` - Frontend URL (for CORS)
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

## Security Features

- JWT-based authentication
- HTTP-only cookies
- Helmet.js security headers
- Rate limiting
- MongoDB sanitization
- HPP protection
- CORS configuration
- Input validation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private - All rights reserved

## Support

For issues or questions, contact the development team.
