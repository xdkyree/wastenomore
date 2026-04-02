import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Camera, MapPin } from "lucide-react"

const incidentTypes = [
  { value: "overflow", label: "Overflowing bin" },
  { value: "missed_pickup", label: "Missed pickup" },
  { value: "illegal_dumping", label: "Illegal dumping" },
  { value: "damaged_bin", label: "Damaged bin" },
  { value: "contamination", label: "Contamination concern" },
  { value: "other", label: "Other" },
]

export default function IncidentReporting() {
  const [type, setType] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (type) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="px-4 py-10 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-lg font-semibold">Report Submitted</h2>
        <p className="text-sm text-muted-foreground max-w-xs">
          Your report has been sent to the Verdana municipality team. You'll receive an update when it's processed.
        </p>
        <Card className="w-full text-left border-accent bg-accent/20">
          <CardContent className="p-4 space-y-1 text-xs">
            <p><span className="font-medium">Type:</span> {incidentTypes.find(t => t.value === type)?.label}</p>
            <p><span className="font-medium">Location:</span> {location || "Bin identified by QR or photo"}</p>
            {description && <p><span className="font-medium">Details:</span> {description}</p>}
            <p><span className="font-medium">Status:</span> Submitted — Awaiting triage</p>
          </CardContent>
        </Card>
        <Button variant="outline" onClick={() => { setSubmitted(false); setType(""); setLocation(""); setDescription("") }}>
          Submit another report
        </Button>
      </div>
    )
  }

  return (
    <div className="px-4 py-5 space-y-4">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Report an Issue</h2>
      </div>
      <p className="text-sm text-muted-foreground">Help your municipality by flagging problems near you.</p>

      <Button type="button" variant="outline" className="w-full justify-center gap-2">
        <Camera className="w-4 h-4" />
        Identify Bin by QR
      </Button>

      <Button type="button" variant="outline" className="w-full justify-center gap-2 border-dashed">
        <MapPin className="w-4 h-4" />
        Select location on map instead
      </Button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label>Type of issue *</Label>
          <Select onValueChange={setType} required>
            <SelectTrigger>
              <SelectValue placeholder="Select issue type" />
            </SelectTrigger>
            <SelectContent>
              {incidentTypes.map(t => (
                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Description</Label>
          <Textarea
            placeholder="Add any details that might help the team…"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <Button type="button" variant="outline" className="w-full gap-2">
          <Camera className="w-4 h-4" />
          Take Photo
        </Button>

        <Button type="submit" className="w-full">Submit Report</Button>
      </form>
    </div>
  )
}
