# Master Kenyan Sign Language

A modern web platform for learning, promoting, and practicing Kenyan Sign Language (KSL). The project combines a public-facing marketing and education website with an admin-managed blog and content system.

## Overview

Master Kenyan Sign Language is designed to make communication more accessible and inclusive by helping people learn KSL, understand the value of sign language in Kenya, and connect with the deaf community through clear, engaging information.

This project includes:

- A responsive landing page and service showcase
- Course and class information for learners
- A contact flow using WhatsApp and email
- A blog and article system for educational content
- An admin dashboard for managing blog posts

## Features

- Hero section with a strong inclusivity and communication message
- About section explaining the mission and impact of KSL
- Service and training offerings with pricing and booking links
- Class information for beginner, intermediate, and advanced learners
- Contact form that opens WhatsApp with a pre-filled message
- Blog page and article detail pages
- Admin login and content management dashboard
- Dark mode support for the frontend
- Image upload support for blog articles and cover images

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS
- HTML
- React Router
- React Helmet Async

### Backend
- Node.js
- Express.js
- MySQL
- Multer for file uploads
- JWT for admin authentication
- Bcrypt for password hashing
- CORS and dotenv support

## Project Structure

```bash
master--kenyan-signLanguage-/
├── public/
├── server/
│   ├── config/
│   ├── middleware/
│   ├── routes/
│   ├── uploads/
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
└── .env
```

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+
- npm
- MySQL database running locally
- A configured `.env` file for the backend

## Frontend Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in the browser at:

```text
http://localhost:5173
```

## Backend Setup

1. Go into the server folder:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `server` directory with the following values:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=kenya_sign_language
DB_PORT=3306
JWT_SECRET=your_super_secret_key
```

4. Start the backend server:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:5000
```

### Create the default admin

After configuring `server/.env`, run the repeatable admin migration:

```bash
cd server
npm run migrate:admin
```

When running with Docker Compose, run the migration inside the backend container instead:

```bash
docker compose up -d db backend
docker compose exec backend npm run migrate:admin
```

The migration creates the `admins` table and seeds the admin configured by `ADMIN_EMAIL` and `ADMIN_PASSWORD`. The default development credentials are `admin@ksl.local` and `Admin@12345`. Change them in `server/.env` before running the migration in a shared or production environment.

## Docker Setup

Docker Compose runs the frontend, backend, and MySQL database together. Copy the environment values you need into a `.env` file at the repository root, using the `COMPOSE_*` database variable names so they do not conflict with a local `server/.env`, then start the stack:

```bash
docker compose up --build
```

Open the frontend at `http://localhost`. The API is available at `http://localhost:5000`. MySQL data and uploaded blog images are stored in named Docker volumes. Stop the stack with:

```bash
docker compose down
```

To remove the persisted database and uploads as well, run `docker compose down -v`.

## Admin Access

The project includes an admin dashboard for managing blog content.

- Public blog route: `/blog`
- Admin login route: `/admin/login`
- Admin dashboard: `/admin/blog`

Admin authentication is handled through the backend API using JWT tokens and a MySQL `admins` table.

## Blog System

The backend supports:

- Fetching all blog posts
- Viewing a single article
- Creating new blog posts
- Updating posts
- Deleting posts
- Uploading cover images and article images

Blog media is served from the `server/uploads` directory.

## Contact and Booking Flow

The site includes WhatsApp and email contact actions. The contact form creates a WhatsApp message that is ready to send to the business.

Example contact details used in the project:

- Phone: +254 795 592 258
- WhatsApp: wa.me/254795592258
- Email: luciaseda354@gmail.com
- Location: Nairobi, Kenya

## Notes

- This project is primarily a frontend marketing and education website with an admin-managed content layer.
- The backend is required for blog management and admin authentication.
- Database tables must exist for the backend to function properly.

## Future Improvements

- Add a dedicated KSL lesson library
- Add quizzes and progress tracking
- Expand the blog with more Kenyan sign language resources
- Improve booking and enrollment flows
- Add stronger admin management and analytics

## License

This repository does not currently include a license file. If you plan to publish or distribute the project publicly, consider adding an open-source license such as MIT.

## Summary

Master Kenyan Sign Language is a practical and inclusive project that promotes Kenyan Sign Language education, awareness, and communication access. It combines marketing, educational content, and a working admin blog backend to support the broader mission of accessibility in Kenya.
