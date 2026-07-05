# SAM STUDIO — Movie & TV Series Download Site

A fully responsive movie/TV download website built with React, React Router,
and Tailwind CSS, including a hidden admin panel for managing uploads.

## Features

- **Navbar** — logo, Home / Movies / Tv Series / About Us links, plus a search
  field with a dedicated **Search** button. Filtering only runs when you click
  Search (or press Enter) — never while typing — and the input clears itself
  right after you search. On mobile, the search box and the nav menu render
  as two visually separate blocks for clarity.
- **Home hero slider** — a row-format image carousel (autoplay + arrows +
  dots) fed entirely by the slider images you manage in the admin panel.
  Searching automatically hides the slider and shows only matching cards,
  with a "Clear Search" button to bring the slider back.
- **Cards** — poster, category badge, release date, description, download button.
- **Footer** — site links, social icons.
- **Admin Panel** at `/sam.admin.ms`:
  - "Upload Movie" form (name, description, release date, category, download link).
  - New uploads automatically appear under Home/Movies/Tv Series based on category.
  - Admin dashboard shows every title with **Edit** and **Delete** buttons
    (instead of Download). Deleting removes it everywhere, including the
    public site.
  - Dedicated admin search bar to quickly find a title to edit.
  - **Homepage Slider** section — add, edit, and delete the images (with
    optional captions) that power the Home page hero carousel.
- Data persists in the browser via `localStorage`, so uploads and slider
  changes survive a page refresh.

## Getting Started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

- Public site: `http://localhost:5173/`
- Admin panel: `http://localhost:5173/sam.admin.ms`

## Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
sam-studio/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   └── MovieContext.jsx     # global state: titles + slider images, CRUD + localStorage
    ├── data/
    │   ├── sampleData.js        # seed titles shown on first load
    │   └── sampleSlides.js      # seed homepage slider images
    ├── components/
    │   ├── Navbar.jsx           # submit-only search, separated mobile menu/search
    │   ├── Footer.jsx
    │   ├── HeroSlider.jsx       # row-format carousel for the Home hero
    │   ├── MovieCard.jsx        # public (download) and admin (edit + delete) modes
    │   ├── TitleGrid.jsx
    │   ├── TitleFormModal.jsx   # shared upload/edit form for movies & tv series
    │   └── SliderFormModal.jsx  # add/edit form for homepage slider images
    └── pages/
        ├── Home.jsx
        ├── Movies.jsx
        ├── TvSeries.jsx
        ├── CategoryPage.jsx
        ├── AboutUs.jsx
        ├── Admin.jsx
        └── NotFound.jsx
```

## Notes / customizing

- **Real posters**: replace the `poster` URLs in `src/data/sampleData.js`, or
  paste a poster image URL into the "Poster Image URL" field in the admin
  upload form.
- **Persistence**: this demo uses `localStorage` so it works with zero backend
  setup. To share uploads across devices/users, swap `MovieContext.jsx` for
  calls to your own API or a service like Firebase/Supabase.
- **Securing the admin route**: `/sam.admin.ms` is unauthenticated by design
  for easy local editing. Before deploying publicly, add real authentication
  (e.g. a login gate, or put it behind your hosting provider's password
  protection) so strangers can't upload or edit content.
