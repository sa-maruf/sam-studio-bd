import React from "react"
import { X } from "lucide-react"
import { useMovies } from "../context/MovieContext"
import TitleGrid from "../components/TitleGrid"
import HeroSlider from "../components/HeroSlider"
import usePaginatedList from "../hooks/usePaginatedList"

export default function Home({ query, hasSearched, onClearSearch }) {
  const { titles } = useMovies()

  const filtered = titles.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase())
  )

  const { visibleItems, hasMore, loadMore } = usePaginatedList(filtered, query)

  return (
    <div>
      {/* Hero slider is hidden automatically whenever a search is active */}
      {!hasSearched && <HeroSlider />}

      <section className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {hasSearched ? (
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h2 className="font-display text-3xl tracking-wide text-paper">
              Results for <span className="text-gold">"{query}"</span>
            </h2>
            <button
              onClick={onClearSearch}
              className="inline-flex items-center gap-1.5 text-sm text-mist hover:text-paper border border-white/10 rounded-full px-4 py-2 transition-colors"
            >
              <X size={14} /> Clear Search
            </button>
          </div>
        ) : (
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-xs md:text-xl lg:text-3xl tracking-wide text-paper">
              Latest Movies & Series
            </h2>
            <span className="font-display text-xs md:text-xl lg:text-3xl tracking-wide text-paper">{filtered.length} Movies & Series</span>
          </div>
        )}

        <TitleGrid
          titles={visibleItems}
          mode="public"
          hasMore={hasMore}
          onLoadMore={loadMore}
        />
      </section>
    </div>
  )
}
