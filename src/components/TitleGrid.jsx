import React from "react"
import { Clapperboard, ChevronDown } from "lucide-react"
import MovieCard from "./MovieCard"

export default function TitleGrid({
  titles,
  mode = "public",
  onEdit,
  onDelete,
  hasMore = false,
  onLoadMore,
}) {
  if (!titles.length) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-24 text-mist">
        <Clapperboard size={40} className="mb-4 text-gold/60" />
        <p className="font-display text-2xl tracking-wide text-paper mb-1">
          No titles found
        </p>
        <p className="text-sm">Try a different search or check back later.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
        {titles.map((t) => (
          <MovieCard key={t.id} title={t} mode={mode} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={onLoadMore}
            className="inline-flex items-center gap-2 bg-gold text-ink font-display text-lg tracking-wide px-6 py-2 rounded-full shadow-glow hover:bg-paper transition-colors"
          >
            Load More
            <ChevronDown size={18} />
          </button>
        </div>
      )}
    </div>
  )
}
