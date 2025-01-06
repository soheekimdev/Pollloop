/*

1. 애스크의 상태를 시각적으로 표시하는 상태 배지 컴포넌트

2. 상태별 동작
- 진행 중 상태: '진행 중' 표시
- 종료 상태: '종료' 표시

3. 사용 예
- 진행 중 상태 : <AskStatusBadge is_closed={false} />
- 종료 상태 : <AskStatusBadge is_closed={true} />

*/

interface AskStatusBadgeProps {
  is_closed: boolean;
}

import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const badgeVariants = cva('w-fit px-2 py-1 text-sm font-bold rounded-full', {
  variants: {
    status: {
      종료: 'bg-status-red-bg text-status-red-text',

      '진행 중': 'bg-status-green-bg text-status-green-text',
    },
  },
  defaultVariants: {
    status: '진행 중',
  },
});

interface AskStatusBadgeProps extends VariantProps<typeof badgeVariants> {
  is_closed: boolean;
  className?: string;
}

export default function AskStatusBadge({ is_closed, className, ...props }: AskStatusBadgeProps) {
  const status = is_closed ? '종료' : '진행 중';

  return (
    <span className={clsx(badgeVariants({ status }), className)} {...props}>
      {status}
    </span>
  );
}
