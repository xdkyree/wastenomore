import { Link } from "react-router-dom"
import { Recycle, Smartphone, Building2, Globe, Truck, Settings, ArrowRight, UserRound, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AccessibilityToolbar } from "@/components/shared/AccessibilityToolbar"
import { useAccessibility } from "@/context/AccessibilityContext"

function SimpleModeCard() {
  const { simpleMode, setSimpleMode } = useAccessibility()

  return (
    <section
      aria-label="Simple Mode option"
      className={`w-full max-w-5xl mx-auto mb-10 rounded-2xl border-2 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 transition-colors ${
        simpleMode
          ? "border-primary bg-primary/5"
          : "border-border bg-white"
      }`}
    >
      <div
        className={`flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 ${
          simpleMode ? "bg-primary" : "bg-muted"
        }`}
        aria-hidden="true"
      >
        <UserRound className={`w-7 h-7 ${simpleMode ? "text-white" : "text-muted-foreground"}`} />
      </div>

      <div className="flex-1">
        <h2 className="text-lg font-semibold text-foreground leading-tight">
          {simpleMode ? "Simple Mode is on" : "New here? Try Simple Mode"}
        </h2>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          {simpleMode
            ? "Bigger text, larger buttons and no animations are enabled. Everything is easier to read and tap."
            : "Bigger text, larger buttons and a clearer layout — easier to read and use on any phone or tablet."}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {simpleMode ? (
          <>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-primary">
              <Check className="w-4 h-4" aria-hidden="true" />
              Active
            </span>
            <button
              type="button"
              onClick={() => setSimpleMode(false)}
              className="text-sm text-muted-foreground underline underline-offset-4 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring rounded"
              aria-label="Turn off Simple Mode"
            >
              Turn off
            </button>
          </>
        ) : (
          <Button
            size="lg"
            onClick={() => setSimpleMode(true)}
            aria-label="Turn on Simple Mode — larger text and simpler layout"
            className="text-base"
          >
            Turn on Simple Mode
          </Button>
        )}
      </div>
    </section>
  )
}

const roles = [
  {
    id: "citizen",
    label: "Citizen",
    description: "Check pickup schedules, sort items, report issues, and earn rewards for recycling well.",
    href: "/citizen",
    icon: Smartphone,
    badge: "Mobile App",
    color: "bg-emerald-50 border-primary/30",
    iconBg: "bg-primary",
  },
  {
    id: "municipality",
    label: "Municipality",
    description: "Monitor local KPIs, manage incidents, view hotspot maps, and track recycling targets.",
    href: "/municipality",
    icon: Building2,
    badge: "Dashboard",
    color: "bg-teal-50 border-secondary/30",
    iconBg: "bg-secondary",
  },
  {
    id: "regional",
    label: "Regional Authority",
    description: "Compare municipalities, access aggregated reports, and measure intervention effectiveness.",
    href: "/regional",
    icon: Globe,
    badge: "Dashboard",
    color: "bg-sky-50 border-sky-300/30",
    iconBg: "bg-sky-600",
  },
  {
    id: "operator",
    label: "Waste Operator",
    description: "Optimise routes, monitor bin fill levels, track complaints and waste flow volumes.",
    href: "/operator",
    icon: Truck,
    badge: "Dashboard",
    color: "bg-amber-50 border-amber-300/30",
    iconBg: "bg-amber-600",
  },
  {
    id: "admin",
    label: "Admin",
    description: "Configure municipalities, users, waste streams, and data sources for the platform.",
    href: "/admin",
    icon: Settings,
    badge: "Admin Panel",
    color: "bg-slate-50 border-slate-300/30",
    iconBg: "bg-slate-600",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <header className="bg-primary text-white py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
              <Recycle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-widest">WASTENOMORE</h1>
          </div>
          <p className="text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            A smart regional platform that helps cities, operators, and citizens waste less and recycle better through clear data, connected workflows, and actionable insights.
          </p>
          <Badge variant="outline" className="mt-4 text-white border-white/40 bg-white/10">
            Novaterra Region — POC Demo
          </Badge>
        </div>
      </header>

      {/* Role cards */}
      <main className="flex-1 py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <SimpleModeCard />
          <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-wider font-medium">
            Select your role to enter the platform
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {roles.map((role) => (
              <Link key={role.id} to={role.href} className="group">
                <Card className={`h-full border-2 transition-shadow hover:shadow-md ${role.color}`}>
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${role.iconBg} shrink-0`}>
                        <role.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <Badge variant="accent" className="text-[10px] mb-1">{role.badge}</Badge>
                        <h3 className="font-semibold text-base">{role.label}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground flex-1 leading-relaxed">{role.description}</p>
                    <div className="flex items-center gap-1 mt-4 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      Enter <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 border-t text-center text-xs text-muted-foreground">
        WASTENOMORE · Novaterra Region · Proof of Concept · BCG Platinion Challenge
      </footer>

      <AccessibilityToolbar />
    </div>
  )
}
