'use client';

import * as React from 'react';
import { cryptoData } from '@/lib/crypto-data';
import type { CryptoData } from '@/lib/types';
import { Input } from './ui/input';

interface CryptoSearchProps {
  onSelectCrypto: (crypto: CryptoData) => void;
}

export function CryptoSearch({ onSelectCrypto }: CryptoSearchProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredCrypto =
    searchQuery === ''
      ? []
      : cryptoData.filter(
          (crypto) =>
            crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            crypto.ticker.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const handleCryptoClick = (crypto: CryptoData) => {
    setSearchQuery('');
    onSelectCrypto(crypto);
  };

  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Search by name or ticker..."
        onChange={handleSearch}
        value={searchQuery}
        className="w-full"
      />
      {searchQuery !== '' && filteredCrypto.length > 0 && (
        <div className="absolute z-10 w-full bg-background border border-border rounded-md mt-1 shadow-lg">
          {filteredCrypto.map((crypto) => (
            <div key={crypto.ticker} className="p-3 hover:bg-muted cursor-pointer text-sm" onClick={() => handleCryptoClick(crypto)}>
              <span className="font-semibold">{crypto.name}</span>
              <span className="text-muted-foreground ml-2">{crypto.ticker}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
