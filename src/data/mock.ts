// ─── Domain types ────────────────────────────────────────────────────────────

export interface Municipality {
  id: string
  name: string
  population: number
  targetRecyclingRate: number
  regionId: string
}

export interface Zone {
  id: string
  municipalityId: string
  name: string
  lat: number
  lon: number
}

export interface Bin {
  id: string
  municipalityId: string
  zoneId: string
  wasteStream: WasteStream
  lat: number
  lon: number
  status: "normal" | "almost_full" | "full" | "offline"
  fillPercent: number
}

export interface Truck {
  id: string
  operatorId: string
  status: "active" | "idle" | "maintenance"
  currentLat: number
  currentLon: number
}

export interface TruckRouteEvent {
  id: string
  truckId: string
  timestamp: string
  lat: number
  lon: number
  loadWeight: number
  routeId: string
}

export interface IncidentReport {
  id: string
  timestamp: string
  municipalityId: string
  zoneId: string
  type: IncidentType
  severity: "low" | "medium" | "high"
  status: "open" | "in_progress" | "resolved"
  description: string
  lat: number
  lon: number
}

export interface WasteFlowRecord {
  id: string
  municipalityId: string
  date: string
  wasteStream: WasteStream
  collectedVolume: number
  processedVolume: number
  recycledVolume: number
}

export interface ContaminationRecord {
  id: string
  municipalityId: string
  date: string
  wasteStream: WasteStream
  contaminationRate: number
}

export interface KPISnapshot {
  date: string
  municipalityId: string
  recyclingRate: number
  contaminationRate: number
  incidentCount: number
  overflowCount: number
  targetStatus: "on_track" | "at_risk" | "off_track"
  penaltyRiskScore: number
}

export interface Intervention {
  id: string
  municipalityId: string
  type: "education_campaign" | "bin_deployment" | "route_adjustment" | "local_pilot"
  startDate: string
  endDate: string
  targetZone: string
  description: string
  beforeRate: number
  afterRate: number
}

export interface User {
  id: string
  name: string
  email: string
  role: "citizen" | "municipality" | "regional" | "operator" | "admin"
  municipalityId?: string
}

export type WasteStream = "mixed" | "organic" | "paper" | "plastic" | "glass" | "metal" | "hazardous"
export type IncidentType = "overflow" | "missed_pickup" | "illegal_dumping" | "damaged_bin" | "contamination" | "other"

export type InvoiceType = "annual_collection" | "bulky_waste" | "excess_waste_penalty" | "hazardous_disposal"
export type InvoiceStatus = "outstanding" | "overdue" | "paid"
export type PaymentMethod = "ideal" | "card" | "apple_pay" | "google_pay"

export interface Invoice {
  id: string
  type: InvoiceType
  description: string
  issueDate: string
  dueDate: string
  amount: number
  status: InvoiceStatus
}

export interface PaymentRecord {
  id: string
  invoiceId: string
  date: string
  amount: number
  method: PaymentMethod
  description: string
}

// ─── Seed data ────────────────────────────────────────────────────────────────

export const municipalities: Municipality[] = [
  { id: "m1", name: "Verdana", population: 84000, targetRecyclingRate: 65, regionId: "r1" },
  { id: "m2", name: "Arkholm", population: 52000, targetRecyclingRate: 60, regionId: "r1" },
  { id: "m3", name: "Lysveld", population: 38000, targetRecyclingRate: 62, regionId: "r1" },
  { id: "m4", name: "Crestmoor", population: 71000, targetRecyclingRate: 65, regionId: "r1" },
  { id: "m5", name: "Ternwick", population: 29000, targetRecyclingRate: 58, regionId: "r1" },
  { id: "m6", name: "Salbridge", population: 45000, targetRecyclingRate: 60, regionId: "r1" },
]

export const zones: Zone[] = [
  { id: "z1", municipalityId: "m1", name: "Northgate", lat: 51.52, lon: 4.44 },
  { id: "z2", municipalityId: "m1", name: "Riverside", lat: 51.50, lon: 4.46 },
  { id: "z3", municipalityId: "m1", name: "Old Quarter", lat: 51.51, lon: 4.42 },
  { id: "z4", municipalityId: "m2", name: "Harbour District", lat: 51.48, lon: 4.52 },
  { id: "z5", municipalityId: "m2", name: "Market Square", lat: 51.49, lon: 4.50 },
  { id: "z6", municipalityId: "m3", name: "Greenfields", lat: 51.55, lon: 4.38 },
]

export const bins: Bin[] = [
  { id: "b1", municipalityId: "m1", zoneId: "z1", wasteStream: "plastic", lat: 51.521, lon: 4.441, status: "full", fillPercent: 97 },
  { id: "b2", municipalityId: "m1", zoneId: "z1", wasteStream: "paper", lat: 51.522, lon: 4.443, status: "almost_full", fillPercent: 82 },
  { id: "b3", municipalityId: "m1", zoneId: "z2", wasteStream: "organic", lat: 51.501, lon: 4.461, status: "normal", fillPercent: 45 },
  { id: "b4", municipalityId: "m1", zoneId: "z2", wasteStream: "mixed", lat: 51.502, lon: 4.462, status: "almost_full", fillPercent: 78 },
  { id: "b5", municipalityId: "m1", zoneId: "z3", wasteStream: "glass", lat: 51.511, lon: 4.421, status: "normal", fillPercent: 32 },
  { id: "b6", municipalityId: "m1", zoneId: "z3", wasteStream: "plastic", lat: 51.512, lon: 4.422, status: "full", fillPercent: 100 },
  { id: "b7", municipalityId: "m2", zoneId: "z4", wasteStream: "mixed", lat: 51.481, lon: 4.521, status: "offline", fillPercent: 0 },
  { id: "b8", municipalityId: "m2", zoneId: "z5", wasteStream: "organic", lat: 51.491, lon: 4.501, status: "normal", fillPercent: 55 },
  { id: "b9", municipalityId: "m3", zoneId: "z6", wasteStream: "paper", lat: 51.551, lon: 4.381, status: "almost_full", fillPercent: 85 },
  { id: "b10", municipalityId: "m3", zoneId: "z6", wasteStream: "plastic", lat: 51.552, lon: 4.382, status: "full", fillPercent: 95 },
]

export const trucks: Truck[] = [
  { id: "t1", operatorId: "op1", status: "active", currentLat: 51.515, currentLon: 4.445 },
  { id: "t2", operatorId: "op1", status: "active", currentLat: 51.490, currentLon: 4.510 },
  { id: "t3", operatorId: "op1", status: "idle", currentLat: 51.530, currentLon: 4.460 },
  { id: "t4", operatorId: "op1", status: "maintenance", currentLat: 51.500, currentLon: 4.430 },
]

export const truckRouteEvents: TruckRouteEvent[] = [
  { id: "re1", truckId: "t1", timestamp: "2026-03-27T07:00:00Z", lat: 51.510, lon: 4.440, loadWeight: 1200, routeId: "route1" },
  { id: "re2", truckId: "t1", timestamp: "2026-03-27T07:30:00Z", lat: 51.515, lon: 4.443, loadWeight: 2100, routeId: "route1" },
  { id: "re3", truckId: "t1", timestamp: "2026-03-27T08:00:00Z", lat: 51.520, lon: 4.446, loadWeight: 3400, routeId: "route1" },
  { id: "re4", truckId: "t1", timestamp: "2026-03-27T08:30:00Z", lat: 51.521, lon: 4.441, loadWeight: 4200, routeId: "route1" },
]

export const incidents: IncidentReport[] = [
  { id: "i1", timestamp: "2026-03-27T06:12:00Z", municipalityId: "m1", zoneId: "z1", type: "overflow", severity: "high", status: "open", description: "Plastic bin overflowing near school.", lat: 51.521, lon: 4.442 },
  { id: "i2", timestamp: "2026-03-26T14:30:00Z", municipalityId: "m1", zoneId: "z2", type: "missed_pickup", severity: "medium", status: "in_progress", description: "Organic waste not collected since Tuesday.", lat: 51.501, lon: 4.461 },
  { id: "i3", timestamp: "2026-03-26T09:00:00Z", municipalityId: "m1", zoneId: "z3", type: "illegal_dumping", severity: "high", status: "open", description: "Large pile of construction waste on public land.", lat: 51.513, lon: 4.423 },
  { id: "i4", timestamp: "2026-03-25T17:45:00Z", municipalityId: "m2", zoneId: "z4", type: "damaged_bin", severity: "low", status: "resolved", description: "Bin lid broken, needs replacement.", lat: 51.482, lon: 4.522 },
  { id: "i5", timestamp: "2026-03-25T11:00:00Z", municipalityId: "m2", zoneId: "z5", type: "contamination", severity: "medium", status: "open", description: "Electronics found in organic bin.", lat: 51.492, lon: 4.502 },
  { id: "i6", timestamp: "2026-03-24T08:30:00Z", municipalityId: "m3", zoneId: "z6", type: "overflow", severity: "high", status: "in_progress", description: "Paper bin overflowing near market.", lat: 51.551, lon: 4.381 },
  { id: "i7", timestamp: "2026-03-23T15:00:00Z", municipalityId: "m1", zoneId: "z1", type: "overflow", severity: "medium", status: "resolved", description: "Glass bin at capacity.", lat: 51.522, lon: 4.443 },
  { id: "i8", timestamp: "2026-03-22T10:00:00Z", municipalityId: "m1", zoneId: "z1", type: "contamination", severity: "medium", status: "resolved", description: "Plastic bags found in paper stream.", lat: 51.523, lon: 4.444 },
]

export const wasteFlowRecords: WasteFlowRecord[] = [
  { id: "wf1", municipalityId: "m1", date: "2026-03-01", wasteStream: "plastic", collectedVolume: 420, processedVolume: 415, recycledVolume: 310 },
  { id: "wf2", municipalityId: "m1", date: "2026-03-01", wasteStream: "paper", collectedVolume: 560, processedVolume: 555, recycledVolume: 490 },
  { id: "wf3", municipalityId: "m1", date: "2026-03-01", wasteStream: "organic", collectedVolume: 780, processedVolume: 770, recycledVolume: 680 },
  { id: "wf4", municipalityId: "m1", date: "2026-03-01", wasteStream: "glass", collectedVolume: 180, processedVolume: 178, recycledVolume: 170 },
  { id: "wf5", municipalityId: "m1", date: "2026-03-01", wasteStream: "mixed", collectedVolume: 950, processedVolume: 940, recycledVolume: 420 },
  { id: "wf6", municipalityId: "m2", date: "2026-03-01", wasteStream: "plastic", collectedVolume: 290, processedVolume: 285, recycledVolume: 200 },
  { id: "wf7", municipalityId: "m2", date: "2026-03-01", wasteStream: "paper", collectedVolume: 310, processedVolume: 305, recycledVolume: 260 },
  { id: "wf8", municipalityId: "m2", date: "2026-03-01", wasteStream: "organic", collectedVolume: 420, processedVolume: 415, recycledVolume: 360 },
  { id: "wf9", municipalityId: "m3", date: "2026-03-01", wasteStream: "plastic", collectedVolume: 195, processedVolume: 190, recycledVolume: 130 },
  { id: "wf10", municipalityId: "m3", date: "2026-03-01", wasteStream: "paper", collectedVolume: 210, processedVolume: 205, recycledVolume: 175 },
]

export const contaminationRecords: ContaminationRecord[] = [
  { id: "c1", municipalityId: "m1", date: "2026-03-01", wasteStream: "plastic", contaminationRate: 12.4 },
  { id: "c2", municipalityId: "m1", date: "2026-03-01", wasteStream: "paper", contaminationRate: 8.1 },
  { id: "c3", municipalityId: "m1", date: "2026-03-01", wasteStream: "organic", contaminationRate: 5.3 },
  { id: "c4", municipalityId: "m2", date: "2026-03-01", wasteStream: "plastic", contaminationRate: 18.7 },
  { id: "c5", municipalityId: "m2", date: "2026-03-01", wasteStream: "paper", contaminationRate: 11.2 },
  { id: "c6", municipalityId: "m3", date: "2026-03-01", wasteStream: "plastic", contaminationRate: 22.1 },
  { id: "c7", municipalityId: "m3", date: "2026-03-01", wasteStream: "organic", contaminationRate: 9.8 },
]

export const kpiSnapshots: KPISnapshot[] = [
  { date: "2026-03-27", municipalityId: "m1", recyclingRate: 61.2, contaminationRate: 9.4, incidentCount: 8, overflowCount: 3, targetStatus: "at_risk", penaltyRiskScore: 42 },
  { date: "2026-03-27", municipalityId: "m2", recyclingRate: 54.8, contaminationRate: 15.2, incidentCount: 5, overflowCount: 1, targetStatus: "off_track", penaltyRiskScore: 71 },
  { date: "2026-03-27", municipalityId: "m3", recyclingRate: 48.3, contaminationRate: 20.4, incidentCount: 6, overflowCount: 2, targetStatus: "off_track", penaltyRiskScore: 85 },
  { date: "2026-03-27", municipalityId: "m4", recyclingRate: 67.1, contaminationRate: 6.2, incidentCount: 3, overflowCount: 0, targetStatus: "on_track", penaltyRiskScore: 12 },
  { date: "2026-03-27", municipalityId: "m5", recyclingRate: 59.2, contaminationRate: 11.8, incidentCount: 4, overflowCount: 1, targetStatus: "at_risk", penaltyRiskScore: 55 },
  { date: "2026-03-27", municipalityId: "m6", recyclingRate: 63.4, contaminationRate: 8.7, incidentCount: 2, overflowCount: 0, targetStatus: "on_track", penaltyRiskScore: 18 },
]

export const kpiTrend = [
  { month: "Oct", m1: 56.1, m2: 50.2, m3: 44.1, m4: 63.2, m5: 55.0, m6: 59.8 },
  { month: "Nov", m1: 57.4, m2: 51.8, m3: 45.3, m4: 64.0, m5: 56.2, m6: 60.5 },
  { month: "Dec", m1: 58.0, m2: 52.1, m3: 44.8, m4: 64.5, m5: 57.1, m6: 61.2 },
  { month: "Jan", m1: 59.2, m2: 52.8, m3: 46.0, m4: 65.3, m5: 57.8, m6: 61.8 },
  { month: "Feb", m1: 60.1, m2: 53.5, m3: 47.1, m4: 66.2, m5: 58.4, m6: 62.5 },
  { month: "Mar", m1: 61.2, m2: 54.8, m3: 48.3, m4: 67.1, m5: 59.2, m6: 63.4 },
]

export const interventions: Intervention[] = [
  { id: "int1", municipalityId: "m1", type: "education_campaign", startDate: "2026-01-10", endDate: "2026-02-10", targetZone: "Northgate", description: "Plastic sorting awareness campaign targeting households.", beforeRate: 58.0, afterRate: 61.2 },
  { id: "int2", municipalityId: "m1", type: "bin_deployment", startDate: "2026-02-01", endDate: "2026-02-14", targetZone: "Riverside", description: "Added 5 plastic bins near market stalls.", beforeRate: 57.0, afterRate: 60.5 },
  { id: "int3", municipalityId: "m2", type: "route_adjustment", startDate: "2026-02-15", endDate: "2026-03-15", targetZone: "Harbour District", description: "Increased organic collection frequency to 3x/week.", beforeRate: 50.5, afterRate: 54.8 },
  { id: "int4", municipalityId: "m3", type: "local_pilot", startDate: "2026-03-01", endDate: "2026-04-01", targetZone: "Greenfields", description: "Pilot smart bin rollout in residential area.", beforeRate: 45.0, afterRate: 48.3 },
]

export const pickupSchedule = [
  { id: "p1", municipalityId: "m1", date: "2026-03-28", wasteStream: "plastic" as WasteStream, area: "Northgate, Riverside" },
  { id: "p2", municipalityId: "m1", date: "2026-03-29", wasteStream: "organic" as WasteStream, area: "All zones" },
  { id: "p3", municipalityId: "m1", date: "2026-04-01", wasteStream: "paper" as WasteStream, area: "Northgate, Old Quarter" },
  { id: "p4", municipalityId: "m1", date: "2026-04-02", wasteStream: "glass" as WasteStream, area: "Riverside" },
  { id: "p5", municipalityId: "m1", date: "2026-04-03", wasteStream: "mixed" as WasteStream, area: "All zones" },
  { id: "p6", municipalityId: "m1", date: "2026-04-05", wasteStream: "plastic" as WasteStream, area: "Old Quarter" },
]

export const sortingGuideItems = [
  { item: "Pizza box", stream: "paper" as WasteStream, guidance: "Empty pizza boxes go in paper. If heavily greasy, tear off the clean lid and put it in paper; the soiled base goes in mixed waste." },
  { item: "Plastic bottle", stream: "plastic" as WasteStream, guidance: "Rinse and crush before placing in the plastic bin. Remove caps if they are a different plastic type." },
  { item: "Glass jar", stream: "glass" as WasteStream, guidance: "Rinse the jar and remove metal lids. Lids go in metal/mixed stream. Do not wrap in plastic." },
  { item: "Newspaper", stream: "paper" as WasteStream, guidance: "Dry newspapers and magazines go in the paper bin. Wet or contaminated paper goes in mixed waste." },
  { item: "Food scraps", stream: "organic" as WasteStream, guidance: "All cooked and uncooked food scraps, coffee grounds, eggshells, and fruit peels belong in the organic stream." },
  { item: "Aluminium can", stream: "metal" as WasteStream, guidance: "Rinse aluminium cans and place in the metal or mixed stream depending on your municipality's rules." },
  { item: "Plastic bag", stream: "mixed" as WasteStream, guidance: "Plastic bags are NOT recyclable in the plastic stream. Place in mixed waste, or return to supermarket collection points." },
  { item: "Battery", stream: "hazardous" as WasteStream, guidance: "NEVER place batteries in household bins. Bring to designated collection points at supermarkets or municipal drop-off centres." },
  { item: "Cardboard box", stream: "paper" as WasteStream, guidance: "Flatten cardboard boxes before placing in the paper/cardboard bin. Ensure no tape or styrofoam remains attached." },
  { item: "Yoghurt pot", stream: "plastic" as WasteStream, guidance: "Rinse plastic yoghurt pots and place in the plastic stream. The foil lid goes in mixed waste." },
]

export const educationTopics = [
  { id: "e1", title: "Why plastic sorting matters", category: "contamination", reads: 1240, municipalityId: "m1" },
  { id: "e2", title: "The cost of contaminated recycling", category: "contamination", reads: 890, municipalityId: "m1" },
  { id: "e3", title: "How to sort organic waste correctly", category: "sorting", reads: 2100, municipalityId: "m1" },
  { id: "e4", title: "Glass recycling: what goes where", category: "sorting", reads: 680, municipalityId: "m1" },
  { id: "e5", title: "Understanding the recycling symbol", category: "awareness", reads: 1540, municipalityId: "m1" },
  { id: "e6", title: "Your neighbourhood's recycling impact", category: "community", reads: 430, municipalityId: "m1" },
]

export const users: User[] = [
  { id: "u1", name: "Alex Verdana", email: "alex@verdana.gov", role: "municipality", municipalityId: "m1" },
  { id: "u2", name: "Sarah Novaterra", email: "sarah@novaterra.region", role: "regional" },
  { id: "u3", name: "Johan Waste", email: "johan@wasteco.com", role: "operator" },
  { id: "u4", name: "Marie Citizen", email: "marie@mail.com", role: "citizen", municipalityId: "m1" },
  { id: "u5", name: "Tom Admin", email: "tom@wastenomore.io", role: "admin" },
  { id: "u6", name: "Lena Arkholm", email: "lena@arkholm.gov", role: "municipality", municipalityId: "m2" },
  { id: "u7", name: "Pieter Lysveld", email: "pieter@lysveld.gov", role: "municipality", municipalityId: "m3" },
]

export const invoices: Invoice[] = [
  { id: "inv1", type: "annual_collection", description: "Annual waste collection fee 2026 — Q2", issueDate: "2026-03-01", dueDate: "2026-04-01", amount: 89.50, status: "outstanding" },
  { id: "inv2", type: "excess_waste_penalty", description: "Excess residual waste — March 2026", issueDate: "2026-03-10", dueDate: "2026-03-28", amount: 15.00, status: "overdue" },
  { id: "inv3", type: "bulky_waste", description: "Bulky waste collection — 22 Feb 2026", issueDate: "2026-02-01", dueDate: "2026-02-28", amount: 45.00, status: "paid" },
  { id: "inv4", type: "annual_collection", description: "Annual waste collection fee 2025 — Q4", issueDate: "2025-10-01", dueDate: "2025-12-31", amount: 89.50, status: "paid" },
  { id: "inv5", type: "hazardous_disposal", description: "Hazardous waste drop-off fee — Jan 2026", issueDate: "2026-01-15", dueDate: "2026-02-15", amount: 12.00, status: "paid" },
]

export const paymentRecords: PaymentRecord[] = [
  { id: "pay1", invoiceId: "inv3", date: "2026-02-20", amount: 45.00, method: "ideal", description: "Bulky waste collection" },
  { id: "pay2", invoiceId: "inv4", date: "2025-12-10", amount: 89.50, method: "card", description: "Annual collection 2025 Q4" },
  { id: "pay3", invoiceId: "inv5", date: "2026-01-18", amount: 12.00, method: "apple_pay", description: "Hazardous disposal fee" },
]

// ─── Derived helpers ──────────────────────────────────────────────────────────

export const wasteStreamColors: Record<WasteStream, string> = {
  mixed: "#8b7355",
  organic: "#267351",
  paper: "#4a90a4",
  plastic: "#e8a838",
  glass: "#6ab04c",
  metal: "#888888",
  hazardous: "#e55353",
}

export const wasteStreamLabels: Record<WasteStream, string> = {
  mixed: "Mixed Waste",
  organic: "Organic",
  paper: "Paper & Cardboard",
  plastic: "Plastic",
  glass: "Glass",
  metal: "Metal",
  hazardous: "Hazardous",
}

export const incidentTypeLabels: Record<IncidentType, string> = {
  overflow: "Overflow",
  missed_pickup: "Missed Pickup",
  illegal_dumping: "Illegal Dumping",
  damaged_bin: "Damaged Bin",
  contamination: "Contamination",
  other: "Other",
}

export function getMunicipalityKPI(municipalityId: string): KPISnapshot | undefined {
  return kpiSnapshots.find(k => k.municipalityId === municipalityId)
}

export function getMunicipalityName(municipalityId: string): string {
  return municipalities.find(m => m.id === municipalityId)?.name ?? municipalityId
}
