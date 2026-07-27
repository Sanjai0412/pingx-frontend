# PingX - Frontend Client

PingX is a modern Twitter/X-inspired web client built with **React 18**, **Vite**, and **Vanilla CSS**. It delivers a sleek, responsive user experience with activity-based feeds, infinite scrolling, real-time notifications, profile management, and secure token handling.

---

## Live Deployments

| Service | Platform | URL / Base Endpoint |
| :--- | :--- | :--- |
| **Frontend Web App** | Vercel | [pingx-sanjaii04.vercel.app](https://pingx-sanjaii04.vercel.app) |

### Connected Backend Services
- **Backend API Service (Railway):** [https://pingx-backend-production.up.railway.app](https://pingx-backend-production.up.railway.app)
- **Auth Microservice (Railway):** [https://auth-service-production-4ccd.up.railway.app](https://auth-service-production-4ccd.up.railway.app)

---

## Features

### Authentication & Session Management
- **In-Memory Access Tokens:** Access tokens stored strictly in memory (no `localStorage` vulnerability).
- **Silent Token Refresh:** Automatic token renewal on `401/403` responses via Axios interceptors using HttpOnly refresh cookies.
- **Protected Routes:** Context-driven route guarding (`PrivateRoute` & `PublicRoute`).
- **OTP Verification & Setup:** Step-by-step registration flow, OTP verification, and initial profile setup wizard.

### Responsive Mobile & Desktop Layout
- **Desktop View:** Three-column layout featuring sticky sidebar navigation, main content feed, and right sidebar (Search & Suggested Users).
- **Mobile View (Instagram-style):** Fixed bottom navigation bar with top brand header, plus a mobile profile popup modal for profile navigation and logout.

### Activity Feed & Infinite Scrolling
- Activity-based feed rendering original tweets, reposts, and quote tweets ordered by activity timestamp.
- **Infinite Scrolling:** Performance-optimized `IntersectionObserver` pagination (`useInfiniteScroll` & `usePaginatedFeed` custom hooks).
- Centralized `InfiniteScrollFooter` for bottom loading spinners and end-of-feed indicators.

### Tweet & Social System
- **Tweet Creation:** Media & text publishing with character limit feedback.
- **Interactions:** Like / Unlike, Retweet / Undo Retweet, and Quote Tweet modals.
- **Recursive Quoted Tweet Rendering:** Render nested quote cards up to depth limits.
- **Comments / Replies:** View parent tweet detail page with full reply history thread.

### Real-time Notifications
- Dedicated Notification page (`/notifications`) with unread notification counter badge.
- Event support for Follows, Likes, Retweets, Quotes, and Replies.
- One-click "Mark all as read" functionality (`NotificationContext`).

### Profile & User System
- Public profile pages (`/profile/:username`) displaying bio, avatar, joining date, followers/following counts, and user post timelines.
- Real-time follow / unfollow toggle actions (`useFollow`).
- Real-time user search bar with instant follow/unfollow capability.
- Suggested users recommendations list.

---

## Technology Stack

- **Core:** React 18, Vite
- **Routing:** React Router DOM (v6)
- **HTTP Client:** Axios with custom request/response interceptors
- **Styling:** Vanilla CSS (CSS Variables, Flexbox, Grid, Media Queries)
- **State Management:** React Context API (`AuthProvider`, `NotificationProvider`)
- **Icons:** Custom SVG Icon library (`Icons.jsx`)

---

## Architecture & Structure

```text
pingx-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── comment/         # Comment components & threads
│   │   ├── common/          # Reusable UI (InfiniteScrollFooter, etc.)
│   │   ├── feed/            # FeedList, FeedItem, TweetCard, Actions
│   │   ├── notification/    # Notification item & list views
│   │   ├── search/          # SearchBar & SearchResults
│   │   ├── sidebar/         # Sidebar navigation & Mobile modal
│   │   └── tweet/           # TweetForm, RetweetPopup, QuotedCard
│   ├── context/             # AuthContext, NotificationContext
│   ├── hooks/               # useAuth, useFollow, useInfiniteScroll, usePaginatedFeed
│   ├── layout/              # MainLayout & responsive styles
│   ├── pages/               # Home, Profile, Login, Register, OtpVerification, Notifications
│   ├── services/            # authService, feedService, tweetService, userService, notificationService
│   ├── utils/               # axiosConfig, dateFormatter
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
└── vite.config.js
```

---

## Local Development Setup

### 1. Prerequisites
- Node.js 18+
- npm or yarn

### 2. Environment Variables (`.env`)
Create a `.env` file in the project root:

```env
# Backend API Service URL
VITE_BACKEND_API_URL=http://localhost:8080/api

# Auth Service URL
VITE_AUTH_API_URL=http://localhost:3000/auth
```

### 3. Installation & Run
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend application will be running at `http://localhost:5173`.

---

## Production Build & Deployment

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Deploying to Vercel
1. Import your `pingx-frontend` repository in Vercel.
2. Set Environment Variables in Vercel settings:
   * `VITE_BACKEND_API_URL`: `https://your-backend.up.railway.app/api`
   * `VITE_AUTH_API_URL`: `https://your-auth-service.up.railway.app/auth`
3. Click **Deploy**.
