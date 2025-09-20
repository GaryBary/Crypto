'use server';

/**
 * @fileOverview Generates a rationale for the selection and ranking of each crypto option.
 *
 * - generateRationaleForCryptoRanking - A function that generates the rationale.
 * - GenerateRationaleInput - The input type for the generateRationaleForCryptoRanking function.
 * - GenerateRationaleOutput - The return type for the generateRationaleForCryptoRanking function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRationaleInputSchema = z.object({
  cryptoName: z.string().describe('The name of the cryptocurrency.'),
  ranking: z.number().describe('The ranking of the cryptocurrency (1-15).'),
  summary: z.string().describe('A summary of the cryptocurrency.'),
  keyMetrics: z.string().describe('Key metrics for the cryptocurrency.'),
  marketTrends: z.string().describe('Market trends related to the cryptocurrency.'),
  relevantNews: z.string().describe('Relevant news about the cryptocurrency.'),
  riskAppetite: z.string().describe('The risk appetite of the user (low, medium, high).'),
  investmentDuration: z.string().describe('The investment duration specified by the user (short, medium, long).'),
});
export type GenerateRationaleInput = z.infer<typeof GenerateRationaleInputSchema>;

const GenerateRationaleOutputSchema = z.object({
  rationale: z.string().describe('The AI-generated rationale for the crypto selection and ranking.'),
});
export type GenerateRationaleOutput = z.infer<typeof GenerateRationaleOutputSchema>;

export async function generateRationaleForCryptoRanking(input: GenerateRationaleInput): Promise<GenerateRationaleOutput> {
  return generateRationaleForCryptoRankingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRationalePrompt',
  input: {schema: GenerateRationaleInputSchema},
  output: {schema: GenerateRationaleOutputSchema},
  prompt: `You are an AI assistant that generates rationales for crypto rankings.

  Given the following information about a cryptocurrency, generate a rationale for its selection and ranking.

  Crypto Name: {{{cryptoName}}}
  Ranking: {{{ranking}}}
  Summary: {{{summary}}}
  Key Metrics: {{{keyMetrics}}}
  Market Trends: {{{marketTrends}}}
  Relevant News: {{{relevantNews}}}
  Risk Appetite: {{{riskAppetite}}} 
  Investment Duration: {{{investmentDuration}}}

  Provide a concise and informative rationale, highlighting the key factors considered in the assessment.
  Explain why this crypto was selected and why it received its particular ranking, taking into account the user's risk appetite and investment duration.
  The response should be no more than 150 words.
  `,
});

const generateRationaleForCryptoRankingFlow = ai.defineFlow(
  {
    name: 'generateRationaleForCryptoRankingFlow',
    inputSchema: GenerateRationaleInputSchema,
    outputSchema: GenerateRationaleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
