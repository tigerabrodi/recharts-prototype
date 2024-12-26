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

// Sample data - we'll use this to understand the basics
const data = [
  { month: 'Jan', sales: 4000, profit: 2400, uv: 2500 },
  { month: 'Feb', sales: 3000, profit: 1398, uv: 2000 },
  { month: 'Mar', sales: 2000, profit: 9800, uv: 1500 },
  { month: 'Apr', sales: 2780, profit: 3908, uv: 1000 },
  { month: 'May', sales: 1890, profit: 4800, uv: 1300 },
  { month: 'Jun', sales: 2390, profit: 3800, uv: 6000 },
]

const SimpleChart = () => {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 55,
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
          <Line type="monotone" dataKey="sales" stroke="#8884d8" />
          <Line type="monotone" dataKey="profit" stroke="#e0dd21" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SimpleChart
