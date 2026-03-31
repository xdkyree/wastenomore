import { contaminationRecords, municipalities, wasteStreamColors, wasteStreamLabels } from "@/data/mock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Recycle } from "lucide-react"

const byStream = contaminationRecords.reduce((acc, r) => {
  const key = r.wasteStream
  if (!acc[key]) acc[key] = []
  acc[key].push(r.contaminationRate)
  return acc
}, {} as Record<string, number[]>)

const streamAvg = Object.entries(byStream).map(([stream, rates]) => ({
  stream: wasteStreamLabels[stream as keyof typeof wasteStreamLabels],
  avg: +(rates.reduce((a, b) => a + b, 0) / rates.length).toFixed(1),
  color: wasteStreamColors[stream as keyof typeof wasteStreamColors],
})).sort((a, b) => b.avg - a.avg)

const chartConfig = {
  avg: { label: "Contamination %", color: "hsl(var(--primary))" },
}

export default function OperatorContamination() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Recycle className="w-5 h-5 text-primary" />
        <h1 className="text-2xl font-bold">Contamination & Recycling</h1>
      </div>

      {/* Avg contamination per stream */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Avg Contamination Rate by Stream (across region)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <BarChart data={streamAvg} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" unit="%" tick={{ fontSize: 11 }} domain={[0, 25]} />
              <YAxis type="category" dataKey="stream" tick={{ fontSize: 11 }} width={120} />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="avg" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Contamination %" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Per municipality per stream */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contamination by Municipality &amp; Stream</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {contaminationRecords.map(r => {
              const m = municipalities.find(m2 => m2.id === r.municipalityId)
              const high = r.contaminationRate >= 15
              const medium = r.contaminationRate >= 10
              return (
                <div key={r.id} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-24">{m?.name}</span>
                  <span className="text-xs font-medium w-24 capitalize">{wasteStreamLabels[r.wasteStream]}</span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${high ? "bg-destructive" : medium ? "bg-yellow-400" : "bg-primary"}`}
                      style={{ width: `${(r.contaminationRate / 25) * 100}%` }}
                    />
                  </div>
                  <span className={`text-xs font-semibold w-12 text-right ${high ? "text-red-600" : medium ? "text-yellow-600" : "text-primary"}`}>
                    {r.contaminationRate}%
                  </span>
                  {high && <Badge className="bg-red-100 text-red-700 border-0 text-[10px]">High</Badge>}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Savings estimates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cost & Efficiency Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Estimated trips saved", value: "14", unit: "this month", color: "text-primary" },
              { label: "Overflow avoided", value: "8", unit: "incidents prevented", color: "text-primary" },
              { label: "Route efficiency gain", value: "+18%", unit: "vs baseline route", color: "text-primary" },
            ].map(s => (
              <div key={s.label} className="text-center rounded-lg border p-3">
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
                <p className="text-[10px] text-muted-foreground/70">{s.unit}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
