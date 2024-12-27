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
  { month: 'Jan', sales: 4000, profit: 2400, customers: 1400, orders: 1000 },
  { month: 'Feb', sales: 3000, profit: 1398, customers: 1800, orders: 1200 },
  { month: 'Mar', sales: 2000, profit: 9800, customers: 2200, orders: 1400 },
  { month: 'Apr', sales: 2780, profit: 3908, customers: 2000, orders: 1600 },
  { month: 'May', sales: 1890, profit: 4800, customers: 2400, orders: 1600 },
  { month: 'Jun', sales: 2390, profit: 3800, customers: 2100, orders: 1800 },
]

const ExtendedChart = () => {
  return (
    <div className="w-full h-[600px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 200,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#8884d8"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="profit"
            stroke="#82ca9d"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="customers"
            stroke="#ffc658"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#ff7300"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ExtendedChart
