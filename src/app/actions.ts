'use server';

import { rankCryptoOptions } from '@/ai/flows/rank-crypto-options';
import { cryptoData } from '@/lib/crypto-data';

export async function getRankedCrypto(input: {
  riskAppetite: string;
  investmentDuration: string;
}) {
  try {
    const rankedOptions = await rankCryptoOptions({
      ...input,
      cryptoData: JSON.stringify(cryptoData),
    });

    if (!rankedOptions || rankedOptions.length === 0) {
      throw new Error('AI failed to return ranked options.');
    }

    // Sort by rank to ensure consistent ordering, as AI might not always follow instructions perfectly.
    return rankedOptions.sort((a, b) => a.rank - b.rank);
  } catch (error) {
    console.error('Error getting ranked crypto:', error);
    // Propagate a user-friendly error message to the client.
    throw new Error('An error occurred during analysis. Please try again later.');
  }
}
