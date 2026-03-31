import { pickupSchedule, wasteStreamLabels, wasteStreamColors } from "@/data/mock"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })
}

function isToday(dateStr: string): boolean {
  return new Date(dateStr).toDateString() === new Date().toDateString()
}

function isTomorrow(dateStr: string): boolean {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return new Date(dateStr).toDateString() === tomorrow.toDateString()
}

function dayLabel(dateStr: string): string {
  if (isToday(dateStr)) return "Today"
  if (isTomorrow(dateStr)) return "Tomorrow"
  return formatDate(dateStr)
}

export default function PickupSchedule() {
  return (
    <div className="px-4 py-5 space-y-4">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Pickup Schedule</h2>
      </div>
      <p className="text-sm text-muted-foreground">Verdana — All zones</p>

      <div className="space-y-3">
        {pickupSchedule.map((p) => {
          const label = dayLabel(p.date)
          const isHighlighted = label === "Tomorrow" || label === "Today"
          return (
            <Card key={p.id} className={isHighlighted ? "border-primary border-2" : ""}>
              <CardContent className="py-4 px-4 flex items-center gap-3">
                <div
                  className="w-3 h-10 rounded-full shrink-0"
                  style={{ backgroundColor: wasteStreamColors[p.wasteStream] }}
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{wasteStreamLabels[p.wasteStream]}</p>
                  <p className="text-xs text-muted-foreground">{p.area}</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-semibold ${isHighlighted ? "text-primary" : "text-muted-foreground"}`}>
                    {label}
                  </p>
                  {isHighlighted && (
                    <Badge className="text-[10px] mt-1 bg-primary/10 text-primary border-0">Reminder set</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
