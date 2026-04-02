import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Search, AlertCircle, Home, CreditCard, LogOut } from "lucide-react"
import { AccessibilityToolbar } from "@/components/shared/AccessibilityToolbar"
import { useAccessibility } from "@/context/AccessibilityContext"

interface CitizenLayoutProps {
  children: React.ReactNode
}

const navItems = [
  { label: "Home",     href: "/citizen",           icon: Home },
  { label: "Sort",     href: "/citizen/sort",       icon: Search },
  { label: "Report",   href: "/citizen/report",     icon: AlertCircle },
  { label: "Pay",      href: "/citizen/pay",        icon: CreditCard },
]

export function CitizenLayout({ children }: CitizenLayoutProps) {
  const location = useLocation()
  const { simpleMode } = useAccessibility()

  const [liveAnnouncement, setLiveAnnouncement] = useState("")
  useEffect(() => {
    const active = navItems.find((item) => item.href === location.pathname)
    if (active) setLiveAnnouncement(`Navigated to: ${active.label}`)
  }, [location.pathname])

  return (
    <div className="h-[100dvh] overflow-hidden bg-background flex justify-center md:min-h-screen md:h-auto md:items-center md:p-4">
      <AccessibilityToolbar showSpeak placement="bottom-above-nav" />
      <div className="relative w-full h-[100dvh] overflow-hidden bg-white flex flex-col shadow-lg md:h-[calc(100vh-2rem)] md:w-auto md:min-h-0 md:aspect-[9/19.5] md:max-w-none md:rounded-[2rem] md:border">
        {/* Status bar area */}
        <div className={cn("flex items-center justify-between px-5 bg-primary", simpleMode ? "h-16" : "h-12")}>
          <span className={cn("text-white font-semibold tracking-wide", simpleMode ? "text-base" : "text-sm")}>WASTENOMORE</span>
          <div className="flex items-center gap-2">
            {simpleMode && (
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-full">
                Simple
              </span>
            )}
            <span className="text-white/70 text-xs">Verdana</span>
            <Link
              to="/roles"
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-white/90 hover:bg-white/15"
              aria-label="Log out"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </Link>
          </div>
        </div>

        {/* Screen-reader page-change announcer */}
        <div aria-live="polite" aria-atomic="true" role="status" className="sr-only">
          {liveAnnouncement}
        </div>

        {/* Page content — id used by TTS to read only the relevant area */}
        <div id="citizen-page-content" className="mobile-app-scroll flex-1 min-h-0 overflow-y-auto pb-24">
          {children}
        </div>

        {/* Bottom nav */}
        <nav
          className="absolute bottom-0 left-0 z-20 w-full border-t bg-white"
          aria-label="Main navigation"
          role="navigation"
        >
          <div className={cn("flex items-center justify-around px-2", simpleMode ? "h-[88px]" : "h-20")}>
            {navItems.map((item) => {
              const active = location.pathname === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-label={item.label}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "simple-nav-item flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors",
                    simpleMode ? "min-h-[72px]" : "min-h-[56px]",
                    active
                      ? cn("text-primary", simpleMode && "border-t-4 border-primary bg-primary/5 rounded-t-none")
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon
                    className={cn(
                      active && "stroke-[2.5]",
                      simpleMode ? "w-7 h-7" : "w-5 h-5"
                    )}
                    aria-hidden="true"
                  />
                  <span className={cn("font-medium", simpleMode ? "text-base" : "text-[11px]")}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
