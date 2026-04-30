'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import NutritionChart from '@/components/nutrition-chart'
import { FoodItem } from '@/lib/knapsack-algorithm'

interface OutputSectionProps {
  optimalPlan: FoodItem[]
  totalCalories: number
  totalNutrition: number
  calorieLimit: number
  generated: boolean
}

export default function OutputSection({
  optimalPlan,
  totalCalories,
  totalNutrition,
  calorieLimit,
  generated,
}: OutputSectionProps) {
  const remainingCalories = calorieLimit - totalCalories
  const caloriePercentage = (totalCalories / calorieLimit) * 100

  return (
    <Card className="border-border bg-card shadow-sm lg:sticky lg:top-8">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl text-foreground">Optimal Diet Plan</CardTitle>
            <CardDescription>Your personalized meal recommendations</CardDescription>
          </div>
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
            0/1 Knapsack
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!generated ? (
          <div className="flex items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">Results will appear here</p>
          </div>
        ) : optimalPlan.length === 0 ? (
          <div className="flex items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">No optimal meals found for your constraints</p>
          </div>
        ) : (
          <>
            {/* Calorie Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground font-medium">Calorie Distribution</span>
                <span className="text-muted-foreground">
                  {totalCalories} / {calorieLimit} kcal
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-primary/80 h-full transition-all duration-500"
                  style={{ width: `${Math.min(caloriePercentage, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {remainingCalories > 0
                  ? `${remainingCalories} kcal remaining`
                  : 'Calorie limit exceeded'}
              </p>
            </div>

            {/* Selected Foods */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground text-sm">Selected Foods</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {optimalPlan.map((food, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{food.name}</p>
                      <p className="text-xs text-muted-foreground">{food.category}</p>
                    </div>
                    <div className="text-right ml-2">
                      <p className="font-semibold text-foreground text-sm">{food.calories}</p>
                      <p className="text-xs text-muted-foreground">cal</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition Chart */}
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground text-sm">Nutrition Distribution</h3>
              <NutritionChart items={optimalPlan} />
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Total Nutrition Score</p>
                <p className="text-2xl font-bold text-primary">{totalNutrition.toFixed(1)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Items Selected</p>
                <p className="text-2xl font-bold text-primary">{optimalPlan.length}</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
