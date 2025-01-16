export type FormStatus = 'OPEN' | 'CLOSED' | 'TEMP';
export type AskStatus = 'OPEN' | 'CLOSED';

export interface FormDetails {
  title: string;
  tag?: string;
  create_at: string;
  end_at: string;
  is_closed: FormStatus;
  access_code?: string;
  uuid: string;
  target_count: number;
  completed_count: number;
  is_private: boolean;
  is_bookmark: boolean;
}

export interface AskDetails {
  author_id: number;
  id: number;
  title: string;
  tag: string;
  is_closed: boolean; // 나중에 백엔드에서 AskStatus 형식으로 줄 수도 있음 (체크)
  access_code: string;
}

export interface HomeUserData {
  forms: FormDetails[];
  asks: AskDetails[];
}

export interface HomeCategoryProps {
  title: string; // 카테고리 제목
  buttonText: string; // 버튼 이름
  items: FormDetails[] | AskDetails[]; // 카테고리 아이템 리스트
  moreLink?: string; // 더보기 링크
  createLink: string; // 폼 생성 버튼 링크
}
