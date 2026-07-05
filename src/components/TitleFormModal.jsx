import React, { useEffect, useState } from "react"
import { X } from "lucide-react"

const emptyForm = {
  name: "",
  description: "",
  releaseDate: "",
  category: "Movie",
  downloadLink: "",
  poster: "",
}

export default function TitleFormModal({ open, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(emptyForm)
  const isEdit = Boolean(initialData)

  useEffect(() => {
    if (initialData) {
      setForm({ ...emptyForm, ...initialData })
    } else {
      setForm(emptyForm)
    }
  }, [initialData, open])

  if (!open) return null

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.downloadLink.trim()) return
    onSubmit(form)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-surface w-full max-w-lg rounded-2xl border border-white/10 shadow-glow max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 sticky top-0 bg-surface">
          <h2 className="font-display text-2xl tracking-wide text-gold">
            {isEdit ? "Edit Title" : "Upload Movie"}
          </h2>
          <button
            onClick={onClose}
            className="text-mist hover:text-paper transition-colors"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm text-mist mb-1.5">Movie Name</label>
            <input
              required
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Embers of Tomorrow"
              className="w-full bg-ink border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-paper placeholder:text-mist/60 focus:outline-none focus:ring-2 focus:ring-gold/60"
            />
          </div>

          <div>
            <label className="block text-sm text-mist mb-1.5">Movie Description</label>
            <textarea
              required
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Short synopsis..."
              className="w-full bg-ink border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-paper placeholder:text-mist/60 focus:outline-none focus:ring-2 focus:ring-gold/60 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-mist mb-1.5">Release Date</label>
              <input
                required
                type="date"
                name="releaseDate"
                value={form.releaseDate}
                onChange={handleChange}
                className="w-full bg-ink border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-paper focus:outline-none focus:ring-2 focus:ring-gold/60 [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-sm text-mist mb-1.5">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full bg-ink border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-paper focus:outline-none focus:ring-2 focus:ring-gold/60"
              >
                <option value="Movie">Movie</option>
                <option value="Tv Series">Tv Series</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-mist mb-1.5">Poster Image URL (optional)</label>
            <input
              type="text"
              name="poster"
              value={form.poster}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full bg-ink border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-paper placeholder:text-mist/60 focus:outline-none focus:ring-2 focus:ring-gold/60"
            />
          </div>

          <div>
            <label className="block text-sm text-mist mb-1.5">Download Link</label>
            <input
              required
              type="text"
              name="downloadLink"
              value={form.downloadLink}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full bg-ink border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-paper placeholder:text-mist/60 focus:outline-none focus:ring-2 focus:ring-gold/60"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-white/10 text-mist hover:text-paper transition-colors text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-gold text-ink font-bold text-sm hover:bg-gold/90 transition-colors"
            >
              {isEdit ? "Save Changes" : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
