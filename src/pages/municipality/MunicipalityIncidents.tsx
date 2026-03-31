import { useState } from "react"
import { incidents, incidentTypeLabels, zones } from "@/data/mock"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

const severityBadge: Record<string, string> = {
  high: "bg-red-100 text-red-700 border-0",
  medium: "bg-yellow-100 text-yellow-700 border-0",
  low: "bg-muted text-muted-foreground border-0",
}

const statusBadge: Record<string, string> = {
  open: "bg-red-50 text-red-700 border-red-200",
  in_progress: "bg-blue-50 text-blue-700 border-blue-200",
  resolved: "bg-primary/10 text-primary border-primary/20",
}

function formatTime(ts: string) {
  return new Date(ts).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
}

export default function MunicipalityIncidents() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [search, setSearch] = useState("")

  const filtered = incidents
    .filter(i => i.municipalityId === "m1")
    .filter(i => statusFilter === "all" || i.status === statusFilter)
    .filter(i => search === "" || i.description.toLowerCase().includes(search.toLowerCase()) || incidentTypeLabels[i.type].toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-primary" />
        <h1 className="text-2xl font-bold">Incident Triage</h1>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <Input
          placeholder="Search incidents…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select defaultValue="all" onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground font-medium">{filtered.length} reports</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reported</TableHead>
                <TableHead>Description</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(i => (
                <TableRow key={i.id}>
                  <TableCell className="font-medium text-sm">{incidentTypeLabels[i.type]}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {zones.find(z => z.id === i.zoneId)?.name ?? i.zoneId}
                  </TableCell>
                  <TableCell>
                    <Badge className={severityBadge[i.severity]}>{i.severity}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusBadge[i.status]}>
                      {i.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{formatTime(i.timestamp)}</TableCell>
                  <TableCell className="text-xs max-w-[200px] truncate">{i.description}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-xs h-7">Assign</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
