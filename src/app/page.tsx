'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getRankedCrypto } from '@/app/actions';
import type { RankedCryptoOption } from '@/lib/types';
import { Logo } from '@/components/logo';
import { CryptoAnalysisForm } from '@/components/crypto-analysis-form';
import { RankingListSkeleton } from '@/components/ranking-list-skeleton';
import { CryptoRankingList } from '@/components/crypto-ranking-list';
import { CryptoDetailSheet } from '@/components/crypto-detail-sheet';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [rankedData, setRankedData] = useState<RankedCryptoOption[] | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<RankedCryptoOption | null>(null);
  const { toast } = useToast();

  const handleAnalysis = async (values: { riskAppetite: string; investmentDuration: string; }) => {
    setIsLoading(true);
    setRankedData(null);
    try {
      const result = await getRankedCrypto(values);
      setRankedData(result);
      toast({
        title: "Analysis Complete",
        description: "Your personalized crypto ranking is ready.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background text-foreground">
      <main className="flex flex-1 flex-col items-center gap-8 px-4 py-12 md:px-6 md:py-16 w-full">
        <header className="flex flex-col items-center gap-4 text-center">
          <Logo />
          <p className="max-w-xl text-muted-foreground md:text-lg">
            Uncover high-potential crypto gems tailored to your investment style. Our AI analyzes the market to bring you the top 15 ranked options.
          </p>
        </header>

        <CryptoAnalysisForm onSubmit={handleAnalysis} isLoading={isLoading} />

        {isLoading && <RankingListSkeleton />}

        {rankedData && (
          <CryptoRankingList 
            data={rankedData} 
            onSelectCrypto={setSelectedCrypto} 
          />
        )}

        <CryptoDetailSheet 
          crypto={selectedCrypto}
          open={!!selectedCrypto}
          onOpenChange={(open) => {
            if (!open) setSelectedCrypto(null);
          }}
        />
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground">
        Powered by AI. Information is not financial advice.
      </footer>
    </div>
  );
}
