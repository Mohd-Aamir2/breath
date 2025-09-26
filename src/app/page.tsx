import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/layout/header';
import { DashboardView } from '@/components/dashboard/dashboard-view';
import { ForecastingView } from '@/components/forecasting/forecasting-view';
import { PolicyView } from '@/components/policy/policy-view';
import { LineChart, ShieldCheck, LayoutDashboard } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto p-4 md:p-8">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:w-[600px] md:grid-cols-3 mb-6">
              <TabsTrigger value="dashboard">
                <LayoutDashboard className="mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="forecasting">
                <LineChart className="mr-2" />
                AQI Forecast
              </TabsTrigger>
              <TabsTrigger value="policy">
                <ShieldCheck className="mr-2" />
                Policy Impact
              </TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
              <DashboardView />
            </TabsContent>
            <TabsContent value="forecasting">
              <ForecastingView />
            </TabsContent>
            <TabsContent value="policy">
              <PolicyView />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
