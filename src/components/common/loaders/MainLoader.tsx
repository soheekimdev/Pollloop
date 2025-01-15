import { POLLLOOP_BROWN_01, POLLLOOP_RED_02 } from '@/constants/colors';

interface MainLoaderProps {
  size?: 'sm' | 'md';
  color?: string;
  dotColor?: string;
}

export default function MainLoader({
  size = 'md',
  color = POLLLOOP_BROWN_01,
  dotColor = POLLLOOP_RED_02,
}: MainLoaderProps) {
  const sizeConfig = {
    sm: {
      text: 'text-2xl',
      dot: 'w-2 h-2',
      spacing: 'tracking-tight',
      top: '-16px',
    },
    md: {
      text: 'text-4xl',
      dot: 'w-3 h-3',
      spacing: 'tracking-tight',
      top: '-20px',
    },
  };

  return (
    <div className="relative mt-8 inline-block">
      <div
        className={`font-iowan font-semibold ${sizeConfig[size].text} ${sizeConfig[size].spacing}`}
        style={{ color }}
      >
        Pollloop
      </div>
      <div
        className={`absolute rounded-full ${sizeConfig[size].dot} ${
          size === 'sm' ? 'animate-dot-bounce-sm' : 'animate-dot-bounce'
        }`}
        style={{
          backgroundColor: dotColor,
          top: sizeConfig[size].top,
          left: '8px',
        }}
      />
    </div>
  );
}
