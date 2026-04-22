# Influx Server

Backend API service for the **Influx** media platform, built with Express.js, TypeScript, and MongoDB.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Architecture](#api-architecture)
- [Database](#database)
- [Authentication](#authentication)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Getting Started](#getting-started)
- [Deployment](#deployment)

---

## Tech Stack

| Layer            | Technology                          |
| ---------------- | ----------------------------------- |
| Runtime          | Node.js                             |
| Language         | TypeScript (ES6, strict mode)       |
| Framework        | Express.js v4                       |
| Database         | MongoDB Atlas (Mongoose v8 ODM)     |
| Authentication   | JWT (`jsonwebtoken`) + HTTP Cookies |
| Password Hashing | bcrypt                              |
| Logging          | Bunyan                              |
| Linting          | ESLint + Prettier                   |
| Dev Tooling      | Nodemon, ts-node, tsconfig-paths    |

---

## Project Structure

```
server/
├── src/
│   ├── index.ts                 # Entry point — boots HTTP server & DB
│   ├── controllers/             # Request handlers (business logic)
│   │   ├── auth/index.ts        # Login, Signup, Logout
│   │   ├── users/index.ts       # Get authenticated user
│   │   └── test/index.ts        # Health-check controller
│   ├── routes/                  # Express routers
│   │   ├── auth/index.ts        # /api/auth/*
│   │   └── users/index.ts       # /api/users/* (protected)
│   ├── middlewares/
│   │   └── auth.ts              # JWT cookie verification middleware
│   ├── models/
│   │   └── users/index.ts       # Mongoose User schema
│   ├── modules/
│   │   ├── app.module.ts        # Express app factory (middleware, routes, error handling)
│   │   └── db.module.ts         # MongoDB connection with auto-retry
│   ├── shared/
│   │   ├── error/               # Custom error classes & centralized handler
│   │   │   ├── base.error.ts    # BaseError (operational vs programmer errors)
│   │   │   ├── api.error.ts     # ApiError extends BaseError
│   │   │   └── handler.error.ts # ErrorHandler (logging, trust checks)
│   │   └── logger.shared.ts     # Bunyan logger instance
│   ├── utils/
│   │   └── auth/index.ts        # generateToken / verifyToken helpers
│   ├── env/
│   │   └── index.ts             # Type-safe env variable accessor
│   └── types/
│       ├── env.types.ts         # NodeEnv interface
│       └── http.types.ts        # HttpStatusCode enum
├── .env                         # Environment variables (not committed)
├── .eslintrc.json               # ESLint configuration
├── .prettierrc                  # Prettier configuration
├── nodemon.json                 # Nodemon watch config
├── tsconfig.json                # TypeScript compiler options
├── package.json
└── LICENSE                      # MIT
```

---

## API Architecture

The server follows a **layered MVC-style architecture**:

```
Request → Routes → [Middleware] → Controllers → Models → Response
```

### Route Map

| Method | Endpoint           | Auth Required | Controller          | Description                   |
| ------ | ------------------ | ------------- | ------------------- | ----------------------------- |
| `GET`  | `/test`            | ❌            | `TestController`    | Health check                  |
| `POST` | `/api/auth/login`  | ❌            | `LoginController`   | Authenticate & set JWT cookie |
| `POST` | `/api/auth/signup` | ❌            | `SignupController`  | Register a new user           |
| `POST` | `/api/auth/logout` | ❌            | `LogoutController`  | Clear JWT cookie              |
| `GET`  | `/api/users/`      | ✅            | `GetUserController` | Fetch authenticated user      |

### Middleware Stack

Applied globally via `app.module.ts`:

1. **CORS** — Configured with explicit origins and `credentials: true`
2. **Compression** — Gzip response compression
3. **Body Parsing** — `express.json()` + `urlencoded`
4. **Cookie Parser** — Parses `Cookie` header for JWT extraction
5. **Error Middleware** — Centralized operational error handling

### Error Handling

The server uses a custom error hierarchy:

- **`BaseError`** — Root error class with `httpCode`, `isOperational` flag, and method tracing
- **`ApiError`** — Extends `BaseError` for API-specific errors (400s, 404s, etc.)
- **`ErrorHandler`** — Centralized handler that logs via Bunyan and distinguishes trusted (operational) errors from programmer bugs

Unhandled exceptions and rejections are caught at the process level and trigger graceful shutdown for non-operational errors.

---

## Database

### Engine

**MongoDB Atlas** via Mongoose v8 ODM.

### Connection

Handled in `src/modules/db.module.ts`:

- Connects using the `MONGO_DB_URI` environment variable
- `autoIndex: true` for automatic index creation
- **Auto-retry** — On connection failure, retries every 5 seconds

### Schema: `Users`

| Field       | Type     | Constraints       |
| ----------- | -------- | ----------------- |
| `name`      | `String` | Required          |
| `email`     | `String` | Required, Unique  |
| `password`  | `String` | Required (hashed) |
| `createdAt` | `Date`   | Auto (timestamps) |
| `updatedAt` | `Date`   | Auto (timestamps) |

---

## Authentication

### Flow

```
┌──────────┐    POST /api/auth/signup     ┌──────────┐
│  Client  │ ──────────────────────────▶  │  Server  │  → Hash password → Save to DB
└──────────┘                              └──────────┘

┌──────────┐    POST /api/auth/login      ┌──────────┐
│  Client  │ ──────────────────────────▶  │  Server  │  → Verify password
└──────────┘                              └──────────┘  → Generate JWT
                                                        → Set httpOnly cookie
                 ◀── Set-Cookie: token=<jwt> ──

┌──────────┐    GET /api/users/           ┌──────────┐
│  Client  │ ──────────────────────────▶  │  Server  │  → Extract token from cookie
└──────────┘  (Cookie sent automatically) └──────────┘  → Verify JWT → Attach user to req
                                                        → Return user data
```

### JWT Details

| Property  | Value                         |
| --------- | ----------------------------- |
| Algorithm | HS256 (default)               |
| Expiry    | 7 days                        |
| Payload   | `{ _id: <user_mongo_id> }`    |
| Secret    | `JWT_SECRET` env variable     |
| Storage   | `httpOnly` cookie (not in JS) |

### Cookie Configuration

| Property   | Value         |
| ---------- | ------------- |
| `httpOnly` | `true`        |
| `secure`   | `false` (dev) |
| `sameSite` | `lax`         |
| `maxAge`   | 7 days        |

### Auth Middleware (`src/middlewares/auth.ts`)

- Extracts `token` from `req.cookies`
- Verifies with `jsonwebtoken`
- Attaches decoded payload to `req.user`
- Returns `401 Unauthorized` for missing, invalid, or expired tokens
- Clears the cookie on auth failure

---

## Environment Variables

Create a `.env` file in the server root. All variables are typed via `src/types/env.types.ts`.

| Variable       | Type     | Required | Description                           | Example                           |
| -------------- | -------- | -------- | ------------------------------------- | --------------------------------- |
| `PORT`         | `number` | ✅       | Port the server listens on            | `5000`                            |
| `MONGO_DB_URI` | `string` | ✅       | MongoDB Atlas connection string       | `mongodb+srv://user:pass@host/db` |
| `NODE_ENV`     | `string` | ✅       | Environment mode                      | `development` or `production`     |
| `JWT_SECRET`   | `string` | ✅       | Secret key for signing/verifying JWTs | `your-secret-key`                 |

### `.env` Example

```env
PORT=5000
MONGO_DB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>
NODE_ENV=development
JWT_SECRET=your-secure-secret-key
```

---

## Scripts

| Command                 | Description                                            |
| ----------------------- | ------------------------------------------------------ |
| `npm run dev`           | Start dev server with `ts-node` (single run)           |
| `npm run start:nodemon` | Start dev server with Nodemon (auto-restart on change) |
| `npm run build`         | Clean `dist/` and compile TypeScript to JavaScript     |
| `npm run start:prod`    | Build and start production server from `dist/`         |
| `npm run format:check`  | Check code formatting with Prettier                    |
| `npm run format:write`  | Auto-fix code formatting with Prettier                 |
| `npm run lint:check`    | Run ESLint checks                                      |
| `npm run lint:fix`      | Auto-fix ESLint issues                                 |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A **MongoDB Atlas** cluster (or local MongoDB instance)

### Installation

```bash
# 1. Navigate to the server directory
cd server

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
# Edit .env with your values

# 4. Start the development server
npm run start:nodemon
```

The server will start on `http://localhost:5000/`.

### Verify

```bash
curl http://localhost:5000/test
# → { "success": true, "message": "API is working" }
```

---

## Deployment

### Build for Production

```bash
npm run build
```

This compiles TypeScript from `src/` to JavaScript in `dist/` using the `tsconfig.json` configuration (target: ES6, module: CommonJS).

### Run Production Build

```bash
npm run start:prod
```

This runs `npm run build` followed by `node ./dist/index.js`.
