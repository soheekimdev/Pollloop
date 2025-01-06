import { QuestionType } from '@/types/forms/forms.types';

export const FILE_TYPES = [
  { value: 'image', label: '이미지(jpg, jpeg, png, gif)' },
  { value: 'pdf', label: 'PDF' },
  { value: 'spreadsheet', label: '스프레드시트(xlsx, xls, csv)' },
];

export const FILE_SIZE_LIMIT = 10 * 1024 * 1024; // 10MB;

type QuestionTypeOption = {
  value: QuestionType;
  label: string;
};

export const QUESTION_TYPES: QuestionTypeOption[] = [
  { value: 'SHORT_TYPE', label: '단답형' },
  { value: 'LONG_TYPE', label: '장문형' },
  { value: 'CHECKBOX_TYPE', label: '체크박스' },
  { value: 'RADIO_TYPE', label: '라디오' },
  { value: 'DROPDOWN_TYPE', label: '드롭다운' },
  { value: 'RANGE_TYPE', label: '범위 선택' },
  { value: 'STAR_RATING_TYPE', label: '별점' },
  { value: 'IMAGE_SELECT_TYPE', label: '이미지 선택' },
  { value: 'NUMBER_TYPE', label: '숫자' },
  { value: 'DATE_TYPE', label: '날짜' },
  { value: 'EMAIL_TYPE', label: '이메일' },
  { value: 'FILE_UPLOAD_TYPE', label: '파일 업로드' },
];
