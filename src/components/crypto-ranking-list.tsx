'use client';

import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { RankedCryptoOption } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { motion } from 'framer-motion';

type CryptoRankingListProps = {
  data: RankedCryptoOption[];
  onSelectCrypto: (crypto: RankedCryptoOption) => void;
};

const getRankColor = (rank: number) => {
  if (rank <= 3) return 'bg-primary/80 hover:bg-primary/70 text-primary-foreground';
  if (rank <= 8) return 'bg-accent/80 hover:bg-accent/70 text-accent-foreground';
  return 'bg-secondary hover:bg-secondary/80 text-secondary-foreground';
}

export function CryptoRankingList({ data, onSelectCrypto }: CryptoRankingListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mt-8"
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Top 15 Crypto Gems</CardTitle>
          <CardDescription>
            Based on your profile, here are the top crypto options with high potential, ranked by our AI. Click any row for a detailed rationale.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-center">Rank</TableHead>
                  <TableHead className="w-12 pr-0"></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Summary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow
                    key={item.ticker}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onSelectCrypto(item)}
                    >
                    <TableCell className="text-center font-bold">
                        <Badge className={`w-8 h-8 flex items-center justify-center rounded-full text-base ${getRankColor(item.rank)}`}>
                            {item.rank}
                        </Badge>
                    </TableCell>
                    <TableCell className="pr-0">
                      <Image
                        src={PlaceHolderImages[index % PlaceHolderImages.length].imageUrl}
                        alt={`${item.name} logo`}
                        width={40}
                        height={40}
                        className="rounded-full"
                        data-ai-hint={PlaceHolderImages[index % PlaceHolderImages.length].imageHint}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.ticker}</div>
                    </TableCell>
                    <TableCell>
                      <p className="line-clamp-2 text-sm">{item.summary}</p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
