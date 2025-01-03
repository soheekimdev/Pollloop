/*

1. 폼의 상태를 시각적으로 표시하는 상태 벳지 컴포넌트

2. 상태(status)별 동작 
- 발행 상태 :
  - end_at 없을 때(홈 화면): '발행' 표시
  - end_at 있을 때(나의 폼 화면): 'D-{날짜 수}' 표시
- 임시 저장: '임시 저장' 표시
- 종료: '종료' 표시

3. 사용 예
- 기본 발행 상태 : <FormStatusBadge status="발행" />
- 종료 날짜 있는 발행 상태 : <FormStatusBadge status="발행" end_at="20240215" />
- 임시 저장 상태 : <FormStatusBadge status="임시 저장" />
- 종료 상태 : <FormStatusBadge status={item.status} />

*/

import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const badgeVariants = cva('w-fit px-2 py-1 text-sm font-bold rounded-full', {
  variants: {
    status: {
      '임시 저장': 'bg-status-yellow-bg text-status-yellow-text',
      종료: 'bg-status-red-bg text-status-red-text',
      발행: 'bg-status-green-bg text-status-green-text',
    },
  },
  defaultVariants: {
    status: '발행',
  },
});

interface FormStatusBadgeProps extends VariantProps<typeof badgeVariants> {
  status: '발행' | '종료' | '임시 저장';
  end_at?: string; // 'YYYYMMDD'
  className?: string;
}

export default function FormStatusBadge({
  status,
  end_at,
  className,
  ...props
}: FormStatusBadgeProps) {
  // D데이 표시를 위한 날짜 차이 계산
  const getDday = () => {
    if (!end_at) return 0;

    const today = new Date();
    const endDate = new Date(
      Number(end_at.slice(0, 4)),
      Number(end_at.slice(4, 6)) - 1,
      Number(end_at.slice(6, 8)),
    );

    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  // 홈: 'D-n', 나의 폼: '발행' 상태로 선택적 표시
  const getDisplayStatus = () => {
    if (status !== '발행') return status;

    if (end_at) {
      const dday = getDday();
      return `D-${dday}`;
    }

    return '발행';
  };

  return (
    <span className={clsx(badgeVariants({ status }), className)} {...props}>
      {getDisplayStatus()}
    </span>
  );
}
