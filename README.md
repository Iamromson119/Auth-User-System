# Authentication System (Full Stack)

A user authentication system built using Node.js, Express, MongoDB, bcrypt and JWT.

## Features
- User registration with duplicate email checking
- Secure password hashing with bcrypt
- JWT based login, tokens expire after 7 days
- A protected /profile route that only responds with a valid token
- React frontend with login, register and a logged-in dashboard view

## Tech Stack
- Frontend: React (Vite)
- Backend: Node.js, Express
- Database: MongoDB
- Security: bcrypt, JWT

## How to Run

Make sure MongoDB is running locally on the default port (27017).

### Backend
```bash
npm install
cp .env.example .env
node server.js
```
Runs on http://localhost:5000

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Opens on http://localhost:5173
