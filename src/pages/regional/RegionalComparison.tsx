import { kpiSnapshots, municipalities, kpiTrend } from "@/data/mock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts"
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart"
import { BarChart3 } from "lucide-react"

const statusBadge: Record<string, string> = {
  on_track: "bg-primary/10 text-primary border-0",
  at_risk: "bg-yellow-100 text-yellow-700 border-0",
  off_track: "bg-red-100 text-red-700 border-0",
}

const chartConfig = {
  m1: { label: "Verdana", color: "#267351" },
  m2: { label: "Arkholm", color: "#305c54" },
  m3: { label: "Lysveld", color: "#c0d3c7" },
  m4: { label: "Crestmoor", color: "#6ab04c" },
  m5: { label: "Ternwick", color: "#4a90a4" },
  m6: { label: "Salbridge", color: "#e8a838" },
}

export default function RegionalComparison() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h1 className="text-2xl font-bold">Municipality Comparison</h1>
      </div>

      {/* Trend chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">6-Month Recycling Rate Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[260px]">
            <LineChart data={kpiTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis domain={[40, 72]} tick={{ fontSize: 11 }} unit="%" />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
              {Object.entries(chartConfig).map(([key, cfg]) => (
                <Line key={key} type="monotone" dataKey={key} stroke={cfg.color} strokeWidth={1.5} dot={false} name={cfg.label} />
              ))}
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Comparison table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Comparative KPI Table</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Municipality</TableHead>
                <TableHead>Population</TableHead>
                <TableHead>Recycling %</TableHead>
                <TableHead>Target %</TableHead>
                <TableHead>Gap</TableHead>
                <TableHead>Contamination</TableHead>
                <TableHead>Incidents</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpiSnapshots.map(k => {
                const m = municipalities.find(m2 => m2.id === k.municipalityId)!
                const gap = m.targetRecyclingRate - k.recyclingRate
                return (
                  <TableRow key={k.municipalityId}>
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{m.population.toLocaleString()}</TableCell>
                    <TableCell className="font-semibold">{k.recyclingRate}%</TableCell>
                    <TableCell className="text-muted-foreground">{m.targetRecyclingRate}%</TableCell>
                    <TableCell className={gap > 5 ? "text-red-600 font-medium" : gap > 0 ? "text-yellow-600" : "text-primary"}>
                      {gap > 0 ? `-${gap.toFixed(1)}%` : "✓"}
                    </TableCell>
                    <TableCell>{k.contaminationRate}%</TableCell>
                    <TableCell>{k.incidentCount}</TableCell>
                    <TableCell>
                      <Badge className={statusBadge[k.targetStatus]}>{k.targetStatus.replace("_", " ")}</Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
