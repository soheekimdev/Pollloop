interface FormStatusBadgeProps {
  status: '발행' | '종료' | '임시 저장';
  end_at: string;
}

const FORM_STATUS_STYLES = {
  '임시 저장': {
    bg: 'bg-status-yellow-bg',
    text: 'text-status-yellow-text',
  },
  종료: {
    bg: 'bg-status-red-bg',
    text: 'text-status-red-text',
  },
  발행: {
    bg: 'bg-status-green-bg',
    text: 'text-status-green-text',
  },
} as const;

export default function FormStatusBadge({ status, end_at }: FormStatusBadgeProps) {
  const getActualStatus = () => {
    if (!end_at) return status;

    const today = new Date();
    const endDate = new Date(end_at.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));

    today.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    if (endDate < today && status === '발행') {
      return '종료';
    }

    return status;
  };

  const getDday = () => {
    if (!end_at) return '';

    // YYYYMMDD 형식의 문자열을 "YYYY-MM-DD" 형식으로 변환
    const year = end_at.slice(0, 4);
    const month = end_at.slice(4, 6);
    const day = end_at.slice(6, 8);
    const formattedDate = `${year}-${month}-${day}`;

    const endDate = new Date(formattedDate);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? `D-${diffDays}` : '종료';
  };

  const actualStatus = getActualStatus();
  const statusStyle = FORM_STATUS_STYLES[actualStatus];

  if (!end_at) return null;

  return (
    <span
      className={`absolute px-2 py-1 text-sm font-bold rounded-full top-6 right-6 ${statusStyle.bg} ${statusStyle.text}`}
    >
      {actualStatus === '발행' && getDday()}
      {actualStatus === '임시 저장' && '임시 저장'}
      {actualStatus === '종료' && '종료'}
    </span>
  );
}
