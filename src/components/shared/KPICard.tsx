import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface KPICardProps {
  title: string
  value: string | number
  unit?: string
  trend?: "up" | "down" | "neutral"
  trendLabel?: string
  highlight?: "positive" | "negative" | "neutral" | "warning"
  suffix?: string
}

const highlightClasses: Record<string, string> = {
  positive: "border-l-4 border-l-primary bg-primary/5",
  negative: "border-l-4 border-l-destructive bg-destructive/5",
  warning: "border-l-4 border-l-amber-400 bg-amber-50",
  neutral: "",
}

export function KPICard({ title, value, unit, trend, trendLabel, highlight = "neutral", suffix }: KPICardProps) {
  const ariaLabel = `${title}: ${value}${unit ? ` ${unit}` : ""}${suffix ? ` ${suffix}` : ""}${trendLabel ? `. ${trendLabel}` : ""}`
  return (
    <Card className={cn("bg-white", highlightClasses[highlight])} aria-label={ariaLabel}>
      <CardContent className="pt-5 pb-4">
        <p className="text-sm text-muted-foreground font-medium tracking-wide mb-1">{title}</p>
        <div className="flex items-end gap-1">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          {unit && <span className="text-sm text-muted-foreground mb-0.5">{unit}</span>}
          {suffix && <span className="text-sm text-muted-foreground mb-0.5">{suffix}</span>}
        </div>
        {(trend || trendLabel) && (
          <div className={cn("flex items-center gap-1.5 mt-2 text-xs font-medium", {
            "text-primary": trend === "up",
            "text-destructive": trend === "down",
            "text-muted-foreground": trend === "neutral" || !trend,
          })} aria-hidden="true">
            {trend === "up" && <TrendingUp className="w-4 h-4" />}
            {trend === "down" && <TrendingDown className="w-4 h-4" />}
            {trend === "neutral" && <Minus className="w-4 h-4" />}
            {trendLabel && <span>{trendLabel}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
