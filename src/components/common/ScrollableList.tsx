import { HTMLAttributes, useEffect, useRef } from 'react';

interface ScrollableListProps extends HTMLAttributes<HTMLDivElement> {
  height: number | string;
}

export default function ScrollableList({
  height,
  className,
  children,
  ...props
}: ScrollableListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const hasScrollbar = list.scrollHeight > list.clientHeight;
    list.style.paddingRight = hasScrollbar ? '16px' : '0px';
  }, [children]);

  return (
    <div
      ref={listRef}
      className={`w-full overflow-y-auto scrollbar-thin scrollbar-thumb-pollloop-coral scrollbar-track-pollloop-brown-01/15 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full ${className || ''}`}
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
