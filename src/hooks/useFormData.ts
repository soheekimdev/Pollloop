import { FormInfo } from '@/types/forms/forms.types';
import { instance } from '@/api/axios';
import { useEffect, useState } from 'react';

// const mockFormData = {
//   user: 1,
//   title: '학습 만족도 조사 (통합)',
//   tag: 'OZ',
//   create_at: '2025-01-08',
//   end_at: '2025-01-31',
//   is_closed: 'TEMP',
//   target_count: 30,
//   is_bookmark: true,
//   is_private: true,
//   access_code: '12345',
//   subtitle: '16주차 학습 만족도 조사',
//   form_description:
//     '이번 주 학습 내용에 대한 여러분의 소중한 의견을 들려주세요. 여러분의 피드백은 더 나은 교육 과정을 만드는 데 큰 도움이 됩니다.',
//   uuid: '2bd64b2e1364441b9840020039906fe4',
//   questions: [
//     {
//       layout_type: 'SHORT_TYPE',
//       question: '이름을 입력해 주세요.',
//       question_order: 1,
//       is_required: true,
//       options_of_questions: [
//         {
//           option_number: 1,
//           option_context: '',
//         },
//       ],
//     },
//     {
//       layout_type: 'DROPDOWN_TYPE',
//       question: '소속 트랙을 선택해 주세요.',
//       question_order: 2,
//       is_required: true,
//       options_of_questions: [
//         {
//           option_number: 1,
//           option_context: 'FE',
//         },
//         {
//           option_number: 2,
//           option_context: 'BE',
//         },
//         {
//           option_number: 3,
//           option_context: '풀스택',
//         },
//       ],
//     },
//     {
//       layout_type: 'NUMBER_TYPE',
//       question: '소속 기수를 입력해 주세요.',
//       question_order: 3,
//       is_required: true,
//       options_of_questions: [
//         {
//           option_number: 1,
//           option_context: '',
//         },
//       ],
//     },
//     {
//       layout_type: 'RANGE_TYPE',
//       question: '이번 주 나의 학습 성취도는 어땠나요?',
//       question_order: 4,
//       is_required: true,
//       options_of_questions: [
//         {
//           option_number: 1,
//           option_context: '1',
//         },
//         {
//           option_number: 2,
//           option_context: '2',
//         },
//         {
//           option_number: 3,
//           option_context: '3',
//         },
//         {
//           option_number: 4,
//           option_context: '4',
//         },
//         {
//           option_number: 5,
//           option_context: '5',
//         },
//         {
//           option_number: 6,
//           option_context: '6',
//         },
//         {
//           option_number: 7,
//           option_context: '7',
//         },
//         {
//           option_number: 8,
//           option_context: '8',
//         },
//         {
//           option_number: 9,
//           option_context: '9',
//         },
//         {
//           option_number: 10,
//           option_context: '10',
//         },
//         {
//           option_number: 100,
//           option_context: '전혀 못 따라갔어요',
//         },
//         {
//           option_number: 200,
//           option_context: '완벽히 이해했어요',
//         },
//       ],
//     },
//     {
//       layout_type: 'CHECKBOX_TYPE',
//       question: '이번 주 어려웠던 주제를 모두 선택해 주세요.',
//       question_order: 5,
//       is_required: true,
//       options_of_questions: [
//         {
//           option_number: 1,
//           option_context: 'TypeScript 타입 정의',
//         },
//         {
//           option_number: 2,
//           option_context: 'Redux 상태 관리',
//         },
//         {
//           option_number: 3,
//           option_context: 'Redux 상태 관리',
//         },
//         {
//           option_number: 4,
//           option_context: '비동기 통신 처리',
//         },
//         {
//           option_number: 5,
//           option_context: 'Redux 상태 관리',
//         },
//         {
//           option_number: 99,
//           option_context: '기타',
//         },
//       ],
//     },
//     {
//       layout_type: 'STAR_RATING_TYPE',
//       question: '이번 주 강의 내용은 어떠셨나요?',
//       question_order: 6,
//       is_required: true,
//       options_of_questions: [
//         {
//           option_number: 1,
//           option_context: '1',
//         },
//         {
//           option_number: 2,
//           option_context: '2',
//         },
//         {
//           option_number: 3,
//           option_context: '3',
//         },
//         {
//           option_number: 4,
//           option_context: '4',
//         },
//         {
//           option_number: 5,
//           option_context: '5',
//         },
//       ],
//     },
//     {
//       layout_type: 'RADIO_TYPE',
//       question: '다음 주 수업은 어떤 방식으로 진행되면 좋을까요?',
//       question_order: 7,
//       is_required: true,
//       options_of_questions: [
//         {
//           option_number: 1,
//           option_context: '더 많은 실습 시간이 필요해요',
//         },
//         {
//           option_number: 2,
//           option_context: '더 자세한 이론 설명이 필요해요',
//         },
//         {
//           option_number: 3,
//           option_context: '지금 방식이 좋아요',
//         },
//         {
//           option_number: 99,
//           option_context: '기타',
//         },
//       ],
//     },
//     {
//       layout_type: 'LONG_TYPE',
//       question: '이번 주 학습 내용 중 가장 기억에 남는 것과 그 이유를 작성해 주세요.',
//       question_order: 8,
//       is_required: true,
//       options_of_questions: [
//         {
//           option_number: 1,
//           option_context: '',
//         },
//       ],
//     },
//     {
//       layout_type: 'IMAGE_SELECT_TYPE',
//       question: '마음에 드는 이미지를 선택해 주세요.',
//       question_order: 9,
//       is_required: false,
//       options_of_questions: [
//         {
//           option_number: 1,
//           option_context: '',
//         },
//         {
//           option_number: 2,
//           option_context: '',
//         },
//         {
//           option_number: 3,
//           option_context: '',
//         },
//         {
//           option_number: 4,
//           option_context: '',
//         },
//       ],
//     },
//     {
//       layout_type: 'FILE_UPLOAD_TYPE',
//       question: '이번 주 과제물을 제출해 주세요.',
//       question_order: 10,
//       is_required: true,
//       options_of_questions: [
//         {
//           option_number: 1,
//           option_context: 'File URL',
//         },
//         {
//           option_number: 99,
//           option_context: 'image',
//         },
//       ],
//     },
//     {
//       layout_type: 'DATE_TYPE',
//       question: '생일을 축하받고 싶다면 생일을 입력해 주세요.',
//       question_order: 11,
//       is_required: false,
//       options_of_questions: [
//         {
//           option_number: 1,
//           option_context: '',
//         },
//       ],
//     },
//     {
//       layout_type: 'EMAIL_TYPE',
//       question: '피드백 답변을 받을 이메일 주소를 입력해 주세요.',
//       question_order: 12,
//       is_required: true,
//       options_of_questions: [
//         {
//           option_number: 1,
//           option_context: '',
//         },
//       ],
//     },
//   ],
// };

export const useFormData = (formId: string) => {
  const [formData, setFormData] = useState<FormInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        setIsLoading(true);
        const response = await instance.get(`/form/uuid:${formId}/`);
        console.log('API Response:', response.data);
        setFormData(response.data);
        setError(null);
      } catch (error) {
        setError('폼을 불러오는 데 실패했습니다.');
        console.error('Error fetching:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (formId) {
      fetchFormData();
    }

    // API 대신 목업 데이터 사용
    // setFormData(mockFormData);
    // setIsLoading(false);
  }, [formId]);

  return { formData, isLoading, error };
};
