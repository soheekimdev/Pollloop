import Question from './summary/Question';

interface SummaryDataProps {
  id: number;
  title: string;
  questions: {
    id: number;
    type: string;
    question: string;
    results: any[];
  }[];
}

const summaryData: SummaryDataProps = {
  id: 123,
  title: '프론트엔드 6기 만족도 조사 15주차',
  questions: [
    {
      id: 1,
      type: 'SHORT_ANSWER',
      question: '이름을 입력해 주세요',
      results: [
        { answer: '김철수' },
        { answer: '이영희' },
        { answer: '박지민' },
        { answer: '최동훈' },
        { answer: '정서연' },
        { answer: '김철수2' },
        { answer: '이영희2' },
        { answer: '박지민2' },
        { answer: '최동훈2' },
        { answer: '정서연2' },
      ],
    },
    {
      id: 2,
      type: 'LONG_ANSWER',
      question: '이번 주 학습 내용 중 가장 기억에 남는 것과 그 이유를 작성해 주세요',
      results: [
        {
          answer:
            'TypeScript의 제네릭 개념이 어려웠지만 이해하고 나니 코드의 안정성이 높아져서 좋았습니다.',
        },
        { answer: 'React의 상태관리 패턴을 배우면서 데이터 흐름을 더 잘 이해하게 되었습니다.' },
        { answer: '커스텀 훅을 만들어보면서 코드 재사용성의 중요성을 깨달았습니다.' },
        { answer: '최적화 기법들을 배우면서 성능 개선의 실제 사례를 경험할 수 있었습니다.' },
        { answer: '팀 프로젝트에서 git 충돌 해결하는 방법을 배워서 유익했습니다.' },
      ],
    },
    {
      id: 3,
      type: 'CHECKBOX',
      question: '이번 주에 어려웠던 내용을 모두 선택해주세요',
      results: [
        { label: 'TypeScript 타입 정의', count: 78 },
        { label: 'React 컴포넌트 설계', count: 65 },
        { label: '상태 관리', count: 45 },
      ],
    },
    {
      id: 4,
      type: 'RADIO',
      question: '선호하는 학습 방식은 무엇인가요?',
      results: [
        { label: '이론 강의', count: 30 },
        { label: '실습', count: 45 },
        { label: '프로젝트', count: 23 },
      ],
    },
    {
      id: 5,
      type: 'DROPDOWN',
      question: '소속 트랙을 선택해주세요',
      results: [
        { label: '프론트엔드', count: 50 },
        { label: '백엔드', count: 48 },
      ],
    },
    {
      id: 6,
      type: 'RANGE',
      question: '이번 주 학습 난이도는 어떠셨나요? (1-10)',
      results: [
        { value: 6, count: 20 },
        { value: 7, count: 35 },
        { value: 8, count: 25 },
        { value: 9, count: 15 },
        { value: 10, count: 3 },
      ],
    },
    {
      id: 7,
      type: 'STAR',
      question: '이번 주 수업 만족도를 평가해주세요',
      results: [
        { value: 1, count: 0 },
        { value: 2, count: 0 },
        { value: 3, count: 10 },
        { value: 4, count: 38 },
        { value: 5, count: 50 },
      ],
    },
    {
      id: 8,
      type: 'IMAGE_SELECT',
      question: '이번 주 수업 중 가장 인상 깊었던 부분의 이미지를 선택해주세요',
      results: [
        { imageId: 'img1', label: 'TypeScript 실습', count: 35 },
        { imageId: 'img2', label: 'React 컴포넌트', count: 40 },
        { imageId: 'img3', label: '상태관리 다이어그램', count: 23 },
      ],
    },
    {
      id: 9,
      type: 'NUMBER',
      question: '이번 주 학습에 투자한 시간은 몇 시간인가요?',
      results: [
        { value: 15, count: 10 },
        { value: 20, count: 25 },
        { value: 25, count: 35 },
        { value: 30, count: 20 },
        { value: 35, count: 8 },
      ],
    },
    {
      id: 10,
      type: 'DATE',
      question: '다음 오프라인 모임이 가능한 날짜를 선택해주세요',
      results: [
        { answer: '2024-12-25' },
        { answer: '2024-12-26' },
        { answer: '2024-12-25' },
        { answer: '2024-12-27' },
        { answer: '2024-12-26' },
      ],
    },
    {
      id: 11,
      type: 'EMAIL',
      question: '피드백 받으실 이메일을 입력해주세요',
      results: [
        { answer: 'user1@example.com' },
        { answer: 'user2@example.com' },
        { answer: 'user3@example.com' },
        { answer: 'user4@example.com' },
        { answer: 'user5@example.com' },
      ],
    },
    {
      id: 12,
      type: 'FILE_UPLOAD',
      question: '이번 주 과제를 제출해주세요',
      results: [
        { answer: 'assignment1.pdf' },
        { answer: 'assignment2.pdf' },
        { answer: 'assignment3.pdf' },
        { answer: 'assignment4.pdf' },
        { answer: 'assignment5.pdf' },
      ],
    },
  ],
};

export default function Summary() {
  return (
    <>
      <ul className="flex flex-col w-full gap-4">
        {summaryData.questions.map(question => (
          <Question key={question.id} questionItem={question} />
        ))}
      </ul>
    </>
  );
}
