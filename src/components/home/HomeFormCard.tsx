import { Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import FormStatusBadge from '../status-badge/FormStatusBadge';

interface HomeFormCardProps {
  form_id: number;
  status: '발행' | '종료' | '임시 저장';
  title: string;
  tag: string;
  target_count: number;
  actual_count: number;
  end_at: string;
}

export default function HomeFormCard({
  form_id,
  status,
  title,
  tag,
  target_count,
  actual_count,
  end_at,
}: HomeFormCardProps) {
  // 참여율 계산
  const getParticipationRate = () => {
    if (!target_count || !actual_count) return 0;
    return Math.round((actual_count / target_count) * 100);
  };

  return (
    <li className=" w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)] h-[200px] ">
      <Link
        to={`/forms/${form_id}`}
        className="relative flex flex-col justify-between w-full h-full p-6 bg-pollloop-light-beige rounded-2xl"
      >
        <FormStatusBadge status={status} end_at={end_at} />

        <div className="flex flex-col gap-2">
          {/* 제목 */}
          <h3 className="w-3/5 line-clamp-3">{title}</h3>
          {/* 태그 */}
          <p className="px-2 py-1 w-fit text-[13px] bg-tag-default-bg rounded-md">{tag}</p>
        </div>

        {/* 참여율 표시 */}
        <div className="min-h-[40px] flex flex-col justify-center">
          {target_count ? (
            <>
              <div className="flex justify-between items-end text-[13px] text-pollloop-brown-01">
                <span className="opacity-60">{`${actual_count}/${target_count}`}</span>
                <span className="text-2xl font-bold">{`${getParticipationRate()}%`}</span>
              </div>
              <div className="w-full h-2 overflow-hidden rounded-full bg-tag-default-bg">
                <div
                  className="h-full bg-pollloop-orange"
                  style={{ width: `${getParticipationRate()}%` }}
                />
              </div>
            </>
          ) : (
            <p className="flex items-center gap-1 text-[13px] text-pollloop-brown-01 opacity-60 font-bold whitespace-nowrap overflow-hidden text-ellipsis">
              <Info size={16} className="flex-shrink-0" />
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {status === '임시 저장' ? '임시 저장된 폼입니다.' : '아직 참여자가 없습니다.'}
              </span>
            </p>
          )}
        </div>
      </Link>
    </li>
  );
}
