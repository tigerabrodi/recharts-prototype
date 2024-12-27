import { useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

// Types for our data
interface MetricData {
  timestamp: string
  [key: string]: string | number
}

interface MetricInfo {
  name: string
  label: string
}

// Available chart colors from our theme
const CHART_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
]

// Mock metrics we want to display
const AVAILABLE_METRICS: MetricInfo[] = [
  { name: 'activeUsers', label: 'Active Users' },
  { name: 'newSignups', label: 'New Signups' },
  { name: 'revenue', label: 'Revenue ($)' },
  { name: 'conversions', label: 'Conversions' },
  { name: 'pageViews', label: 'Page Views' },
]

const generateRandomData = (metrics: MetricInfo[]) => {
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))

    // Create base object with timestamp
    const dataPoint: MetricData = {
      timestamp: date.toISOString(),
    }

    // Add random values for each metric
    metrics.forEach((metric) => {
      switch (metric.name) {
        case 'activeUsers':
          dataPoint[metric.name] = Math.floor(Math.random() * 1000 + 500)
          break
        case 'newSignups':
          dataPoint[metric.name] = Math.floor(Math.random() * 200 + 50)
          break
        case 'revenue':
          dataPoint[metric.name] = Math.floor(Math.random() * 50000 + 10000)
          break
        case 'conversions':
          dataPoint[metric.name] = Math.floor(Math.random() * 100 + 20)
          break
        case 'pageViews':
          dataPoint[metric.name] = Math.floor(Math.random() * 5000 + 1000)
          break
        default:
          dataPoint[metric.name] = Math.floor(Math.random() * 1000)
      }
    })

    return dataPoint
  })
}

// Simulate API response but generate data locally
const fetchChartData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Randomly select 3-4 metrics
  const numberOfMetrics = Math.floor(Math.random() * 2) + 3 // 3 or 4 metrics
  const selectedMetrics = [...AVAILABLE_METRICS]
    .sort(() => Math.random() - 0.5)
    .slice(0, numberOfMetrics)

  return {
    metrics: selectedMetrics,
    data: generateRandomData(selectedMetrics),
  }
}

export default function DynamicChart() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<MetricData[]>([])
  const [metrics, setMetrics] = useState<MetricInfo[]>([])
  const [error, setError] = useState<string | null>(null)

  // Create dynamic chart config from metrics
  const chartConfig = metrics.reduce((config, metric, index) => {
    return {
      ...config,
      [metric.name]: {
        label: metric.label,
        // Use modulo to cycle through available colors
        color: CHART_COLORS[index % CHART_COLORS.length],
      },
    }
  }, {}) as ChartConfig

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const { data: chartData, metrics: chartMetrics } =
          await fetchChartData()
        setData(chartData)
        setMetrics(chartMetrics)
      } catch (err) {
        setError('Failed to load chart data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!data.length) return <div>No data available</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dynamic Metrics Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px]">
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value as string)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => (value as number).toLocaleString()}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => value.toLocaleString()}
                  labelFormatter={(value) => {
                    const date = new Date(value as string)
                    return date.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  }}
                />
              }
            />
            {metrics.map((metric, index) => (
              <Line
                key={metric.name}
                type="monotone"
                dataKey={metric.name}
                stroke={`var(--color-${metric.name})`}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
