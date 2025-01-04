import { FILE_TYPES } from '@/constants/forms';

export type FileType = (typeof FILE_TYPES)[number]['value'];

export type QuestionType =
  | '단답형'
  | '장문형'
  | '체크박스'
  | '라디오'
  | '드롭다운'
  | '범위선택'
  | '별점'
  | '이미지선택'
  | '숫자'
  | '날짜'
  | '이메일'
  | '파일업로드';

export interface Question {
  id: string;
  layout_type: QuestionType;
  question: string;
  question_order: number;
  is_required: boolean;
  options_of_questions?: Array<{
    option_number: string;
    option_context: string;
  }>;
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

export interface FormInfo {
  user?: number;
  title: string;
  tag?: string;
  create_at?: string;
  end_at: string;
  is_closed: boolean;
  access_code?: string;
  subtitle?: string;
  form_description?: string;
  uuid?: string;
}
