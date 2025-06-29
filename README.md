# Users API - Gaming Community (Node.js + Express + SQLite)

This is a REST API built with **Node.js**, **Express**, and **SQLite**, designed to manage user profiles in a gaming community. Each user can have a description, preferences, and a list of currently played games.

---

## Features

- Full CRUD for users:
  - Create, Read, Update, Delete
- Partial updates via `PATCH`
- `games` field stored as JSON (array) in the database
- Express middleware for JSON parsing
- Clean folder structure with controllers, routes, and models

---

## Project structure

backend/
│
├── controllers/ # Route logic (controllers)
├── models/ # Database queries
├── routes/ # API endpoints
├── db.js # SQLite connection and table creation
├── app.js # Express app configuration
├── index.js # Entry point
├── package.json
└── .gitignore

--- 

##  API Endpoints

| Method | Route         | Description                     |
|--------|---------------|---------------------------------|
| GET    | `/users`      | Get all users                   |
| GET    | `/users/:id`  | Get a user by ID                |
| POST   | `/users`      | Create a new user               |
| PATCH  | `/users/:id`  | Update part of a user profile   |
| DELETE | `/users/:id`  | Delete a user                   |

---

## Getting started

1. Clone the repository:  
git clone <repo-url>
cd backend

2. Install dependencies:
npm install

3. Start the server
npm run dev
**Requires nodemon as a dev dependency.**

4. Open http://localhost:3000/users or use Thunder Client to test the API.

--- 

## Notes
- The SQLite database (users.db) is automatically created when the server starts.
- The games field is stored as a JSON string in the database and parsed back to an array in responses.

## TODO (future improvements)
- Add authentication (JWT)
- Add validation rules
- Filter users by game
- Deployment (Render, Railway, etc.)