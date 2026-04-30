Diet Planner Using Knapsack Algorithm
📌 Overview

This project is a Diet Planner Web Application that uses the 0/1 Knapsack Algorithm (Dynamic Programming) to generate an optimal meal plan.
It selects the best combination of foods that gives maximum nutrition without exceeding a given calorie limit.

🎯 Features
Input daily calorie limit
Optional food category selection
Automatically generates optimal diet plan
Displays:
Selected food items
Calories used
Nutrition score
Visual calorie distribution bar
Nutrition chart for selected foods
Clean and user-friendly interface
🧠 Algorithm Used
0/1 Knapsack Algorithm
Dynamic Programming approach
Time Complexity: O(n × C)
(n = number of food items, C = calorie limit)
📊 How It Works
Load food dataset (calories, protein, fiber, vitamins)
Calculate Nutrition Score
Apply Knapsack DP
Select foods that maximize nutrition under calorie limit
Display results with charts
📂 Project Structure
DietPlanner/
├── frontend (v0 / React UI)
├── diet_planner.py (algorithm logic)
├── food_database.csv (dataset)
├── screenshots/
├── report.pdf
└── presentation.pptx
🚀 How to Run
For Python Version:
python diet_planner_full.py
For Web Version:
Open the frontend (v0 / React app)
Enter calorie limit
Click Generate Optimal Diet
📷 Output
Shows selected foods
Displays calorie usage (e.g., 1923 / 2000 kcal)
Visual nutrition chart
Compact optimized meal plan
🔮 Future Scope
Add cost-based optimization
Include user preferences (veg/non-veg)
Integrate real food APIs
Mobile app version
📚 References
Introduction to Algorithms (CLRS)
GeeksforGeeks – Knapsack Problem
Dynamic Programming Tutorials
