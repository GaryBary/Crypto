import { Gem } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="rounded-lg bg-primary/10 p-3 border border-primary/20">
        <Gem className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        CryptoGem AI
      </h1>
    </div>
  );
}
