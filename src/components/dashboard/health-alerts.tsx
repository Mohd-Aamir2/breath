import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { getAqiInfo, getHealthAlert } from '@/lib/data';
import { cn } from '@/lib/utils';

const currentAqiValue = 151;

export function HealthAlerts() {
  const aqiInfo = getAqiInfo(currentAqiValue);
  const alert = getHealthAlert(currentAqiValue);

  return (
    <Card className="overflow-hidden">
      <CardHeader className={cn('flex-row items-center gap-4 space-y-0 p-4', aqiInfo.bgColor)}>
        <div className={cn('p-2 rounded-lg', aqiInfo.bgColor.replace('/10', '/20'))}>
           <AlertTriangle className={cn('size-6', aqiInfo.color)} />
        </div>
        <CardTitle className={cn(aqiInfo.color)}>Health Advisory</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground">{alert}</p>
      </CardContent>
    </Card>
  );
}
