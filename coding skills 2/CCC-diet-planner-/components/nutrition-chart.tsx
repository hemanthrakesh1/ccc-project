'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { FoodItem } from '@/lib/knapsack-algorithm'

interface NutritionChartProps {
  items: FoodItem[]
}

export default function NutritionChart({ items }: NutritionChartProps) {
  const data = items.map((item) => ({
    name: item.name.substring(0, 10),
    nutrition: item.nutrition,
    calories: item.calories,
  }))

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--color-card)',
            border: `1px solid var(--color-border)`,
            borderRadius: '6px',
          }}
          labelStyle={{ color: 'var(--color-foreground)' }}
        />
        <Legend wrapperStyle={{ color: 'var(--color-muted-foreground)' }} />
        <Bar
          dataKey="nutrition"
          fill="var(--color-primary)"
          name="Nutrition Score"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
