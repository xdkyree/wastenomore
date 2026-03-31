import { createContext, useContext, useEffect, useState } from "react"

export type FontSize = "normal" | "large" | "xlarge"

interface AccessibilityState {
  highContrast: boolean
  setHighContrast: (v: boolean) => void
  fontSize: FontSize
  setFontSize: (v: FontSize) => void
  reduceMotion: boolean
  setReduceMotion: (v: boolean) => void
  simpleMode: boolean
  setSimpleMode: (v: boolean) => void
}

const AccessibilityContext = createContext<AccessibilityState | null>(null)

function getStoredBool(key: string, fallback: boolean): boolean {
  try {
    const v = localStorage.getItem(key)
    return v === null ? fallback : v === "true"
  } catch {
    return fallback
  }
}

function getStoredFontSize(): FontSize {
  try {
    const v = localStorage.getItem("a11y-font-size")
    if (v === "large" || v === "xlarge") return v
  } catch {
    // ignore storage errors
  }
  return "normal"
}

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const prefersHighContrast =
    typeof window !== "undefined" && window.matchMedia("(prefers-contrast: high)").matches
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const [highContrast, setHighContrastState] = useState(() =>
    getStoredBool("a11y-high-contrast", prefersHighContrast)
  )
  const [fontSize, setFontSizeState] = useState<FontSize>(getStoredFontSize)
  const [reduceMotion, setReduceMotionState] = useState(() =>
    getStoredBool("a11y-reduce-motion", prefersReducedMotion)
  )
  const [simpleMode, setSimpleModeState] = useState(() =>
    getStoredBool("a11y-simple-mode", false)
  )

  function setHighContrast(v: boolean) {
    setHighContrastState(v)
    try { localStorage.setItem("a11y-high-contrast", String(v)) } catch { /* ignore */ }
  }

  function setFontSize(v: FontSize) {
    setFontSizeState(v)
    try { localStorage.setItem("a11y-font-size", v) } catch { /* ignore */ }
  }

  function setReduceMotion(v: boolean) {
    setReduceMotionState(v)
    try { localStorage.setItem("a11y-reduce-motion", String(v)) } catch { /* ignore */ }
  }

  function setSimpleMode(v: boolean) {
    setSimpleModeState(v)
    try { localStorage.setItem("a11y-simple-mode", String(v)) } catch { /* ignore */ }
    // Simple Mode is batteries-included: automatically enable reduce motion and max font size
    if (v) {
      setReduceMotionState(true)
      try { localStorage.setItem("a11y-reduce-motion", "true") } catch { /* ignore */ }
      setFontSizeState("xlarge")
      try { localStorage.setItem("a11y-font-size", "xlarge") } catch { /* ignore */ }
    }
  }

  // Apply high-contrast class to html element
  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", highContrast)
  }, [highContrast])

  // Apply font-scale classes to html element
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("font-large", "font-xlarge")
    if (fontSize === "large") root.classList.add("font-large")
    if (fontSize === "xlarge") root.classList.add("font-xlarge")
  }, [fontSize])

  // Apply reduce-motion class to html element (user-controlled, independent of OS)
  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduceMotion)
  }, [reduceMotion])

  // Apply simple-mode class to html element
  useEffect(() => {
    document.documentElement.classList.toggle("simple-mode", simpleMode)
  }, [simpleMode])

  return (
    <AccessibilityContext.Provider
      value={{ highContrast, setHighContrast, fontSize, setFontSize, reduceMotion, setReduceMotion, simpleMode, setSimpleMode }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext)
  if (!ctx) throw new Error("useAccessibility must be used within AccessibilityProvider")
  return ctx
}
