# Service Request Board

A full-stack web application built for the GlobalTNA Full-Stack Developer Intern Technical Assessment. The application allows users to create and manage service requests such as plumbing, electrical, painting, and other household services.


**Live Demo**
- Live Demo: https://service-request-board-oc1a3yxyx-kavindusubhash28s-projects.vercel.app/


---

# Tech Stack

## Frontend
- Next.js (App Router)
- Tailwind CSS
- Axios

## Backend
- Node.js
- Express.js

## Database
- MongoDB Atlas
- Mongoose

## Authentication
- JWT Authentication
- bcryptjs

---

# Features

- Browse all service requests on a home page with category filter and keyword search
- Create a new service request with full form validation
- View full job details on a dedicated detail page
- Update job status (Open → In Progress → Closed)
- Delete a job request
- JWT-based authentication — only logged-in users can post or delete jobs
- Responsive, clean UI built with Next.js

---

# Project Structure

```bash
service-request-board/
│
├── frontend/
│
├── backend/
│
└── README.md
```

---

# Backend Setup

## 1. Navigate to backend folder

```bash
cd backend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Create `.env` file

Inside the `backend` folder create a `.env` file.

Example:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

## 4. Run backend server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

## 1. Navigate to frontend folder

```bash
cd frontend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Create `.env.local`

Inside the `frontend` folder create:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 4. Run frontend

Development mode:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# Environment Variables

## Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `PORT` | Backend server port |
| `JWT_SECRET` | Secret key for JWT authentication |

---

## Frontend (`frontend/.env.local`)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API URL |

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |

---

## Jobs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | Get all jobs |
| GET | `/api/jobs/:id` | Get single job |
| POST | `/api/jobs` | Create new job |
| PATCH | `/api/jobs/:id` | Update job status |
| DELETE | `/api/jobs/:id` | Delete job |

---

# Authentication Flow

1. User registers using the register page
2. User logs in using the login page
3. Backend generates JWT token
4. Token is stored in localStorage
5. Axios interceptor automatically sends token
6. Protected routes require authentication

---

# Run Instructions

## Start Backend

```bash
cd backend
npm run dev
```

## Start Frontend

```bash
cd frontend
npm run dev
```

---

# Deployment

- Frontend: Vercel
- Backend: Render

---

# Author

Kavindu Rajapaksha

GlobalTNA Full-Stack Developer Intern Technical Assessment
