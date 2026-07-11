# PingX - Frontend Client

PingX is a high-performance, responsive, and minimalist microblogging web client built with **React**, **Vite**, and modular **CSS**. It features an elegant, high-contrast monochrome design system with unified alignment grids and responsive collapsing layouts.

---

## Key Features

*  **Unified Layout Grid**: Centered 3-column architecture (Left Sidebar, Middle Feed, Right Sidebar) that sits side-by-side with zero margin gaps and collapses fluidly down to 1-column mobile layouts.
* **Sleek Sidebar Navigation**: Sticky vertical panel with vector SVG icons, active status highlights, and a user profile status card with initials-based fallback avatars.
* **Side-by-Side Post Creation**: Standard-aligned input forms that place active user avatar column alongside the text box, featuring character limit counts and disabled submission states.
* **Dynamic Tweet Cards**: Interactive, lightweight posts with unified 16px alignments and customized hover behavior:
  * **Comment**: Highlighted in light blue.
  * **Retweet**: Highlighted in light green.
  * **Like**: Toggleable filled hearts highlighted in pink-rose.
* **Modern Profile Page**: Twitter-style profiles featuring a cover banner, floating overlapping profile photo cutout, bio description, follow/following metrics, sticky navigation headers, and tab navigation ("Posts", "Replies", "Likes").
* **Search Directory**: Real-time user lookup lists featuring instant inline follow/unfollow triggers.
* **Adaptive Monochrome Branding**: A custom theme-adaptive monochrome SVG favicon (`favicon.svg`) that changes color automatically based on OS dark/light mode preferences.
* **Secure Session Handling**: Centralized Axios client handling public/private route validation and resolving page-reload redirect loops on unauthenticated access.

---

## Technology Stack

* **Frontend Framework**: [React (v18+)](https://react.dev/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Router**: [React Router DOM (v6)](https://reactrouter.com/)
* **Styling**: Vanilla CSS (Modular design system using root variables)
* **HTTP Client**: [Axios](https://axios-http.com/)
* **Icons**: Inline SVG Components

---

## Project Structure

```text
pingx-frontend/
├── public/                 # Static assets (Favicons, SVG graphics)
├── src/
│   ├── components/         # Reusable widgets (TweetCard, TweetForm, Sidebar, UserList)
│   ├── hooks/              # Custom React hooks (useAuth, useFollow)
│   ├── layout/             # Application shell wrappers (MainLayout)
│   ├── pages/              # Routed page entrypoints (Home, Profile, Search)
│   ├── providers/          # Context Providers (AuthContextProvider)
│   ├── routes/             # Client-side router declarations (AppRouter, PublicRoute)
│   ├── services/           # Backend API call clients (tweetService, userService)
│   ├── utils/              # Helper utilities (axiosConfig)
│   ├── App.jsx             # Main Application mount
│   ├── index.css           # Global typography, color schemes, and theme definitions
│   └── main.jsx            # Application bootstrap entrypoint
├── index.html              # Document entrypoint
└── vite.config.js          # Vite bundler configurations
```

---

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_AUTH_BASE_URL=http://localhost:3000/auth
```

### 3. Run Development Server
```bash
npm run dev
```
The application will run locally at `http://localhost:5173`.
