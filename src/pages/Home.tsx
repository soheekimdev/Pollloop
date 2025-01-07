import { useEffect, useState } from 'react';
import { fetchHomeData } from '../api/home';
import HomeCategory from '../components/home/HomeCategory';
import { HomeUserData } from '../types/home/home.types';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store';

export default function Home() {
  // const { user } = useSelector((state: RootState) => state);
  const [homeData, setHomeData] = useState<HomeUserData>({ forms: [], asks: [] });
  const [isLoading, setIsLoading] = useState(true);

  const USER_ID = 111;

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchHomeData(USER_ID);
        console.log('API 응답 데이터:', data);
        setHomeData(data);
      } catch (err) {
        console.error('데이터 로딩 중 에러:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadHomeData();
  }, [USER_ID]);

  if (isLoading) return <div>로딩 중..로딩 중..로딩 중..로딩 중..로딩 중..로딩 중..로딩 중...</div>; // 로딩 컴포넌트 추가 예정

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
