import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip as LeafletTooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { kpiSnapshots, municipalities } from "@/data/mock"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

// Spread municipalities across a fictional Novaterra region
const municipalityPositions: Record<string, [number, number]> = {
  m1: [51.51, 4.44],
  m2: [51.48, 4.52],
  m3: [51.55, 4.38],
  m4: [51.44, 4.60],
  m5: [51.58, 4.30],
  m6: [51.42, 4.35],
}

function kpiColor(rate: number, target: number): string {
  const gap = target - rate
  if (gap <= 0) return "#267351"
  if (gap <= 3) return "#f59e0b"
  return "#ef4444"
}

const statusBadge: Record<string, string> = {
  on_track: "bg-primary/10 text-primary border-0",
  at_risk: "bg-yellow-100 text-yellow-700 border-0",
  off_track: "bg-red-100 text-red-700 border-0",
}

export default function RegionalMap() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-primary" />
        <h1 className="text-2xl font-bold">Regional Hotspot Map</h1>
      </div>
      <p className="text-sm text-muted-foreground">Municipalities coloured by recycling rate vs target.</p>

      {/* Legend */}
      <div className="flex gap-4 text-xs text-muted-foreground">
        {[["#267351", "On target"], ["#f59e0b", "At risk (≤3% gap)"], ["#ef4444", "Off track (>3% gap)"]].map(([c, l]) => (
          <div key={l} className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: c }} />
            {l}
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-0 overflow-hidden rounded-lg">
          <MapContainer center={[51.50, 4.44]} zoom={11} style={{ height: 460 }} scrollWheelZoom={false}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
            />
            {kpiSnapshots.map(k => {
              const m = municipalities.find(m2 => m2.id === k.municipalityId)!
              const pos = municipalityPositions[k.municipalityId]
              if (!pos) return null
              return (
                <CircleMarker
                  key={k.municipalityId}
                  center={pos}
                  radius={16}
                  fillColor={kpiColor(k.recyclingRate, m.targetRecyclingRate)}
                  color="#fff"
                  weight={2}
                  fillOpacity={0.8}
                >
                  <LeafletTooltip>
                    <strong>{m.name}</strong><br />
                    Recycling: {k.recyclingRate}% / Target: {m.targetRecyclingRate}%
                  </LeafletTooltip>
                  <Popup>
                    <div className="text-xs space-y-0.5 min-w-[160px]">
                      <p className="font-semibold">{m.name}</p>
                      <p>Recycling rate: {k.recyclingRate}%</p>
                      <p>Target: {m.targetRecyclingRate}%</p>
                      <p>Contamination: {k.contaminationRate}%</p>
                      <p>Incidents: {k.incidentCount}</p>
                      <p>Penalty risk: {k.penaltyRiskScore}/100</p>
                    </div>
                  </Popup>
                </CircleMarker>
              )
            })}
          </MapContainer>
        </CardContent>
      </Card>
    </div>
  )
}
