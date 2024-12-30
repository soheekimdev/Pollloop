interface AskStatusBadgeProps {
  is_closed: boolean;
}

const ASK_STATUS_STYLES = {
  종료: {
    bg: 'bg-status-red-bg',
    text: 'text-status-red-text',
  },
  '발행 중': {
    bg: 'bg-status-green-bg',
    text: 'text-status-green-text',
  },
} as const;

export default function AskStatusBadge({ is_closed }: AskStatusBadgeProps) {
  const statusStyle = ASK_STATUS_STYLES[is_closed ? '종료' : '발행 중'];
  return (
    <span
      className={`inline-block px-2 py-1 text-xs rounded-full ${statusStyle.bg} ${statusStyle.text}`}
    >
      {is_closed ? '종료' : '발행 중'}
    </span>
  );
}
