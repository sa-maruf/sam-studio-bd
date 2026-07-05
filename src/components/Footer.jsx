import React from "react"
import { Link } from "react-router-dom"
import { Film, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5 mt-20">
      <div className="sprockets" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
        <div>
          <div className="flex justify-center items-center gap-2 mb-3">
            <Film className="text-gold" size={22} />
            <span className="font-display text-xl tracking-widest">
              SAM <span className="text-gold">STUDIO</span>
            </span>
          </div>
          <div>
          <ul className="text-sm flex gap-4 lg:gap-5 justify-center text-mist">
            <li><Link to="/" className="hover:text-paper transition-colors">Home</Link></li>
            <li><Link to="/movies" className="hover:text-paper transition-colors">Movies</Link></li>
            <li><Link to="/tv-series" className="hover:text-paper transition-colors">Tv Series</Link></li>
            <li><Link to="/about" className="hover:text-paper transition-colors">About Us</Link></li>
          </ul>
        </div>
          <p className="text-mist text-center text-sm leading-relaxed mt-3">
            Your front-row seat to the latest movies and TV series. Curated,
            uploaded, ready to watch.Your front-row seat to the latest movies and TV series. Curated,
            uploaded, ready to watch.Your front-row seat to the latest movies and TV series. Curated,
            uploaded, ready to watch.
          </p>
        </div>



      </div>

      <div className="border-t border-white/5 py-5 text-center text-xs text-mist px-4">
        © {new Date().getFullYear()} SAM STUDIO. All rights reserved. For
        demonstration purposes only.
      </div>
    </footer>
  )
}
