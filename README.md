# STACKLY — Disaster Response Volunteers

A professional, emergency-focused volunteer-management **website theme** built with **HTML5, CSS3 and vanilla JavaScript only**. No frameworks, no build tools, no backend.

---

## Overview

Stackly connects **volunteers, coordinators, donors and communities** during disasters — floods, cyclones, earthquakes, wildfires, landslides, storms and more. The theme includes a landing page, disaster tracking, mission volunteering, volunteer registration/login, a volunteer dashboard and emergency resources.

## Features

- Homepage with hero, live response status panel, disaster categories, active responses, animated statistics, volunteer skill cards, disaster-preparedness **tabs**, testimonial **slider** and CTA banner
- **Dynamic emergency alert bar** (rotates messages via JS, driven by `data/disasters.json`)
- Disasters page with **filter-by-type chips** + visual response **map mock**
- Missions page with **search, filter dropdowns, skill chips** and a **mission detail modal**
- Volunteer registration & contact forms with **frontend validation** (name, email, phone, required fields)
- Login / Register with show-password toggles and redirect to a sample **dashboard**
- Dashboard with stats, skill progress bars, mission list, notifications, certificates table and responsive sidebar
- Training page with **animated progress bars**, About, Contact, Resources (**FAQ accordion**), 404 page
- **Responsive** across desktop, laptop, tablet and mobile — 4 → 2 → 1 column grids, mobile side-panel navigation with close button, no horizontal scroll
- `prefers-reduced-motion` support and reveal-on-scroll animations

## Folder Structure

```text
stackly-disaster-response/
│
├── index.html
│
├── pages/
│   ├── disasters.html        disaster-details.html
│   ├── missions.html         mission-details.html
│   ├── volunteers.html       volunteer-register.html
│   ├── resources.html        training.html
│   ├── about.html            contact.html
│   ├── login.html            register.html
│   ├── dashboard.html        profile.html
│   └── 404.html
│
├── css/
│   ├── style.css             base theme & components
│   ├── pages.css             page-specific sections
│   ├── forms.css             forms & validation
│   ├── dashboard.css         dashboard layout
│   ├── animations.css        keyframes & reveal
│   └── responsive.css        media queries
│
├── js/
│   ├── main.js               header/footer, helpers, counters
│   ├── navbar.js             mobile side panel
│   ├── emergency.js          alert bar + status panel
│   ├── disasters.js          categories, responses, details
│   ├── missions.js           list, filters, search, modal
│   ├── volunteers.js         skill cards & stories
│   ├── dashboard.js          dashboard behaviour
│   ├── resources.js          resource cards, accordion, tabs
│   ├── training.js           course progress animation
│   ├── slider.js             testimonial slider
│   └── form-validation.js    validation engine
│
├── images/                   (place your own .webp/,svg assets here;
│                              the theme runs fully with inline SVG/icons)
│
├── data/
│   ├── disasters.json
│   ├── missions.json
│   └── volunteers.json
│
└── README.md
```

## How to Run

This theme is fully static and works in any modern browser.

1. Double-click `index.html`, **or**
2. Serve the folder with any static server, e.g. `npx serve` or `python -m http.server`.

> The JS first tries to fetch `data/*.json` and gracefully falls back to embedded sample data if a fetch fails (offline / local `file://`), so the theme always renders.

## Customization

- **Colors** — edit the CSS variables under `:root` in `css/style.css` (`--primary`, `--secondary`, `--accent`, etc.).
- **Data** — update `data/*.json` to change disasters, missions and stories. The fallbacks live at the top of `js/disasters.js` and `js/missions.js`.
- **Images** — drop real photos into `images/` and reference them; current visuals use inline SVG + emoji so no assets are required.
- **Map** — `pages/disasters.html` contains a CSS mock map; swap the markup for a live map API (e.g. Leaflet) whenever needed.

## Color System

Emergency red + trustworthy dark blue:

| Token          | Value     | Use                          |
| -------------- | --------- | ---------------------------- |
| `--primary`    | `#d62828` | Emergency / actions          |
| `--secondary`  | `#0f3d56` | Headings, brand, sections    |
| `--accent`     | `#f4a261` | Highlights, progress         |
| `--success`    | `#2a9d8f` | Completed / positive states  |
| `--warning`    | `#e9c46a` | Warnings                     |

## Responsive Breakpoints

| Device   | Nav           | Grid columns        |
| -------- | ------------- | ------------------- |
| Desktop  | Full nav      | 4                   |
| Laptop   | Full nav      | 3                   |
| Tablet   | Hamburger     | 2                   |
| Mobile   | Side panel    | 1                   |

---

&copy; 2026 Stackly. All Rights Reserved.