import { SearchX } from 'lucide-react';
import { Button } from '../Button';

interface EmptyStateProps {
  title?: string;
  message?: string;
  onReset?: () => void;
}

export const EmptyState = ({
  title = 'No Properties Found',
  message = 'Try adjusting your filters or search terms to find more listings.',
  onReset,
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
      <SearchX className="w-9 h-9 text-slate-400" />
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
    <p className="text-sm text-slate-500 max-w-xs mb-6">{message}</p>
    {onReset && (
      <Button variant="outline" onClick={onReset} size="sm">
        Clear Filters
      </Button>
    )}
  </div>
);
