"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updateApp, type App } from "@/lib/database"

interface EditAppDialogProps {
  app: App
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: () => void
}

export function EditAppDialog({ app, open, onOpenChange, onUpdate }: EditAppDialogProps) {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("")
  const [icon, setIcon] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open && app) {
      setName(app.name)
      setUrl(app.url)
      setDescription(app.description || "")
      setIcon(app.icon || "")
    }
  }, [open, app])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !url.trim()) return

    setLoading(true)
    try {
      await updateApp(app.id, {
        name: name.trim(),
        url: url.trim(),
        description: description.trim() || null,
        icon: icon.trim() || null,
      })

      onOpenChange(false)
      onUpdate()
    } catch (error) {
      console.error("Failed to update app:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit App</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Name *</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="App name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-url">URL *</Label>
            <Input
              id="edit-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description (optional)"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-icon">Icon URL</Label>
            <Input
              id="edit-icon"
              type="url"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="https://example.com/icon.png (optional)"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
