import React, { useState } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Movies from "./pages/Movies"
import TvSeries from "./pages/TvSeries"
import AboutUs from "./pages/AboutUs"
import Admin from "./pages/Admin"
import NotFound from "./pages/NotFound"

export default function App() {
  // activeSearch only updates when the Search button (or Enter) is submitted —
  // never while the person is typing. hasSearched tracks whether a search is
  // currently "live" so Home can hide its hero slider and show results only.
  const [activeSearch, setActiveSearch] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  const location = useLocation()
  const isAdminRoute = location.pathname === "/sam.admin.ms"

  function handleSearch(value) {
    const trimmed = value.trim()
    if (!trimmed) {
      setActiveSearch("")
      setHasSearched(false)
      return
    }
    setActiveSearch(trimmed)
    setHasSearched(true)
  }

  function handleClearSearch() {
    setActiveSearch("")
    setHasSearched(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Navbar onSearch={handleSearch} />}

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                query={activeSearch}
                hasSearched={hasSearched}
                onClearSearch={handleClearSearch}
              />
            }
          />
          <Route path="/movies" element={<Movies query={activeSearch} />} />
          <Route path="/tv-series" element={<TvSeries query={activeSearch} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/sam.admin.ms" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  )
}
