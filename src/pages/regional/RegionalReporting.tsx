import { kpiSnapshots, municipalities, wasteFlowRecords } from "@/data/mock"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download } from "lucide-react"

const statusBadge: Record<string, string> = {
  on_track: "bg-primary/10 text-primary border-0",
  at_risk: "bg-yellow-100 text-yellow-700 border-0",
  off_track: "bg-red-100 text-red-700 border-0",
}

export default function RegionalReporting() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold">Regulatory Reporting</h1>
        </div>
        <Button size="sm" variant="outline">
          <Download className="w-3.5 h-3.5 mr-1" /> Export CSV
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">Aggregated municipality data for regulatory oversight — March 2026.</p>

      {/* KPI aggregate table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Municipal Recycling & Compliance Report</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Municipality</TableHead>
                <TableHead>Population</TableHead>
                <TableHead>Recycling Rate</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Contamination</TableHead>
                <TableHead>Overflow Events</TableHead>
                <TableHead>Penalty Score</TableHead>
                <TableHead>Compliance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpiSnapshots.map(k => {
                const m = municipalities.find(m2 => m2.id === k.municipalityId)!
                return (
                  <TableRow key={k.municipalityId}>
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell>{m.population.toLocaleString()}</TableCell>
                    <TableCell className="font-semibold">{k.recyclingRate}%</TableCell>
                    <TableCell>{m.targetRecyclingRate}%</TableCell>
                    <TableCell>{k.contaminationRate}%</TableCell>
                    <TableCell>{k.overflowCount}</TableCell>
                    <TableCell>
                      <span className={k.penaltyRiskScore >= 70 ? "text-red-600 font-semibold" : k.penaltyRiskScore >= 40 ? "text-yellow-600 font-semibold" : "text-primary font-semibold"}>
                        {k.penaltyRiskScore}/100
                      </span>
                    </TableCell>
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

      {/* Waste flow summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Regional Waste Flow Summary (March 2026)</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Municipality</TableHead>
                <TableHead>Waste Stream</TableHead>
                <TableHead>Collected (t)</TableHead>
                <TableHead>Processed (t)</TableHead>
                <TableHead>Recycled (t)</TableHead>
                <TableHead>Recycling %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wasteFlowRecords.slice(0, 10).map(r => {
                const m = municipalities.find(m2 => m2.id === r.municipalityId)
                const pct = ((r.recycledVolume / r.collectedVolume) * 100).toFixed(1)
                return (
                  <TableRow key={r.id}>
                    <TableCell>{m?.name}</TableCell>
                    <TableCell className="capitalize">{r.wasteStream}</TableCell>
                    <TableCell>{r.collectedVolume}</TableCell>
                    <TableCell>{r.processedVolume}</TableCell>
                    <TableCell>{r.recycledVolume}</TableCell>
                    <TableCell className="font-medium">{pct}%</TableCell>
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
