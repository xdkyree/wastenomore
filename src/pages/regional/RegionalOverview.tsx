import { kpiSnapshots, municipalities, kpiTrend } from "@/data/mock"
import { KPICard } from "@/components/shared/KPICard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Globe } from "lucide-react"

const statusBadge: Record<string, string> = {
  on_track: "bg-primary/10 text-primary border-0",
  at_risk: "bg-yellow-100 text-yellow-700 border-0",
  off_track: "bg-red-100 text-red-700 border-0",
}

const avgRecycling = (kpiSnapshots.reduce((a, k) => a + k.recyclingRate, 0) / kpiSnapshots.length).toFixed(1)
const avgContamination = (kpiSnapshots.reduce((a, k) => a + k.contaminationRate, 0) / kpiSnapshots.length).toFixed(1)
const totalIncidents = kpiSnapshots.reduce((a, k) => a + k.incidentCount, 0)
const atRisk = kpiSnapshots.filter(k => k.targetStatus !== "on_track").length

const barData = kpiSnapshots.map(k => ({
  name: municipalities.find(m => m.id === k.municipalityId)?.name ?? k.municipalityId,
  recyclingRate: k.recyclingRate,
  target: municipalities.find(m => m.id === k.municipalityId)?.targetRecyclingRate ?? 60,
}))

const chartConfig = {
  recyclingRate: { label: "Recycling Rate", color: "hsl(var(--primary))" },
  target: { label: "Target", color: "hsl(var(--muted-foreground))" },
}

const trendChartConfig = {
  m1: { label: "Verdana", color: "#267351" },
  m2: { label: "Arkholm", color: "#305c54" },
  m3: { label: "Lysveld", color: "#c0d3c7" },
  m4: { label: "Crestmoor", color: "#6ab04c" },
}

export default function RegionalOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Globe className="w-5 h-5 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Novaterra Regional Overview</h1>
          <p className="text-sm text-muted-foreground">37 municipalities · March 2026</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KPICard title="Avg Recycling Rate" value={`${avgRecycling}%`} highlight="neutral" trend="up" trendLabel="+1.5% vs last month" />
        <KPICard title="Avg Contamination" value={`${avgContamination}%`} highlight="warning" trend="down" trendLabel="-0.4% vs last month" />
        <KPICard title="Total Incidents" value={totalIncidents} highlight="neutral" />
        <KPICard title="At Risk / Off Track" value={atRisk} suffix={` / ${kpiSnapshots.length}`} highlight={atRisk > 3 ? "negative" : "warning"} />
      </div>

      {/* Bar chart — recycling vs target */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recycling Rate vs Target by Municipality</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[220px]">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis domain={[40, 75]} unit="%" tick={{ fontSize: 11 }} />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="recyclingRate" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Recycling Rate" />
              <Bar dataKey="target" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} name="Target" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Municipality status list */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Municipality Status Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {kpiSnapshots.map(k => {
              const m = municipalities.find(m2 => m2.id === k.municipalityId)!
              return (
                <div key={k.municipalityId} className="flex items-center gap-3">
                  <div className="w-28 text-sm font-medium">{m.name}</div>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(k.recyclingRate / m.targetRecyclingRate) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-12 text-right">{k.recyclingRate}%</span>
                  <Badge className={statusBadge[k.targetStatus]}>{k.targetStatus.replace("_", " ")}</Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
