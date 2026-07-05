import React from "react"
import { Download, Pencil, Trash2, Calendar, Tag } from "lucide-react"

function formatDate(dateStr) {
  if (!dateStr) return "TBA"
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default function MovieCard({ title, mode = "public", onEdit, onDelete }) {
  const isAdmin = mode === "admin"

  return (
    <div className="group relative bg-surface rounded-sm overflow-hidden border border-white/5 shadow-glow hover:-translate-y-1 transition-transform duration-300">
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={title.poster || "https://picsum.photos/seed/placeholder/500/700"}
          alt={title.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-ink/80 backdrop-blur px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide text-gold border border-gold/30">
          <Tag size={11} />
          {title.category}
        </span>
      </div>

      {/* Perforated ticket-stub divider */}
      <div className="relative">
        <div className="sprockets" />
        <div className="ticket-notch absolute inset-y-0 -top-[4px] left-0 right-0 pointer-events-none" />
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <h3 className="font-display text-xl tracking-wide text-paper leading-tight line-clamp-1">
          {title.name}
        </h3>
        <p className="text-mist text-sm line-clamp-2 min-h-[2.5rem]">
          {title.description}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-mist/80">
          <Calendar size={12} />
          {formatDate(title.releaseDate)}
        </div>

        {isAdmin ? (
          <div className="mt-3 space-y-2 md:space-y-3">
            <button
              onClick={() => onEdit(title)}
              className="flex-1 inline-flex items-center w-full justify-center gap-1.5 bg-surface2 hover:bg-gold hover:text-ink text-paper font-semibold text-xs md:text-sm py-2.5 rounded-lg border border-white/10 transition-colors"
            >
              <Pencil size={14} />
              Edit
            </button> <br />
            <button
              onClick={() => onDelete(title.id)}
              className="flex-1 inline-flex items-center w-full justify-center gap-1.5 bg-marquee/10 hover:bg-marquee text-marquee hover:text-white font-semibold text-xs md:text-sm  py-2.5 rounded-lg border border-marquee/30 transition-colors"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        ) : (
          <a
            href={title.downloadLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-marquee hover:bg-gold hover:text-ink text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
          >
            <Download size={15} />
            Download
          </a>
        )}
      </div>
    </div>
  )
}
