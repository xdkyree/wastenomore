import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip as LeafletTooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { bins, incidents, wasteStreamColors, incidentTypeLabels } from "@/data/mock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { MapPin } from "lucide-react"

const binStatusColor: Record<string, string> = {
  normal: "#267351",
  almost_full: "#f59e0b",
  full: "#ef4444",
  offline: "#9ca3af",
}

type Layer = "bins" | "incidents"

export default function MunicipalityMap() {
  const [layer, setLayer] = useState<Layer>("bins")

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-primary" />
        <h1 className="text-2xl font-bold">Hotspot Map</h1>
      </div>

      <div className="flex gap-3 items-center">
        <Select defaultValue="bins" onValueChange={(v) => setLayer(v as Layer)}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bins">Bin fill levels</SelectItem>
            <SelectItem value="incidents">Incidents</SelectItem>
          </SelectContent>
        </Select>

        {/* Legend */}
        <div className="flex gap-2 flex-wrap">
          {layer === "bins" ? (
            Object.entries(binStatusColor).map(([s, c]) => (
              <div key={s} className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: c }} />
                {s.replace("_", " ")}
              </div>
            ))
          ) : (
            [["high", "#ef4444"], ["medium", "#f59e0b"], ["low", "#267351"]].map(([s, c]) => (
              <div key={s} className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: c }} />
                {s}
              </div>
            ))
          )}
        </div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-hidden rounded-lg">
          <MapContainer center={[51.51, 4.44]} zoom={13} style={{ height: 460 }} scrollWheelZoom={false}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
            />

            {layer === "bins" && bins.filter(b => b.municipalityId === "m1").map(bin => (
              <CircleMarker
                key={bin.id}
                center={[bin.lat, bin.lon]}
                radius={10}
                fillColor={binStatusColor[bin.status]}
                color="#fff"
                weight={1.5}
                fillOpacity={0.85}
              >
                <LeafletTooltip>
                  <strong>{bin.wasteStream}</strong> — {bin.fillPercent}% full<br />{bin.status}
                </LeafletTooltip>
                <Popup>
                  <div className="text-xs">
                    <p><strong>Stream:</strong> {bin.wasteStream}</p>
                    <p><strong>Fill:</strong> {bin.fillPercent}%</p>
                    <p><strong>Status:</strong> {bin.status.replace("_", " ")}</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}

            {layer === "incidents" && incidents.filter(i => i.municipalityId === "m1").map(inc => {
              const color = inc.severity === "high" ? "#ef4444" : inc.severity === "medium" ? "#f59e0b" : "#267351"
              return (
                <CircleMarker
                  key={inc.id}
                  center={[inc.lat, inc.lon]}
                  radius={10}
                  fillColor={color}
                  color="#fff"
                  weight={1.5}
                  fillOpacity={0.85}
                >
                  <LeafletTooltip>
                    <strong>{incidentTypeLabels[inc.type]}</strong><br />{inc.description}
                  </LeafletTooltip>
                  <Popup>
                    <div className="text-xs">
                      <p><strong>Type:</strong> {incidentTypeLabels[inc.type]}</p>
                      <p><strong>Severity:</strong> {inc.severity}</p>
                      <p><strong>Status:</strong> {inc.status}</p>
                      <p><strong>Description:</strong> {inc.description}</p>
                    </div>
                  </Popup>
                </CircleMarker>
              )
            })}
          </MapContainer>
        </CardContent>
      </Card>

      {/* Bin alerts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {bins.filter(b => b.municipalityId === "m1" && (b.status === "full" || b.status === "almost_full")).map(bin => (
          <Card key={bin.id} className="border-l-4" style={{ borderLeftColor: binStatusColor[bin.status] }}>
            <CardContent className="py-3 px-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium capitalize">{bin.wasteStream} bin</p>
                <Badge variant="outline" className="text-[10px]">{bin.fillPercent}%</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Zone: {bin.zoneId} · {bin.status.replace("_", " ")}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
