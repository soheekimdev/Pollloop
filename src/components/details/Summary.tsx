import { useEffect, useState } from 'react';
import { SummaryData } from '../../types/form-details.types';
import Question from './summary/Question';
import { fetchSummaryData } from '../../api/form-detail';

export default function Summary({ formId }: { formId: string }) {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const testSummaryData = {
    uuid: 'f4f86d3e59954b57afe0b28bfc0fd8ad',
    title: '프론트엔드 6기 만족도 조사 15주차',
    data: [
      {
        id: 1,
        layout_type: 'SHORT_TYPE',
        is_required: true,
        question: '이름을 입력해 주세요',
        results: [
          {
            value:
              '김철수 김철수 김철수 김철수 김철수 김철수 김철수 김철수 김철수 김철수 김철수 김철수 ',
          },
          { value: '이영희' },
          { value: '박지민' },
          { value: '최동훈' },
          { value: '정서연' },
          { value: '김철수2' },
          { value: '이영희2' },
          { value: '박지민2' },
          { value: '최동훈2' },
          { value: '정서연2' },
        ],
      },
      {
        id: 2,
        layout_type: 'LONG_TYPE',
        is_required: true,
        question: '이번 주 학습 내용 중 가장 기억에 남는 것과 그 이유를 작성해 주세요',
        results: [
          {
            value:
              'TypeScript의 제네릭 개념이 어려웠지만 이해하고 나니 코드의 안정성이 높아져서 좋았습니다.',
          },
          {
            value:
              'React의 상태관리 패턴을 배우면서 데이터 흐름을 더 잘 이해하게 되었습니다. React의 상태관리 패턴을 배우면서 데이터 흐름을 더 잘 이해하게 되었습니다. React의 상태관리 패턴을 배우면서 데이터 흐름을 더 잘 이해하게 되었습니다. React의 상태관리 패턴을 배우면서 데이터 흐름을 더 잘 이해하게 되었습니다. React의 상태관리 패턴을 배우면서 데이터 흐름을 더 잘 이해하게 되었습니다.',
          },
          { value: '커스텀 훅을 만들어보면서 코드 재사용성의 중요성을 깨달았습니다.' },
          { value: '최적화 기법들을 배우면서 성능 개선의 실제 사례를 경험할 수 있었습니다.' },
          { value: '팀 프로젝트에서 git 충돌 해결하는 방법을 배워서 유익했습니다.' },
        ],
      },
      {
        id: 3,
        layout_type: 'CHECKBOX_TYPE',
        is_required: false,
        question: '이번 주에 어려웠던 내용을 모두 선택해주세요',
        results: [
          {
            label:
              'TypeScript에서 제네릭(Generics)은 타입을 마치 함수의 파라미터처럼 사용할 수 있게 해주는 기능입니다. 이를 통해 여러 타입에서 작동하는 컴포넌트를 작성할 수 있으며, 타입을 파라미터화하여 코드의 재사용성과 유연성을 크게 향상시킬 수 있습니다. 예를 들어 배열이나 프로미스와 같은 컨테이너 타입에서 요소의 타입을 지정할 때 매우 유용하게 사용됩니다.',
            count: 78,
          },
          { label: 'React 컴포넌트 설계', count: 65 },
          {
            label:
              'TypeScript에서 제네릭(Generics)은 타입을 마치 함수의 파라미터처럼 사용할 수 있게 해주는 기능입니다. 이를 통해 여러 타입에서 작동하는 컴포넌트를 작성할 수 있으며, 타입을 파라미터화하여 코드의 재사용성과 유연성을 크게 향상시킬 수 있습니다. 예를 들어 배열이나 프로미스와 같은 컨테이너 타입에서 요소의 타입을 지정할 때 매우 유용하게 사용됩니다.',
            count: 78,
          },
          { label: 'React 컴포넌트 설계', count: 65 },
          {
            label: '기타',
            values: [
              '기타옵션에 적은 값1',
              '기타옵션에 적은 값2',
              '기타옵션에 적은 값3',
              '기타옵션에 적은 값4',
              '기타옵션에 적은 값5',
              '기타옵션에 적은 값6',
              '일일일',
              '이이이',
              '333333',
              '기타옵션에 적은 값1',
              '기타옵션에 적은 값2',
              '기타옵션에 적은 값3',
              '기타옵션에 적은 값4',
              '기타옵션에 적은 값5',
              '기타옵션에 적은 값6',
              '',
              '기타옵션에 적은 값1',
              '기타옵션에 적은 값2',
              '기타옵션에 적은 값3',
              '기타옵션에 적은 값4',
              '기타옵션에 적은 값5',
              '기타옵션에 적은 값6',
              '',
              '기타옵션에 적은 값1',
              '기타옵션에 적은 값2',
              '기타옵션에 적은 값3기타옵션에 적은 값3기타옵션에 적은 값3기타옵션에 적은 값3기타옵션에 적은 값3기타옵션에 적은 값3',
              '기타옵션에 적은 값4',
              '기타옵션에 적은 값5',
              '기타옵션에 적은 값6',
              '기타옵션에 적은 값1',
              '기타옵션에 적은 값2',
              '기타옵션에 적은 값3',
              '기타옵션에 적은 값4',
              '기타옵션에 적은 값5',
              '기타옵션에 적은 값6',
              '일일일',
              '이이이',
              '333333',
              '기타옵션에 적은 값1',
              '기타옵션에 적은 값2',
              '기타옵션에 적은 값3',
              '기타옵션에 적은 값4',
              '기타옵션에 적은 값5',
              '기타옵션에 적은 값6',
              '',
              '기타옵션에 적은 값1',
              '기타옵션에 적은 값2',
              '기타옵션에 적은 값3',
              '기타옵션에 적은 값4',
              '기타옵션에 적은 값5',
              '기타옵션에 적은 값6',
              '',
              '기타옵션에 적은 값1',
              '기타옵션에 적은 값2',
              '기타옵션에 적은 값3',
              '기타옵션에 적은 값4',
              '기타옵션에 적은 값5',
              '기타옵션에 적은 값6',
              '끝',
              '끝',
              '끝',
              '끝',
              '끝',
              '끝',
              '끝',
              '끝',
              '끝',
              '끝',
              '끝',
              '끝',
              '끝',
              '끝',
              '끝',
              '끝',
              '끝',
              '끝',
              '끝',
              '끝',
              '끝',
              '끝',
            ],
            count: 80,
          },
        ],
      },
      {
        id: 4,
        layout_type: 'RADIO_TYPE',
        is_required: true,
        question: '선호하는 학습 방식은 무엇인가요?',
        results: [
          { label: '이론 강의', count: 30 },
          { label: '실습', count: 45 },
          { label: '프로젝트', count: 23 },
          { label: '실습', count: 45 },
          {
            label:
              '프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트프로젝트',
            count: 23,
          },
          { label: '실습', count: 45 },
          { label: '프로젝트', count: 23 },
          {
            label: '기타',
            values: ['기타옵션에 적은 값1', '기타옵션에 적은 값2', '기타옵션에 적은 값3'],
            count: 3,
          },
        ],
      },
      {
        id: 5,
        layout_type: 'DROPDOWN_TYPE',
        is_required: true,
        question: '소속 트랙을 선택해주세요',
        results: [
          { label: '프론트엔드', count: 50 },
          { label: '백엔드', count: 48 },
          {
            label: '기타',
            values: ['기타옵션에 적은 값1', '기타옵션에 적은 값2', '기타옵션에 적은 값3'],
            count: 3,
          },
        ],
      },
      {
        id: 6,
        layout_type: 'RANGE_TYPE',
        is_required: true,
        question: '이번 주 학습 난이도는 어떠셨나요? (1-10)',
        min_label: '1',
        max_label: '10',
        results: [
          { label: 1, count: 20 },
          { label: 2, count: 35 },
          { label: 3, count: 25 },
          { label: 4, count: 15 },
          { label: 7, count: 25 },
          { label: 8, count: 15 },
          { label: 9, count: 3 },
          { label: 10, count: 3 },
        ],
      },
      {
        id: 7,
        layout_type: 'STAR_RATING_TYPE',
        is_required: true,
        question: '이번 주 수업 만족도를 평가해주세요',
        results: [
          { label: 1, count: 0 },
          { label: 2, count: 0 },
          { label: 3, count: 10 },
          { label: 4, count: 38 },
          { label: 5, count: 50 },
        ],
      },
      {
        id: 8,
        layout_type: 'IMAGE_SELECT_TYPE',
        is_required: true,
        question: '이번 주 수업 중 가장 인상 깊었던 부분의 이미지를 선택해주세요',
        results: [
          { label: 'https://example.com/db/1', count: 5 },
          { label: 'https://example.com/db/1', count: 10 },
          { label: 'https://example.com/db/1', count: 48 },
          { label: 'https://example.com/db/1', count: 102 },
        ],
      },
      {
        id: 9,
        layout_type: 'NUMBER_TYPE',
        is_required: true,
        question: '이번 주 학습에 투자한 시간은 몇 시간인가요?',
        results: [
          { value: 15 },
          { value: 15 },
          { value: 15 },
          { value: 16 },
          { value: 16 },
          { value: 17 },
          { value: 18 },
          { value: 19 },
          { value: 15 },
          { value: 20 },
          { value: 20 },
          { value: 15 },
          { value: 15 },
          { value: 15 },
        ],
      },
      {
        id: 10,
        layout_type: 'DATE_TYPE',
        is_required: true,
        question: '다음 오프라인 모임이 가능한 날짜를 선택해주세요',
        results: [
          { value: '2022-12-25' },
          { value: '2023-12-26' },
          { value: '2024-12-25' },
          { value: '2024-12-27' },
          { value: '2024-12-26' },
          { value: '2025-02-25' },
          { value: '2025-08-26' },
          { value: '2025-11-25' },
          { value: '2025-11-27' },
          { value: '2025-12-26' },
          { value: '2025-11-25' },
          { value: '2025-11-27' },
          { value: '2025-12-26' },
          { value: '2025-11-25' },
          { value: '2025-11-27' },
          { value: '2025-12-26' },
          { value: '2025-11-25' },
          { value: '2025-11-27' },
          { value: '2025-11-27' },
          { value: '2025-11-27' },
          { value: '2025-11-27' },
          { value: '2025-11-27' },
          { value: '2025-11-27' },
          { value: '2025-11-27' },
          { value: '2025-11-27' },
          { value: '2025-11-27' },
          { value: '2025-11-27' },
          { value: '2025-11-27' },
          { value: '2025-12-26' },
          { value: '2025-11-25' },
          { value: '2025-11-27' },
          { value: '2025-12-26' },
          { value: '2026-11-06' },
          { value: '2027-11-06' },
          { value: '2028-11-06' },
          { value: '2029-11-06' },
          { value: '2030-11-06' },
          { value: '2031-11-06' },
          { value: '2032-11-06' },
          { value: '2033-11-06' },
          { value: '2034-11-06' },
          { value: '2026-11-06' },
        ],
      },
      {
        id: 11,
        layout_type: 'EMAIL_TYPE',
        is_required: true,
        question: '피드백 받으실 이메일을 입력해주세요',
        results: [
          { value: 'user1@example.com' },
          { value: 'user2@example.com' },
          { value: 'user2@example.com' },
          { value: 'user2@example.com' },
          { value: 'user2@example.com' },
          { value: 'user2@example.com' },
          { value: 'user2@example.com' },
          { value: 'user2@example.com' },
          { value: 'user3@example.com' },
          { value: 'user4@example.com' },
          { value: 'user5@example.com' },
        ],
      },
      {
        id: 12,
        layout_type: 'FILE_UPLOAD_TYPE',
        is_required: true,
        question: '이번 주 과제를 제출해주세요',
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
        // setSummaryData(data as SummaryData);
        setSummaryData(testSummaryData as SummaryData);
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
