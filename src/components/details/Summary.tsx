import { useEffect, useState } from 'react';
import { SummaryData } from '../../types/form-details.types';
import Question from './summary/Question';
import { fetchSummaryData } from '../../api/form-detail';

export default function Summary({ formId }: { formId: string }) {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!formId) return;

    const loadOverviewData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSummaryData(formId);
        // console.log('/API 응답 데이터:', data);
        // console.log(data[0]);
        setSummaryData(data[0] as SummaryData);
      } catch (err) {
        console.error('데이터 로딩 중 에러:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadOverviewData();
  }, [formId]);

  if (isLoading) return <div>로딩 중..로딩 중..로딩 중..로딩 중..로딩 중..로딩 중..로딩 중...</div>; // 로딩 컴포넌트 추가 예정
  if (!summaryData) return <div>데이터가 없습니다</div>;

  return (
    <ul className="flex flex-col w-full gap-4 min-w-[360px]">
      {summaryData.data.map(question => (
        <Question key={question.id} questionItem={question} />
      ))}
    </ul>
  );
}
