
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';

export interface FetchErrorProps {
  message: string;
  queryKey?: string[];
  onRetry?: () => void;
}

export function FetchError({ message, queryKey, onRetry }: FetchErrorProps) {
  const queryClient = useQueryClient();
  
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else if (queryKey) {
      queryClient.invalidateQueries({ queryKey });
    }
  };
  
  return (
    <div className="p-8 text-center">
      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2">Error Loading Data</h2>
      <p className="text-gray-600 mb-4">{message}</p>
      <Button onClick={handleRetry}>
        Try Again
      </Button>
    </div>
  );
}
