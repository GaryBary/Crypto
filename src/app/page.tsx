'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getRankedCrypto } from '@/app/actions';
import type { RankedCryptoOption } from '@/lib/types';
import { Logo } from '@/components/logo';
import { CryptoAnalysisForm } from '@/components/crypto-analysis-form';
import { RankingListSkeleton } from '@/components/ranking-list-skeleton';
import { CryptoRankingList } from '@/components/crypto-ranking-list';
import { CryptoDetailSheet } from '@/components/crypto-detail-sheet';
import { SavedAnalysesDialog } from '@/components/saved-analyses-dialog';
import { Button } from '@/components/ui/button';
import { ListCollapse } from 'lucide-react';

export type SavedAnalysis = {
  id: string;
  timestamp: string;
  criteria: {
    riskAppetite: string;
    investmentDuration: string;
  };
  results: RankedCryptoOption[];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [rankedData, setRankedData] = useState<RankedCryptoOption[] | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<RankedCryptoOption | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSavedAnalysesOpen, setIsSavedAnalysesOpen] = useState(false);
  const [analysisCriteria, setAnalysisCriteria] = useState<{ riskAppetite: string; investmentDuration: string; } | null>(null);
  const { toast } = useToast();

  const handleAnalysis = async (values: { riskAppetite: string; investmentDuration: string; }) => {
    setIsLoading(true);
    setRankedData(null);
    setIsSaved(false);
    setAnalysisCriteria(values);
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

  const handleSaveAnalysis = () => {
    if (!rankedData || !analysisCriteria) return;

    const newSave: SavedAnalysis = {
      id: new Date().toISOString(),
      timestamp: new Date().toLocaleString(),
      criteria: analysisCriteria,
      results: rankedData,
    };
    
    const savedAnalyses = JSON.parse(localStorage.getItem('savedAnalyses') || '[]') as SavedAnalysis[];
    savedAnalyses.unshift(newSave); // Add to the beginning
    localStorage.setItem('savedAnalyses', JSON.stringify(savedAnalyses));
    
    setIsSaved(true);
    toast({
      title: "Analysis Saved",
      description: "You can view it in your saved analyses.",
    });
  };

  const loadAnalysis = (analysis: SavedAnalysis) => {
    setAnalysisCriteria(analysis.criteria);
    setRankedData(analysis.results);
    setSelectedCrypto(null);
    setIsSaved(true);
    setIsSavedAnalysesOpen(false);
    toast({
      title: "Analysis Loaded",
      description: `Loaded analysis from ${analysis.timestamp}.`
    });
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background text-foreground">
      <main className="flex flex-1 flex-col items-center gap-8 px-4 py-12 md:px-6 md:py-16 w-full">
        <header className="flex flex-col items-center gap-4 text-center">
          <Logo />
          <p className="max-w-xl text-muted-foreground md:text-lg">
            Uncover high-potential crypto gems to punt on - cannot lose - top 15 ranked options.
          </p>
        </header>

        <div className="w-full max-w-2xl flex justify-end">
          <Button variant="outline" onClick={() => setIsSavedAnalysesOpen(true)}>
            <ListCollapse />
            Saved Analyses
          </Button>
        </div>

        <CryptoAnalysisForm 
          onSubmit={handleAnalysis} 
          isLoading={isLoading} 
          initialValues={analysisCriteria}
        />

        {isLoading && <RankingListSkeleton />}

        {rankedData && (
          <>
            <div className="w-full max-w-5xl flex justify-end">
                <Button onClick={handleSaveAnalysis} disabled={isSaved}>
                  {isSaved ? 'Saved' : 'Save Analysis'}
                </Button>
            </div>
            <CryptoRankingList 
              data={rankedData} 
              onSelectCrypto={setSelectedCrypto} 
            />
          </>
        )}

        <CryptoDetailSheet 
          crypto={selectedCrypto}
          open={!!selectedCrypto}
          onOpenChange={(open) => {
            if (!open) setSelectedCrypto(null);
          }}
          analysisCriteria={analysisCriteria}
        />

        <SavedAnalysesDialog
          open={isSavedAnalysesOpen}
          onOpenChange={setIsSavedAnalysesOpen}
          onLoadAnalysis={loadAnalysis}
        />

      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground">
        Powered by Mug Punters Crypto.
      </footer>
    </div>
  );
}
