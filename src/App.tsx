import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  {
    month: 'Jan',
    revenue: 45000,
    customers: 120,
    satisfaction: 94.5,
  },
  {
    month: 'Feb',
    revenue: 52000,
    customers: 150,
    satisfaction: 92.8,
  },
  {
    month: 'Mar',
    revenue: 49800,
    customers: 180,
    satisfaction: 91.2,
  },
  {
    month: 'Apr',
    revenue: 62500,
    customers: 210,
    satisfaction: 95.7,
  },
  {
    month: 'May',
    revenue: 58300,
    customers: 190,
    satisfaction: 98.4,
  },
]

const MultiAxisChart = () => {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 200, // Increased to accommodate right axis
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />

          {/* Left Y-axis for revenue */}
          <YAxis
            yAxisId="revenue"
            orientation="left"
            stroke="#8884d8"
            label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft' }}
          />

          {/* Right Y-axis for customers */}
          <YAxis
            yAxisId="customers"
            orientation="right"
            stroke="#82ca9d"
            label={{ value: 'Customers', angle: 90, position: 'insideRight' }}
          />

          {/* Far right Y-axis for satisfaction */}
          <YAxis
            yAxisId="satisfaction"
            orientation="right"
            stroke="#ffc658"
            label={{
              value: 'Satisfaction (%)',
              angle: 90,
              position: 'insideRight',
            }}
            domain={[85, 100]} // Custom range for percentage
            // position="insideRight"
            offset={20} // Push this axis further right
          />

          <Tooltip />
          <Legend />

          <Line
            yAxisId="revenue"
            type="monotone"
            dataKey="revenue"
            stroke="#8884d8"
            strokeWidth={2}
          />
          <Line
            yAxisId="customers"
            type="monotone"
            dataKey="customers"
            stroke="#82ca9d"
            strokeWidth={2}
          />
          <Line
            yAxisId="satisfaction"
            type="monotone"
            dataKey="satisfaction"
            stroke="#ffc658"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MultiAxisChart
