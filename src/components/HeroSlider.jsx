import React, { useEffect, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight, Clapperboard } from "lucide-react"
import { useMovies } from "../context/MovieContext"

export default function HeroSlider() {
  const { slides } = useMovies()
  const [index, setIndex] = useState(0)

  const count = slides.length

  const goTo = useCallback(
    (i) => {
      if (count === 0) return
      setIndex(((i % count) + count) % count)
    },
    [count]
  )

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  // Autoplay
  useEffect(() => {
    if (count <= 1) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [next, count])

  if (count === 0) {
    return (
      <section className="relative border-b border-white/5 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Clapperboard className="text-gold/60 mx-auto mb-4" size={36} />
          <h1 className="font-display text-4xl tracking-wide text-paper mb-2">
            No Slider Images Yet
          </h1>
          <p className="text-mist text-sm">
            Add some from the Admin panel's "Upload Slider Image" section.
          </p>
        </div>
        <div className="sprockets sprockets-gold" />
      </section>
    )
  }

  return (
    <section className="relative border-b border-white/5 bg-ink overflow-hidden">
      <div className="relative w-full aspect-[16/7] min-h-[220px] max-h-[560px]">
        {/* Row-format track: all slides sit side by side, we translate the row */}
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s) => (
            <div key={s.id} className="relative w-full h-full shrink-0">
              <img
                src={s.imageUrl}
                alt={s.caption || "Featured title"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              {s.caption && (
                <div className="absolute bottom-6 left-0 right-0 px-4 sm:px-8 text-center">
                  <p className="font-display text-2xl sm:text-4xl tracking-wide text-paper drop-shadow-lg">
                    {s.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Arrows */}
        {count > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-ink/60 border border-white/20 text-paper flex items-center justify-center hover:bg-gold hover:text-ink hover:border-gold transition-colors backdrop-blur"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-ink/60 border border-white/20 text-paper flex items-center justify-center hover:bg-gold hover:text-ink hover:border-gold transition-colors backdrop-blur"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Dots */}
        {count > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-gold" : "w-1.5 bg-paper/40 hover:bg-paper/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="sprockets sprockets-gold" />
    </section>
  )
}
