import { useEffect, useState } from 'react';
import { SummaryData } from '../../types/form-details.types';
import Question from './summary/Question';
import { fetchSummaryData } from '../../api/form-detail';
import CircleLoader from '../common/loaders/CircleLoader';

export default function Summary({ formId }: { formId: string }) {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!formId) return;

    const loadOverviewData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSummaryData(formId);
        setSummaryData(data as SummaryData);
      } catch (err) {
        console.error('데이터 로딩 중 에러:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadOverviewData();
  }, [formId]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full gap-5 mt-10">
        <CircleLoader size={40} />
      </div>
    );
  if (!summaryData) return <div>데이터가 없습니다</div>;

  return (
    <ul className="flex flex-col w-full gap-4 min-w-[360px]">
      {summaryData.data.map(question => (
        <Question key={question.id} questionItem={question} />
      ))}
    </ul>
  );
}
