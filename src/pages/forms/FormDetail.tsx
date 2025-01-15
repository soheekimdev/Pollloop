import { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Button from '../../components/common/Button';
import Participants from '../../components/details/Participants';
import Summary from '../../components/details/Summary';
import useTabs from '../../hooks/useTabs';
import { OverviewData } from '../../types/form-details.types';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOverviewData } from '../../api/form-detail';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { getCompleteRate } from '../../utils/getCompleteRate';
import FormStatusBadge from '../../components/common/status-badge/FormStatusBadge';
import { AlignLeft, Calendar, FileText, Globe2, Tag, Target } from 'lucide-react';
import CustomTag from '../../components/home/parts/CustomTag';
import { useAccessCode } from '../../hooks/useAccessCode';
import SmallAccessCodeSection from '../../components/home/parts/SmallAccessCodeSection';
import MainLoader from '@/components/common/loaders/MainLoader';
import { useDelayedLoading } from '@/hooks/useDelayedLoading';

export default function FormDetail() {
  const { formId } = useParams<{ formId: string }>();
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);
  const { activeIndex, changeTab } = useTabs(0);
  const { isDisplayed, handleDisplay } = useAccessCode();
  const [isActuallyLoading, setIsActuallyLoading] = useState(true);
  const navigate = useNavigate();

  const isLoading = useDelayedLoading({
    isActuallyLoading,
    minimumLoadingTime: 1000,
  });

  useEffect(() => {
    if (!formId) return;

    const loadOverviewData = async () => {
      try {
        const data = await fetchOverviewData(formId);
        setOverviewData(data as OverviewData);
      } catch (err) {
        console.error('데이터 로딩 중 에러:', err);
      } finally {
        setIsActuallyLoading(false);
      }
    };

    loadOverviewData();
  }, [formId, navigate]);

  if (isLoading)
    return (
      <div className="gap-5 w-full h-[calc(100vh-96px)] flex items-center justify-center">
        <MainLoader />
      </div>
    );

  if (!overviewData) return <div>데이터가 없습니다</div>;

  const {
    uuid,
    title,
    tag,
    subtitle,
    form_description,
    create_at,
    end_at,
    user_count,
    completed_count,
    target_count,
    is_closed,
    is_private,
    access_code,
  } = overviewData;

  const basicInfoData = [
    { label: '태그', value: tag, labelIcon: <Tag size={16} /> },
    { label: '표지 제목', value: subtitle, labelIcon: <FileText size={16} /> },
    { label: '폼 설명', value: form_description, labelIcon: <AlignLeft size={16} /> },
    { label: '생성일', value: create_at, labelIcon: <Calendar size={16} /> },
    { label: '목표 수', value: target_count, labelIcon: <Target size={16} /> },
    {
      label: '공개 여부',
      value: is_private ? '일부 공개' : '전체 공개',
      labelIcon: <Globe2 size={16} />,
    },
  ];

  const complete_rate = getCompleteRate(completed_count, target_count);

  return (
    <div className="flex flex-col gap-4 px-10 min-w-[480px] pb-10">
      <Breadcrumbs items={['홈', '나의 폼', title]} />

      <div className="relative flex flex-col w-full gap-10 p-10 bg-pollloop-bg-02 rounded-2xl">
        <section className="flex flex-col justify-between w-full gap-4 md:flex-row-reverse">
          <Button
            onClick={() =>
              copyToClipboard(
                'pollloop.vercel.app/forms/response/' + uuid,
                '참여 링크가 클립보드에 복사되었습니다.',
              )
            }
            type="button"
            variant="primary"
            size="md"
            className="w-full mb-5 md:w-40 md:mb-0"
            aria-label="폼 참여 링크 복사하기"
          >
            참여 링크 공유하기
          </Button>
          <header className="inline-flex flex-wrap items-center gap-2">
            <div className="inline font-semibold text-22">{title}</div>
            <FormStatusBadge
              status={is_closed}
              end_at={end_at}
              aria-label={`상태: ${is_closed === 'OPEN' ? '진행 중' : '종료'}`}
            />
          </header>
        </section>
        <section className="flex flex-col gap-4" aria-labelledby="basics-title">
          <h3 id="basics-title" className="font-semibold text-22">
            기본 정보
          </h3>
          <ul className="flex flex-col gap-4">
            {basicInfoData.map(({ label, value, labelIcon }) => {
              const renderValue = () => {
                if (!value) return '-';

                switch (label) {
                  case '태그':
                    return <CustomTag is_multiline tag={String(value)} />;
                  case '공개 여부':
                    return (
                      <div className="flex items-center gap-4 md:items-start md:relative ">
                        <span>{value}</span>
                        {is_private ? (
                          <SmallAccessCodeSection
                            buttonText="비밀번호 확인하기"
                            is_closed={is_closed}
                            isDisplayed={isDisplayed}
                            access_code={access_code}
                            onDisplay={handleDisplay}
                          />
                        ) : null}
                      </div>
                    );
                  default:
                    return value;
                }
              };

              return (
                <li
                  key={label}
                  className="flex flex-col md:flex-row md:gap-y-0 gap-y-1 md:gap-x-2 md:items-start"
                >
                  <div className="flex items-center flex-shrink-0 gap-3 font-semibold w-28 text-pollloop-brown-01">
                    {labelIcon}
                    {label}
                  </div>
                  <div className="text-pollloop-brown-01 pl-7 md:pl-0">{renderValue()}</div>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="flex flex-col gap-4" aria-labelledby="statistics-title">
          <h3 id="statistics-title" className="font-semibold text-22">
            통계
          </h3>
          <ul className="flex gap-8">
            <li>
              <p id="rate-label" className="text-lg font-normal">
                완료율
              </p>
              <span
                aria-labelledby="rate-label"
                className="text-pollloop-brown-03 font-extrabold text-[40px] leading-none"
              >
                {complete_rate}%
              </span>
            </li>
            <li>
              <p id="entry-label" className="text-lg font-normal">
                입장
              </p>
              <span
                aria-labelledby="entry-label"
                className="text-pollloop-brown-03 font-extrabold text-[40px] leading-none"
              >
                {user_count}
              </span>
            </li>
            <li>
              <p id="submit-label" className="text-lg font-normal">
                제출
              </p>
              <span
                aria-labelledby="submit-label"
                className="text-pollloop-brown-03 font-extrabold text-[40px] leading-none"
              >
                {completed_count}
              </span>
            </li>
          </ul>
        </section>
        <section className="flex flex-col gap-6">
          {/* 탭 버튼 */}
          <div role="tablist" className="flex gap-4">
            <button
              role="tab"
              type="button"
              onClick={() => changeTab(0)}
              aria-selected={activeIndex === 0}
              aria-controls="summary-panel"
              id="summary-tab"
              className={`transition-smooth font-semibold text-22 ${
                activeIndex === 0
                  ? 'text-pollloop-brown-01 underline underline-offset-8'
                  : 'text-pollloop-brown-01/60'
              }`}
            >
              요약
            </button>
            <button
              role="tab"
              type="button"
              onClick={() => changeTab(1)}
              aria-selected={activeIndex === 1}
              aria-controls="participants-panel"
              id="participants-tab"
              className={`transition-smooth font-semibold text-22 ${
                activeIndex === 1
                  ? 'text-pollloop-brown-01 underline underline-offset-8'
                  : 'text-pollloop-brown-01/60'
              }`}
            >
              참여자 목록
            </button>
          </div>

          {/* 탭 컨텐츠 */}
          <div className="w-full">
            <div
              role="tabpanel"
              id="summary-panel"
              aria-labelledby="summary-tab"
              hidden={activeIndex !== 0}
            >
              {activeIndex === 0 && formId && <Summary formId={formId} />}
            </div>
            <div
              role="tabpanel"
              id="participants-panel"
              aria-labelledby="participants-tab"
              hidden={activeIndex !== 1}
            >
              {activeIndex === 1 && formId && <Participants formId={formId} />}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
