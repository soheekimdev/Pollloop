export type FormStatus = '발행' | '종료' | '임시 저장';
export type AskStatus = '진행 중' | '종료';

export interface FormDetails {
  author_id: number;
  id: number;
  title: string;
  tag: string;
  end_at: string;
  status: FormStatus;
  target_count: number;
  actual_count: number;
}

export interface AskDetails {
  author_id: number;
  id: number;
  title: string;
  tag: string;
  is_closed: boolean;
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
  moreLink: string; // 더보기 링크
  createLink: string; // 폼 생성 버튼 링크
}
