import { useEffect, useRef, useState } from "react"

// Mirrors the grid's own Tailwind classes exactly:
// grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
const BREAKPOINTS = { sm: 640, lg: 1024, xl: 1280 }

const MOBILE_INITIAL_ROWS = 10
const MOBILE_STEP_ROWS = 10
const DESKTOP_INITIAL_ROWS = 6
const DESKTOP_STEP_ROWS = 6

function getWidth() {
  if (typeof window === "undefined") return 1280
  return window.innerWidth
}

// Column count the grid actually renders at a given width.
function getColumns(width) {
  if (width >= BREAKPOINTS.xl) return 5
  if (width >= BREAKPOINTS.lg) return 4
  if (width >= BREAKPOINTS.sm) return 3
  return 2
}

// "Mobile" bucket = below the `sm` breakpoint (2-column grid).
// "Desktop/Tablet" bucket = `sm` and above (3/4/5-column grid).
function isMobileWidth(width) {
  return width < BREAKPOINTS.sm
}

/**
 * Row-based "Load More" pagination.
 *
 * Counts pagination in full grid ROWS, not raw item counts, so the number
 * of cards actually loaded always matches the grid's live column count:
 *
 * - Mobile (< sm, 2 columns): 10 rows initially (20 cards), +10 rows per click.
 * - Desktop/Tablet (>= sm, 3/4/5 columns): 6 rows initially, +6 rows per click.
 *   E.g. at 5 columns that's 6 x 5 = 30 cards; at 3 columns it's 6 x 3 = 18.
 *
 * Resizing within the desktop bucket (sm -> lg -> xl) keeps the same number
 * of loaded ROWS but reflows the item count to match the new column count.
 * Crossing the mobile/desktop boundary, or a new search (`resetKey` change),
 * resets back to that bucket's initial row count.
 */
export default function usePaginatedList(items, resetKey) {
  const [width, setWidth] = useState(getWidth)
  const mobile = isMobileWidth(width)
  const columns = getColumns(width)

  const [rowsLoaded, setRowsLoaded] = useState(() =>
    isMobileWidth(getWidth()) ? MOBILE_INITIAL_ROWS : DESKTOP_INITIAL_ROWS
  )

  // Track viewport width (rAF-throttled) so `columns` stays accurate.
  useEffect(() => {
    let frame = null
    function handleResize() {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = null
        setWidth(window.innerWidth)
      })
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // Reset loaded rows only when crossing the mobile/desktop boundary —
  // NOT on every column-count change within the desktop bucket.
  const prevMobileRef = useRef(mobile)
  useEffect(() => {
    if (prevMobileRef.current !== mobile) {
      prevMobileRef.current = mobile
      setRowsLoaded(mobile ? MOBILE_INITIAL_ROWS : DESKTOP_INITIAL_ROWS)
    }
  }, [mobile])

  // Reset to the first page whenever resetKey changes (new search).
  useEffect(() => {
    setRowsLoaded(mobile ? MOBILE_INITIAL_ROWS : DESKTOP_INITIAL_ROWS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey])

  const visibleCount = rowsLoaded * columns
  const visibleItems = items.slice(0, visibleCount)
  const hasMore = visibleCount < items.length

  function loadMore() {
    setRowsLoaded((r) => r + (mobile ? MOBILE_STEP_ROWS : DESKTOP_STEP_ROWS))
  }

  return { visibleItems, hasMore, loadMore }
}
