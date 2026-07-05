import React from "react"
import CategoryPage from "./CategoryPage"

export default function Movies({ query }) {
  return (
    <CategoryPage
      query={query}
      category="Movie"
      title="Movies"
    />
  )
}
