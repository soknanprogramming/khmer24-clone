# Khmer24 Clone - Project Instructions

This project is a full-stack clone of Khmer24, an e-commerce platform. It features a React frontend and a Node.js backend with a MySQL database.

## Project Overview

- **Frontend (`/client`):** Built with React 19, Vite, and Tailwind CSS 4. Uses Zustand for state management and React Router for navigation.
- **Backend (`/server`):** Built with Node.js and Express 5. Uses Drizzle ORM for database interactions and Passport.js for authentication.
- **Database:** MySQL 8.0, managed via Docker.

## Project Structure

### Client (`/client`)
- `src/components`: Reusable UI components.
- `src/pages`: Main application views (Home, Auth, Post, Details, etc.).
- `src/store`: Zustand stores for global state management (categories, user, etc.).
- `src/func`: Utility functions.
- `src/types`: TypeScript definitions.

### Server (`/server`)
- `src/routes`: API route definitions.
- `src/handlers`: Request handlers (controller logic).
- `src/middleware`: Custom Express middleware (auth, validation, multer).
- `src/db`: Database schema definitions and seed scripts.
- `src/auth`: Passport.js configuration and strategies.
- `src/uploads`: Directory for stored product images.

## Building and Running

### Prerequisites
- Node.js (v16+)
- Docker and Docker Compose

### Infrastructure
Start the MySQL database using Docker:
```bash
docker compose -f docker-compose-only-db.yml up -d
```

### Backend Setup
1. Navigate to `server/`.
2. Install dependencies: `npm install`.
3. Configure environment: Copy `.env.example` to `.env` and set `DATABASE_URL`.
4. Database initialization:
   - `npm run db:generate` - Generate Drizzle migrations.
   - `npm run db:migrate` - Apply migrations to the database.
   - `npm run db:seed` - Seed the database with initial data.
5. Run development server: `npm run dev`.

### Frontend Setup
1. Navigate to `client/`.
2. Install dependencies: `npm install`.
3. Configure environment: Copy `.env.example` to `.env`.
4. Run development server: `npm run dev`.

## Development Conventions

- **State Management:** Use Zustand for global state. Avoid prop drilling where possible.
- **Styling:** Use Tailwind CSS 4. Tailwind is integrated via `@tailwindcss/vite`.
- **API Communication:** Use Axios for backend requests. Ensure `withCredentials: true` is set for session-based auth.
- **Database Schema:** All schema changes must be made in `server/src/db/` and synchronized using `drizzle-kit`.
- **Authentication:** Protected routes on the backend should use the `ensureAuthenticated` middleware.
- **Typing:** Strict TypeScript usage is encouraged across both client and server.
- **File Naming:** Use PascalCase for React components and camelCase for most other files.
