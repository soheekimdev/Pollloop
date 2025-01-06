import { FILE_TYPES } from '@/constants/forms';

export type FileType = (typeof FILE_TYPES)[number]['value'];

export type QuestionType =
  | 'SHORT_TYPE' // 단답형
  | 'LONG_TYPE' // 장문형
  | 'CHECKBOX_TYPE' // 체크박스
  | 'RADIO_TYPE' // 라디오
  | 'DROPDOWN_TYPE' // 드롭다운
  | 'RANGE_TYPE' // 범위 선택
  | 'STAR_RATING_TYPE' // 별점
  | 'IMAGE_SELECT_TYPE' // 이미지 선택
  | 'NUMBER_TYPE' // 숫자
  | 'DATE_TYPE' // 날짜
  | 'EMAIL_TYPE' // 이메일
  | 'FILE_UPLOAD_TYPE'; // 파일 업로드

export interface Option {
  option_number: string;
  option_context: string;
  isEtcOption?: boolean;
  imageUrl?: string;
}

export interface Question {
  id: string;
  layout_type: QuestionType;
  question: string;
  question_order: number;
  is_required: boolean;
  options_of_questions?: Array<Option>;
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

export interface FormSectionBaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface FormBasicSectionProps {
  formInfo: FormInfo;
  setFormInfo: React.Dispatch<React.SetStateAction<FormInfo>>;
  isPrivateForm: boolean;
  onPrivateToggle: (isChecked: boolean) => void;
}

export interface FormContentSectionProps {
  formInfo: FormInfo;
  questions: Question[];
  selectedQuestionId: string | null;
  onQuestionSelect: (id: string) => void;
  onQuestionDelete: (id: string) => void;
  onQuestionUpdate: (id: string, updates: Partial<Question>) => void;
  onSave: () => void;
  onPublish: () => void;
}

export interface FormQuestionSectionProps {
  selectedQuestion: Question | undefined;
  onQuestionTypeChange: (type: QuestionType) => void;
  onQuestionUpdate: (id: string, updates: Partial<Question>) => void;
  onAddQuestion: () => void;
}
