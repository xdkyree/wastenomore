import { bins, municipalities } from "@/data/mock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

const binStatusBadge: Record<string, string> = {
  normal: "bg-primary/10 text-primary border-0",
  almost_full: "bg-yellow-100 text-yellow-700 border-0",
  full: "bg-red-100 text-red-700 border-0",
  offline: "bg-muted text-muted-foreground border-0",
}

const sortedBins = [...bins].sort((a, b) => b.fillPercent - a.fillPercent)

export default function OperatorBinAlerts() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-primary" />
        <h1 className="text-2xl font-bold">Bin Alerts</h1>
      </div>
      <p className="text-sm text-muted-foreground">All bins sorted by fill level — highest priority first.</p>

      <div className="space-y-2">
        {sortedBins.map(b => {
          const m = municipalities.find(m2 => m2.id === b.municipalityId)
          const fillColor = b.fillPercent >= 90 ? "bg-destructive" : b.fillPercent >= 70 ? "bg-yellow-400" : "bg-primary"
          return (
            <Card key={b.id}>
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <Badge className={binStatusBadge[b.status]}>{b.status.replace("_", " ")}</Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium capitalize">{b.wasteStream} bin · {b.id.toUpperCase()}</p>
                    <p className="text-xs text-muted-foreground">{m?.name} · Zone {b.zoneId}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className="text-sm font-bold">{b.fillPercent}%</p>
                      <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden mt-1">
                        <div className={`h-full rounded-full ${fillColor}`} style={{ width: `${b.fillPercent}%` }} />
                      </div>
                    </div>
                    {(b.status === "full" || b.status === "almost_full") && (
                      <Button variant="outline" size="sm" className="text-xs h-7">Dispatch</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
