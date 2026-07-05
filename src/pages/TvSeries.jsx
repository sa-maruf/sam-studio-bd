import React from "react"
import CategoryPage from "./CategoryPage"

export default function TvSeries({ query }) {
  return (
    <CategoryPage
      query={query}
      category="Tv Series"
      title="Tv Series"
    />
  )
}
