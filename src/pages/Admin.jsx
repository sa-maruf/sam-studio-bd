import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Film, Plus, Search, ArrowLeft, Pencil, Trash2, ImagePlus } from "lucide-react"
import { useMovies } from "../context/MovieContext"
import TitleGrid from "../components/TitleGrid"
import TitleFormModal from "../components/TitleFormModal"
import SliderFormModal from "../components/SliderFormModal"
import usePaginatedList from "../hooks/usePaginatedList"

export default function Admin() {
  const {
    titles,
    addTitle,
    updateTitle,
    deleteTitle,
    slides,
    addSlide,
    updateSlide,
    deleteSlide,
  } = useMovies()

  const [adminQuery, setAdminQuery] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTitle, setEditingTitle] = useState(null)

  const [sliderModalOpen, setSliderModalOpen] = useState(false)
  const [editingSlide, setEditingSlide] = useState(null)

  const filtered = titles.filter((t) =>
    t.name.toLowerCase().includes(adminQuery.toLowerCase())
  )

  const { visibleItems, hasMore, loadMore } = usePaginatedList(filtered, adminQuery)

  // --- Title (movie/tv) handlers ---
  function openUploadModal() {
    setEditingTitle(null)
    setModalOpen(true)
  }

  function openEditModal(title) {
    setEditingTitle(title)
    setModalOpen(true)
  }

  function handleTitleSubmit(form) {
    if (editingTitle) {
      updateTitle(editingTitle.id, form)
    } else {
      addTitle(form)
    }
    setModalOpen(false)
    setEditingTitle(null)
  }

  function handleDeleteTitle(id) {
    const target = titles.find((t) => t.id === id)
    const ok = window.confirm(
      `Delete "${target ? target.name : "this title"}"? This cannot be undone.`
    )
    if (ok) deleteTitle(id)
  }

  // --- Slider image handlers ---
  function openAddSlideModal() {
    setEditingSlide(null)
    setSliderModalOpen(true)
  }

  function openEditSlideModal(slide) {
    setEditingSlide(slide)
    setSliderModalOpen(true)
  }

  function handleSlideSubmit(form) {
    if (editingSlide) {
      updateSlide(editingSlide.id, form)
    } else {
      addSlide(form)
    }
    setSliderModalOpen(false)
    setEditingSlide(null)
  }

  function handleDeleteSlide(id) {
    const ok = window.confirm("Remove this slide from the homepage slider?")
    if (ok) deleteSlide(id)
  }

  return (
    <div className="min-h-screen bg-ink">
      {/* Admin top bar */}
      <header className="sticky top-0 z-40 bg-surface border-b border-white/5">
        <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Film className="text-gold shrink-0" size={24} />
            <div className="min-w-0">
              <p className="font-display text-xl tracking-wide leading-none truncate">
                SAM <span className="text-gold">STUDIO</span>
              </p>
              <p className="text-[11px] text-mist uppercase tracking-widest">
                Admin Panel
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-mist hover:text-paper transition-colors"
          >
            <ArrowLeft size={15} /> Back to site
          </Link>
        </div>
        <div className="sprockets sprockets-gold opacity-60" />
      </header>

      <main className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* ---------------- Titles dashboard ---------------- */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl tracking-wide text-paper">
                Content Dashboard
              </h1>
              <p className="text-mist text-sm mt-1">
                {titles.length} title{titles.length !== 1 ? "s" : ""} uploaded
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-mist"
                />
                <input
                  type="text"
                  value={adminQuery}
                  onChange={(e) => setAdminQuery(e.target.value)}
                  placeholder="Search admin titles..."
                  className="w-full bg-surface border border-white/10 rounded-full py-2.5 pl-9 pr-4 text-sm text-paper placeholder:text-mist focus:outline-none focus:ring-2 focus:ring-gold/60"
                />
              </div>
              <button
                onClick={openUploadModal}
                className="inline-flex items-center justify-center gap-2 bg-gold text-ink font-bold text-sm px-5 py-2.5 rounded-full hover:bg-gold/90 transition-colors shrink-0"
              >
                <Plus size={17} /> Upload Movie
              </button>
            </div>
          </div>

          <TitleGrid
            titles={visibleItems}
            mode="admin"
            onEdit={openEditModal}
            onDelete={handleDeleteTitle}
            hasMore={hasMore}
            onLoadMore={loadMore}
          />
        </section>

        {/* ---------------- Homepage slider management ---------------- */}
        <section className="border-t border-white/5 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display text-3xl tracking-wide text-paper">
                Homepage Slider
              </h2>
              <p className="text-mist text-sm mt-1">
                Manage the image carousel shown on the Home page hero.{" "}
                {slides.length} slide{slides.length !== 1 ? "s" : ""} active.
              </p>
            </div>
            <button
              onClick={openAddSlideModal}
              className="inline-flex items-center justify-center gap-2 bg-surface2 border border-gold/40 text-gold font-bold text-sm px-5 py-2.5 rounded-full hover:bg-gold hover:text-ink transition-colors shrink-0 w-full sm:w-auto"
            >
              <ImagePlus size={17} /> Upload Slider Image
            </button>
          </div>

          {slides.length === 0 ? (
            <div className="text-center py-14 border border-dashed border-white/10 rounded-2xl text-mist">
              No slider images yet. Add one to populate the homepage hero.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {slides.map((s) => (
                <div
                  key={s.id}
                  className="bg-surface border border-white/5 rounded-2xl overflow-hidden shadow-glow"
                >
                  <div className="aspect-[16/7] overflow-hidden">
                    <img
                      src={s.imageUrl}
                      alt={s.caption || "Slide"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-paper line-clamp-1 mb-3">
                      {s.caption || (
                        <span className="text-mist italic">No caption</span>
                      )}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditSlideModal(s)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-surface2 hover:bg-gold hover:text-ink text-paper font-semibold text-sm py-2 rounded-lg border border-white/10 transition-colors"
                      >
                        <Pencil size={13} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSlide(s.id)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-marquee/10 hover:bg-marquee text-marquee hover:text-white font-semibold text-sm py-2 rounded-lg border border-marquee/30 transition-colors"
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <TitleFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleTitleSubmit}
        initialData={editingTitle}
      />

      <SliderFormModal
        open={sliderModalOpen}
        onClose={() => setSliderModalOpen(false)}
        onSubmit={handleSlideSubmit}
        initialData={editingSlide}
      />
    </div>
  )
}
