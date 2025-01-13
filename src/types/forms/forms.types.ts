// 기본 타입 정의
export type FileType = 'image' | 'pdf' | 'spreadsheet';

export type QuestionType =
  | 'SHORT_TYPE'
  | 'LONG_TYPE'
  | 'CHECKBOX_TYPE'
  | 'RADIO_TYPE'
  | 'DROPDOWN_TYPE'
  | 'RANGE_TYPE'
  | 'STAR_RATING_TYPE'
  | 'IMAGE_SELECT_TYPE'
  | 'NUMBER_TYPE'
  | 'DATE_TYPE'
  | 'EMAIL_TYPE'
  | 'FILE_UPLOAD_TYPE';

export type FormStatus = 'TEMP' | 'OPEN' | 'CLOSED';

// 데이터 모델 인터페이스
export interface Option {
  option_number: number;
  option_context: string;
  imageUrl?: string;
  isEtcOption?: boolean;
}

export interface Question {
  id: string;
  layout_type: QuestionType;
  question: string;
  question_order: number;
  is_required: boolean;
  options_of_questions: Option[];
  _frontend?: {
    hasEtcOption?: boolean;
    fileType?: FileType;
    minLabel?: string;
    maxLabel?: string;
  };
}

export interface FormInfo {
  user?: number;
  title: string;
  tag?: string;
  create_at?: string;
  end_at: string;
  is_closed?: FormStatus;
  target_count: number;
  is_bookmark?: boolean;
  is_private: boolean;
  access_code?: string;
  subtitle?: string;
  form_description?: string;
  questions: Question[];
}

// 폼 목록 인터페이스
export interface FormListItem extends Pick<FormInfo, 
  'title' | 
  'tag' |
  'create_at' |
  'end_at' |
  'is_closed' |
  'access_code' |
  'target_count' |
  'is_private' |
  'is_bookmark'
> {
  uuid: string;
  completed_count: number;
}

export interface FormListResponse {
  forms: FormListItem[];
}

// 컴포넌트 Props 인터페이스
export interface FormSectionBaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface FormBasicSectionProps {
  formInfo: FormInfo;
  setFormInfo: React.Dispatch<React.SetStateAction<FormInfo>>;
  onPrivateToggle: (isChecked: boolean) => void;
}

export interface FormContentSectionProps {
  formInfo: FormInfo;
  questions: Question[];
  selectedQuestionId: string | null;
  onQuestionSelect: (id: string) => void;
  onQuestionDelete: (id: string) => void;
  onQuestionUpdate: (id: string, updates: Partial<Question>) => void;
  onFormInfoUpdate: (updates: Partial<FormInfo>) => void;
  onSave: () => void;
  onPublish: () => void;
}

export interface FormQuestionSectionProps {
  selectedQuestion: Question | undefined;
  onQuestionTypeChange: (type: QuestionType) => void;
  onQuestionUpdate: (id: string, updates: Partial<Question>) => void;
  onAddQuestion: () => void;
}
