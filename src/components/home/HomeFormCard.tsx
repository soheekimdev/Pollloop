import { Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import FormStatusBadge from '../common/status-badge/FormStatusBadge';
import { FormDetails } from '../../types/home/home.types';
import { useEffect, useState } from 'react';
import CustomTag from './parts/CustomTag';

interface HomeFormCardProps {
  item: FormDetails;
}

export default function HomeFormCard({ item }: HomeFormCardProps) {
  const { uuid: form_id, is_closed, title, tag, target_count, completed_count, end_at } = item;
  const [showProgress, setShowProgress] = useState(false);

  const getParticipationRate = () => {
    if (!target_count || !completed_count) return 0;
    return Math.round((completed_count / target_count) * 100);
  };

  const getLinkPath = () => {
    return is_closed === 'TEMP' ? `/forms/create/${form_id}` : `/forms/${form_id}`;
  };

  const participationRate = getParticipationRate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProgress(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <li className=" w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] h-[200px]  ">
      <Link
        to={getLinkPath()}
        className="relative flex flex-col justify-between w-full h-full p-6 bg-pollloop-light-beige rounded-2xl hover:border-pollloop-orange hover:shadow-primary"
        aria-label={`${title} - ${is_closed} 폼`}
      >
        <FormStatusBadge
          options={{ countDday: true }}
          className="absolute top-6 right-6 "
          status={is_closed}
          end_at={end_at}
          aria-label={`상태: ${is_closed}`}
        />

        <div className="flex flex-col gap-2">
          <h3 className="flex-1 pr-20 line-clamp-3">{title}</h3>
          {tag && <CustomTag tag={tag} />}
        </div>

        <div className="min-h-[40px] flex flex-col justify-center" aria-label="참여 현황">
          {is_closed === 'TEMP' ? (
            <p className="flex items-center gap-1 font-bold text-13 text-pollloop-brown-01 opacity-60 text-truncate">
              <Info size={16} className="flex-shrink-0" aria-hidden="true" />
              <span>임시 저장된 폼입니다.</span>
            </p>
          ) : (
            <>
              {completed_count === 0 ? (
                <p className="flex items-center gap-1 font-bold text-13 text-pollloop-brown-01 opacity-60 text-truncate">
                  <Info size={16} className="flex-shrink-0" aria-hidden="true" />
                  <span>아직 참여자가 없습니다.</span>
                </p>
              ) : (
                <>
                  <div className="flex items-end justify-between mb-1 text-13 text-pollloop-brown-01">
                    <span
                      className="opacity-60"
                      aria-label={`현재 ${completed_count}명 참여, 목표 ${target_count}명`}
                    >
                      {`${completed_count}/${target_count}`}
                    </span>
                    <span
                      className="text-2xl font-bold"
                      aria-label={`참여율 ${participationRate}퍼센트`}
                    >
                      {`${participationRate}%`}
                    </span>
                  </div>
                  <div
                    className="w-full h-2 overflow-hidden rounded-full bg-tag-default-bg/50"
                    role="progressbar"
                    aria-valuenow={participationRate}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="h-full bg-pollloop-coral transition-[width] duration-[2000ms] ease-in-out "
                      style={{ width: showProgress ? `${participationRate}%` : '0%' }}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </Link>
    </li>
  );
}
