import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { Search, Menu, X, Film } from "lucide-react"

const links = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
  { to: "/tv-series", label: "Tv Series" },
  { to: "/about", label: "About Us" },
]

export default function Navbar({ onSearch }) {
  const [open, setOpen] = useState(false)
  const [desktopValue, setDesktopValue] = useState("")
  const [mobileValue, setMobileValue] = useState("")

  const linkClass = ({ isActive }) =>
    `font-display tracking-wide text-lg transition-colors ${
      isActive ? "text-gold" : "text-paper/80 hover:text-gold"
    }`

  function handleDesktopSubmit(e) {
    e.preventDefault()
    onSearch(desktopValue)
    setDesktopValue("")
  }

  function handleMobileSubmit(e) {
    e.preventDefault()
    onSearch(mobileValue)
    setMobileValue("")
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-ink/90 backdrop-blur border-b border-white/5">
      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 shrink-0">
            <Film className="text-gold" size={26} strokeWidth={2.2} />
            <span className="font-display text-2xl tracking-widest text-paper">
              SAM <span className="text-gold">STUDIO</span>
            </span>
          </NavLink>

          {/* Center links - desktop */}
          <nav className="hidden md:flex items-center md:gap-5 lg:gap-8">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === "/"}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Search - desktop */}
          <form
            onSubmit={handleDesktopSubmit}
            className="hidden md:flex items-center gap-2 w-72 lg:w-80"
          >
            <div className="relative flex-1">
            
              <input
                type="text"
                value={desktopValue}
                onChange={(e) => setDesktopValue(e.target.value)}
                placeholder="Search titles..."
                className="w-full bg-surface border border-white/10 rounded-full py-2 pl-5 pr-4 text-sm text-paper placeholder:text-mist focus:outline-none focus:ring-2 focus:ring-gold/60"
              />
            </div>
            <button
              type="submit"
              className="shrink-0 bg-gold text-ink text-sm font-bold px-3 py-2 rounded-full hover:bg-gold/90 transition-colors"
            >
              Search
            </button>
          </form>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-paper p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className="sprockets sprockets-gold opacity-60" />

      {/* Mobile menu — search and nav links visually separated into distinct blocks */}
      {open && (
        <div className="md:hidden bg-surface border-t border-white/5 px-4 py-4 space-y-4">
          {/* Search block */}
          <form
            onSubmit={handleMobileSubmit}
            className="bg-ink rounded-xl border border-white/10 p-3"
          >
            <div className="flex gap-2">
              <div className="relative flex-1">
              
                <input
                  type="text"
                  value={mobileValue}
                  onChange={(e) => setMobileValue(e.target.value)}
                  placeholder="Search titles..."
                  className="w-full bg-surface border border-white/10 rounded-full py-2 pl-5 pr-3 text-sm text-paper placeholder:text-mist focus:outline-none focus:ring-2 focus:ring-gold/60"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 bg-gold text-ink text-sm font-bold px-4 py-2 rounded-full hover:bg-gold/90 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Menu block */}
          <div className="bg-ink rounded-xl border border-white/10 p-3">
            <nav className="flex flex-col gap-3">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={linkClass}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
