import { wasteFlowRecords, contaminationRecords, municipalities, wasteStreamColors, wasteStreamLabels } from "@/data/mock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell,
} from "recharts"
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart"
import { BarChart3 } from "lucide-react"

// Volume by stream across region
const streamTotals = wasteFlowRecords.reduce((acc, r) => {
  if (!acc[r.wasteStream]) acc[r.wasteStream] = { collected: 0, recycled: 0 }
  acc[r.wasteStream].collected += r.collectedVolume
  acc[r.wasteStream].recycled += r.recycledVolume
  return acc
}, {} as Record<string, { collected: number; recycled: number }>)

const volumeData = Object.entries(streamTotals).map(([stream, v]) => ({
  stream: wasteStreamLabels[stream as keyof typeof wasteStreamLabels],
  collected: v.collected,
  recycled: v.recycled,
  color: wasteStreamColors[stream as keyof typeof wasteStreamColors],
}))

const pieData = volumeData.map(d => ({
  name: d.stream,
  value: d.collected,
  color: d.color,
}))

const chartConfig = {
  collected: { label: "Collected", color: "hsl(var(--muted))" },
  recycled: { label: "Recycled", color: "hsl(var(--primary))" },
}

export default function OperatorWasteFlow() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h1 className="text-2xl font-bold">Waste Flow Analytics</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar chart volume */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Collected vs Recycled by Stream (t)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[240px]">
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="stream" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend content={<ChartLegendContent />} />
                <Bar dataKey="collected" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} name="Collected" />
                <Bar dataKey="recycled" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Recycled" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Pie chart share */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Volume Share by Stream</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[240px]">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v} t`, ""]} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* By municipality */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recycling Rate by Municipality</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {["m1", "m2", "m3"].map(mId => {
              const records = wasteFlowRecords.filter(r => r.municipalityId === mId)
              const totalCollected = records.reduce((a, r) => a + r.collectedVolume, 0)
              const totalRecycled = records.reduce((a, r) => a + r.recycledVolume, 0)
              const rate = totalCollected > 0 ? ((totalRecycled / totalCollected) * 100).toFixed(1) : "0"
              const m = municipalities.find(m2 => m2.id === mId)
              return (
                <div key={mId}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{m?.name}</span>
                    <span className="text-sm font-bold text-primary">{rate}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${rate}%` }} />
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
