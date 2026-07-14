# PingX - Frontend Client

PingX is a modern Twitter/X-inspired social media client built with **React**, **Vite**, and **Vanilla CSS**. It delivers a responsive and modular user experience with activity-based feeds, tweet interactions, user profiles, comments, and secure authentication.

---

# Features

## Authentication

- JWT-based authentication
- Protected routes
- Persistent login sessions
- Automatic token handling with Axios interceptors

---

## Home Feed

- Activity-based timeline
- Original tweets
- Reposts
- Quote tweets
- Real-time tweet creation
- Responsive feed layout

---

## Tweet System

- Create tweets
- Delete tweets
- Like / Unlike tweets
- Repost / Undo repost
- Quote tweets
- Tweet detail page
- Nested quoted tweet rendering

---

## Comments

- View tweet comments
- Create comments
- Dedicated tweet detail page
- Reply-ready architecture (v1)

---

## User Profiles

- View user profiles
- Profile banner
- Profile avatar
- Bio
- Followers / Following counts
- User tweet timeline
- Follow / Unfollow users

---

## Search

- User search
- Follow / Unfollow directly from search
- Real-time search results

---

## UI & UX

- Responsive three-column layout
- Sticky sidebar navigation
- Reusable TweetCard architecture
- FeedItem architecture for activity rendering
- Monochrome design system
- SVG icon components
- Avatar fallbacks
- Hover animations
- Loading states

---

# Technology Stack

- React 18
- Vite
- React Router DOM
- Axios
- Vanilla CSS
- Context API

---

# Architecture

The frontend follows a component-driven architecture.

```text
Home
│
├── TweetForm
│
└── FeedList
      │
      └── FeedItem
             │
             └── TweetCard
                    │
                    ├── TweetHeader
                    ├── TweetBody
                    └── TweetActions
```

---

# Project Structure

```text
pingx-frontend/
├── public/
├── src/
│
├── components/
│   ├── comment/
│   ├── feed/
│   ├── profile/
│   ├── search/
│   ├── sidebar/
│   └── tweet/
│
├── hooks/
├── layout/
├── pages/
├── providers/
├── routes/
├── services/
├── utils/
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# Local Development

## Install

```bash
npm install
```

---

## Environment Variables

Create a `.env` file.

```env
API_BASE_URL=http://localhost:8080/api
AUTH_BASE_URL=http://localhost:3000/auth
```

---

## Run

```bash
npm run dev
```

The application starts at

```
http://localhost:5173
```

---

# Current Features

- JWT Authentication
- Protected Routes
- Activity Feed
- Tweet Creation
- Tweet Details
- Like / Unlike
- Reposts
- Quote Tweets
- Recursive Quote Rendering
- Comments (v1)
- User Profiles
- User Tweet Timeline
- Follow / Unfollow
- User Search
- Responsive Layout

---

# Planned Features

- Comment Replies
- Infinite Scrolling
- Notifications
- Bookmarks
- Profile Tabs (Posts, Replies, Media, Likes)
- Trending Section
- Direct Messaging
