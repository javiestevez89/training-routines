import Link from "next/link"
import { Calendar, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Routine } from "@/types/database"

interface RoutineCardProps extends React.HTMLAttributes<HTMLDivElement> {
  routine: Routine
  showViewButton?: boolean
}

export function RoutineCard({
  routine,
  showViewButton = true,
  className,
  ...props
}: RoutineCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="space-y-1">
              <h3 className="font-semibold tracking-tight">
                {routine.goal.split("_").map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(" ")} Plan
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Created {new Date(routine.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          {showViewButton && (
            <Button variant="ghost" size="sm" className="ml-auto" asChild>
              <Link href={`/routine/${routine.id}`}>
                View
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            Level: {routine.experience_level.charAt(0).toUpperCase() + routine.experience_level.slice(1)}
          </p>
        </div>
      </div>
    </div>
  )
} 