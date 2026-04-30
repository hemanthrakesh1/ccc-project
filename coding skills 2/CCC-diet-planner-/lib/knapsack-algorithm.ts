import { foodDataset } from './food-data'

export interface FoodItem {
  name: string
  calories: number
  nutrition: number
  category: string
  protein: number
  fiber: number
  vitaminScore: number
}

export interface KnapsackResult {
  items: FoodItem[]
  totalCalories: number
  totalNutrition: number
}

export function solveKnapsack(
  calorieLimit: number,
  selectedCategories: string[]
): KnapsackResult {
  // Filter foods based on selected categories
  const availableFoods =
    selectedCategories.length === 0
      ? foodDataset
      : foodDataset.filter((food) => selectedCategories.includes(food.category))

  if (availableFoods.length === 0) {
    return { items: [], totalCalories: 0, totalNutrition: 0 }
  }

  // Dynamic Programming table: dp[i][w] = max nutrition for weight w using first i items
  const n = availableFoods.length
  const capacity = calorieLimit
  const dp: number[][] = Array(n + 1)
    .fill(null)
    .map(() => Array(capacity + 1).fill(0))

  // Fill the DP table
  for (let i = 1; i <= n; i++) {
    const food = availableFoods[i - 1]
    for (let w = 0; w <= capacity; w++) {
      // Don't include this item
      dp[i][w] = dp[i - 1][w]

      // Include this item if it fits
      if (food.calories <= w) {
        dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - food.calories] + food.nutrition)
      }
    }
  }

  // Backtrack to find which items were selected
  const selectedItems: FoodItem[] = []
  let remainingCalories = capacity

  for (let i = n; i > 0 && remainingCalories > 0; i--) {
    // If the value comes from including the current item
    if (dp[i][remainingCalories] !== dp[i - 1][remainingCalories]) {
      const food = availableFoods[i - 1]
      selectedItems.push(food)
      remainingCalories -= food.calories
    }
  }

  // Calculate totals
  const totalNutrition = selectedItems.reduce((sum, food) => sum + food.nutrition, 0)
  const totalCalories = calorieLimit - remainingCalories

  return {
    items: selectedItems,
    totalCalories,
    totalNutrition,
  }
}
