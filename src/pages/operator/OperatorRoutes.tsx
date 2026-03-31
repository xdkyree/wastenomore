import { MapContainer, TileLayer, CircleMarker, Polyline, Popup, Tooltip as LeafletTooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { bins, truckRouteEvents, trucks } from "@/data/mock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck } from "lucide-react"

const binColor = (pct: number) =>
  pct >= 90 ? "#ef4444" : pct >= 70 ? "#f59e0b" : "#267351"

const routePositions: [number, number][] = truckRouteEvents.map(e => [e.lat, e.lon])

const optimizedRoute = [
  [51.521, 4.441],  // full bin first
  [51.512, 4.422],  // full bin
  [51.522, 4.443],  // almost full
  [51.502, 4.462],  // almost full
  [51.511, 4.421],  // normal
  [51.501, 4.461],  // normal
] as [number, number][]

const recommendations = [
  { priority: 1, bin: "b1", stream: "plastic", fill: 97, action: "Collect immediately — risk of overflow" },
  { priority: 2, bin: "b6", stream: "plastic", fill: 100, action: "Overflow! Dispatch truck T1" },
  { priority: 3, bin: "b2", stream: "paper", fill: 82, action: "Include on next route pass" },
  { priority: 4, bin: "b4", stream: "mixed", fill: 78, action: "Monitor — schedule within 24h" },
]

export default function OperatorRoutes() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Truck className="w-5 h-5 text-primary" />
        <h1 className="text-2xl font-bold">Route Optimization</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Live route — T1 + Optimized suggestion</CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-hidden rounded-b-lg">
              <MapContainer center={[51.512, 4.442]} zoom={14} style={{ height: 420 }} scrollWheelZoom={false}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
                />
                {/* Current route T1 */}
                <Polyline positions={routePositions} color="#305c54" weight={3} dashArray="6" />
                {/* Optimized route */}
                <Polyline positions={optimizedRoute} color="#267351" weight={3} />
                {/* Bins */}
                {bins.filter(b => b.municipalityId === "m1").map(b => (
                  <CircleMarker
                    key={b.id}
                    center={[b.lat, b.lon]}
                    radius={9}
                    fillColor={binColor(b.fillPercent)}
                    color="#fff"
                    weight={1.5}
                    fillOpacity={0.9}
                  >
                    <LeafletTooltip>{b.wasteStream} — {b.fillPercent}%</LeafletTooltip>
                    <Popup>
                      <div className="text-xs">
                        <p><strong>Stream:</strong> {b.wasteStream}</p>
                        <p><strong>Fill:</strong> {b.fillPercent}%</p>
                        <p><strong>Status:</strong> {b.status}</p>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </CardContent>
          </Card>
          <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1"><span className="w-8 h-0.5 bg-secondary inline-block" style={{ borderTop: "2px dashed #305c54" }} /> Current route T1</div>
            <div className="flex items-center gap-1"><span className="w-8 h-0.5 bg-primary inline-block" /> Optimized route</div>
            {[["#267351", "< 70%"], ["#f59e0b", "70–89%"], ["#ef4444", "≥ 90%"]].map(([c, l]) => (
              <div key={l} className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: c }} /> {l}
              </div>
            ))}
          </div>
        </div>

        {/* Priority list */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Prioritised Collection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.map(r => (
              <div key={r.bin} className="border rounded-lg p-3 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary w-5">{r.priority}</span>
                  <Badge
                    variant="outline"
                    className={r.fill >= 90 ? "border-red-300 text-red-600" : "border-yellow-300 text-yellow-600"}
                  >
                    {r.fill}%
                  </Badge>
                  <span className="text-xs font-medium capitalize">{r.stream}</span>
                </div>
                <p className="text-xs text-muted-foreground pl-7">{r.action}</p>
              </div>
            ))}
            <div className="rounded-md bg-accent/30 px-3 py-2 text-xs text-muted-foreground">
              Estimated savings vs current route: <strong className="text-primary">~22 km</strong> · <strong className="text-primary">18% fewer trips</strong>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
