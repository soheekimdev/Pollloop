import { useEffect, useState } from 'react';
import { fetchHomeData } from '../api/home';
import HomeCategory from '../components/home/HomeCategory';
import { HomeUserData } from '../types/home/home.types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Tokens } from '../types/auth';

export default function Home() {
  const { user } = useSelector((state: RootState) => state);
  const [homeData, setHomeData] = useState<HomeUserData>({ forms: [], asks: [] });
  const [isLoading, setIsLoading] = useState(true);

  const userId = (user as { tokens: Tokens }).tokens.access;

  const testHomeData: HomeUserData = {
    forms: [
      {
        author_id: 111,
        id: 124,
        title: '오즈_만족도조사_6기_14주',
        tag: '6기만족도',
        end_at: '20260116',
        status: 'OPEN',
        target_count: 100,
        actual_count: 56,
      },
      {
        author_id: 111,
        id: 125,
        title: '오즈_만족도조사_6기_15주',
        tag: '6기만족도',
        end_at: '20250116',
        status: 'OPEN',
        target_count: 100,
        actual_count: 56,
      },
      {
        author_id: 111,
        id: 131,
        title: '오즈_만족도조사_6기_16주',
        tag: '6기만족도',
        end_at: '20250116',
        status: 'CLOSED',
        target_count: 100,
        actual_count: 94,
      },
    ],
    asks: [
      {
        author_id: 111,
        id: 211,
        title: '첫 번째 애스크',
        tag: '6기만족도',
        is_closed: false,
        access_code: 'ABC123',
      },
      {
        author_id: 111,
        id: 212,
        title: '두 번째 애스크',
        tag: '6기',
        is_closed: false,
        access_code: 'ABC123',
      },
      {
        author_id: 111,
        id: 222,
        title: '세 번째 애스크',
        tag: '6기만족도',
        is_closed: true,
        access_code: 'ABC123',
      },
    ],
  };

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setIsLoading(true);
        // const data = await fetchHomeData(userId);
        // console.log('API 응답 데이터:', data);
        // setHomeData(data);
        setHomeData(testHomeData);
      } catch (err) {
        console.error('데이터 로딩 중 에러:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadHomeData();
  }, [userId]);

  if (isLoading) return <div>로딩 중..로딩 중..로딩 중..로딩 중..로딩 중..로딩 중..로딩 중...</div>; // 로딩 컴포넌트 추가 예정

  return (
    <div className=" bg-pollloop-bg-03">
      <div className="m-auto w-full max-w-[1440px] min-w-[360px] px-8 flex flex-col gap-12 pb-10">
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
