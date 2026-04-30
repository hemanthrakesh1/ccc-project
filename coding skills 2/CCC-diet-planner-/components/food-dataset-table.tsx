'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { foodDataset } from '@/lib/food-data'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function FoodDatasetTable() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader
        className="pb-4 cursor-pointer hover:bg-muted/30 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-foreground">Food Dataset</CardTitle>
            <CardDescription>Browse all available food items</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-2"
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Food Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Calories</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Protein (g)</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Fiber (g)</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Vitamin Score</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Category</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Nutrition Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {foodDataset.map((food, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors hover:bg-muted/50 ${
                      idx % 2 === 0 ? 'bg-muted/20' : 'bg-background'
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-foreground">{food.name}</td>
                    <td className="px-4 py-3 text-foreground">{food.calories}</td>
                    <td className="px-4 py-3 text-foreground">{food.protein}</td>
                    <td className="px-4 py-3 text-foreground">{food.fiber}</td>
                    <td className="px-4 py-3 text-foreground">{food.vitaminScore}</td>
                    <td className="px-4 py-3 text-foreground">
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent-foreground">
                        {food.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-primary">{food.nutrition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Total items: {foodDataset.length}
          </p>
        </CardContent>
      )}
    </Card>
  )
}
