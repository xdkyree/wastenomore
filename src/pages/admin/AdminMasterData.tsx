import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Settings, Plus } from "lucide-react"
import { wasteStreamLabels, wasteStreamColors } from "@/data/mock"

const incidentCategories = [
  "Overflow", "Missed Pickup", "Illegal Dumping", "Damaged Bin", "Contamination", "Other",
]

const interventionTypes = [
  "Education Campaign", "Bin Deployment", "Route Adjustment", "Local Pilot",
]

const kpiDefinitions = [
  { name: "Recycling Rate", formula: "recycledVolume / collectedVolume × 100", unit: "%" },
  { name: "Contamination Rate", formula: "contaminatedWeight / totalWeight × 100", unit: "%" },
  { name: "Penalty Risk Score", formula: "Composite: target gap + contamination + service performance", unit: "/100" },
  { name: "Overflow Count", formula: "Count of fill > 95% incidents per period", unit: "events" },
]

export default function AdminMasterData() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="w-5 h-5 text-primary" />
        <h1 className="text-2xl font-bold">Master Data Configuration</h1>
      </div>

      {/* Waste streams */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Waste Streams</CardTitle>
            <Button size="sm" variant="outline"><Plus className="w-3 h-3 mr-1" /> Add</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(wasteStreamLabels).map(([key, label]) => (
              <div
                key={key}
                className="flex items-center gap-2 rounded-md border px-3 py-1.5"
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: wasteStreamColors[key as keyof typeof wasteStreamColors] }} />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Incident categories */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Incident Categories</CardTitle>
            <Button size="sm" variant="outline"><Plus className="w-3 h-3 mr-1" /> Add</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {incidentCategories.map(c => (
              <Badge key={c} variant="outline" className="text-sm px-3 py-1">{c}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Intervention types */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Intervention Types</CardTitle>
            <Button size="sm" variant="outline"><Plus className="w-3 h-3 mr-1" /> Add</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {interventionTypes.map(t => (
              <Badge key={t} variant="outline" className="text-sm px-3 py-1">{t}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* KPI definitions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">KPI Definitions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {kpiDefinitions.map(k => (
              <div key={k.name} className="flex gap-3 items-start py-2 border-b last:border-0">
                <div className="flex-1">
                  <p className="text-sm font-semibold">{k.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{k.formula}</p>
                </div>
                <Badge variant="outline" className="text-xs shrink-0">{k.unit}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
