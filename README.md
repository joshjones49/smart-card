# SmartCard (Frontend)

SmartCard is a React flashcard UI for studying JavaScript, React, and Express topics. It supports category browsing, search, card flipping, authentication, role-based UI permissions, and profile views backed by a local API.

## Project Description

This frontend is responsible for:

- rendering study cards by category
- searching cards by text
- flipping cards to reveal answers
- handling login/register/logout flows
- conditionally showing UI actions by role
- showing user profile details and user-owned cards by category

The app is designed for local full-stack development with `smart-card-be`.

## Skills / Technologies Used

- **React 18** with **Hooks** and **Context API** for shared app state
- **React Router** for page-based navigation
- **Vite** for development server and production builds
- **JavaScript (ES Modules)** for app logic
- **Fetch API** for HTTP communication with the backend
- **react-hot-toast** for user feedback notifications
- **react-icons** for UI iconography
- **ESLint** for linting and consistency

## Setup

### Prerequisites

- Node.js (LTS recommended)
- npm
- Backend API running from `smart-card-be` on `http://localhost:8000`
- Backend migration applied so role/ownership columns exist

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

Frontend runs with Vite (typically at `http://localhost:5173`).

## Available Scripts

- `npm run dev` - start frontend dev server
- `npm run build` - create production build
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint checks

## How It Connects To `smart-card-be`

- Base API URL is currently hardcoded as `http://localhost:8000` in the frontend context provider.
- Card operations call backend routes under `/cards`.
- Main frontend calls include:
  - `GET /cards` (load all cards)
  - `GET /cards/:search` (search cards)
  - `POST /cards` (create card, auth required)
  - `DELETE /cards/delete/:id` (delete card, owner/admin only)
  - `PUT /cards/edit/:id` (edit card, owner/admin only)
- User/auth calls include:
  - `POST /users/register`
  - `POST /users/login`
  - `GET /users/me` (auth required)
  - `GET /users/me/cards` (auth required)

## Role-Based Behavior (UI)

- `guest` (not logged in): can browse and search cards
- `user` (logged in): guest permissions + can create cards + can edit/delete own cards
- `admin` (logged in): full access to card mutations
- Navbar behavior:
  - `Create` link appears only for `user`/`admin`
  - `Go to Profile` appears only for logged-in users

## Current Status

- Intended to run locally with the backend.
- Auth-aware UI and role-based navbar/profile are active.
- Protected card mutations require valid backend auth and migrated DB schema.
