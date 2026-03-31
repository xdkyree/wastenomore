import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { educationTopics, contaminationRecords } from "@/data/mock"
import { BookOpen } from "lucide-react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const recommendedTopics = [
  { topic: "Plastic bag sorting", priority: "high", reason: "Plastic contamination at 12.4% — above 10% threshold" },
  { topic: "Electronics in organic waste", priority: "high", reason: "Repeated citizen reports in past 14 days" },
  { topic: "Illegal dumping prevention", priority: "medium", reason: "3 incidents in Old Quarter zone" },
  { topic: "Glass recycling dos and don'ts", priority: "low", reason: "Low participation rate in glass stream" },
]

const priorityBadge: Record<string, string> = {
  high: "bg-red-100 text-red-700 border-0",
  medium: "bg-yellow-100 text-yellow-700 border-0",
  low: "bg-muted text-muted-foreground border-0",
}

const chartConfig = {
  contaminationRate: { label: "Contamination %", color: "hsl(var(--primary))" },
}

const m1Contamination = contaminationRecords.filter(c => c.municipalityId === "m1").map(c => ({
  stream: c.wasteStream,
  contaminationRate: c.contaminationRate,
}))

export default function MunicipalityEducation() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-primary" />
        <h1 className="text-2xl font-bold">Education Insights</h1>
      </div>

      {/* Recommended topics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recommended Education Topics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recommendedTopics.map((r) => (
            <div key={r.topic} className="flex gap-3 items-start rounded-md border px-4 py-3">
              <Badge className={`${priorityBadge[r.priority]} shrink-0 mt-0.5`}>{r.priority}</Badge>
              <div>
                <p className="text-sm font-medium">{r.topic}</p>
                <p className="text-xs text-muted-foreground">{r.reason}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Contamination by stream chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contamination Rate by Waste Stream</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <BarChart data={m1Contamination} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" unit="%" tick={{ fontSize: 11 }} domain={[0, 25]} />
              <YAxis type="category" dataKey="stream" tick={{ fontSize: 11 }} width={60} />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="contaminationRate" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Contamination %" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Popular articles */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Most-Read Citizen Articles This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {educationTopics.sort((a, b) => b.reads - a.reads).map(t => (
              <div key={t.id} className="flex items-center gap-3">
                <span className="text-sm flex-1">{t.title}</span>
                <span className="text-xs text-muted-foreground">{t.reads.toLocaleString()} reads</span>
                <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary/60 rounded-full" style={{ width: `${(t.reads / 2100) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
