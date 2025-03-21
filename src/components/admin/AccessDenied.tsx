
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
      <p className="text-center text-gray-600 mb-6">
        You don't have permission to access this page. This area is restricted to administrators only.
      </p>
      <Button onClick={() => window.location.href = "/"}>
        Return to Home
      </Button>
    </div>
  );
}
