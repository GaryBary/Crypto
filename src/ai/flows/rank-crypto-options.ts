'use server';

/**
 * @fileOverview Ranks the top 15 crypto options based on potential value, novelty, risk profile, and investment duration.
 *
 * - rankCryptoOptions - A function that ranks crypto options based on user criteria.
 * - RankCryptoOptionsInput - The input type for the rankCryptoOptions function.
 * - RankCryptoOptionsOutput - The return type for the rankCryptoOptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RankCryptoOptionsInputSchema = z.object({
  riskAppetite: z
    .string()
    .describe("The user's risk appetite (e.g., low, medium, high)."),
  investmentDuration: z
    .string()
    .describe('The investment duration (e.g., short, medium, long term).'),
  cryptoData: z
    .string()
    .describe(
      'A comprehensive dataset of crypto options, including market data, trends, and news. Must be a JSON string.'
    ),
});

export type RankCryptoOptionsInput = z.infer<typeof RankCryptoOptionsInputSchema>;

const RankedCryptoOptionSchema = z.object({
  name: z.string().describe('The name of the cryptocurrency.'),
  ticker: z.string().describe('The ticker symbol of the cryptocurrency.'),
  rank: z.number().describe('The ranking of the cryptocurrency (1-15).'),
  summary: z.string().describe('A concise summary of the cryptocurrency.'),
  rationale: z
    .string()
    .describe('The rationale for the selection and ranking of the crypto.'),
});

const RankCryptoOptionsOutputSchema = z.array(RankedCryptoOptionSchema).max(15);

export type RankCryptoOptionsOutput = z.infer<typeof RankCryptoOptionsOutputSchema>;

export async function rankCryptoOptions(
  input: RankCryptoOptionsInput
): Promise<RankCryptoOptionsOutput> {
  return rankCryptoOptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rankCryptoOptionsPrompt',
  input: {schema: RankCryptoOptionsInputSchema},
  output: {schema: RankCryptoOptionsOutputSchema},
  prompt: `You are an AI cryptocurrency analyst. Rank the top 15 cryptocurrencies based on the following criteria:

Risk Appetite: {{{riskAppetite}}}
Investment Duration: {{{investmentDuration}}}

Use the following data to rank the cryptocurrencies. The data is in JSON format.  Make sure you parse it before use.

Data: {{{cryptoData}}}

Prioritize options with high value potential and novelty, while considering the risk profile and investment duration.

Provide a summary and rationale for each selection. Make sure that the rationale explains clearly and concisely why a particular crypto was selected and where it was ranked, based on the risk appetite, investment duration and the crypto data provided.  Do NOT include any outside information in your rationale.

Rank each crypto using the 'rank' field to be an integer between 1 and 15.  No two cryptos should have the same rank.  Do not include any other properties than those defined in the output schema.

Ensure that the output is valid JSON.`,
});

const rankCryptoOptionsFlow = ai.defineFlow(
  {
    name: 'rankCryptoOptionsFlow',
    inputSchema: RankCryptoOptionsInputSchema,
    outputSchema: RankCryptoOptionsOutputSchema,
  },
  async input => {
    try {
      const parsedData = JSON.parse(input.cryptoData);
      if (!Array.isArray(parsedData)) {
        throw new Error('cryptoData must be a JSON array.');
      }
    } catch (e: any) {
      throw new Error(`Invalid cryptoData: ${e.message}`);
    }

    const {output} = await prompt(input);
    return output!;
  }
);
