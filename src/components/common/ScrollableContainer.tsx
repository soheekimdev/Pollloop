/* 

height (필수 prop) : 컨텐츠가 지정된 높이를 초과하면 스크롤바 생성

사용 예:
<ScrollableContainer height={400}>    // 400px을 초과하면 스크롤바 생성
 <div>컨텐츠 항목</div>
 <div>긴 목록의 경우 자동으로 스크롤바 생성</div>
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
