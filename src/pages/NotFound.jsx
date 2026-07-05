import React from "react"
import { Link } from "react-router-dom"
import { Clapperboard } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <Clapperboard size={48} className="text-gold/60 mb-5" />
      <h1 className="font-display text-5xl tracking-wide text-paper mb-2">
        404 — Scene Missing
      </h1>
      <p className="text-mist mb-6">
        This page didn't make the final cut.
      </p>
      <Link
        to="/"
        className="bg-gold text-ink font-bold text-sm px-6 py-2.5 rounded-full hover:bg-gold/90 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
