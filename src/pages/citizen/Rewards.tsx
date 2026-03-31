import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, Award, Users, TrendingUp } from "lucide-react"

const badges = [
  { id: 1, name: "First Sort", icon: "♻️", earned: true, desc: "Completed your first sorting guide" },
  { id: 2, name: "Report Hero", icon: "🚨", earned: true, desc: "Submitted 5 incident reports" },
  { id: 3, name: "Eco Scholar", icon: "📚", earned: true, desc: "Read 3 education articles" },
  { id: 4, name: "Streak Master", icon: "🔥", earned: false, desc: "Sort correctly 7 days in a row" },
  { id: 5, name: "Community Champion", icon: "🏆", earned: false, desc: "Help your zone reach #1" },
]

const leaderboard = [
  { rank: 1, zone: "Old Quarter", points: 1480, change: "up" },
  { rank: 2, zone: "Northgate", points: 1240, change: "same" },
  { rank: 3, zone: "Riverside", points: 1105, change: "up" },
  { rank: 4, zone: "Market Square", points: 940, change: "down" },
]

export default function Rewards() {
  return (
    <div className="px-4 py-5 space-y-5">
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Rewards & Community</h2>
      </div>

      {/* Score card */}
      <Card className="border-primary border-2">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold">Your Score</p>
            <Badge className="bg-primary/10 text-primary border-0">Level 4</Badge>
          </div>
          <p className="text-4xl font-bold text-primary">1,240</p>
          <p className="text-xs text-muted-foreground mt-0.5">260 pts until <strong>Level 5 — Green Champion</strong></p>
          <Progress value={82} className="mt-3" />
        </CardContent>
      </Card>

      {/* Badges */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-4 h-4 text-primary" />
          <p className="text-sm font-semibold">Your Badges</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {badges.map((b) => (
            <Card key={b.id} className={`${b.earned ? "" : "opacity-40"}`}>
              <CardContent className="p-3 text-center">
                <div className="text-2xl mb-1">{b.icon}</div>
                <p className="text-[10px] font-medium leading-tight">{b.name}</p>
                {!b.earned && <p className="text-[9px] text-muted-foreground mt-0.5">{b.desc}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Zone leaderboard */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-primary" />
          <p className="text-sm font-semibold">Zone Leaderboard — March</p>
        </div>
        <div className="space-y-2">
          {leaderboard.map((entry) => (
            <Card key={entry.rank} className={entry.zone === "Northgate" ? "border-primary border-2" : ""}>
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <span className={`text-lg font-bold w-6 ${entry.rank === 1 ? "text-primary" : "text-muted-foreground"}`}>
                  {entry.rank}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{entry.zone}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {entry.change === "up" && <TrendingUp className="w-3 h-3 text-primary" />}
                  <span className="text-sm font-semibold">{entry.points.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
