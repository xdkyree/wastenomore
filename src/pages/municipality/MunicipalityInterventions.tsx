import { interventions } from "@/data/mock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell,
} from "recharts"
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart"
import { Plus, ChevronRight } from "lucide-react"

const typeBadge: Record<string, string> = {
  education_campaign: "bg-sky-100 text-sky-700 border-0",
  bin_deployment: "bg-primary/10 text-primary border-0",
  route_adjustment: "bg-secondary/10 text-secondary border-0",
  local_pilot: "bg-violet-100 text-violet-700 border-0",
}

const typeLabel: Record<string, string> = {
  education_campaign: "Education Campaign",
  bin_deployment: "Bin Deployment",
  route_adjustment: "Route Adjustment",
  local_pilot: "Local Pilot",
}

const m1Interventions = interventions.filter(i => i.municipalityId === "m1")

const chartData = m1Interventions.map(i => ({
  name: typeLabel[i.type],
  before: i.beforeRate,
  after: i.afterRate,
  delta: +(i.afterRate - i.beforeRate).toFixed(1),
}))

const chartConfig = {
  before: { label: "Before", color: "hsl(var(--muted-foreground))" },
  after: { label: "After", color: "hsl(var(--primary))" },
}

export default function MunicipalityInterventions() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ChevronRight className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold">Intervention Tracking</h1>
        </div>
        <Button size="sm">
          <Plus className="w-3.5 h-3.5 mr-1" /> Log intervention
        </Button>
      </div>

      {/* Before/after chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Before vs After Recycling Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[220px]">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[40, 70]} unit="%" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={130} />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
              <Bar dataKey="before" fill="hsl(var(--muted))" radius={[0, 4, 4, 0]} name="Before" />
              <Bar dataKey="after" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="After" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Intervention cards */}
      <div className="space-y-3">
        {m1Interventions.map(i => (
          <Card key={i.id}>
            <CardContent className="py-4 px-5">
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={typeBadge[i.type]}>{typeLabel[i.type]}</Badge>
                    <span className="text-xs text-muted-foreground">{i.targetZone}</span>
                  </div>
                  <p className="text-sm font-medium">{i.description}</p>
                  <p className="text-xs text-muted-foreground">{i.startDate} → {i.endDate}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-bold text-primary">+{(i.afterRate - i.beforeRate).toFixed(1)}%</p>
                  <p className="text-[10px] text-muted-foreground">recycling rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
