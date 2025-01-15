import { Answer, FormInfo, Question } from '@/types/forms/forms.types';

export interface ValidationError {
  questionOrder: number;
  message: string;
}

// 참여 폼

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

// 폼 만들기

// 폼 정보 유효성 검사 에러 타입
export interface FormInfoValidationError {
  field: 'title' | 'tag' | 'target_count' | 'end_at' | 'subtitle';
  message: string;
}

// 폼 제목 유효성 검사
export const validateFormTitle = (title: string): string | null => {
  if (!title) {
    return '폼 이름을 입력해주세요.';
  }
  if (title.length > 255) {
    return '폼 이름은 255자를 초과할 수 없습니다.';
  }
  // 허용된 특수문자를 제외한 특수문자 체크
  const disallowedSpecialChars = /[!@#$%^&*+=[\]{}"';:,.<>?/\\|`~]/g;
  if (disallowedSpecialChars.test(title)) {
    return '폼 이름에는 하이픈(-), 밑줄(_), 소괄호()를 제외한 특수문자를 사용할 수 없습니다.';
  }
  return null;
};

// 태그 유효성 검사
export const validateFormTag = (tag: string): string | null => {
  if (tag && tag.length > 15) {
    return '태그는 15자를 초과할 수 없습니다.';
  }
  return null;
};

// 참여 인원 유효성 검사
export const validateTargetCount = (count: number): string | null => {
  if (!count) {
    return '참여 인원을 입력해주세요.';
  }
  if (count < 1 || count > 50) {
    return '참여 인원은 1명에서 50명 사이여야 합니다.';
  }
  return null;
};

// 마감 일자 유효성 검사
export const validateEndDate = (date: string): string | null => {
  if (!date) {
    return '마감 일자를 선택해주세요.';
  }
  return null;
};

// 표지 제목 유효성 검사
export const validateSubtitle = (subtitle: string): string | null => {
  if (!subtitle) {
    return '표지 제목을 입력해주세요.';
  }
  if (subtitle.length > 255) {
    return '표지 제목은 255자를 초과할 수 없습니다.';
  }
  return null;
};

// 전체 폼 정보 유효성 검사
export const validateFormInfo = (formInfo: FormInfo): FormInfoValidationError[] => {
  const errors: FormInfoValidationError[] = [];

  const titleError = validateFormTitle(formInfo.title);
  if (titleError) {
    errors.push({ field: 'title', message: titleError });
  }

  const tagError = validateFormTag(formInfo.tag || '');
  if (tagError) {
    errors.push({ field: 'tag', message: tagError });
  }

  const targetCountError = validateTargetCount(formInfo.target_count);
  if (targetCountError) {
    errors.push({ field: 'target_count', message: targetCountError });
  }

  const endDateError = validateEndDate(formInfo.end_at);
  if (endDateError) {
    errors.push({ field: 'end_at', message: endDateError });
  }

  if (formInfo.subtitle) {
    const subtitleError = validateSubtitle(formInfo.subtitle);
    if (subtitleError) {
      errors.push({ field: 'subtitle', message: subtitleError });
    }
  }

  if (formInfo.end_at) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(formInfo.end_at);
    endDate.setHours(0, 0, 0, 0);

    if (endDate < today) {
      errors.push({
        field: 'end_at',
        message: '마감일은 오늘 이후여야 합니다.',
      });
    }
  }

  return errors;
};

export const validateFormSubtitle = (subtitle: string): string | null => {
  if (!subtitle || subtitle.trim() === '') {
    return '표지 제목을 입력해주세요.';
  }
  if (subtitle.length > 255) {
    return '표지 제목은 255자를 초과할 수 없습니다.';
  }
  return null;
};
