import { QUESTION_COMPONENTS } from '../constants/form-details';
import { QuestionType } from '../types/forms/forms.types';

export type FormResultType =
  | ShortResultType
  | LongResultType
  | CheckboxResultType
  | RadioResultType
  | DropdownResultType
  | RangeResultType
  | StarRatingResultType
  | ImageSelectResultType
  | NumberResultType
  | DateResultType
  | EmailResultType
  | FileUploadResultType;

export type LayoutType = keyof typeof QUESTION_COMPONENTS;

// 폼 기본 상세정보 타입 정의
export interface OverviewData {
  user: number;
  uuid: string;
  title: string;
  tag?: string;
  subtitle: string;
  form_description: string;
  create_at: string;
  end_at: string;
  user_count: number;
  completed_count: number;
  target_count: number;
  is_closed: 'OPEN' | 'CLOSED';
  is_private: boolean;
  access_code: string;
}

// 폼 요약정보 타입 정의

export interface SummaryData {
  uuid: string;
  title: string;
  data: QuestionResultType[];
}

export interface ShortResultType {
  value: string;
}

export interface LongResultType {
  value: string;
}

export interface CheckboxResultType {
  label: string;
  values?: string[];
  count: number;
}

export interface RadioResultType {
  label: string;
  values?: string[];
  count: number;
}

export interface DropdownResultType {
  label: string;
  values?: string[];
  count: number;
}

export interface RangeResultType {
  label: number;
  count: number;
}

export interface StarRatingResultType {
  label: number;
  count: number;
}

export interface ImageSelectResultType {
  label: string;
  count: number;
}

export interface NumberResultType {
  value: number;
}

export interface DateResultType {
  value: string;
}

export interface EmailResultType {
  value: string;
}

export interface FileUploadResultType {
  value: string;
}

export interface QuestionResultType {
  id: number;
  layout_type: QuestionType;
  is_required: boolean;
  min_label?: string;
  max_label?: string;
  question: string;
  results: FormResultType[];
}

// 참여자 정보 타입 정의
export interface FormParticipant {
  email: string;
  is_complete: boolean;
}

export interface ParticipantsResponse {
  data: FormParticipant[];
  message?: string;
}

export interface SendRequestResponse {
  success: boolean;
  message: string;
}