# SmartCard (Frontend)

SmartCard is a React flashcard UI for studying JavaScript, React, and Express topics. It provides category browsing, card creation, search, card flipping, and delete/edit actions through a local backend API.

## Project Description

This frontend is responsible for:

- rendering study cards by category
- handling card creation form input and submission
- searching cards by text
- flipping cards to reveal answers
- triggering delete and edit API actions

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
  - `POST /cards` (create card)
  - `DELETE /cards/delete/:id` (delete card)
- User/auth screens are scaffolded in the frontend and align with backend `/users` routes that are being built out.

## Current Status

- Intended to run locally with the backend.
- Core create/read/search/delete flows are active.
- Auth and full edit flow integration are in progress.
