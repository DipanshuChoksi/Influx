# Influx Client

The frontend of the **Influx** media platform, built with Next.js, React, and Tailwind CSS.

---

## Frontend Architecture

The client is built using the **Next.js App Router** architecture, focusing on a clean separation of concerns:

- **App Router**: Folder-based routing with support for layouts, loading states, and error boundaries.
- **Client Components**: Interactive UI elements (e.g., Auth forms, video players).
- **Server Actions**: Located in `app/actions/`, these handle form submissions and communicate with the backend.
- **UI Components**: Atomic UI components stored in `app/components/ui/`.
- **Utilities**: Centralized API handlers and helper functions in `app/utils/`.

---

## Environment Variables

The client uses environment variables for configuration. Create a `.env` file in the `client/` directory.

| Variable | Required | Description | Example |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | ✅ | Base URL for the backend API | `http://localhost:5000/api/` |

> Note: Currently, the API URL is also configured in `app/consts/global.ts`.

---

## Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server on `http://localhost:3000` |
| `npm run build` | Creates an optimized production build |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint to check for code quality issues |

---

## Routing

The project follows the Next.js file-system based routing:

| Route | Description |
| :--- | :--- |
| `/` | Landing / Authentication page (Redirects to `/home` if already logged in) |
| `/home` | Main dashboard with media highlights |
| `/movies` | Browse and watch movies |
| `/tv-shows` | Browse and watch TV shows |
| `/watch-parties` | Create or join synchronized watch rooms |
| `/global-chat` | Server-wide real-time chat |
| `/profile` | User settings and profile management |

---

## State Management

The client is prepared for scalable state management using **Zustand**:

- **Local State**: Used for simple component-level interactions via React `useState`.
- **Global Store**: Zustand is integrated for managing shared state like user sessions, chat messages, and room synchronization (located in `app/lib/store/` - *to be implemented*).
- **Form State**: Managed using Next.js `useFormState` for seamless server action integration.

---

## API Integration

API communication is centralized using **Axios**:

- **Axios Instance**: Configured with `withCredentials: true` to handle JWT cookies automatically.
- **Base Helpers**: `app/utils/api.ts` provides `postRequest` and `getRequest` wrappers with built-in error logging.
- **Endpoints**: Defined relative to the `API_BASE_URL` constant.

Example usage in an action:
```typescript
const response = await postRequest("auth/login", credentials);
```

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **State**: Zustand
- **Validation**: Zod (via `app/lib/definitions.tsx`)
- **Video Player**: Plyr
- **HTTP Client**: Axios
