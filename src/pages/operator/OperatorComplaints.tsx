import { incidents, incidentTypeLabels, municipalities, zones } from "@/data/mock"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

const operatorIncidents = incidents.filter(i =>
  ["overflow", "missed_pickup", "contamination"].includes(i.type)
)

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

export default function OperatorComplaints() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-primary" />
        <h1 className="text-2xl font-bold">Complaints & Service Issues</h1>
      </div>
      <p className="text-sm text-muted-foreground">Incidents relevant to collection operations.</p>

      <Card>
        <CardContent className="px-0 pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Municipality</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reported</TableHead>
                <TableHead>Description</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {operatorIncidents.map(i => (
                <TableRow key={i.id}>
                  <TableCell className="font-medium text-sm">{incidentTypeLabels[i.type]}</TableCell>
                  <TableCell className="text-sm">{municipalities.find(m => m.id === i.municipalityId)?.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{zones.find(z => z.id === i.zoneId)?.name}</TableCell>
                  <TableCell><Badge className={severityBadge[i.severity]}>{i.severity}</Badge></TableCell>
                  <TableCell><Badge variant="outline" className={statusBadge[i.status]}>{i.status.replace("_", " ")}</Badge></TableCell>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{formatTime(i.timestamp)}</TableCell>
                  <TableCell className="text-xs max-w-[200px] truncate">{i.description}</TableCell>
                  <TableCell><Button variant="ghost" size="sm" className="text-xs h-7">Resolve</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
