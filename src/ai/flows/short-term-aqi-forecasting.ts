'use server';
/**
 * @fileOverview A short-term AQI forecasting AI agent.
 *
 * - getShortTermAQIForecast - A function that provides a short-term AQI forecast.
 * - ShortTermAQIForecastingInput - The input type for the getShortTermAQIForecast function.
 * - ShortTermAQIForecastingOutput - The return type for the getShortTermAQIForecast function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ShortTermAQIForecastingInputSchema = z.object({
  location: z.string().describe('The location for which to forecast AQI.'),
  pastAqiData: z.string().describe('The past AQI data for the location.'),
});
export type ShortTermAQIForecastingInput = z.infer<typeof ShortTermAQIForecastingInputSchema>;

const ShortTermAQIForecastingOutputSchema = z.object({
  forecast: z.string().describe('The short-term AQI forecast for the next 24-72 hours.'),
});
export type ShortTermAQIForecastingOutput = z.infer<typeof ShortTermAQIForecastingOutputSchema>;

export async function getShortTermAQIForecast(input: ShortTermAQIForecastingInput): Promise<ShortTermAQIForecastingOutput> {
  return shortTermAQIForecastingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'shortTermAQIForecastingPrompt',
  input: {schema: ShortTermAQIForecastingInputSchema},
  output: {schema: ShortTermAQIForecastingOutputSchema},
  prompt: `You are an expert in air quality forecasting. Based on the location and past AQI data provided, generate a short-term AQI forecast for the next 24-72 hours.\n\nLocation: {{{location}}}\nPast AQI Data: {{{pastAqiData}}}\n\nForecast: `,
});

const shortTermAQIForecastingFlow = ai.defineFlow(
  {
    name: 'shortTermAQIForecastingFlow',
    inputSchema: ShortTermAQIForecastingInputSchema,
    outputSchema: ShortTermAQIForecastingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
