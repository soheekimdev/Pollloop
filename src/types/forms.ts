import { FILE_TYPES } from '@/constants/forms';

export type FileType = (typeof FILE_TYPES)[number]['value'];

export type QuestionType =
  | 'SHORT_ANSWER' // 단답형
  | 'LONG_ANSWER' // 장문형
  | 'CHECKBOX' // 체크박스
  | 'RADIO' // 라디오
  | 'DROPDOWN' // 드롭다운
  | 'RANGE' // 범위 선택
  | 'RATING' // 별점
  | 'IMAGE_CHOICE' // 이미지 선택
  | 'NUMBER' // 숫자
  | 'DATE' // 날짜
  | 'EMAIL' // 이메일
  | 'FILE_UPLOAD'; // 파일 업로드

export const QUESTION_TYPES: Array<{
  value: QuestionType;
  label: string;
}> = [
  { value: 'SHORT_ANSWER', label: '단답형' },
  { value: 'LONG_ANSWER', label: '장문형' },
  { value: 'CHECKBOX', label: '체크박스' },
  { value: 'RADIO', label: '라디오' },
  { value: 'DROPDOWN', label: '드롭다운' },
  { value: 'RANGE', label: '범위 선택' },
  { value: 'RATING', label: '별점' },
  { value: 'IMAGE_CHOICE', label: '이미지 선택' },
  { value: 'NUMBER', label: '숫자' },
  { value: 'DATE', label: '날짜' },
  { value: 'EMAIL', label: '이메일' },
  { value: 'FILE_UPLOAD', label: '파일 업로드' },
];

export interface Option {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  required: boolean;
  options?: Option[];
  hasEtcOption?: boolean;
  fileTypes?: FileType[];
}

export interface FormData {
  title: string;
  tag: string;
  maxParticipants: number;
  deadline: string;
  isPrivate: boolean;
  questions: Question[];
}

// interface BaseQuestionConfig {
//   type: QuestionType;
//   title: string;
//   required: boolean;
// }

// interface OptionBasedConfig extends BaseQuestionConfig {
//   options: Array<{
//     value: string;
//     label: string;
//     imageUrl?: string;
//   }>;
//   hasOtherOption?: boolean;
// }

// interface RangeConfig extends BaseQuestionConfig {
//   min: number;
//   max: number;
//   minLabel?: string;
//   maxLabel?: string;
// }

// interface FileUploadConfig extends BaseQuestionConfig {
//   allowTypes: ('image' | 'pdf' | 'spreadsheet')[];
//   maxSize: number;
// }

// export type QuestionConfig =
//   | (BaseQuestionConfig & { type: 'SHORT_ANSWER' | 'LONG_ANSWER' | 'NUMBER' | 'DATE' | 'EMAIL' })
//   | (OptionBasedConfig & { type: 'CHECKBOX' | 'RADIO' | 'DROPDOWN' | 'IMAGE_CHOICE' })
//   | (RangeConfig & { type: 'RANGE' })
//   | (FileUploadConfig & { type: 'FILE_UPLOAD' });
