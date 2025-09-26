import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SafeRoute() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Map className="size-5 text-primary" />
          <span>Safe Route Suggestion</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Suggesting less polluted routes for your commute based on real-time AQI and traffic data.
        </p>
        <div className="p-4 rounded-lg border bg-card-foreground/5">
            <p className="font-semibold">Recommended Route: Green Park to Connaught Place</p>
            <p className="text-sm text-muted-foreground">Via Aurobindo Marg is <span className="font-medium text-accent">15% cleaner</span> than the default route via August Kranti Marg.</p>
        </div>
        <Button>Find More Safe Routes</Button>
      </CardContent>
    </Card>
  );
}
