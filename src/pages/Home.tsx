// 타입은 추후 소희님 폼 생성하시는 것과 연동 예정
import HomeCategory from '../components/home/HomeCategory';

interface Form {
  author_id: number;
  id: number;
  title: string;
  tag: string;
  end_at: string;
  status: '발행' | '종료' | '임시 저장';
  target_count: number;
  actual_count: number;
}

interface Ask {
  author_id: number;
  id: number;
  title: string;
  tag: string;
  is_closed: boolean;
  access_code: string;
}

interface HomeData {
  forms: Form[];
  asks: Ask[];
}

const homeData: HomeData = {
  forms: [
    {
      author_id: 111,
      id: 124,
      title:
        '오즈_만족도조사_6기_14주 오즈_만족도조사_6기_14주 오즈_만족도조사_6기_14주 오즈_만족도조사_6기_14주',
      tag: '6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도',
      end_at: '20260116',
      status: '발행',
      target_count: 100,
      actual_count: 56,
    },
    {
      author_id: 111,
      id: 125,
      title: '오즈_만족도조사_6기_15주',
      tag: '6기만족도',
      end_at: '20250116',
      status: '발행',
      target_count: 100,
      actual_count: 56,
    },
    {
      author_id: 111,
      id: 131,
      title: '오즈_만족도조사_6기_16주',
      tag: '6기만족도6기만족도6기만족도',
      end_at: '20250116',
      status: '종료',
      target_count: 100,
      actual_count: 94,
    },
  ],
  asks: [
    {
      author_id: 111,
      id: 211,
      title: '첫 번째 애스크의 타',
      tag: '6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도',
      is_closed: false,
      access_code: 'ABC123',
    },
    {
      author_id: 111,
      id: 212,
      title:
        'Ask2Ask2Ask2Ask2Ask2Ask2Ask2Ask2Ask2Ask2Ask2Ask2Ask2Ask2Ask2Ask2Ask2Ask2Ask2Ask2Ask2Ask2Ask2Ask2Ask2Ask2Ask2',
      tag: '6기',
      is_closed: false,
      access_code: 'ABC123',
    },
    {
      author_id: 111,
      id: 222,
      title:
        'Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5Ask5',
      tag: '6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도',
      is_closed: true,
      access_code: 'ABC123',
    },
    {
      author_id: 111,
      id: 231,
      title: 'Ask7',
      tag: '6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도6기만족도',
      is_closed: true,
      access_code: 'ABC123',
    },
  ],
};

export default function Home() {
  return (
    <div className=" bg-pollloop-bg-03">
      <div className="m-auto w-full max-w-[1440px] min-w-[360px] px-8 flex flex-col gap-12">
        <article className="bg-white border h-28 border-1">
          <p>매우 멋진 텍스트</p>
        </article>
        <HomeCategory
          title="최근 폼"
          buttonText="새로운 폼을 만들어 보세요"
          items={homeData.forms}
          moreLink="/forms"
          createLink="/forms/create"
        />
        <HomeCategory
          title="최근 애스크"
          buttonText="새로운 애스크를 만들어 보세요"
          items={homeData.asks}
          moreLink="/asks"
          createLink="/asks/create"
        />
      </div>
    </div>
  );
}
