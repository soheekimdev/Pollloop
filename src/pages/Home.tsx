import { useEffect, useState } from 'react';
import { fetchHomeData } from '../api/home';
import HomeCategory from '../components/home/HomeCategory';
import { HomeUserData } from '../types/home/home.types';
import MainLoader from '@/components/common/loaders/MainLoader';
import { useDelayedLoading } from '@/hooks/useDelayedLoading';

export default function Home() {
  const [homeData, setHomeData] = useState<HomeUserData>({ forms: [], asks: [] });
  const [isActuallyLoading, setIsActuallyLoading] = useState(true);

  // 커스텀 훅 사용
  const isLoading = useDelayedLoading({
    isActuallyLoading,
    minimumLoadingTime: 1000,
  });

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const data = await fetchHomeData();
        setHomeData(data);
      } catch (err) {
        console.error('데이터 로딩 중 에러:', err);
      } finally {
        setIsActuallyLoading(false);
      }
    };

    loadHomeData();
  }, []);

  // const testHomeData: HomeUserData = {
  //   forms: [
  //     {
  //       title: '설문조사 생성 테스트1',
  //       tag: '설문조사생성1 태그',
  //       create_at: '2025-01-08',
  //       end_at: '2025-01-31',
  //       is_closed: 'TEMP',
  //       access_code: '12345',
  //       uuid: '2bd64b2e1364441b9840020039906fe4',
  //       target_count: 30,
  //       completed_count: 18,
  //       is_private: true,
  //       is_bookmark: false,
  //     },
  //     {
  //       title: '설문조사 생성 테스트2',
  //       tag: '설문조사생성1 태그',
  //       create_at: '2025-01-08',
  //       end_at: '2025-01-31',
  //       is_closed: 'OPEN',
  //       access_code: '12345',
  //       uuid: 'e57fdf0f6a4f46a0b8d80956f13df3ea',
  //       target_count: 30,
  //       completed_count: 25,
  //       is_private: true,
  //       is_bookmark: false,
  //     },
  //     {
  //       title: '설문조사 생성 테스트3',
  //       tag: '설문조사생성1 태그',
  //       create_at: '2025-01-08',
  //       end_at: '2025-01-31',
  //       is_closed: 'CLOSED',
  //       access_code: '12345',
  //       uuid: '5adfd62e31074cab914b2c2ca04fa317',
  //       target_count: 3,
  //       completed_count: 2,
  //       is_private: true,
  //       is_bookmark: false,
  //     },
  //     {
  //       title: '설문조사 생성 테스트1',
  //       tag: '설문조사생성1 태그',
  //       create_at: '2025-01-09',
  //       end_at: '2025-01-31',
  //       is_closed: 'OPEN',
  //       access_code: '12345',
  //       uuid: '04a10147b8cc4ef991b483384086ab4b',
  //       target_count: 30,
  //       completed_count: 0,
  //       is_private: true,
  //       is_bookmark: false,
  //     },
  //   ],
  //   asks: [
  //     {
  //       author_id: 111,
  //       id: 211,
  //       title: '첫 번째 애스크',
  //       tag: '6기만족도',
  //       is_closed: false,
  //       access_code: 'ABC123',
  //     },
  //     {
  //       author_id: 111,
  //       id: 212,
  //       title: '두 번째 애스크',
  //       tag: '6기',
  //       is_closed: false,
  //       access_code: 'ABC123',
  //     },
  //     {
  //       author_id: 111,
  //       id: 222,
  //       title: '세 번째 애스크',
  //       tag: '6기만족도',
  //       is_closed: true,
  //       access_code: 'ABC123',
  //     },
  //   ],
  // };

  if (isLoading)
    return (
      <div className="flex-col gap-5 w-full h-[calc(100vh-96px)] flex items-center justify-center">
        <MainLoader />
      </div>
    );

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
