# ArtisanConnect — Frontend Prototype

A modern, mobile-first React frontend prototype for a platform that connects customers with skilled artisans (plumbers, electricians, tailors, carpenters, welders, etc.).

> **University Software Engineering Project** — Frontend only. No backend or database.

---

## Project Structure

```
artisanconnect/
├── public/
│   └── index.html              # HTML entry point (loads Poppins font)
├── src/
│   ├── App.jsx                 # Root component — page routing + state
│   ├── index.js                # React DOM entry point
│   ├── style.css               # Global styles, CSS variables, utilities
│   │
│   ├── data/
│   │   └── artisans.js         # Sample JSON data (8 artisans + 8 categories)
│   │
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky nav with mobile hamburger menu
│   │   ├── Navbar.css
│   │   ├── SearchBar.jsx       # Reusable search input with clear button
│   │   ├── SearchBar.css
│   │   ├── ArtisanCard.jsx     # Vertical card (Home) + Horizontal card (Search)
│   │   ├── ArtisanCard.css
│   │   ├── ReviewCard.jsx      # Star rating + reviewer name + comment
│   │   ├── ReviewCard.css
│   │   └── BookingModal.jsx    # Booking form modal (date, service, message)
│   │
│   └── pages/
│       ├── Home.jsx            # Landing page
│       ├── Home.css
│       ├── Search.jsx          # Search & filter artisans
│       ├── Search.css
│       ├── Profile.jsx         # Detailed artisan profile
│       └── Profile.css
└── package.json
```

---

## Pages & Features

### 1. Home Page (`Home.jsx`)
- **Navbar** — Logo, Home, Find Artisans, Login, Sign Up
- **Hero section** — Headline, description, search bar, quick-category tags, floating stats cards
- **Stats bar** — 200+ artisans, 8 categories, 1,200+ jobs done
- **Popular Categories** — 8 image cards (Plumbing, Electrical, Carpentry, Tailoring, Welding, Painting, Masonry, Mechanics)
- **Featured Artisans** — 4 vertical artisan cards with real photos
- **How It Works** — 4-step process guide
- **CTA Banner** — Artisan registration prompt
- **Footer** — Links, copyright

### 2. Search Page (`Search.jsx`)
- Search bar with live filtering
- Filter dropdowns: **Skill**, **Location**, **Availability**, **Minimum Rating**
- Clear filters button
- Results count display
- Horizontal artisan cards with **View Profile** and **Send Booking Request** buttons

### 3. Profile Page (`Profile.jsx`)
- Cover photo with back button
- Profile avatar with availability badge
- Name, skill tag, experience, location, rating, hourly rate
- **Call** and **Book Service** action buttons
- Stats row (years exp, rating, review count)
- Bio / About section
- Contact info panel
- **Portfolio grid** — 4 real work photos with captions
- **Reviews section** — Star ratings, reviewer names, dates, comments

### 4. Booking Modal (`BookingModal.jsx`)
- Artisan info strip (photo, name, skill)
- Date picker (min = today)
- Service type selector
- Message textarea
- Form validation (date required)
- Success confirmation message

### 5. Reviews (`ReviewCard.jsx`)
- Star rating display (filled/empty SVG stars)
- Reviewer initials avatar
- Name, date, comment text

---

## Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Install & Run

```bash
# 1. Go into the project folder
cd artisanconnect

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

The app opens at **http://localhost:3000**

### Build for Production

```bash
npm run build
```

---

## Technologies Used

| Technology | Purpose |
|------------|---------|
| React 18   | UI component framework |
| CSS3       | Styling (no Tailwind, no Bootstrap) |
| Poppins    | Font (Google Fonts) |
| Unsplash   | Real placeholder images |

**No backend. No database. No extra libraries.**

---

## Design Principles

- **Mobile-first** — responsive grid, hamburger menu, stacked layouts on small screens
- **Accessible** — semantic HTML, alt text on all images, keyboard-navigable
- **Clean & Modern** — green primary color palette, Poppins font, subtle shadows
- **Beginner-friendly code** — no complex hooks, no context API, simple prop passing

---

## Sample Data

All artisan data is in `src/data/artisans.js`. Each artisan has:
- `id`, `name`, `skill`, `location`, `experience`, `rating`, `reviewCount`
- `available` (boolean), `hourlyRate`, `phone`, `bio`
- `photo` — Unsplash portrait URL
- `coverPhoto` — Unsplash work-related cover URL
- `portfolio` — array of `{ img, caption }` work photos
- `reviews` — array of `{ name, initials, stars, date, text }`

To add more artisans, just add new objects to the `artisans` array following the same structure.

---

## Image Fallbacks

All `<img>` tags include `onError` handlers. If an Unsplash image fails to load, it falls back to a generated avatar from `ui-avatars.com` or a generic Unsplash photo.

---

## Extending the Project

| Feature | How to add |
|---------|-----------|
| React Router | Replace the `currentPage` state with `react-router-dom` |
| Backend API | Replace `artisans.js` data with `fetch()` calls to your REST API |
| Authentication | Add login/signup pages and a context for user state |
| Real booking | Connect `BookingModal` to a POST endpoint |
| Map view | Integrate Leaflet.js with artisan coordinates |

---

*ArtisanConnect — University Software Engineering Project, 2025*
