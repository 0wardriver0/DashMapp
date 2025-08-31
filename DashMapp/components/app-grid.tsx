"use client"

import { useState, useEffect } from "react"
import { AppCard } from "@/components/app-card"
import { getApps, getCategories, type App, type Category } from "@/lib/database"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface AppGridProps {
  gridSize: number
  showDescriptions: boolean
  compactMode: boolean
}

export function AppGrid({ gridSize, showDescriptions, compactMode }: AppGridProps) {
  const [apps, setApps] = useState<App[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    const handleAppsUpdated = () => loadData()
    window.addEventListener("apps-updated", handleAppsUpdated)
    return () => window.removeEventListener("apps-updated", handleAppsUpdated)
  }, [])

  const loadData = async () => {
    try {
      const [appsData, categoriesData] = await Promise.all([getApps(), getCategories()])
      setApps(appsData)
      setCategories(categoriesData)
    } catch (error) {
      console.error("Failed to load data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAppUpdate = () => {
    loadData()
  }

  const filteredApps = selectedCategory ? apps.filter((app) => app.category_id === selectedCategory) : apps

  const uncategorizedApps = filteredApps.filter((app) => !app.category_id)
  const categorizedApps = categories.reduce(
    (acc, category) => {
      const categoryApps = filteredApps.filter((app) => app.category_id === category.id)
      if (categoryApps.length > 0) {
        acc[category.name] = categoryApps
      }
      return acc
    },
    {} as Record<string, App[]>,
  )

  if (loading) {
    return (
      <div
        className={`grid gap-${compactMode ? "3" : "4"}`}
        style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`${compactMode ? "h-24" : "h-32"} bg-card rounded-lg border animate-pulse`} />
        ))}
      </div>
    )
  }

  if (apps.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Plus className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-medium mb-2">No apps added yet</h3>
          <p className="text-sm">Click "Add App" to start building your dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All Apps ({apps.length})
          </Button>
          {categories.map((category) => {
            const count = apps.filter((app) => app.category_id === category.id).length
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({count})
              </Button>
            )
          })}
        </div>
      )}

      {Object.entries(categorizedApps).map(([categoryName, categoryApps]) => (
        <div key={categoryName}>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Badge variant="secondary">{categoryName}</Badge>
            <span className="text-sm text-muted-foreground">({categoryApps.length})</span>
          </h2>
          <div
            className={`grid gap-${compactMode ? "3" : "4"}`}
            style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
          >
            {categoryApps.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                onUpdate={handleAppUpdate}
                showDescription={showDescriptions}
                compact={compactMode}
              />
            ))}
          </div>
        </div>
      ))}

      {uncategorizedApps.length > 0 && (
        <div>
          {Object.keys(categorizedApps).length > 0 && (
            <>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Badge variant="outline">Uncategorized</Badge>
                <span className="text-sm text-muted-foreground">({uncategorizedApps.length})</span>
              </h2>
            </>
          )}
          <div
            className={`grid gap-${compactMode ? "3" : "4"}`}
            style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
          >
            {uncategorizedApps.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                onUpdate={handleAppUpdate}
                showDescription={showDescriptions}
                compact={compactMode}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
