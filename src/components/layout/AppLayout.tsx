import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { AccessibilityToolbar } from "@/components/shared/AccessibilityToolbar"
import {
  LayoutDashboard, MapPin, AlertCircle, BookOpen, BarChart3,
  Recycle, Settings, LogOut, ChevronRight, Truck, Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

interface AppLayoutProps {
  children: React.ReactNode
  role: "municipality" | "regional" | "operator" | "admin"
  userName: string
  municipalityName?: string
}

const navItems: Record<AppLayoutProps["role"], NavItem[]> = {
  municipality: [
    { label: "Overview", href: "/municipality", icon: LayoutDashboard },
    { label: "Incidents", href: "/municipality/incidents", icon: AlertCircle },
    { label: "Hotspot Map", href: "/municipality/map", icon: MapPin },
    { label: "Education", href: "/municipality/education", icon: BookOpen },
    { label: "Bin Planning", href: "/municipality/bins", icon: Recycle },
    { label: "Targets & Penalty", href: "/municipality/targets", icon: BarChart3 },
    { label: "Interventions", href: "/municipality/interventions", icon: ChevronRight },
  ],
  regional: [
    { label: "Regional Overview", href: "/regional", icon: LayoutDashboard },
    { label: "Municipality Comparison", href: "/regional/comparison", icon: BarChart3 },
    { label: "Hotspot Map", href: "/regional/map", icon: MapPin },
    { label: "Effectiveness", href: "/regional/effectiveness", icon: ChevronRight },
    { label: "Reporting", href: "/regional/reporting", icon: BookOpen },
  ],
  operator: [
    { label: "Operations", href: "/operator", icon: LayoutDashboard },
    { label: "Route Optimization", href: "/operator/routes", icon: Truck },
    { label: "Bin Alerts", href: "/operator/bins", icon: AlertCircle },
    { label: "Complaints", href: "/operator/complaints", icon: Users },
    { label: "Waste Flow", href: "/operator/flow", icon: BarChart3 },
    { label: "Contamination", href: "/operator/contamination", icon: Recycle },
  ],
  admin: [
    { label: "Users & Roles", href: "/admin", icon: Users },
    { label: "Master Data", href: "/admin/master", icon: Settings },
    { label: "Data Uploads", href: "/admin/uploads", icon: BarChart3 },
  ],
}

const roleLabels: Record<AppLayoutProps["role"], string> = {
  municipality: "Municipality",
  regional: "Regional Authority",
  operator: "Waste Operator",
  admin: "Administrator",
}

export function AppLayout({ children, role, userName, municipalityName }: AppLayoutProps) {
  const location = useLocation()
  const items = navItems[role]

  const [liveAnnouncement, setLiveAnnouncement] = useState("")
  useEffect(() => {
    const active = items.find((item) => item.href === location.pathname)
    if (active) setLiveAnnouncement(`Navigated to: ${active.label}`)
  }, [location.pathname, items])

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Skip to main content — visible on focus for keyboard users */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Sidebar */}
      <aside className="w-64 flex flex-col border-r bg-white" aria-label="Application sidebar">
        {/* Brand */}
        <div className="h-16 flex items-center gap-2 px-6 border-b">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary">
            <Recycle className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold tracking-wide text-primary leading-none">WASTENOMORE</p>
            <p className="text-[10px] text-muted-foreground leading-none mt-0.5">{roleLabels[role]}</p>
          </div>
        </div>

        {/* Nav */}
        <ScrollArea className="flex-1 py-4">
          <nav className="px-3 space-y-1" aria-label="Sidebar navigation">
            {items.map((item) => {
              const active = location.pathname === item.href
              return (
                <Link key={item.href} to={item.href} aria-current={active ? "page" : undefined}>
                  <div className={cn(
                    "flex items-center gap-3 px-3 py-2.5 min-h-[44px] rounded-md text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}>
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                  </div>
                </Link>
              )
            })}
          </nav>
        </ScrollArea>

        {/* User */}
        <Separator />
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-accent text-foreground text-xs">
                {userName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{userName}</p>
              {municipalityName && <p className="text-[10px] text-muted-foreground truncate">{municipalityName}</p>}
            </div>
            <Link to="/roles">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground" aria-label="Log out">
                <LogOut className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main id="main-content" className="flex-1 flex flex-col overflow-hidden">
        {/* Screen-reader page-change announcer */}
        <div aria-live="polite" aria-atomic="true" role="status" className="sr-only">
          {liveAnnouncement}
        </div>
        <ScrollArea className="flex-1">
          <div className="p-6">
            {children}
          </div>
        </ScrollArea>
        <AccessibilityToolbar />
      </main>
    </div>
  )
}
