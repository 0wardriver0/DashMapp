"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { AppGrid } from "@/components/app-grid"
import { AddAppDialog } from "@/components/add-app-dialog"
import { ThemeToggle } from "@/components/theme-toggle"
import { getCategories, addCategory, updateCategory, deleteCategory, type Category } from "@/lib/database"

export default function HomePage() {
  const [gridSize, setGridSize] = useState(4)
  const [showDescriptions, setShowDescriptions] = useState(true)
  const [compactMode, setCompactMode] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const categoriesData = await getCategories()
      setCategories(categoriesData)
    } catch (error) {
      console.error("Failed to load categories:", error)
    }
  }

  const handleAddCategory = async (name: string) => {
    try {
      await addCategory({ name })
      loadCategories()
    } catch (error) {
      console.error("Failed to add category:", error)
    }
  }

  const handleUpdateCategory = async (id: number, name: string) => {
    try {
      await updateCategory(id, { name })
      loadCategories()
    } catch (error) {
      console.error("Failed to update category:", error)
    }
  }

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategory(id)
      loadCategories()
    } catch (error) {
      console.error("Failed to delete category:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <DashboardHeader
          gridSize={gridSize}
          onGridSizeChange={setGridSize}
          showDescriptions={showDescriptions}
          onShowDescriptionsChange={setShowDescriptions}
          compactMode={compactMode}
          onCompactModeChange={setCompactMode}
          categories={categories}
          onAddCategory={handleAddCategory}
          onUpdateCategory={handleUpdateCategory}
          onDeleteCategory={handleDeleteCategory}
        />
        <AppGrid gridSize={gridSize} showDescriptions={showDescriptions} compactMode={compactMode} />
        <AddAppDialog />
        <div className="fixed bottom-6 right-6">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
