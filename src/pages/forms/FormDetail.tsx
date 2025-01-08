import { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Button from '../../components/common/Button';
import Participants from '../../components/details/Participants';
import Summary from '../../components/details/Summary';
import useTabs from '../../hooks/useTabs';
import { OverviewData } from '../../types/form-details.types';
import { useParams } from 'react-router-dom';
import { fetchOverviewData } from '../../api/form-detail';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { getCompleteRate } from '../../utils/getCompleteRate';

export default function FormDetail() {
  const { formId } = useParams<{ formId: string }>();
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { activeIndex, changeTab } = useTabs(0);

  useEffect(() => {
    if (!formId) return;

    const loadOverviewData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchOverviewData(formId);
        // console.log('API 응답 데이터:', data);
        setOverviewData(data[0] as OverviewData);
      } catch (err) {
        console.error('데이터 로딩 중 에러:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadOverviewData();
  }, [formId]);

  if (isLoading) return <div>로딩 중..로딩 중..로딩 중..로딩 중..로딩 중..로딩 중..로딩 중...</div>; // 로딩 컴포넌트 추가 예정
  if (!overviewData) return <div>데이터가 없습니다</div>;

  const {
    user,
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

  const complete_rate = getCompleteRate(completed_count, user_count);

  return (
    <div className="flex flex-col gap-4 px-10 ">
      <Breadcrumbs items={['홈', '나의 홈', '프론트엔드 6기 만족도 조사 15주차']} />

      <div className="relative flex flex-col w-full gap-10 p-10 bg-pollloop-bg-02 rounded-2xl">
        <Button
          onClick={copyToClipboard(
            'domain.com/forms/' + uuid,
            '참여 링크가 클립보드에 복사되었습니다.',
          )}
          type="button"
          variant="primary"
          size="md"
          className="absolute w-40 top-10 right-10 "
          aria-label="폼 참여 링크 복사하기"
        >
          참여 링크 공유하기
        </Button>
        <h2 className="font-semibold text-22">{title}</h2>
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
              className={`font-semibold text-22 ${
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
              className={`font-semibold text-22 ${
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
