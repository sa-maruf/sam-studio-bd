import React from "react"
import { useMovies } from "../context/MovieContext"
import TitleGrid from "../components/TitleGrid"
import usePaginatedList from "../hooks/usePaginatedList"

export default function CategoryPage({ query, category, title, tagline }) {
  const { titles } = useMovies()

  const filtered = titles.filter(
    (t) =>
      t.category === category &&
      t.name.toLowerCase().includes(query.toLowerCase())
  )

  const { visibleItems, hasMore, loadMore } = usePaginatedList(filtered, query)

  return (
    <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 border-b border-white/5 pb-6">
        <h1 className="font-display text-4xl sm:text-5xl tracking-wide text-paper">
          {title}
        </h1>
        <p className="text-mist mt-2">{tagline}</p>
      </div>
      <div className="flex items-center justify-between mb-6">
        <span className="text-mist text-sm">{filtered.length} titles found</span>
      </div>
      <TitleGrid
        titles={visibleItems}
        mode="public"
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </div>
  )
}
