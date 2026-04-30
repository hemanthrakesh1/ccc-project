'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

const categories = [
  'Protein',
  'Dairy',
  'Grains',
  'Vegetables',
  'Fruits',
  'Nuts',
  'Legumes',
  'Healthy Fats',
]

interface InputSectionProps {
  calorieLimit: number
  setCalorieLimit: (value: number) => void
  selectedCategories: string[]
  setSelectedCategories: (value: string[]) => void
}

export default function InputSection({
  calorieLimit,
  setCalorieLimit,
  selectedCategories,
  setSelectedCategories,
}: InputSectionProps) {
  const toggleCategory = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category]
    )
  }

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl text-foreground">Meal Planning Parameters</CardTitle>
        <CardDescription>Set your preferences for optimal results</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Calorie Limit Input */}
        <div className="space-y-2">
          <Label htmlFor="calories" className="text-foreground font-medium">
            Daily Calorie Limit
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="calories"
              type="number"
              min="500"
              max="5000"
              step="100"
              value={calorieLimit}
              onChange={(e) => setCalorieLimit(Number(e.target.value))}
              className="flex-1 border-border bg-background text-foreground"
            />
            <span className="text-sm text-muted-foreground font-medium">kcal</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Recommended: 1500-2500 calories per day
          </p>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <Label className="text-foreground font-medium">Food Categories (Optional)</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between border-border bg-background text-foreground hover:bg-muted"
              >
                <span>
                  {selectedCategories.length === 0
                    ? 'Select categories...'
                    : `${selectedCategories.length} selected`}
                </span>
                <ChevronDown className="w-4 h-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                  className="cursor-pointer"
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedCategories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-xs font-medium"
                >
                  {category}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="ml-1 hover:opacity-70"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
