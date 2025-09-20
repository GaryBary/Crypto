'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  riskAppetite: z.string({
    required_error: 'Please select your risk appetite.',
  }),
  investmentDuration: z.string({
    required_error: 'Please select your investment duration.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

type CryptoAnalysisFormProps = {
  onSubmit: (values: FormValues) => void;
  isLoading: boolean;
};

export function CryptoAnalysisForm({ onSubmit, isLoading }: CryptoAnalysisFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      riskAppetite: 'medium',
      investmentDuration: 'medium-term',
    }
  });

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader>
        <CardTitle>Personalize Your Analysis</CardTitle>
        <CardDescription>
          Select your investment profile to get tailored crypto recommendations from our AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="riskAppetite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Risk Appetite</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your risk tolerance" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low - Conservative</SelectItem>
                        <SelectItem value="medium">Medium - Balanced</SelectItem>
                        <SelectItem value="high">High - Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="investmentDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Duration</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your investment horizon" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="short-term">Short-term ( &lt; 1 year)</SelectItem>
                        <SelectItem value="medium-term">Medium-term (1-3 years)</SelectItem>
                        <SelectItem value="long-term">Long-term (3+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Find Crypto Gems'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
