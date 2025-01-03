/* 
height (필수 prop) : 컨텐츠가 지정된 높이를 초과하면 스크롤바 생성

사용 예시:
<ScrollableContainer height={400}>    // 400px을 초과하면 스크롤바 생성
 <div>컨텐츠 항목</div>
 <div>긴 목록의 경우 자동으로 스크롤바 생성</div>
</ScrollableContainer>

<ScrollableContainer height="calc(100vh - 200px)">  // CSS 문자열도 사용 가능
 <div>계산된 높이를 초과하면 스크롤바 생성</div>
</ScrollableContainer>
*/

import { HTMLAttributes, useEffect, useRef } from 'react';

interface ScrollableContainerProps extends HTMLAttributes<HTMLDivElement> {
  height: number | string;
}

export default function ScrollableContainer({
  height,
  className,
  children,
  ...props
}: ScrollableContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      const hasScrollbar = container.scrollHeight > container.clientHeight;
      container.style.paddingRight = hasScrollbar ? '16px' : '0px';
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-y-auto scrollbar-thin scrollbar-thumb-pollloop-coral scrollbar-track-pollloop-brown-01/15 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full ${
        className || ''
      }`}
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
