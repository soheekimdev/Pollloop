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

// forms.types.ts
export type FormListResponse = FormListItem[];

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
  onPublish: () => Promise<CreateFormResponse>;
}

export interface FormQuestionSectionProps {
  selectedQuestion: Question | undefined;
  onQuestionTypeChange: (type: QuestionType) => void;
  onQuestionUpdate: (id: string, updates: Partial<Question>) => void;
  onAddQuestion: () => void;
}

export interface SubmitQuestion {
  layout_type: QuestionType;
  question: string;
  question_order: number;
  is_required: boolean;
  options_of_questions: Option[];
}

export interface CreateFormResponse {
  uuid: string;
  access_code?: string;
}

export interface SubmitFormRequest {
  uuid: string;
  questions: SubmitQuestion[];
}

export interface SubmitOption {
  option_number: number;
  option_context: string;
}

export interface SubmitQuestionBase {
  layout_type: QuestionType;
  question: string;
  question_order: number;
  is_required: boolean;
  options_of_questions: Option[];
}

export interface SubmitFormRequest {
  uuid: string;
  questions: SubmitQuestionBase[];
}

// 답변 옵션 타입
export interface AnswerOption {
  optionNumber: number;
  context: string;
}

// 개별 답변 타입
export interface Answer {
  type: QuestionType;
  value: string | AnswerOption | AnswerOption[];
}

// 전체 답변 타입 (key는 question_order)
export type Answers = Record<number, Answer>;

// 이미 있는 타입들 중 SubmitOption 수정
export interface SubmitOption {
  option_number: number;
  option_context: string;
}

// Answer 컴포넌트들의 공통 Props 타입
export interface BaseAnswerProps {
  data: Question;
  disabled?: boolean;
  readOnly?: boolean;
}

// 각 Answer 컴포넌트별 특화된 Props 타입
export interface TextAnswerProps extends BaseAnswerProps {
  value?: string;
  onChange: (type: QuestionType, value: string) => void;
}

export interface OptionAnswerProps extends BaseAnswerProps {
  value?: AnswerOption;
  onChange: (type: QuestionType, value: AnswerOption) => void;
}

export interface MultiOptionAnswerProps extends BaseAnswerProps {
  value?: AnswerOption[];
  onChange: (type: QuestionType, value: AnswerOption[]) => void;
}

export interface FileAnswerProps extends BaseAnswerProps {
  value?: string;
  onChange: (type: QuestionType, value: string) => void;
  formTitle: string;
}
