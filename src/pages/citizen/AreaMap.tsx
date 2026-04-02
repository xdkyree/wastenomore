import { MapContainer, Marker, TileLayer, Tooltip as LeafletTooltip } from "react-leaflet"
import { divIcon } from "leaflet"
import "leaflet/dist/leaflet.css"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDownRight, Map, Wallet } from "lucide-react"

type PerformanceArea = {
  id: string
  name: string
  municipality: string
  lat: number
  lon: number
  sortingRate: number
  monthlyPricePln: number
  isUserArea?: boolean
}

const performanceAreas: PerformanceArea[] = [
  { id: "a1", name: "Northgate", municipality: "Verdana", lat: 51.52, lon: 4.44, sortingRate: 48, monthlyPricePln: 149, isUserArea: true },
  { id: "a2", name: "Riverside", municipality: "Verdana", lat: 51.50, lon: 4.46, sortingRate: 61, monthlyPricePln: 137 },
  { id: "a3", name: "Harbour District", municipality: "Arkholm", lat: 51.48, lon: 4.52, sortingRate: 68, monthlyPricePln: 126 },
  { id: "a4", name: "Greenfields", municipality: "Lysveld", lat: 51.55, lon: 4.38, sortingRate: 75, monthlyPricePln: 119 },
]

const averageSortingRate =
  performanceAreas.reduce((sum, area) => sum + area.sortingRate, 0) / performanceAreas.length

const userArea = performanceAreas.find((area) => area.isUserArea)!
const sortingGap = Math.round(averageSortingRate - userArea.sortingRate)
const lowestPrice = Math.min(...performanceAreas.map((area) => area.monthlyPricePln))
const extraCost = userArea.monthlyPricePln - lowestPrice

function getBarColor(rate: number) {
  if (rate >= 70) return "#267351"
  if (rate >= 60) return "#e8a838"
  return "#ef4444"
}

function createAreaIcon(area: PerformanceArea) {
  const barHeight = Math.max(28, Math.round(area.sortingRate * 0.8))
  const borderColor = area.isUserArea ? "#267351" : "#d9e1e7"
  const shadow = area.isUserArea ? "0 12px 28px rgba(38,115,81,0.22)" : "0 10px 24px rgba(15,23,42,0.14)"

  return divIcon({
    className: "performance-map-marker",
    html: `
      <div style="position:relative;width:96px;">
        <div style="background:#ffffff;border:2px solid ${borderColor};border-radius:16px;padding:8px 10px 10px;box-shadow:${shadow};">
          <div style="font-size:10px;font-weight:700;line-height:1.1;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            ${area.name}
          </div>
          <div style="font-size:9px;line-height:1.1;color:#64748b;margin-top:2px;">
            ${area.municipality}
          </div>
          <div style="display:flex;align-items:flex-end;gap:10px;margin-top:8px;">
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
              <div style="height:74px;width:16px;border-radius:999px;background:#e8edf1;display:flex;align-items:flex-end;padding:2px;">
                <div style="width:100%;height:${barHeight}px;border-radius:999px;background:${getBarColor(area.sortingRate)};"></div>
              </div>
              <div style="font-size:10px;font-weight:700;color:#0f172a;">${area.sortingRate}%</div>
            </div>
            <div style="padding-bottom:4px;">
              <div style="font-size:9px;color:#64748b;line-height:1.1;">Monthly fee</div>
              <div style="font-size:15px;font-weight:800;line-height:1;color:#0f172a;margin-top:4px;">${area.monthlyPricePln}</div>
              <div style="font-size:10px;font-weight:700;color:#64748b;line-height:1.1;margin-top:2px;">PLN</div>
            </div>
          </div>
        </div>
        <div style="position:absolute;left:50%;bottom:-10px;width:18px;height:18px;background:#ffffff;border-right:2px solid ${borderColor};border-bottom:2px solid ${borderColor};transform:translateX(-50%) rotate(45deg);"></div>
      </div>
    `,
    iconSize: [96, 146],
    iconAnchor: [48, 146],
    popupAnchor: [0, -130],
  })
}

export default function AreaMap() {
  return (
    <div className="px-4 py-5 space-y-4">
      <div className="flex items-center gap-2">
        <Map className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Performance Map</h2>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4 space-y-3">
          <div>
            <p className="text-sm font-semibold">Your area is below the local average</p>
            <p className="text-xs text-muted-foreground mt-1">
              Northgate is sorting {sortingGap}% less waste than the nearby average, which is adding about {extraCost} PLN to the monthly fee.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3">
              <div className="flex items-center gap-2 text-destructive">
                <ArrowDownRight className="h-4 w-4 text-destructive" />
                <span className="text-[11px] font-medium uppercase tracking-wide">Sorting gap</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-destructive">{sortingGap}%</p>
              <p className="text-[11px] text-destructive/80">versus nearby average</p>
            </div>

            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3">
              <div className="flex items-center gap-2 text-destructive">
                <Wallet className="h-4 w-4 text-destructive" />
                <span className="text-[11px] font-medium uppercase tracking-wide">Extra cost</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-destructive">{extraCost} PLN</p>
              <p className="text-[11px] text-destructive/80">above the best-performing area</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0 overflow-hidden rounded-xl">
          <div className="border-b bg-muted/20 px-4 py-3">
            <p className="text-sm font-medium">Example area comparison</p>
            <p className="text-xs text-muted-foreground">Each marker shows sorting rate and the linked monthly fee in PLN.</p>
          </div>

          <MapContainer center={[51.51, 4.45]} zoom={11} style={{ height: 360 }} scrollWheelZoom={false}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
            />

            {performanceAreas.map((area) => (
              <Marker key={area.id} position={[area.lat, area.lon]} icon={createAreaIcon(area)}>
                <LeafletTooltip direction="top" offset={[0, -120]}>
                  <div className="text-xs">
                    <p className="font-semibold">{area.name}, {area.municipality}</p>
                    <p>Sorting rate: {area.sortingRate}%</p>
                    <p>Monthly fee: {area.monthlyPricePln} PLN</p>
                  </div>
                </LeafletTooltip>
              </Marker>
            ))}
          </MapContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        {performanceAreas.map((area) => (
          <Card key={area.id} className={area.isUserArea ? "border-primary/40 bg-primary/5" : ""}>
            <CardContent className="p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold leading-tight">{area.name}</p>
                  <p className="text-[11px] text-muted-foreground">{area.municipality}</p>
                </div>
                {area.isUserArea && <Badge className="border-0 bg-primary text-white">You</Badge>}
              </div>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="text-[11px] text-muted-foreground">Sorting</p>
                  <p className="text-lg font-bold">{area.sortingRate}%</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-muted-foreground">Monthly fee</p>
                  <p className="text-lg font-bold">{area.monthlyPricePln} PLN</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
