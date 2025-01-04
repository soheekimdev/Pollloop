import { QuestionType } from '@/types/forms';

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
  { value: '단답형', label: '단답형' },
  { value: '장문형', label: '장문형' },
  { value: '체크박스', label: '체크박스' },
  { value: '라디오', label: '라디오' },
  { value: '드롭다운', label: '드롭다운' },
  { value: '범위선택', label: '범위 선택' },
  { value: '별점', label: '별점' },
  { value: '이미지선택', label: '이미지 선택' },
  { value: '숫자', label: '숫자' },
  { value: '날짜', label: '날짜' },
  { value: '이메일', label: '이메일' },
  { value: '파일업로드', label: '파일 업로드' },
];
