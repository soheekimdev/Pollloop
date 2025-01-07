type FormStatus = 'CLOSED' | 'OPEN' | 'TEMP';

export interface OverviewData {
  user: number;
  uuid: string;
  title: string;
  tag: string;
  subtitle: string;
  form_description: string;
  create_at: string;
  end_at: string;
  user_count: number;
  completed_count: number;
  target_count: number;
  is_closed: FormStatus;
  is_private: boolean;
  access_code: string;
}

export interface SummaryData {
  id: number;
  title: string;
  questions: {
    id: number;
    type: string;
    question: string;
    results: any[];
  }[];
}

// 하단에 참여자 목록에서 사용될 데이터 타입 정의 (ParticipantsData)
