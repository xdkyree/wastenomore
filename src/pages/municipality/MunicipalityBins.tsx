import { bins, zones } from "@/data/mock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Recycle, AlertTriangle } from "lucide-react"

const recommendations = [
  { zone: "Northgate", reason: "3 overflow incidents in 30 days", priority: "high" },
  { zone: "Old Quarter", reason: "Plastic bin constantly at >90% fill", priority: "high" },
  { zone: "Riverside", reason: "Organic complaints above zone average", priority: "medium" },
]

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-700 border-0",
  medium: "bg-yellow-100 text-yellow-700 border-0",
  low: "bg-muted text-muted-foreground border-0",
}

const fillColor = (pct: number) =>
  pct >= 90 ? "bg-destructive" : pct >= 70 ? "bg-yellow-400" : "bg-primary"

export default function MunicipalityBins() {
  const m1Bins = bins.filter(b => b.municipalityId === "m1")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Recycle className="w-5 h-5 text-primary" />
        <h1 className="text-2xl font-bold">Bin Planning</h1>
      </div>

      {/* Recommended placements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            Recommended New Bin Locations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recommendations.map((r) => (
            <div key={r.zone} className="flex gap-3 items-center rounded-md border px-4 py-3">
              <Badge className={priorityColors[r.priority]}>{r.priority}</Badge>
              <div className="flex-1">
                <p className="text-sm font-medium">{r.zone}</p>
                <p className="text-xs text-muted-foreground">{r.reason}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Current bin fill status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Bin Fill Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {m1Bins.map(bin => {
              const zone = zones.find(z => z.id === bin.zoneId)
              return (
                <div key={bin.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <span className="text-sm font-medium capitalize">{bin.wasteStream}</span>
                      <span className="text-xs text-muted-foreground ml-2">— {zone?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{bin.fillPercent}%</span>
                      {bin.status === "offline" ? (
                        <Badge variant="outline" className="text-[10px] border-gray-300 text-gray-500">offline</Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${bin.fillPercent >= 90 ? "border-red-300 text-red-600" : bin.fillPercent >= 70 ? "border-yellow-300 text-yellow-600" : "border-primary/30 text-primary"}`}
                        >
                          {bin.status.replace("_", " ")}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${fillColor(bin.fillPercent)}`}
                      style={{ width: `${bin.fillPercent}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
