# Bandhan Matrimony & Matchmaking Platform

A modern, production-grade, full-stack Matrimonial web application built with **React 19**, **Tailwind CSS v4**, **Lucide Icons**, and a **Node.js/Express** REST API backend.

---

## 📋 Table of Contents
1. [Overview & Tech Stack](#overview--tech-stack)
2. [What Has Been Done So Far](#what-has-been-done-so-far)
3. [Project Directory Structure](#project-directory-structure)
4. [Terminal Commands & Setup Guide](#terminal-commands--setup-guide)
   - [Backend Setup & Run](#1-backend-setup--run)
   - [Frontend Setup & Run](#2-frontend-setup--run)
   - [Running Both Concurrently](#3-running-both-concurrently)
5. [Design System & Theme Tokens](#design-system--theme-tokens)
6. [Application State & Architecture](#application-state--architecture)
7. [Roadmap (Upcoming Phases)](#roadmap-upcoming-phases)

---

## 🌟 Overview & Tech Stack

### Frontend
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons**: Lucide React (`lucide-react`)
- **Typography**: Playfair Display (Serif) & Plus Jakarta Sans (Sans-serif)
- **Architecture**: Context API stateful routing, modular components, and glassmorphic UI

### Backend
- **Runtime**: Node.js (v22+)
- **Framework**: Express.js
- **Database**: PostgreSQL (`pg` pool) with `schema.sql`
- **Security & Auth**: JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `cors`, `dotenv`

---

## ✅ What Has Been Done So Far

### 1. Backend Initialization & Verification
- Checked directory structure and environment files.
- Created `Backend/.env` from `Backend/.env.example`.
- Installed backend dependencies (`express`, `pg`, `cors`, `dotenv`, `bcryptjs`, `jsonwebtoken`, `nodemon`).
- Started Express server on **Port 5000** and verified the root health check endpoint (`http://localhost:5000/`).

### 2. Frontend Project Scaffolding
- Initialized clean Vite + React client in the `frontend/` directory.
- Configured Vite with `@tailwindcss/vite` plugin and modern CSS entry (`@import "tailwindcss";`).
- Integrated Google Fonts (`Playfair Display` and `Plus Jakarta Sans`) with custom scrollbars and glassmorphic utility classes.

### 3. Implementation of Phase 1 (App Shell, Router & Landing Page)
- **Central State Manager (`AppContext.jsx`)**:
  - Stateful page switcher (`home`, `browse`, `connections`, `profile-builder`).
  - Search filter state synced with Home quick search.
  - Shortlisting engine (`shortlistedIds`) and interest tracker (`sentInterests`, `receivedInterests`, `acceptedConnections`).
  - Interactive toast feedback system (`Toast.jsx`).
- **Comprehensive Mock Dataset (`mockData.js`)**:
  - High-resolution portraits with detailed bios.
  - Vedic horoscope metrics (Rashi, Nakshatra, Manglik status, Guna Milan compatibility score).
  - Career, education, family background, and lifestyle habits.
- **Sticky Glassmorphic Navbar (`Navbar.jsx`)**:
  - Route navigation buttons with active states and badges.
  - Pending connection counter badge and shortlist quick icon.
  - "Upgrade Gold" badge and logged-in user profile capsule with completion progress bar.
  - Fully responsive mobile drawer menu.
- **Landing Page (`HomePage.jsx`)**:
  - **`HeroSection.jsx`**: Royal gradient hero with trust badges and dual CTAs.
  - **`QuickSearchCard.jsx`**: Interactive filter (Bride/Groom, Age range, Religion, Community, City) that preserves selections and navigates to the Browse page.
  - **`TrustStatsSection.jsx`**: 4 trust pillars (500,000+ Verified Matches, 98.4% Satisfaction Rate, 100% Privacy Shield, 18+ Years Legacy).
  - **`FeaturedProfilesSection.jsx`**: Verified card grid with match score badges, instant interest send buttons, and shortlist bookmark toggles.
  - **`HowItWorksSection.jsx`**: 3-step pathway (Profile Verification → Vedic & AI Alignment → Dignified Connection).
  - **`TestimonialsSection.jsx`**: Real wedding stories with photos and verification tags.
  - **`CallToActionSection.jsx`**: Royal invitation banner with free registration triggers.
- **Global Footer (`Footer.jsx`)**:
  - Security certifications (ISO 27001), quick links by community, trust guidelines, and VIP concierge callback request.
- **Build & Server Verification**:
  - Verified zero-error production build (`npm run build`).
  - Verified local dev server running on **Port 5173** (`http://localhost:5173/`).

---

## 📁 Project Directory Structure

```text
matrimony/
├── README.md
├── Backend/
│   ├── .env                    # Environment configuration
│   ├── .env.example            # Environment template
│   ├── db.js                   # PostgreSQL connection pool
│   ├── package.json            # Backend dependencies & scripts
│   ├── schema.sql              # Database schema tables
│   ├── server.js               # Express API entry point
│   └── routes/
│       ├── authRoutes.js       # Register & Login endpoints
│       ├── profileRoutes.js    # Profile management endpoints
│       └── interestRoutes.js   # Send/Accept interest endpoints
│
└── frontend/
    ├── index.html              # HTML shell with Google Fonts
    ├── package.json            # React 19 + Tailwind + Lucide dependencies
    ├── vite.config.js          # Vite config with @tailwindcss/vite
    ├── src/
    │   ├── App.jsx             # Main App shell & router switcher
    │   ├── main.jsx            # React root mount
    │   ├── index.css           # Tailwind v4 import & glassmorphic styles
    │   ├── context/
    │   │   └── AppContext.jsx  # Global state (routes, filters, interests, toasts)
    │   ├── data/
    │   │   └── mockData.js     # Curated matrimonial profile datasets
    │   ├── components/
    │   │   ├── common/
    │   │   │   └── Toast.jsx   # Micro-interaction feedback alert
    │   │   ├── layout/
    │   │   │   ├── Navbar.jsx  # Sticky top header & navigation drawer
    │   │   │   └── Footer.jsx  # Royal footer with trust badges & links
    │   │   └── home/
    │   │       ├── HeroSection.jsx
    │       │   ├── QuickSearchCard.jsx
    │       │   ├── TrustStatsSection.jsx
    │       │   ├── FeaturedProfilesSection.jsx
    │       │   ├── HowItWorksSection.jsx
    │       │   ├── TestimonialsSection.jsx
    │       │   └── CallToActionSection.jsx
    │   └── pages/
    │       ├── HomePage.jsx
    │       ├── BrowsePage.jsx          # Shell for Phase 2
    │       ├── ConnectionsPage.jsx     # Shell for Phase 4
    │       └── ProfileBuilderPage.jsx  # Shell for Profile Settings
```

---

## 💻 Terminal Commands & Setup Guide

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended, tested on v22.19.0)
- **npm** (v9.0.0 or higher, tested on v10.9.3)
- **PostgreSQL** (optional for mock frontend, required for database backend routes)

---

### 1. Backend Setup & Run

Open a terminal in the root directory:

```bash
# 1. Navigate to the Backend folder
cd Backend

# 2. Create the .env configuration file (if not already present)
# Windows PowerShell:
Copy-Item .env.example .env
# Or Linux / macOS:
cp .env.example .env

# 3. Install backend dependencies
npm install

# 4. Start the backend server (starts on http://localhost:5000)
npm start

# Or start in development mode with auto-reload (requires nodemon):
npm run dev
```

#### Backend Health Check
To test that the backend is running properly:
```bash
# Windows PowerShell:
Invoke-RestMethod -Uri http://localhost:5000/

# Or cURL:
curl http://localhost:5000/
```
Expected response:
```json
{
  "message": "Welcome to Matrimoney API"
}
```

---

### 2. Frontend Setup & Run

Open a new terminal window in the root directory:

```bash
# 1. Navigate to the frontend folder
cd frontend

# 2. Install dependencies (React 19, Tailwind CSS v4, Lucide Icons)
npm install

# 3. (Optional) Run production build check to ensure 0 errors
npm run build

# 4. Start the Vite development server
npm run dev -- --port 5173
```

Now open your browser and navigate to:
**[http://localhost:5173/](http://localhost:5173/)**

---

### 3. Running Both Concurrently

For convenience, you can run the backend and frontend in separate terminals:

| Service | Port | Local URL | Command |
| :--- | :--- | :--- | :--- |
| **Backend API** | `5000` | `http://localhost:5000` | `cd Backend && npm start` |
| **Frontend Web** | `5173` | `http://localhost:5173` | `cd frontend && npm run dev` |

---

## 🎨 Design System & Theme Tokens

| Token | Hex / Class | Purpose |
| :--- | :--- | :--- |
| **Primary Accent** | `#E11D48` (`rose-600`) | Primary CTA buttons, brand logo, active navigation, heart icons |
| **Deep Burgundy** | `#9F1239` (`rose-800`), `#881337` (`rose-900`) | Royal Hero accents, Dark CTA banners, luxury accents |
| **Warm Gold** | `#D97706` (`amber-600`), `#F59E0B` (`amber-500`) | "Royal Member" badges, Guna Milan compatibility stars, verification seals |
| **Off-White Surface** | `#FAFAFA`, `#FFFFFF` | Clean background canvas, card surfaces |
| **Charcoal Text** | `#111827` (`gray-900`), `#374151` (`gray-700`) | High-contrast typography and readability |
| **Glassmorphism** | `backdrop-blur-md bg-white/90 border border-rose-100/80` | Sticky navigation bar, floating filter containers, toasts |

---

## 🔄 Roadmap (Upcoming Phases)

- [x] **Phase 1: App Shell, Sticky Navigation, Design System & Landing Page**
- [ ] **Phase 2: Browse / Search Results Page**
  - Advanced multi-criteria sidebar filters (Age slider, Religion, Caste, Location, Education, Verified Only)
  - Search grid with Match Score badges & sorting (Compatibility, Age, Recently Joined)
- [ ] **Phase 3: Detailed Profile View & Modal System**
  - Multi-photo carousel viewer
  - Tabbed breakdown: About Me, Family Background, Lifestyle & Diet, 36-point Horoscope Kundli Milan
- [ ] **Phase 4: Connections & Real-time Chat**
  - Tabbed manager: Pending Interests, Accepted Connections, Sent Requests
  - WhatsApp-style real-time messaging interface with read receipts
- [ ] **Phase 5: Profile Builder / Settings Multi-step Form**
  - Multi-step wizard for personal details, career info, and partner criteria
