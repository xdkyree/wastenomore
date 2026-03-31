import { Link } from "react-router-dom"
import { Calendar, Search, AlertCircle, BookOpen, Star, TrendingUp, Recycle, CreditCard } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { invoices } from "@/data/mock"

const outstandingAmount = invoices
  .filter((i) => i.status === "outstanding" || i.status === "overdue")
  .reduce((s, i) => s + i.amount, 0)

const hasOverdue = invoices.some((i) => i.status === "overdue")

const quickActions = [
  { label: "Pickup Schedule", icon: Calendar, href: "/citizen/schedule", color: "bg-primary", desc: "Next: Plastic — Tomorrow" },
  { label: "Sort an Item", icon: Search, href: "/citizen/sort", color: "bg-secondary", desc: "Find the right bin" },
  { label: "Report Issue", icon: AlertCircle, href: "/citizen/report", color: "bg-amber-500", desc: "Overflow, missed pick up…" },
  { label: "Education", icon: BookOpen, href: "/citizen/education", color: "bg-sky-500", desc: "Tips & local news" },
]

export default function CitizenHome() {
  return (
    <div className="px-4 py-5 space-y-5">
      {/* Greeting */}
      <div>
        <h2 className="text-lg font-semibold">Hello, Marie 👋</h2>
        <p className="text-sm text-muted-foreground">Verdana · Northgate</p>
      </div>

      {/* Points card */}
      <Card className="bg-primary text-white border-0">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-white/80" />
              <span className="text-sm font-medium">Your recycling score</span>
            </div>
            <Badge className="bg-white/20 text-white text-xs">Level 4</Badge>
          </div>
          <p className="text-3xl font-bold">1,240 pts</p>
          <p className="text-xs text-white/70 mt-1">260 pts until next badge</p>
          <Progress value={82} className="mt-2 bg-white/20 [&>div]:bg-white" />
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium mb-3">Quick Actions</p>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((a) => (
            <Link key={a.href} to={a.href}>
              <Card className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4 flex flex-col gap-2">
                  <div className={`w-9 h-9 rounded-lg ${a.color} flex items-center justify-center`}>
                    <a.icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm font-medium leading-tight">{a.label}</p>
                  <p className="text-[11px] text-muted-foreground">{a.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Pay bill banner — shown when there is an outstanding/overdue amount */}
      {outstandingAmount > 0 && (
        <Link to="/citizen/pay" aria-label={`Pay your waste bill: €${outstandingAmount.toFixed(2).replace(".", ",")} outstanding`}>
          <Card className={`border-2 ${hasOverdue ? "border-destructive/40 bg-destructive/5" : "border-amber-300/50 bg-amber-50/50"}`}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${hasOverdue ? "bg-destructive/10" : "bg-amber-100"}`}>
                <CreditCard className={`w-4 h-4 ${hasOverdue ? "text-destructive" : "text-amber-600"}`} aria-hidden="true" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {hasOverdue ? "Overdue invoice" : "Invoice due soon"}
                </p>
                <p className="text-xs text-muted-foreground">€{outstandingAmount.toFixed(2).replace(".", ",")} outstanding</p>
              </div>
              <span className="text-xs font-semibold text-primary">Pay now →</span>
            </CardContent>
          </Card>
        </Link>
      )}

      {/* Community card */}
      <Card className="border-accent bg-accent/20">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
            <Recycle className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold">Northgate Challenge</p>
            <p className="text-xs text-muted-foreground">Your zone is <strong>#2</strong> in the region this month</p>
          </div>
          <TrendingUp className="w-4 h-4 text-primary ml-auto shrink-0" />
        </CardContent>
      </Card>

      {/* Tip */}
      <div className="rounded-lg bg-muted/40 border px-4 py-3">
        <p className="text-xs font-semibold text-foreground mb-0.5">💡 Did you know?</p>
        <p className="text-xs text-muted-foreground">Plastic bags should NOT go in the plastic bin — they jam sorting machines. Return them to supermarket collection points.</p>
      </div>
    </div>
  )
}
