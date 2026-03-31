import { useState } from "react"
import { users, municipalities } from "@/data/mock"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Plus } from "lucide-react"

const roleBadge: Record<string, string> = {
  citizen: "bg-muted text-muted-foreground border-0",
  municipality: "bg-primary/10 text-primary border-0",
  regional: "bg-sky-100 text-sky-700 border-0",
  operator: "bg-amber-100 text-amber-700 border-0",
  admin: "bg-secondary/10 text-secondary border-0",
}

export default function AdminUsers() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold">Users & Roles</h1>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="w-3.5 h-3.5 mr-1" /> Add User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label>Name</Label>
                <Input placeholder="Full name" />
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input type="email" placeholder="user@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label>Role</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="citizen">Citizen</SelectItem>
                    <SelectItem value="municipality">Municipality</SelectItem>
                    <SelectItem value="regional">Regional Authority</SelectItem>
                    <SelectItem value="operator">Waste Operator</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Municipality (if applicable)</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select municipality" /></SelectTrigger>
                  <SelectContent>
                    {municipalities.map(m => (
                      <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Create User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="px-0 pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Municipality</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(u => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{u.email}</TableCell>
                  <TableCell><Badge className={roleBadge[u.role]}>{u.role}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {u.municipalityId ? municipalities.find(m => m.id === u.municipalityId)?.name : "—"}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-xs h-7">Edit</Button>
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
