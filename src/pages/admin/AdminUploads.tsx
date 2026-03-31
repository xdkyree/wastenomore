import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Upload, CheckCircle2, Clock } from "lucide-react"

const sources = [
  { id: 1, name: "Smart Bin Sensor Feed", type: "IoT Mock", status: "active", lastSync: "2026-03-27 08:12" },
  { id: 2, name: "Truck GPS Telemetry", type: "IoT Mock", status: "active", lastSync: "2026-03-27 08:30" },
  { id: 3, name: "Verdana Municipality CSV", type: "CSV Upload", status: "active", lastSync: "2026-03-26 17:00" },
  { id: 4, name: "Arkholm Municipality CSV", type: "CSV Upload", status: "pending", lastSync: "2026-03-25 11:00" },
  { id: 5, name: "Lysveld Municipality CSV", type: "CSV Upload", status: "pending", lastSync: "2026-03-24 09:00" },
  { id: 6, name: "Sorting Center Records", type: "API", status: "active", lastSync: "2026-03-27 07:45" },
]

const statusBadge: Record<string, string> = {
  active: "bg-primary/10 text-primary border-0",
  pending: "bg-yellow-100 text-yellow-700 border-0",
  error: "bg-red-100 text-red-700 border-0",
}

export default function AdminUploads() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h1 className="text-2xl font-bold">Data Uploads & Integrations</h1>
      </div>

      {/* Upload zone */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Upload Municipality Data (CSV)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center space-y-3">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
            <p className="text-sm text-muted-foreground">Drag & drop a CSV file, or click to browse</p>
            <p className="text-xs text-muted-foreground/60">Supported: municipality_data.csv, waste_flow.csv, incidents.csv</p>
            <Button variant="outline" size="sm">Choose File</Button>
          </div>
        </CardContent>
      </Card>

      {/* Data sources */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Configured Data Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sources.map(s => (
              <div key={s.id} className="flex items-center gap-3 py-2 border-b last:border-0">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                  {s.status === "active"
                    ? <CheckCircle2 className="w-4 h-4 text-primary" />
                    : <Clock className="w-4 h-4 text-yellow-500" />
                  }
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.type} · Last sync: {s.lastSync}</p>
                </div>
                <Badge className={statusBadge[s.status]}>{s.status}</Badge>
                <Button variant="ghost" size="sm" className="text-xs h-7">Configure</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
