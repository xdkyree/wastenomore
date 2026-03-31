import { kpiSnapshots, municipalities, kpiTrend } from "@/data/mock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, AlertTriangle } from "lucide-react"
import { KPICard } from "@/components/shared/KPICard"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const mId = "m1"
const kpi = kpiSnapshots.find(k => k.municipalityId === mId)!
const muni = municipalities.find(m => m.id === mId)!
const target = muni.targetRecyclingRate
const gap = target - kpi.recyclingRate
const progress = Math.min((kpi.recyclingRate / target) * 100, 100)

const chartConfig = {
  recyclingRate: { label: "Recycling Rate", color: "hsl(var(--primary))" },
}

const trendData = kpiTrend.map(d => ({ month: d.month, recyclingRate: d.m1 }))

const riskLabel = kpi.penaltyRiskScore >= 70 ? "High Risk"
  : kpi.penaltyRiskScore >= 40 ? "Moderate Risk"
  : "Low Risk"

const riskBadgeClass = kpi.penaltyRiskScore >= 70
  ? "bg-red-100 text-red-700 border-0"
  : kpi.penaltyRiskScore >= 40
  ? "bg-yellow-100 text-yellow-700 border-0"
  : "bg-primary/10 text-primary border-0"

const riskFactors = [
  { label: "Target gap", value: `${gap.toFixed(1)}% below target`, flag: gap > 3 },
  { label: "Contamination trend", value: "Stable at 9.4%", flag: false },
  { label: "Service performance", value: "3 overflow incidents this period", flag: true },
  { label: "Collection rate", value: "98.2% on-time", flag: false },
]

export default function MunicipalityTargets() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h1 className="text-2xl font-bold">Targets & Penalty Forecast</h1>
      </div>

      {/* Target progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recycling Target Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-primary">{kpi.recyclingRate}%</p>
              <p className="text-sm text-muted-foreground">Current recycling rate</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-semibold">{target}%</p>
              <p className="text-sm text-muted-foreground">2026 target</p>
            </div>
          </div>
          <Progress value={progress} className="h-3" />
          <p className="text-xs text-muted-foreground">
            {gap > 0 ? `${gap.toFixed(1)}% gap remaining — projected to close by Q3 2026 at current rate` : "Target achieved!"}
          </p>
        </CardContent>
      </Card>

      {/* Trend chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rate vs Target Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis domain={[48, 70]} tick={{ fontSize: 11 }} unit="%" />
              <Tooltip content={<ChartTooltipContent />} />
              <ReferenceLine y={target} stroke="#9ca3af" strokeDasharray="5 5" label={{ value: `Target ${target}%`, position: "right", fontSize: 10 }} />
              <Line type="monotone" dataKey="recyclingRate" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="Recycling Rate" />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Penalty risk */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" /> Penalty Risk Forecast
            </CardTitle>
            <Badge className={riskBadgeClass}>{riskLabel}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold" style={{ color: kpi.penaltyRiskScore >= 70 ? "#ef4444" : kpi.penaltyRiskScore >= 40 ? "#f59e0b" : "#267351" }}>
              {kpi.penaltyRiskScore}
            </div>
            <div>
              <p className="text-sm font-medium">Risk Score</p>
              <p className="text-xs text-muted-foreground">Based on target gap, trend, contamination and performance</p>
            </div>
          </div>
          <Progress value={kpi.penaltyRiskScore} className="h-2 [&>div]:bg-yellow-400" />
          <div className="space-y-2 pt-1">
            {riskFactors.map(f => (
              <div key={f.label} className="flex items-center gap-3 text-sm">
                <span className={`w-2 h-2 rounded-full shrink-0 ${f.flag ? "bg-red-400" : "bg-primary"}`} />
                <span className="font-medium w-40">{f.label}</span>
                <span className="text-muted-foreground text-xs">{f.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
