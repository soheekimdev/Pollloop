import { useEffect, useState } from 'react';
import { SummaryData } from '../../types/form-details.types';
import Question from './summary/Question';
import { fetchSummaryData } from '../../api/form-detail';
import CircleLoader from '../common/loaders/CircleLoader';

export default function Summary({ formId }: { formId: string }) {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const testData = {
    uuid: 'f4f86d3e59954b57afe0b28bfc0fd8ad',
    title: '오즈코딩스쿨 데모데이 만족도 조사',
    data: [
      {
        id: 1,
        layout_type: 'SHORT_TYPE',
        is_required: true,
        question: '프로젝트에서 본인이 맡은 업무를 한 줄로 작성해주세요.',
        results: [
          {
            value: '리액트를 활용한 메인 대시보드 UI 구현 및 실시간 데이터 시각화 컴포넌트 개발',
          },
          { value: 'TypeScript 기반 상태관리 로직 구현 및 API 연동' },
          { value: 'Tailwind CSS를 활용한 반응형 레이아웃 및 다크모드 구현' },
          { value: '사용자 인증 시스템 및 폼 유효성 검사 로직 구현' },
          { value: '차트 라이브러리 커스텀 및 데이터 시각화 담당' },
          { value: '웹소켓 기반 실시간 알림 시스템 프론트엔드 개발' },
          { value: '성능 최적화 및 코드 리팩토링 담당' },
          { value: '크로스 브라우저 호환성 테스트 및 버그 수정' },
          { value: '컴포넌트 재사용성 개선 및 디자인 시스템 구축' },
          { value: '프로젝트 문서화 및 코드 리뷰 진행' },
        ],
      },
      {
        id: 2,
        layout_type: 'LONG_TYPE',
        is_required: true,
        question: '프로젝트를 진행하면서 가장 어려웠던 점은? ',
        results: [
          {
            value:
              '대규모 데이터를 처리하는 차트 컴포넌트 개발 과정에서 성능 최적화가 가장 큰 어려움이었습니다. React의 useMemo와 useCallback을 적극 활용하고, 가상화 기법을 도입하여 렌더링 성능을 크게 개선할 수 있었습니다. 이 과정에서 React의 렌더링 최적화에 대해 깊이 이해할 수 있었습니다.',
          },
          {
            value:
              '실시간 데이터를 처리하는 웹소켓 구현 과정에서 상태 관리의 복잡성이 가장 큰 도전이었습니다. 여러 컴포넌트에서 공유되는 실시간 데이터의 일관성을 유지하면서, 동시에 불필요한 리렌더링을 방지하는 것이 특히 어려웠습니다. Zustand를 도입하고 상태 관리 아키텍처를 개선하면서, 전역 상태 관리에 대한 이해도를 크게 높일 수 있었고, 결과적으로 더 안정적인 애플리케이션을 구현할 수 있었습니다.',
          },
          {
            value:
              '다양한 브라우저와 디바이스에서의 일관된 사용자 경험을 제공하는 것이 challenging 했습니다. 특히 Safari에서 발생하는 특정 CSS 이슈와 터치 이벤트 처리의 차이점을 해결하는 과정이 어려웠습니다. 크로스 브라우징 테스트 자동화 도구를 도입하고, 폴리필을 적절히 적용하면서 이러한 문제들을 체계적으로 해결할 수 있었습니다.',
          },
          {
            value:
              '마이크로프론트엔드 아키텍처 도입 과정에서 여러 팀 간의 코드 통합과 배포 프로세스 조정이 큰 어려움이었습니다. Module Federation을 활용하여 런타임 통합을 구현하고, 공통 컴포넌트 라이브러리를 구축하면서, 대규모 프로젝트의 아키텍처 설계에 대한 실전 경험을 쌓을 수 있었습니다.',
          },
          {
            value:
              '레거시 코드베이스를 점진적으로 현대화하는 과정이 가장 어려웠습니다. 특히 Class 컴포넌트를 Functional 컴포넌트로 마이그레이션하면서, 기존 기능을 유지하면서 코드 품질을 개선하는 것이 challenging 했습니다. 단위 테스트를 강화하고 리팩토링 전략을 체계적으로 수립하면서, 안전하게 코드를 개선할 수 있었습니다.',
          },
        ],
      },
      {
        id: 3,
        layout_type: 'CHECKBOX_TYPE',
        is_required: false,
        question: '프로젝트 기간 중 가장 도움이 되었던 학습 방식은?',
        results: [
          {
            label: '팀원들과의 코드리뷰',
            count: 5,
          },
          { label: '조교님 찬스', count: 2 },
          {
            label: '유투브/지난 강의 시청',
            count: 4,
          },
          { label: '개발 블로그 포스팅 공부', count: 10 },
          {
            label: '기타',
            values: [
              '개발자 지인에게 조언 구하기',
              'ChatGPT를 활용해서 기능 구현하는 방법 참고하기',
              '프로젝트 관련 서적 구매 및 독서',
            ],
            count: 80,
          },
        ],
      },
      {
        id: 4,
        layout_type: 'RADIO_TYPE',
        is_required: true,
        question: '프로젝트내에서 본인의 포지션은? ',
        results: [
          { label: '프론트엔드', count: 10 },
          { label: '백엔드', count: 15 },
        ],
      },
      {
        id: 5,
        layout_type: 'DROPDOWN_TYPE',
        is_required: true,
        question: '프로젝트 기간 중 가장 개발이 잘 된 시간은? ',
        results: [
          { label: '00:00 - 06:00', count: 2 },
          { label: '06:00 - 12:00', count: 5 },
          { label: '12:00 - 18:00', count: 5 },
          { label: '18:00 - 24:00', count: 0 },
        ],
      },
      {
        id: 6,
        layout_type: 'RANGE_TYPE',
        is_required: true,
        question: '처음 계획했던 기능 중 얼만큼 구현하셨나요? ',
        min_label: '전혀 구현하지 못했다.',
        max_label: '전부 구현했다.',
        results: [
          { label: 1, count: 1 },
          { label: 2, count: 2 },
          { label: 3, count: 1 },
          { label: 4, count: 2 },
          { label: 5, count: 3 },
          { label: 6, count: 1 },
          { label: 7, count: 0 },
          { label: 8, count: 0 },
          { label: 9, count: 1 },
          { label: 10, count: 1 },
        ],
      },
      {
        id: 7,
        layout_type: 'STAR_RATING_TYPE',
        is_required: true,
        question: '프로젝트 기간 동안 본인에게 점수를 준다면? ',
        results: [
          { label: 1, count: 1 },
          { label: 2, count: 5 },
          { label: 3, count: 2 },
          { label: 4, count: 3 },
          { label: 5, count: 1 },
        ],
      },
      {
        id: 8,
        layout_type: 'IMAGE_SELECT_TYPE',
        is_required: true,
        question: '[돌발질문] 어떤 이미지가 가장 마음에 드나요?',
        results: [
          { label: 'https://source.unsplash.com/random', count: 5 },
          { label: 'https://source.unsplash.com/random', count: 2 },
          { label: 'https://source.unsplash.com/random', count: 3 },
          { label: 'https://source.unsplash.com/random', count: 2 },
        ],
      },
      {
        id: 9,
        layout_type: 'NUMBER_TYPE',
        is_required: true,
        question: '프로젝트 기간 중 평균 수면 시간은?',
        results: [
          { value: 4 },
          { value: 4 },
          { value: 5 },
          { value: 6 },
          { value: 6 },
          { value: 6 },
          { value: 6 },
          { value: 7 },
          { value: 7 },
          { value: 8 },
          { value: 9 },
          { value: 10 },
        ],
      },
      {
        id: 10,
        layout_type: 'DATE_TYPE',
        is_required: true,
        question: '이번 달에 유급휴가가 정해진다면 언제 쉬고 싶으신가요?',
        results: [
          { value: '2025-01-17' },
          { value: '2025-01-17' },
          { value: '2025-01-17' },
          { value: '2025-01-18' },
          { value: '2025-01-18' },
          { value: '2025-01-20' },
          { value: '2025-01-24' },
          { value: '2025-01-30' },
          { value: '2025-01-30' },
          { value: '2025-01-30' },
          { value: '2025-01-30' },
          { value: '2025-01-30' },
        ],
      },
      {
        id: 11,
        layout_type: 'EMAIL_TYPE',
        is_required: true,
        question: '오즈코딩스쿨이 발행하는 개발 뉴스를 받아보시려면 이메일을 남겨주세요.',
        results: [
          { value: 'user1@example.com' },
          { value: 'user2@example.com' },
          { value: 'user3@example.com' },
          { value: 'user4@example.com' },
          { value: 'user5@example.com' },
          { value: 'user6@example.com' },
          { value: 'user7@example.com' },
        ],
      },
      {
        id: 12,
        layout_type: 'FILE_UPLOAD_TYPE',
        is_required: true,
        question: '프로젝트 결과물을 업로드해주세요.',
        results: [
          { value: 'AWS/S3/pollloop/..../assignment1.pdf' },
          { value: 'AWS/S3/pollloop/..../assignment2.pdf' },
          { value: 'AWS/S3/pollloop/..../assignment2.pdf' },
          { value: 'AWS/S3/pollloop/..../assignment2.pdf' },
          { value: 'AWS/S3/pollloop/..../assignment2.pdf' },
          { value: 'AWS/S3/pollloop/..../assignment3.pdf' },
          { value: 'AWS/S3/pollloop/..../assignment4.pdf' },
        ],
      },
    ],
  };

  useEffect(() => {
    if (!formId) return;

    const loadOverviewData = async () => {
      try {
        setIsLoading(true);
        // const data = await fetchSummaryData(formId);
        setSummaryData(testData as SummaryData);
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
