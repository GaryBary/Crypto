import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "./ui/card";

export function RankingListSkeleton() {
  return (
    <Card className="w-full max-w-5xl mt-8 animate-pulse">
        <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full max-w-md" />
        </CardHeader>
        <CardContent>
            <div className="rounded-lg border">
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-16 text-center"><Skeleton className="h-5 w-10 mx-auto" /></TableHead>
                        <TableHead className="w-12"></TableHead>
                        <TableHead><Skeleton className="h-5 w-24" /></TableHead>
                        <TableHead><Skeleton className="h-5 w-32" /></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 10 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell className="text-center"><Skeleton className="h-6 w-6 rounded-full mx-auto" /></TableCell>
                        <TableCell><Skeleton className="h-8 w-8 rounded-md" /></TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-20 mb-1" />
                            <Skeleton className="h-4 w-12" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-full mb-1" />
                            <Skeleton className="h-4 w-3/4" />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
      </CardContent>
    </Card>
  );
}
