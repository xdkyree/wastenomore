import { bins, trucks, incidents, kpiSnapshots, municipalities } from "@/data/mock"
import { KPICard } from "@/components/shared/KPICard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, AlertCircle } from "lucide-react"

const binStatusColor: Record<string, string> = {
  normal: "bg-primary/10 text-primary border-0",
  almost_full: "bg-yellow-100 text-yellow-700 border-0",
  full: "bg-red-100 text-red-700 border-0",
  offline: "bg-muted text-muted-foreground border-0",
}

const truckStatusColor: Record<string, string> = {
  active: "bg-primary/10 text-primary border-0",
  idle: "bg-muted text-muted-foreground border-0",
  maintenance: "bg-red-100 text-red-700 border-0",
}

const criticalBins = bins.filter(b => b.status === "full" || b.status === "almost_full")
const activeIncidents = incidents.filter(i => i.status === "open")
const totalRecycling = (kpiSnapshots.reduce((a, k) => a + k.recyclingRate, 0) / kpiSnapshots.length).toFixed(1)

export default function OperatorOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <LayoutDashboard className="w-5 h-5 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Operations Overview</h1>
          <p className="text-sm text-muted-foreground">WasteCo Operations · March 27, 2026</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KPICard title="Active Trucks" value={trucks.filter(t => t.status === "active").length} suffix={` / ${trucks.length}`} highlight="neutral" />
        <KPICard title="Critical Bins" value={criticalBins.length} highlight={criticalBins.length > 5 ? "negative" : "warning"} trendLabel="Need attention" />
        <KPICard title="Open Incidents" value={activeIncidents.length} highlight={activeIncidents.length > 4 ? "negative" : "neutral"} />
        <KPICard title="Avg Recycling" value={`${totalRecycling}%`} highlight="neutral" trend="up" trendLabel="+1.5% vs last month" />
      </div>

      {/* Truck fleet status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Fleet Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {trucks.map(t => (
              <div key={t.id} className="border rounded-lg p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{t.id.toUpperCase()}</span>
                  <Badge className={truckStatusColor[t.status]}>{t.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t.currentLat.toFixed(3)}, {t.currentLon.toFixed(3)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live bin alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" /> Active Bin Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {criticalBins.map(b => {
              const m = municipalities.find(m2 => m2.id === b.municipalityId)
              return (
                <div key={b.id} className="flex items-center gap-3 py-2 border-b last:border-0">
                  <Badge className={binStatusColor[b.status]}>{b.status.replace("_", " ")}</Badge>
                  <div className="flex-1">
                    <p className="text-sm font-medium capitalize">{b.wasteStream} bin</p>
                    <p className="text-xs text-muted-foreground">{m?.name} · Bin {b.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{b.fillPercent}%</p>
                    <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden mt-1">
                      <div
                        className={`h-full rounded-full ${b.fillPercent >= 90 ? "bg-destructive" : "bg-yellow-400"}`}
                        style={{ width: `${b.fillPercent}%` }}
                      />
                    </div>
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
