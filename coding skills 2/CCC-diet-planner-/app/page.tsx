'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import InputSection from '@/components/input-section'
import OutputSection from '@/components/output-section'
import FoodDatasetTable from '@/components/food-dataset-table'
import { FoodItem, solveKnapsack } from '@/lib/knapsack-algorithm'

export default function DietPlanner() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [calorieLimit, setCalorieLimit] = useState<number>(2000)
  const [optimalPlan, setOptimalPlan] = useState<FoodItem[]>([])
  const [totalNutrition, setTotalNutrition] = useState<number>(0)
  const [totalCalories, setTotalCalories] = useState<number>(0)
  const [generated, setGenerated] = useState<boolean>(false)

  const handleGenerate = () => {
    const result = solveKnapsack(calorieLimit, selectedCategories)
    setOptimalPlan(result.items)
    setTotalNutrition(result.totalNutrition)
    setTotalCalories(result.totalCalories)
    setGenerated(true)
  }

  const handleReset = () => {
    setSelectedCategories([])
    setCalorieLimit(2000)
    setOptimalPlan([])
    setTotalNutrition(0)
    setTotalCalories(0)
    setGenerated(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
            Diet Planner Using Knapsack Algorithm
          </h1>
          <p className="text-lg text-muted-foreground">
            Optimize your nutrition using algorithmic meal planning
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Panel - Inputs */}
          <div className="space-y-6">
            <InputSection
              calorieLimit={calorieLimit}
              setCalorieLimit={setCalorieLimit}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />

            <div className="flex gap-3">
              <Button
                onClick={handleGenerate}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-10"
              >
                Generate Optimal Diet
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1 h-10"
              >
                Reset
              </Button>
            </div>
          </div>

          {/* Right Panel - Output */}
          <OutputSection
            optimalPlan={optimalPlan}
            totalCalories={totalCalories}
            totalNutrition={totalNutrition}
            calorieLimit={calorieLimit}
            generated={generated}
          />
        </div>

        {/* Food Dataset Table */}
        <FoodDatasetTable />
      </div>
    </main>
  )
}
