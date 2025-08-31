"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, FolderPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Category } from "@/lib/database"

interface CategoryManagerProps {
  categories: Category[]
  onAddCategory: (name: string) => void
  onUpdateCategory: (id: number, name: string) => void
  onDeleteCategory: (id: number) => void
}

export function CategoryManager({
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}: CategoryManagerProps) {
  const [open, setOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editName, setEditName] = useState("")

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      onAddCategory(newCategoryName.trim())
      setNewCategoryName("")
    }
  }

  const handleUpdateCategory = () => {
    if (editingCategory && editName.trim()) {
      onUpdateCategory(editingCategory.id, editName.trim())
      setEditingCategory(null)
      setEditName("")
    }
  }

  const startEditing = (category: Category) => {
    setEditingCategory(category)
    setEditName(category.name)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <FolderPlus className="h-4 w-4" />
          Categories
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderPlus className="h-5 w-5" />
            Manage Categories
          </DialogTitle>
          <DialogDescription>Organize your apps into categories for better navigation</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
            />
            <Button onClick={handleAddCategory} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-2 border rounded-lg">
                {editingCategory?.id === category.id ? (
                  <div className="flex gap-2 flex-1">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleUpdateCategory()
                        if (e.key === "Escape") {
                          setEditingCategory(null)
                          setEditName("")
                        }
                      }}
                      className="h-8"
                    />
                    <Button onClick={handleUpdateCategory} size="sm" variant="outline">
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingCategory(null)
                        setEditName("")
                      }}
                      size="sm"
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{category.name}</Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button onClick={() => startEditing(category)} size="sm" variant="ghost">
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button
                        onClick={() => onDeleteCategory(category.id)}
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {categories.length === 0 && (
            <p className="text-center text-muted-foreground py-4">No categories yet. Add one above to get started.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
