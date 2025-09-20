'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2 } from 'lucide-react';
import type { SavedAnalysis } from '@/app/page';

type SavedAnalysesDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoadAnalysis: (analysis: SavedAnalysis) => void;
};

const DURATION_LABELS: Record<string, string> = {
  'exceptionally-short-term': 'Exceptionally Short-Term',
  'short-term': 'Short-Term',
  'medium-term': 'Medium-Term',
  'long-term': 'Long-Term',
};

const RISK_LABELS: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export function SavedAnalysesDialog({ open, onOpenChange, onLoadAnalysis }: SavedAnalysesDialogProps) {
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([]);

  useEffect(() => {
    if (open) {
      const stored = JSON.parse(localStorage.getItem('savedAnalyses') || '[]') as SavedAnalysis[];
      setSavedAnalyses(stored);
    }
  }, [open]);

  const handleDelete = (id: string) => {
    const updatedAnalyses = savedAnalyses.filter(a => a.id !== id);
    localStorage.setItem('savedAnalyses', JSON.stringify(updatedAnalyses));
    setSavedAnalyses(updatedAnalyses);
  };
  
  const handleClearAll = () => {
    localStorage.removeItem('savedAnalyses');
    setSavedAnalyses([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Saved Analyses</DialogTitle>
          <DialogDescription>
            Here are your previously saved crypto analyses. You can load or delete them.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96 pr-4">
          <div className="space-y-4">
            {savedAnalyses.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">No saved analyses found.</p>
            ) : (
                savedAnalyses.map((analysis) => (
                    <div key={analysis.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                        <div className="space-y-1">
                            <p className="font-semibold">{analysis.timestamp}</p>
                            <p className="text-sm text-muted-foreground">
                                Risk: <span className="font-medium text-foreground">{RISK_LABELS[analysis.criteria.riskAppetite]}</span>, 
                                Duration: <span className="font-medium text-foreground">{DURATION_LABELS[analysis.criteria.investmentDuration]}</span>
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => onLoadAnalysis(analysis)}>Load</Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(analysis.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))
            )}
          </div>
        </ScrollArea>
        {savedAnalyses.length > 0 && (
            <DialogFooter>
                <Button variant="destructive" onClick={handleClearAll}>Clear All</Button>
            </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
