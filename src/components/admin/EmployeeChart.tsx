"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface EmployeeChartProps {
  data: { name: string; value: number }[];
}

const COLORS = ["#6B5B95", "#FFD700", "#FF6F61"];

export default function EmployeeChart({ data }: EmployeeChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center">
      <h2 className="text-lg font-semibold mb-4 text-gray-500">Employee Attendance Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
