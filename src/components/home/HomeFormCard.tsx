import { Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import FormStatusBadge from '../common/status-badge/FormStatusBadge';
import { FormDetails } from '../../types/home/home.types';

interface HomeFormCardProps {
  item: FormDetails;
}

export default function HomeFormCard({ item }: HomeFormCardProps) {
  const { id: form_id, status, title, tag, target_count, actual_count, end_at } = item;

  const getParticipationRate = () => {
    if (!target_count || !actual_count) return 0;
    return Math.round((actual_count / target_count) * 100);
  };

  const participationRate = getParticipationRate();

  return (
    <li className=" w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] h-[200px]  ">
      <Link
        to={`/forms/${form_id}`}
        className="relative flex flex-col justify-between w-full h-full p-6 bg-pollloop-light-beige rounded-2xl "
        aria-label={`${title} - ${status} 폼`}
      >
        <FormStatusBadge
          options={{ countDday: true }}
          className="absolute top-6 right-6"
          status={status}
          end_at={end_at}
          aria-label={`상태: ${status}`}
        />

        <div className="flex flex-col gap-2">
          <h3 className="flex-1 pr-20 line-clamp-3">{title}</h3>
          <p
            className="px-2 py-1 rounded-md line-clamp-1 w-fit text-13 bg-tag-default-bg"
            role="tag"
          >
            {tag}
          </p>
        </div>

        <div className="min-h-[40px] flex flex-col justify-center" aria-label="참여 현황">
          {target_count ? (
            <>
              <div className="flex items-end justify-between mb-1 text-13 text-pollloop-brown-01">
                <span
                  className="opacity-60"
                  aria-label={`현재 ${actual_count}명 참여, 목표 ${target_count}명`}
                >
                  {`${actual_count}/${target_count}`}
                </span>
                <span
                  className="text-2xl font-bold"
                  aria-label={`참여율 ${participationRate}퍼센트`}
                >
                  {`${participationRate}%`}
                </span>
              </div>
              <div
                className="w-full h-2 overflow-hidden rounded-full bg-tag-default-bg"
                role="progressbar"
                aria-valuenow={participationRate}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full bg-pollloop-coral"
                  style={{ width: `${participationRate}%` }}
                />
              </div>
            </>
          ) : (
            <p className="flex items-center gap-1 font-bold text-13 text-pollloop-brown-01 opacity-60 text-truncate">
              <Info size={16} className="flex-shrink-0" aria-hidden="true" />
              <span>{status === 'TEMP' ? '임시 저장된 폼입니다.' : '아직 참여자가 없습니다.'}</span>
            </p>
          )}
        </div>
      </Link>
    </li>
  );
}
