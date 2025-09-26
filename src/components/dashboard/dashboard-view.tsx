import { CurrentAqi } from './current-aqi';
import { HealthAlerts } from './health-alerts';
import { SafeRoute } from './safe-route';
import { AqiChart } from './aqi-chart';

export function DashboardView() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1 flex flex-col gap-6">
        <CurrentAqi />
        <HealthAlerts />
      </div>
      <div className="lg:col-span-2 flex flex-col gap-6">
        <SafeRoute />
        <AqiChart />
      </div>
    </div>
  );
}
