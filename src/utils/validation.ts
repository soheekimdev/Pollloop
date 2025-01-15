import { Answer, Question } from '@/types/forms/forms.types';

export interface ValidationError {
  questionOrder: number;
  message: string;
}

export const validateAnswer = (question: Question, answer?: Answer): ValidationError | null => {
  // 필수 필드 검사
  if (
    question.is_required &&
    (!answer || !answer.value || (Array.isArray(answer.value) && answer.value.length === 0))
  ) {
    return {
      questionOrder: question.question_order,
      message: '이 항목은 필수입니다.',
    };
  }

  // 값이 없는 경우 더 이상의 검증이 필요없음
  if (!answer?.value) {
    return null;
  }

  switch (question.layout_type) {
    case 'EMAIL_TYPE': {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (typeof answer.value === 'string' && !emailRegex.test(answer.value)) {
        return {
          questionOrder: question.question_order,
          message: '올바른 이메일 형식이 아닙니다.',
        };
      }
      break;
    }

    case 'NUMBER_TYPE':
      if (typeof answer.value === 'string') {
        const num = Number(answer.value);
        if (isNaN(num)) {
          return {
            questionOrder: question.question_order,
            message: '숫자만 입력 가능합니다.',
          };
        }
      }
      break;

    case 'DATE_TYPE':
      if (typeof answer.value === 'string' && !isValidDate(answer.value)) {
        return {
          questionOrder: question.question_order,
          message: '올바른 날짜를 선택해주세요.',
        };
      }
      break;
  }

  return null;
};

export const validateForm = (
  questions: Question[],
  answers: Record<number, Answer>,
): ValidationError[] => {
  const errors: ValidationError[] = [];

  questions.forEach(question => {
    const answer = answers[question.question_order];
    const error = validateAnswer(question, answer);
    if (error) {
      errors.push(error);
    }
  });

  return errors;
};

const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};
