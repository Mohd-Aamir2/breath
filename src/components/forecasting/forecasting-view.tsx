'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getForecastAction } from '@/app/actions';
import { Loader2, Wand2 } from 'lucide-react';
import type { ShortTermAQIForecastingOutput } from '@/ai/flows/short-term-aqi-forecasting';

const formSchema = z.object({
  location: z.string().min(2, { message: 'Location is required.' }),
  pastAqiData: z.string().min(10, { message: 'Please provide some past AQI data.' }),
});

export function ForecastingView() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ShortTermAQIForecastingOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: 'Delhi, India',
      pastAqiData: 'Last 3 days AQI: 151, 145, 160. Weather: Hazy, calm winds.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    const response = await getForecastAction(values);

    if ('error' in response) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: response.error,
      });
    } else {
      setResult(response);
    }
    setIsLoading(false);
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="text-primary" />
            Short-Term AQI Forecast
          </CardTitle>
          <CardDescription>
            Provide a location and past AQI data to generate a 24-72 hour forecast.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Delhi, India" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pastAqiData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Past AQI Data & Conditions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Last 3 days AQI: 151, 145, 160. Weather: Hazy, calm winds."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Forecast'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <div className="flex items-center justify-center">
        {isLoading && (
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p>Our AI is analyzing the data...</p>
          </div>
        )}
        {!isLoading && result && (
          <Card className="w-full bg-primary/10 border-primary">
            <CardHeader>
              <CardTitle>Generated Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{result.forecast}</p>
            </CardContent>
          </Card>
        )}
        {!isLoading && !result && (
           <Card className="w-full border-dashed flex items-center justify-center min-h-[200px]">
             <div className="text-center text-muted-foreground p-8">
              <Wand2 className="mx-auto h-12 w-12 opacity-30" />
              <p className="mt-4">Your forecast will appear here.</p>
             </div>
           </Card>
        )}
      </div>
    </div>
  );
}
