import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const badgeVariants = cva(
  'w-fit px-2 py-1 text-sm font-bold rounded-full flex items-center h-fit flex-shrink-0',
  {
    variants: {
      status: {
        TEMP: 'bg-status-yellow-bg text-status-yellow-text',
        CLOSED: 'bg-status-red-bg text-status-red-text',
        OPEN: 'bg-status-green-bg text-status-green-text',
      },
    },
    defaultVariants: {
      status: 'OPEN',
    },
  },
);

interface FormStatusBadgeProps extends VariantProps<typeof badgeVariants> {
  status: 'OPEN' | 'CLOSED' | 'TEMP';
  end_at?: string; // 'YYYYMMDD'
  options?: {
    countDday?: boolean;
  };
  className?: string;
}

export default function FormStatusBadge({
  status,
  end_at,
  options = { countDday: false },
  className,
  ...props
}: FormStatusBadgeProps) {
  // D데이 표시를 위한 날짜 차이 계산
  const getDday = () => {
    if (!end_at) return 0;

    const today = new Date();
    const endDate = new Date(end_at); // YYYY-MM-DD

    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  // 상태에 따른 표시 텍스트 결정
  const getDisplayStatus = () => {
    switch (status) {
      case 'OPEN':
        if (options.countDday && end_at) {
          const dday = getDday();
          return `D-${dday}`;
        }
        return '발행';
      case 'CLOSED':
        return '종료';
      case 'TEMP':
        return '임시 저장';
      default:
        return status;
    }
  };

  return (
    <span className={clsx(badgeVariants({ status }), className)} {...props}>
      {getDisplayStatus()}
    </span>
  );
}
