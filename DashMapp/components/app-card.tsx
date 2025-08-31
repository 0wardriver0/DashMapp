"use client"

import { useState } from "react"
import { ExternalLink, Edit, Trash2, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { deleteApp, type App } from "@/lib/database"
import { EditAppDialog } from "@/components/edit-app-dialog"

interface AppCardProps {
  app: App
  onUpdate: () => void
  showDescription?: boolean
  compact?: boolean
}

export function AppCard({ app, onUpdate, showDescription = true, compact = false }: AppCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false)

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this app?")) {
      try {
        await deleteApp(app.id)
        onUpdate()
      } catch (error) {
        console.error("Failed to delete app:", error)
      }
    }
  }

  const handleClick = () => {
    window.open(app.url, "_blank", "noopener,noreferrer")
  }

  const handleEditClick = () => {
    console.log("[v0] Edit button clicked for app:", app.name)
    setShowEditDialog(true)
  }

  return (
    <>
      <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer border-border bg-card">
        <CardContent className={compact ? "p-3" : "p-4"}>
          <div className={`flex items-start justify-between ${compact ? "mb-2" : "mb-3"}`}>
            <div className="flex-1 min-w-0" onClick={handleClick}>
              <div className={`flex items-center gap-3 ${compact ? "mb-1" : "mb-2"}`}>
                {app.icon ? (
                  <img
                    src={app.icon || "/placeholder.svg"}
                    alt={`${app.name} icon`}
                    className={`${compact ? "w-6 h-6" : "w-8 h-8"} rounded-md object-cover flex-shrink-0`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                      target.nextElementSibling?.classList.remove("hidden")
                    }}
                  />
                ) : null}
                <div
                  className={`${compact ? "w-6 h-6" : "w-8 h-8"} bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0 ${app.icon ? "hidden" : ""}`}
                >
                  <Globe className={`${compact ? "h-3 w-3" : "h-4 w-4"} text-primary`} />
                </div>
              </div>
              <h3 className={`font-medium text-card-foreground ${compact ? "text-xs" : "text-sm"} mb-1 truncate`}>
                {app.name}
              </h3>
              {app.description && showDescription && (
                <p className={`${compact ? "text-xs" : "text-xs"} text-muted-foreground line-clamp-2`}>
                  {app.description}
                </p>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`transition-opacity ${compact ? "h-8 w-8 p-0" : "h-8 w-8 p-0"} opacity-60 hover:opacity-100`}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEditClick}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleClick}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      <EditAppDialog
        app={app}
        open={showEditDialog}
        onOpenChange={(open) => {
          console.log("[v0] Edit dialog state changed:", open)
          setShowEditDialog(open)
        }}
        onUpdate={onUpdate}
      />
    </>
  )
}
