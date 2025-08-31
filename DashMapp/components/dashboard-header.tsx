"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SettingsDialog } from "./settings-dialog"
import { CategoryManager } from "./category-manager"
import type { Category } from "@/lib/database"

interface DashboardHeaderProps {
  gridSize: number
  onGridSizeChange: (size: number) => void
  showDescriptions: boolean
  onShowDescriptionsChange: (show: boolean) => void
  compactMode: boolean
  onCompactModeChange: (compact: boolean) => void
  categories: Category[]
  onAddCategory: (name: string) => void
  onUpdateCategory: (id: number, name: string) => void
  onDeleteCategory: (id: number) => void
}

export function DashboardHeader({
  gridSize,
  onGridSizeChange,
  showDescriptions,
  onShowDescriptionsChange,
  compactMode,
  onCompactModeChange,
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">DashMapp</h1>
        <p className="text-muted-foreground">Your personal command center for all applications and services</p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-transparent"
          onClick={() => {
            const event = new CustomEvent("open-add-app-dialog")
            window.dispatchEvent(event)
          }}
        >
          <Plus className="h-4 w-4" />
          Add App
        </Button>
        <CategoryManager
          categories={categories}
          onAddCategory={onAddCategory}
          onUpdateCategory={onUpdateCategory}
          onDeleteCategory={onDeleteCategory}
        />
        <SettingsDialog
          gridSize={gridSize}
          onGridSizeChange={onGridSizeChange}
          showDescriptions={showDescriptions}
          onShowDescriptionsChange={onShowDescriptionsChange}
          compactMode={compactMode}
          onCompactModeChange={onCompactModeChange}
        />
      </div>
    </header>
  )
}
