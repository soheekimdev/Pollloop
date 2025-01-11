import { Image } from 'lucide-react';

interface PlaceholderImageProps {
  text?: string;
  className?: string;
}

export default function PlaceholderImage({ text, className = '' }: PlaceholderImageProps) {
  return (
    <div
      className={`w-full h-full bg-pollloop-bg-01 flex items-center justify-center ${className}`}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <Image size={32} strokeWidth={1.5} />
        <span className="text-sm text-pollloop-brown-03">{text}</span>
      </div>
    </div>
  );
}
