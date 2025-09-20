'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import type { RankedCryptoOption } from '@/lib/types';
import { BarChart, BrainCircuit, FileText } from 'lucide-react';

const DURATION_LABELS: Record<string, string> = {
  'exceptionally-short-term': 'Exceptionally Short-Term',
  'short-term': 'Short-Term',
  'medium-term': 'Medium-Term',
  'long-term': 'Long-Term',
};

const RISK_LABELS: Record<string, string> = {
  low: 'Low-Risk',
  medium: 'Medium-Risk',
  high: 'High-Risk',
};


type CryptoDetailSheetProps = {
  crypto: RankedCryptoOption | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  analysisCriteria: { riskAppetite: string; investmentDuration: string } | null;
};

export function CryptoDetailSheet({ crypto, open, onOpenChange, analysisCriteria }: CryptoDetailSheetProps) {
  if (!crypto) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg p-0">
        <div className="flex h-full flex-col overflow-y-auto bg-card">
          <SheetHeader className="p-6">
            <SheetTitle className="text-2xl flex items-center gap-3">
              <span>{crypto.name}</span>
              <Badge variant="outline" className="text-base">{crypto.ticker}</Badge>
            </SheetTitle>
            <SheetDescription>Ranked #{crypto.rank} by Mug Punters Crypto Gems</SheetDescription>
          </SheetHeader>
          <Separator />
          <div className="flex-1 p-6 space-y-6">
            <section className="space-y-2">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <FileText className="h-5 w-5 text-primary" />
                Summary
              </h3>
              <p className="text-muted-foreground">{crypto.summary}</p>
            </section>
            
            <section className="space-y-2">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <BrainCircuit className="h-5 w-5 text-primary" />
                AI Rationale
              </h3>
              <p className="text-muted-foreground">{crypto.rationale}</p>
            </section>

             {analysisCriteria && <section className="space-y-2">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <BarChart className="h-5 w-5 text-primary" />
                Analysis Context
              </h3>
              <div className="text-sm text-muted-foreground grid grid-cols-2 gap-2">
                  <p>
                    <span className="font-semibold text-foreground/80 block">Risk Profile:</span> 
                    {RISK_LABELS[analysisCriteria.riskAppetite] || 'N/A'}
                  </p>
                   <p>
                    <span className="font-semibold text-foreground/80 block">Investment Horizon:</span> 
                    {DURATION_LABELS[analysisCriteria.investmentDuration] || 'N/A'}
                  </p>
              </div>
            </section>}

          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
