import React, { createContext, useContext, useEffect, useState } from "react"
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"
import { db } from "../firebase"

// Name of the Firestore collection that stores movies/tv series.
const TITLES_COLLECTION = "titles"
// Name of the Firestore collection that stores homepage slider images.
const SLIDES_COLLECTION = "slider"

const MovieContext = createContext(null)

export function MovieProvider({ children }) {
  // `titles` now lives in Firestore, not localStorage. It starts empty and
  // is populated by fetchTitles() below, once, when the app mounts.
  const [titles, setTitles] = useState([])
  const [titlesLoading, setTitlesLoading] = useState(true)

  // `slides` follows the exact same pattern — Firestore-backed, starts
  // empty, populated by fetchSlides() below.
  const [slides, setSlides] = useState([])
  const [slidesLoading, setSlidesLoading] = useState(true)

  // --- Fetch all titles from Firestore once, on mount ---
  useEffect(() => {
    async function fetchTitles() {
      try {
        const snapshot = await getDocs(collection(db, TITLES_COLLECTION))
        // Each Firestore doc has an .id and a .data() payload — we merge
        // them into the same shape your components already expect.
        const loaded = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }))

        loaded.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)) // new add

        setTitles(loaded)
      } catch (err) {
        console.error("Failed to fetch titles from Firestore:", err)
      } finally {
        setTitlesLoading(false)
      }
    } 
    fetchTitles()
  }, [])

  // --- Fetch all slider images from Firestore once, on mount ---
  useEffect(() => {
    async function fetchSlides() {
      try {
        const snapshot = await getDocs(collection(db, SLIDES_COLLECTION))
        const loaded = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }))
        setSlides(loaded)
      } catch (err) {
        console.error("Failed to fetch slides from Firestore:", err)
      } finally {
        setSlidesLoading(false)
      }
    }
    fetchSlides()
  }, [])

  // --- Titles (movies / tv series) — now backed by Firestore ---
  async function addTitle(newTitle) {
    try {
      // বর্তমান সময় (Date.now()) যুক্ত করে ডাটাবেজে পাঠানো হচ্ছে
      const titleWithTime = { ...newTitle, createdAt: Date.now() };
      
      const docRef = await addDoc(collection(db, TITLES_COLLECTION), titleWithTime)
      setTitles((prev) => [{ id: docRef.id, ...titleWithTime }, ...prev])
    } catch (err) {
      console.error("Failed to add title:", err)
    }
  }

  async function updateTitle(id, updates) {
    try {
      // এডিট করার সময়টাও আপডেট করে দেওয়া হচ্ছে যেন এটি লেটেস্ট হিসেবে কাউন্ট হয়
      const updatedData = { ...updates, createdAt: Date.now() };
      
      await updateDoc(doc(db, TITLES_COLLECTION, id), updatedData)
      setTitles((prev) => {
        const filteredTitles = prev.filter((t) => t.id !== id);
        const editedTitle = prev.find((t) => t.id === id);
        return [{ ...editedTitle, ...updatedData }, ...filteredTitles];
      })
    } catch (err) {
      console.error("Failed to update title:", err)
    }
  }

  async function deleteTitle(id) {
    try {
      await deleteDoc(doc(db, TITLES_COLLECTION, id))
      setTitles((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      console.error("Failed to delete title:", err)
    }
  }

  // --- Homepage slider images — now backed by Firestore ---
  async function addSlide(newSlide) {
    try {
      const docRef = await addDoc(collection(db, SLIDES_COLLECTION), newSlide)
      setSlides((prev) => [...prev, { id: docRef.id, ...newSlide }])
    } catch (err) {
      console.error("Failed to add slide:", err)
    }
  }

  async function updateSlide(id, updates) {
    try {
      await updateDoc(doc(db, SLIDES_COLLECTION, id), updates)
      setSlides((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
      )
    } catch (err) {
      console.error("Failed to update slide:", err)
    }
  }

  async function deleteSlide(id) {
    try {
      await deleteDoc(doc(db, SLIDES_COLLECTION, id))
      setSlides((prev) => prev.filter((s) => s.id !== id))
    } catch (err) {
      console.error("Failed to delete slide:", err)
    }
  }

  return (
    <MovieContext.Provider
      value={{
        titles,
        titlesLoading,
        addTitle,
        updateTitle,
        deleteTitle,
        slides,
        slidesLoading,
        addSlide,
        updateSlide,
        deleteSlide,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export function useMovies() {
  const ctx = useContext(MovieContext)
  if (!ctx) throw new Error("useMovies must be used within a MovieProvider")
  return ctx
}