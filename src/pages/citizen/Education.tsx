import { educationTopics } from "@/data/mock"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Eye } from "lucide-react"

const categoryColours: Record<string, string> = {
  contamination: "bg-red-50 text-red-700 border-red-200",
  sorting: "bg-primary/10 text-primary border-primary/20",
  awareness: "bg-sky-50 text-sky-700 border-sky-200",
  community: "bg-accent text-foreground border-accent",
}

export default function Education() {
  return (
    <div className="px-4 py-5 space-y-4">
      <div className="flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Education Hub</h2>
      </div>
      <p className="text-sm text-muted-foreground">Local recycling tips and guides for Verdana.</p>

      {/* Featured */}
      <Card className="bg-primary border-0 text-white">
        <CardContent className="p-5">
          <Badge className="bg-white/20 text-white border-0 text-[10px] mb-2">Trending in Verdana</Badge>
          <h3 className="font-semibold text-base mb-1">How to sort organic waste correctly</h3>
          <p className="text-xs text-white/75">Organic contamination is Verdana's #1 issue this month. Learn what belongs in the green bin and what doesn't.</p>
          <div className="flex items-center gap-1 mt-3 text-xs text-white/60">
            <Eye className="w-3 h-3" /> 2,100 reads
          </div>
        </CardContent>
      </Card>

      {/* Topic list */}
      <div className="space-y-2">
        {educationTopics.slice(0, 5).map((topic) => (
          <Card key={topic.id} className="hover:shadow-sm transition-shadow cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium">{topic.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={`text-[10px] ${categoryColours[topic.category] ?? ""}`}>
                    {topic.category}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                    <Eye className="w-2.5 h-2.5" /> {topic.reads.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
