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
    satisfaction: 93.5,
  },
  {
    month: 'Feb',
    revenue: 52000,
    customers: 150,
    satisfaction: 91.8,
  },
  {
    month: 'Mar',
    revenue: 49800,
    customers: 180,
    satisfaction: 90.2,
  },
  {
    month: 'Apr',
    revenue: 62500,
    customers: 210,
    satisfaction: 94.7,
  },
  {
    month: 'May',
    revenue: 58300,
    customers: 190,
    satisfaction: 96.4,
  },
]

const MultiAxisChart = () => {
  return (
    <div className="w-full h-[600px] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 60,
            left: 30,
            bottom: 20,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
            stroke="#eee"
          />
          <XAxis
            dataKey="month"
            tick={{ fill: '#666' }}
            axisLine={{ stroke: '#666' }}
          />

          {/* Revenue axis */}
          <YAxis
            yAxisId="revenue"
            orientation="left"
            stroke="#6366f1" // Indigo
            tickFormatter={(value) => `$${value / 1000}k`}
            label={{
              value: 'Revenue',
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle', fill: '#6366f1' },
            }}
            tick={{ fill: '#6366f1' }}
          />

          {/* Customers axis */}
          <YAxis
            yAxisId="customers"
            orientation="right"
            stroke="#22c55e" // Green
            label={{
              value: 'Customers',
              angle: 90,
              position: 'insideRight',
              style: { textAnchor: 'middle', fill: '#22c55e' },
            }}
            tick={{ fill: '#22c55e' }}
          />

          {/* Satisfaction axis */}
          <YAxis
            yAxisId="satisfaction"
            orientation="right"
            stroke="#f59e0b" // Amber
            domain={[85, 100]}
            label={{
              value: 'Satisfaction (%)',
              angle: 45,
              position: 'insideRight',
              style: { textAnchor: 'middle', fill: '#f59e0b' },
            }}
            tick={{ fill: '#f59e0b' }}
            offset={45}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
            formatter={(value, name) => {
              if (name === 'revenue')
                return [`$${value.toLocaleString()}`, 'Revenue']
              if (name === 'customers') return [value, 'Customers']
              if (name === 'satisfaction')
                return [`${value as string}%%%`, 'Satisfaction']
              return [value, name]
            }}
          />

          <Legend verticalAlign="bottom" height={30} />

          <Line
            yAxisId="revenue"
            type="monotone"
            dataKey="revenue"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
          />
          <Line
            yAxisId="customers"
            type="monotone"
            dataKey="customers"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
          />
          <Line
            yAxisId="satisfaction"
            type="monotone"
            dataKey="satisfaction"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MultiAxisChart
