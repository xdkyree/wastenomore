import { kpiSnapshots, kpiTrend, municipalities } from "@/data/mock"
import { KPICard } from "@/components/shared/KPICard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const mId = "m1"
const kpi = kpiSnapshots.find(k => k.municipalityId === mId)!
const muni = municipalities.find(m => m.id === mId)!

const trendData = kpiTrend.map(d => ({ month: d.month, recyclingRate: d.m1 }))

const chartConfig = {
  recyclingRate: { label: "Recycling Rate", color: "hsl(var(--primary))" },
}

const targetStatusBadge: Record<string, { label: string; class: string }> = {
  on_track: { label: "On Track", class: "bg-primary/10 text-primary border-0" },
  at_risk: { label: "At Risk", class: "bg-yellow-100 text-yellow-700 border-0" },
  off_track: { label: "Off Track", class: "bg-red-100 text-red-700 border-0" },
}

export default function MunicipalityOverview() {
  const badge = targetStatusBadge[kpi.targetStatus]
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{muni.name}</h1>
          <p className="text-muted-foreground text-sm">Municipality Dashboard · March 2026</p>
        </div>
        <Badge className={badge.class}>{badge.label}</Badge>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <KPICard title="Recycling Rate" value={`${kpi.recyclingRate}%`} highlight={kpi.recyclingRate >= muni.targetRecyclingRate ? "positive" : "warning"} trend="up" trendLabel="+1.1% since Feb" />
        <KPICard title="Target" value={`${muni.targetRecyclingRate}%`} highlight="neutral" trendLabel={`Gap: ${(muni.targetRecyclingRate - kpi.recyclingRate).toFixed(1)}%`} />
        <KPICard title="Contamination" value={`${kpi.contaminationRate}%`} highlight="warning" trend="down" trendLabel="-0.3% vs last month" />
        <KPICard title="Open Incidents" value={kpi.incidentCount} highlight={kpi.incidentCount > 6 ? "negative" : "neutral"} />
        <KPICard title="Overflow Events" value={kpi.overflowCount} highlight={kpi.overflowCount > 2 ? "warning" : "neutral"} />
        <KPICard title="Penalty Risk" value={kpi.penaltyRiskScore} suffix="/100" highlight={kpi.penaltyRiskScore > 60 ? "negative" : kpi.penaltyRiskScore > 30 ? "warning" : "positive"} />
      </div>

      {/* Trend chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recycling Rate Trend — {muni.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[220px]">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis domain={[50, 75]} tick={{ fontSize: 11 }} unit="%" />
              <Tooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="recyclingRate" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="Recycling Rate" />
              {/* Target reference */}
              <Line type="monotone" dataKey={() => muni.targetRecyclingRate} stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" strokeWidth={1.5} dot={false} name="Target" />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Incident Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { label: "Overflow", count: 5, pct: 62 },
                { label: "Contamination", count: 2, pct: 25 },
                { label: "Illegal Dumping", count: 1, pct: 13 },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3">
                  <span className="text-sm w-36">{row.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${row.pct}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground w-4 text-right">{row.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Education Recommendation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { topic: "Plastic bag sorting", reason: "High plastic contamination (12.4%)" },
                { topic: "Organic bin mistakes", reason: "Repeated electronics in organic stream" },
                { topic: "Illegal dumping awareness", reason: "3 incidents in Old Quarter" },
              ].map((r) => (
                <div key={r.topic} className="flex gap-3 items-start rounded-md bg-accent/30 px-3 py-2">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{r.topic}</p>
                    <p className="text-xs text-muted-foreground">{r.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
