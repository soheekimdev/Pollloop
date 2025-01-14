import { Loader2 } from 'lucide-react';

export default function CircleLoader({ size = 20 }: { size: number }) {
  return <Loader2 size={size} className="animate-spin" />;
}
