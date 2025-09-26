'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { getAqiInfo } from '@/lib/data';
import { useMemo } from 'react';

const currentAqiValue = 151; // Dummy data
const location = 'Delhi, India';

export function CurrentAqi() {
  const aqiInfo = getAqiInfo(currentAqiValue);
  
  const aqiStyle = useMemo(() => {
    const aqiPercentage = Math.min(currentAqiValue / 500, 1);
    
    let color = 'hsl(var(--accent))'; // Good
    if (currentAqiValue > 50) color = 'hsl(var(--chart-1))'; // Moderate
    if (currentAqiValue > 100) color = 'hsl(var(--chart-2))'; // Unhealthy for Sensitive
    if (currentAqiValue > 150) color = 'hsl(var(--chart-3))'; // Unhealthy
    if (currentAqiValue > 200) color = 'hsl(var(--chart-4))'; // Very Unhealthy
    if (currentAqiValue > 300) color = 'hsl(var(--chart-5))'; // Hazardous

    return {
      background: `conic-gradient(${color} ${aqiPercentage * 360}deg, hsl(var(--muted)) 0deg)`
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Current Air Quality</span>
          <div className="flex items-center gap-1 text-sm font-normal text-muted-foreground">
            <MapPin className="size-4" />
            {location}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4">
        <div
          className="relative size-48 flex items-center justify-center rounded-full transition-all duration-500"
          style={aqiStyle}
        >
          <div className="absolute size-[10.5rem] rounded-full bg-card" />
          <div className="z-10 text-center">
            <div className={`text-6xl font-bold ${aqiInfo.color}`}>{currentAqiValue}</div>
            <div className={`text-lg font-medium ${aqiInfo.color}`}>{aqiInfo.level}</div>
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground max-w-xs">
          Live AQI for {location}. Last updated a few minutes ago.
        </p>
      </CardContent>
    </Card>
  );
}
