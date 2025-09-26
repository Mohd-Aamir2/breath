'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getPolicyImpactAction } from '@/app/actions';
import { Loader2, BrainCircuit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { PolicyImpactAnalysisOutput } from '@/ai/flows/policy-impact-analysis';

const formSchema = z.object({
  policyChange: z.string().min(10, { message: 'Please describe the policy change.' }),
  historicalAqiData: z.string().min(10, { message: 'Historical data is required.' }),
  localInterventions: z.string().min(10, { message: 'Intervention data is required.' }),
});

export function PolicyView() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PolicyImpactAnalysisOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      policyChange: 'Implement odd-even vehicle rule for 15 days.',
      historicalAqiData: 'Average winter AQI is 350. PM2.5 is the main pollutant.',
      localInterventions: 'During last year\'s odd-even, construction was also halted, and there was a temporary ban on firecrackers.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    const response = await getPolicyImpactAction(values);

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

  const getConfidenceBadgeVariant = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'default';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'destructive';
      default:
        return 'outline';
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="text-primary" />
            Policy Impact Analysis
          </CardTitle>
          <CardDescription>
            Analyze the potential impact of hypothetical policy changes on AQI.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="policyChange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hypothetical Policy Change</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Implement odd-even rule..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="historicalAqiData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Historical AQI Data Context</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Average winter AQI is 350..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="localInterventions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Past Local Interventions</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Construction halts, firecracker bans..." {...field} />
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
                    Analyzing...
                  </>
                ) : (
                  'Analyze Impact'
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
            <p>Our AI is running the simulation...</p>
          </div>
        )}
        {!isLoading && result && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold text-muted-foreground">Predicted AQI Impact</h3>
                    <p>{result.predictedAqiImpact}</p>
                </div>
                 <div>
                    <h3 className="font-semibold text-muted-foreground mb-2">Confidence Level</h3>
                    <Badge variant={getConfidenceBadgeVariant(result.confidenceLevel)}>{result.confidenceLevel}</Badge>
                </div>
                 <div>
                    <h3 className="font-semibold text-muted-foreground">Rationale</h3>
                    <p className="text-sm text-muted-foreground">{result.rationale}</p>
                </div>
            </CardContent>
          </Card>
        )}
        {!isLoading && !result && (
           <Card className="w-full border-dashed flex items-center justify-center min-h-[200px]">
             <div className="text-center text-muted-foreground p-8">
              <BrainCircuit className="mx-auto h-12 w-12 opacity-30" />
              <p className="mt-4">Your analysis will appear here.</p>
             </div>
           </Card>
        )}
      </div>
    </div>
  );
}
