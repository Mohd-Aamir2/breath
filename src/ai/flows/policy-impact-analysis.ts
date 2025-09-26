'use server';

/**
 * @fileOverview A policy impact analysis AI agent.
 *
 * - policyImpactAnalysis - A function that analyzes the potential impact of policy changes on AQI.
 * - PolicyImpactAnalysisInput - The input type for the policyImpactAnalysis function.
 * - PolicyImpactAnalysisOutput - The return type for the policyImpactAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PolicyImpactAnalysisInputSchema = z.object({
  policyChange: z
    .string()
    .describe('A description of the hypothetical policy change.'),
  historicalAqiData: z
    .string()
    .describe('Historical AQI data to use for the analysis.'),
  localInterventions: z
    .string()
    .describe('Records of local interventions, such as construction halts.'),
});
export type PolicyImpactAnalysisInput = z.infer<
  typeof PolicyImpactAnalysisInputSchema
>;

const PolicyImpactAnalysisOutputSchema = z.object({
  predictedAqiImpact: z
    .string()
    .describe('The predicted impact on AQI based on the policy change.'),
  confidenceLevel: z
    .string()
    .describe('The confidence level of the prediction (e.g., high, medium, low).'),
  rationale: z
    .string()
    .describe('The rationale behind the predicted impact, including factors considered.'),
});
export type PolicyImpactAnalysisOutput = z.infer<
  typeof PolicyImpactAnalysisOutputSchema
>;

export async function policyImpactAnalysis(
  input: PolicyImpactAnalysisInput
): Promise<PolicyImpactAnalysisOutput> {
  return policyImpactAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'policyImpactAnalysisPrompt',
  input: {schema: PolicyImpactAnalysisInputSchema},
  output: {schema: PolicyImpactAnalysisOutputSchema},
  prompt: `You are an AI assistant specialized in analyzing the impact of policy changes on Air Quality Index (AQI).

You will receive the following information:
- A description of the hypothetical policy change.
- Historical AQI data.
- Records of local interventions (e.g., construction halts, traffic restrictions).

Based on this information, predict the impact of the policy change on AQI, the confidence level of your prediction, and the rationale behind your prediction.

Policy Change: {{{policyChange}}}
Historical AQI Data: {{{historicalAqiData}}}
Local Interventions: {{{localInterventions}}}

Respond in the following format:
{
  "predictedAqiImpact": "...",
  "confidenceLevel": "...",
  "rationale": "..."
}
`,
});

const policyImpactAnalysisFlow = ai.defineFlow(
  {
    name: 'policyImpactAnalysisFlow',
    inputSchema: PolicyImpactAnalysisInputSchema,
    outputSchema: PolicyImpactAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
