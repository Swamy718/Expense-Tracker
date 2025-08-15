import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
const COLORS = [
  "#fc5555ff", // Coral Re
  "#6A4C93", // Deep Violet
  "#1A535C", // Teal Blue
  "#FF9F1C", // Vibrant Orange
  "#0ca4beff", 
  "#f1ca2dff",
  "#2EC4B6"  
];


export default function MyPieChart({ data }) {
  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
