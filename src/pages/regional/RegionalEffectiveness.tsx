import { interventions, municipalities } from "@/data/mock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts"
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart"
import { ChevronRight } from "lucide-react"

const typeLabel: Record<string, string> = {
  education_campaign: "Education Campaign",
  bin_deployment: "Bin Deployment",
  route_adjustment: "Route Adjustment",
  local_pilot: "Local Pilot",
}

const chartConfig = {
  before: { label: "Before", color: "hsl(var(--muted-foreground))" },
  after: { label: "After", color: "hsl(var(--primary))" },
}

// Aggregate by type
const byType = Object.entries(
  interventions.reduce((acc, i) => {
    const type = typeLabel[i.type]
    if (!acc[type]) acc[type] = { before: 0, after: 0, count: 0 }
    acc[type].before += i.beforeRate
    acc[type].after += i.afterRate
    acc[type].count++
    return acc
  }, {} as Record<string, { before: number; after: number; count: number }>)
).map(([type, v]) => ({
  type,
  before: +(v.before / v.count).toFixed(1),
  after: +(v.after / v.count).toFixed(1),
  delta: +((v.after - v.before) / v.count).toFixed(1),
}))

export default function RegionalEffectiveness() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ChevronRight className="w-5 h-5 text-primary" />
        <h1 className="text-2xl font-bold">Action Effectiveness</h1>
      </div>
      <p className="text-sm text-muted-foreground">Which intervention types have the biggest impact on regional recycling rates?</p>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Before vs After Rate by Intervention Type (avg)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[240px]">
            <BarChart data={byType} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[40, 70]} unit="%" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="type" tick={{ fontSize: 11 }} width={140} />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
              <Bar dataKey="before" fill="hsl(var(--muted))" radius={[0, 4, 4, 0]} name="Before" />
              <Bar dataKey="after" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="After" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Impact ranking */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Impact Ranking by Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...byType].sort((a, b) => b.delta - a.delta).map((row, idx) => (
            <div key={row.type} className="flex items-center gap-3">
              <span className="text-lg font-bold text-muted-foreground w-6">{idx + 1}</span>
              <div className="flex-1">
                <p className="text-sm font-medium">{row.type}</p>
                <p className="text-xs text-muted-foreground">{row.before}% → {row.after}%</p>
              </div>
              <Badge className="bg-primary/10 text-primary border-0">+{row.delta}%</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* All interventions list */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Logged Interventions Across Region</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {interventions.map(i => {
            const m = municipalities.find(m2 => m2.id === i.municipalityId)
            return (
              <div key={i.id} className="flex gap-3 items-center py-2 border-b last:border-0">
                <div className="flex-1">
                  <p className="text-sm font-medium">{typeLabel[i.type]}</p>
                  <p className="text-xs text-muted-foreground">{m?.name} · {i.targetZone}</p>
                </div>
                <Badge className="text-[10px] bg-primary/10 text-primary border-0">
                  +{(i.afterRate - i.beforeRate).toFixed(1)}%
                </Badge>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
