"use client"

import { useState } from "react"
import { Settings, Monitor, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

interface SettingsDialogProps {
  gridSize: number
  onGridSizeChange: (size: number) => void
  showDescriptions: boolean
  onShowDescriptionsChange: (show: boolean) => void
  compactMode: boolean
  onCompactModeChange: (compact: boolean) => void
}

export function SettingsDialog({
  gridSize,
  onGridSizeChange,
  showDescriptions,
  onShowDescriptionsChange,
  compactMode,
  onCompactModeChange,
}: SettingsDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Dashboard Settings
          </DialogTitle>
          <DialogDescription>Customize your dashboard appearance and layout</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="grid-size">Grid Size</Label>
            <div className="flex items-center gap-4">
              <Smartphone className="h-4 w-4 text-muted-foreground" />
              <Slider
                id="grid-size"
                min={2}
                max={8}
                step={1}
                value={[gridSize]}
                onValueChange={(value) => onGridSizeChange(value[0])}
                className="flex-1"
              />
              <Monitor className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">{gridSize} columns per row</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-descriptions">Show Descriptions</Label>
              <p className="text-sm text-muted-foreground">Display app descriptions on cards</p>
            </div>
            <Switch id="show-descriptions" checked={showDescriptions} onCheckedChange={onShowDescriptionsChange} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="compact-mode">Compact Mode</Label>
              <p className="text-sm text-muted-foreground">Reduce spacing and padding</p>
            </div>
            <Switch id="compact-mode" checked={compactMode} onCheckedChange={onCompactModeChange} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
