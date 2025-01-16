import { useEffect, useState } from 'react';
import { fetchHomeData } from '../api/home';
import HomeCategory from '../components/home/HomeCategory';
import { HomeUserData } from '../types/home/home.types';
import MainLoader from '@/components/common/loaders/MainLoader';
import { useDelayedLoading } from '@/hooks/useDelayedLoading';
import Footer from '@/components/home/Footer';

export default function Home() {
  const [homeData, setHomeData] = useState<HomeUserData>({ forms: [], asks: [] });
  const [isActuallyLoading, setIsActuallyLoading] = useState(true);

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

  if (isLoading)
    return (
      <div className="flex-col gap-5 w-full h-[calc(100vh-96px)] flex items-center justify-center pb-20">
        <MainLoader />
      </div>
    );

  return (
    <div className=" bg-pollloop-bg-03">
      <div className="m-auto w-full max-w-[1440px] min-w-[360px] px-8 flex flex-col gap-12 pb-10">
        <article className="bg-input-bg h-20 rounded-xl shadow-xl flex justify-center items-center font-bold text-xl relative">
          <div className="z-10 absolute left-[50%] bottom-0 bg-input-bg h-4 w-4 -translate-x-1/2 translate-y-1/2 rotate-45 transform"></div>
          <p className="animate-bounce text-3xl">💡</p>
          <p className="pr-5">오늘의 질문이 내일의 인사이트로</p>
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
        <Footer />
      </div>
    </div>
  );
}
