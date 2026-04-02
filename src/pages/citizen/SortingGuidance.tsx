import { useState } from "react"
import { sortingGuideItems, wasteStreamColors, wasteStreamLabels } from "@/data/mock"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Camera } from "lucide-react"

export default function SortingGuidance() {
  const [query, setQuery] = useState("")

  const results = query.length > 1
    ? sortingGuideItems.filter(i => i.item.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <div className="px-4 py-5 space-y-4">
      <div className="flex items-center gap-2">
        <Search className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Sorting Guide</h2>
      </div>
      <p className="text-sm text-muted-foreground">Search an item to find where it goes.</p>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="e.g. pizza box, battery, yoghurt pot…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <Button type="button" variant="outline" className="w-full gap-2">
        <Camera className="w-4 h-4" />
        Take a photo for sorting help
      </Button>

      {query.length > 1 && results.length === 0 && (
        <Card>
          <CardContent className="p-5 text-center text-sm text-muted-foreground">
            No match found. When in doubt, use <strong>mixed waste</strong> and avoid contamination.
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {(results.length > 0 ? results : sortingGuideItems.slice(0, 5)).map((item) => (
          <Card key={item.item} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: wasteStreamColors[item.stream] }}
                />
                <p className="font-semibold text-sm">{item.item}</p>
                <Badge
                  variant="outline"
                  className="ml-auto text-[10px]"
                  style={{ borderColor: wasteStreamColors[item.stream], color: wasteStreamColors[item.stream] }}
                >
                  {wasteStreamLabels[item.stream]}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground pl-6">{item.guidance}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {!query && (
        <p className="text-xs text-center text-muted-foreground">Showing popular items. Start typing to search all items.</p>
      )}
    </div>
  )
}
