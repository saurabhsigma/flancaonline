# Flanca

Flanca is a full-stack digital agency website built with Next.js App Router, Tailwind CSS, MongoDB, NextAuth credentials auth, and Cloudinary uploads.

## Features

- Premium responsive agency landing page with light and dark theme support
- Editable homepage content managed from `/admin`
- Product catalogue CRUD with Cloudinary image uploads
- Credentials-based admin authentication with NextAuth
- Contact form persistence to MongoDB
- Toast notifications, loading states, and modular project structure

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

The admin user is seeded automatically on first successful authentication attempt.

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/flanca
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-a-long-random-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

If MongoDB is not running locally, the public site still renders using the built-in default content and projects. Admin edits, contact submissions, and auth persistence still require a reachable MongoDB instance.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site and [http://localhost:3000/admin](http://localhost:3000/admin) for the dashboard.

## Project Structure

- `app/` App Router pages and API routes
- `components/` UI building blocks and page sections
- `lib/` shared server utilities, auth, validation, and data access
- `models/` Mongoose schemas
- `types/` module augmentation for NextAuth
