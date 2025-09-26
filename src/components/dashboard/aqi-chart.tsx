'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { aqiHistoryData, getAqiInfo } from '@/lib/data';

const chartConfig = {
  aqi: {
    label: 'AQI',
  },
} satisfies ChartConfig;

export function AqiChart() {
    const latestAqi = aqiHistoryData[aqiHistoryData.length - 1].aqi;
    const aqiInfo = getAqiInfo(latestAqi);

  return (
    <Card>
      <CardHeader>
        <CardTitle>AQI Trend</CardTitle>
        <CardDescription>Last 7 Days - Current AQI is <span className={`font-bold ${aqiInfo.color}`}>{aqiInfo.level}</span></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ResponsiveContainer>
                <LineChart data={aqiHistoryData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={[0, 'dataMax + 50']} fontSize={12} />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                    />
                    <Line
                        dataKey="aqi"
                        type="monotone"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{
                            fill: 'hsl(var(--primary))',
                            r: 5,
                        }}
                        activeDot={{
                            r: 7,
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
