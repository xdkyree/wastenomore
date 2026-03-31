import { useEffect, useRef, useState } from "react"
import { useAccessibility, type FontSize } from "@/context/AccessibilityContext"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Accessibility, Contrast, Pause, Type, Volume2, VolumeX, X } from "lucide-react"

interface AccessibilityToolbarProps {
  /** Show the "Read page aloud" TTS button — intended for the citizen app */
  showSpeak?: boolean
  /** Position of the floating panel. Use "bottom-above-nav" in CitizenLayout to clear the bottom nav bar */
  placement?: "bottom-right" | "bottom-above-nav"
}

const placementClass: Record<string, string> = {
  "bottom-right": "fixed bottom-6 right-6 z-50",
  "bottom-above-nav": "fixed bottom-[5.5rem] right-4 z-50",
}

/** Reusable accessible toggle switch */
function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 transition-colors",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2",
        checked ? "bg-primary border-primary" : "bg-muted border-muted-foreground/40"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </button>
  )
}

export function AccessibilityToolbar({
  showSpeak = false,
  placement = "bottom-right",
}: AccessibilityToolbarProps) {
  const [open, setOpen] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleBtnRef = useRef<HTMLButtonElement>(null)

  const { highContrast, setHighContrast, fontSize, setFontSize, reduceMotion, setReduceMotion } =
    useAccessibility()

  // Close panel on Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        toggleBtnRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open])

  // Move focus into panel when it opens
  useEffect(() => {
    if (open) {
      const first = panelRef.current?.querySelector<HTMLElement>("button, [tabindex='0']")
      // Small timeout ensures the panel is fully rendered before focusing
      const id = setTimeout(() => first?.focus(), 20)
      return () => clearTimeout(id)
    }
  }, [open])

  // Cancel speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel()
    }
  }, [])

  function toggleSpeak() {
    if (!("speechSynthesis" in window)) return
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }
    // Read the main page content area; fall back to full body
    const content =
      document.getElementById("citizen-page-content")?.innerText ??
      document.getElementById("main-content")?.innerText ??
      document.body.innerText
    const utterance = new SpeechSynthesisUtterance(content.slice(0, 4000))
    utterance.rate = 0.9
    utterance.lang = document.documentElement.lang || "en"
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  const fontSizeOptions: Array<{ value: FontSize; label: string; desc: string }> = [
    { value: "normal", label: "A", desc: "Normal text size" },
    { value: "large", label: "A+", desc: "Large text (112%)" },
    { value: "xlarge", label: "A++", desc: "Extra large text (125%)" },
  ]

  return (
    <div className={cn("flex flex-col items-end gap-3", placementClass[placement])}>
      {/* Settings panel */}
      {open && (
        <div
          ref={panelRef}
          id="a11y-panel"
          role="dialog"
          aria-label="Accessibility settings"
          aria-modal="false"
          className="bg-white border border-border rounded-2xl shadow-2xl p-5 w-72"
        >
          {/* Panel header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Accessibility className="w-4 h-4 text-primary" aria-hidden="true" />
              <h2 className="text-sm font-semibold text-foreground">Accessibility</h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                toggleBtnRef.current?.focus()
              }}
              aria-label="Close accessibility settings"
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring transition-colors"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-5">
            {/* High Contrast toggle */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-2.5">
                <Contrast className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-foreground leading-tight">High Contrast</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Stronger colour differences</p>
                </div>
              </div>
              <Toggle
                checked={highContrast}
                onChange={setHighContrast}
                label="Toggle high contrast mode"
              />
            </div>

            {/* Font size buttons */}
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <Type className="w-4 h-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <p className="text-sm font-medium text-foreground">Text Size</p>
              </div>
              <div className="flex gap-2" role="group" aria-label="Choose text size">
                {fontSizeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFontSize(opt.value)}
                    aria-pressed={fontSize === opt.value}
                    aria-label={opt.desc}
                    className={cn(
                      "flex-1 py-2 rounded-lg border text-sm font-bold transition-colors",
                      "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-1",
                      fontSize === opt.value
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-white border-border text-foreground hover:bg-muted"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reduce Motion toggle */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-2.5">
                <Pause className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-foreground leading-tight">Reduce Motion</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Disable animations</p>
                </div>
              </div>
              <Toggle
                checked={reduceMotion}
                onChange={setReduceMotion}
                label="Toggle reduce motion"
              />
            </div>

            {/* Text-to-speech — citizen app only */}
            {showSpeak && (
              <div className="pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={toggleSpeak}
                  aria-label={isSpeaking ? "Stop reading aloud" : "Read this page aloud using text-to-speech"}
                  aria-pressed={isSpeaking}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring",
                    isSpeaking
                      ? "bg-destructive text-destructive-foreground border-destructive"
                      : "bg-white border-border text-foreground hover:bg-muted"
                  )}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-4 h-4" aria-hidden="true" />
                      Stop reading
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" aria-hidden="true" />
                      Read page aloud
                    </>
                  )}
                </button>
                {"speechSynthesis" in window ? null : (
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Not supported in this browser
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <Button
        ref={toggleBtnRef}
        type="button"
        variant={open ? "default" : "outline"}
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg border-2"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close accessibility settings" : "Open accessibility settings"}
        aria-expanded={open}
        aria-controls="a11y-panel"
      >
        <Accessibility className="w-5 h-5" aria-hidden="true" />
      </Button>
    </div>
  )
}
