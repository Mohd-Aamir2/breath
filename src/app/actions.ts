'use server';

import { getShortTermAQIForecast, ShortTermAQIForecastingInput, ShortTermAQIForecastingOutput } from '@/ai/flows/short-term-aqi-forecasting';
import { policyImpactAnalysis, PolicyImpactAnalysisInput, PolicyImpactAnalysisOutput } from '@/ai/flows/policy-impact-analysis';

export async function getForecastAction(input: ShortTermAQIForecastingInput): Promise<ShortTermAQIForecastingOutput | { error: string }> {
  try {
    const result = await getShortTermAQIForecast(input);
    return result;
  } catch (e) {
    console.error(e);
    return { error: 'Failed to generate forecast. Please try again.' };
  }
}

export async function getPolicyImpactAction(input: PolicyImpactAnalysisInput): Promise<PolicyImpactAnalysisOutput | { error: string }> {
  try {
    const result = await policyImpactAnalysis(input);
    return result;
  } catch (e) {
    console.error(e);
    return { error: 'Failed to generate policy analysis. Please try again.' };
  }
}
