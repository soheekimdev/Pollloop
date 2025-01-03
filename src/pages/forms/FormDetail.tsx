import Breadcrumbs from '../../components/common/Breadcrumbs';
import Button from '../../components/common/Button';
import Participants from '../../components/details/Participants';
import Summary from '../../components/details/Summary';
import useTabs from '../../hooks/useTabs';

interface overviewDataProps {
  title: string;
  completion: number;
  target_entries: number;
  entries: number;
  submissions: number;
}

interface tabInfoType {
  tabName: string;
  content: JSX.Element;
}

const overviewData: overviewDataProps = {
  title: '오즈_만족도조사_6기_14주',
  completion: 0.98,
  target_entries: 100,
  entries: 100,
  submissions: 98,
};

const tabInfo: tabInfoType[] = [
  {
    tabName: '요약',
    content: <Summary />,
  },
  {
    tabName: '참여자 목록',
    content: <Participants />,
  },
];

export default function FormDetail() {
  const statisticsItems = [
    { key: '완료율', value: overviewData.completion },
    { key: '입장', value: overviewData.target_entries },
    { key: '시작', value: overviewData.entries },
    { key: '제출', value: overviewData.submissions },
  ];

  const { activeIndex, activeTab, changeTab } = useTabs(0, tabInfo);
  return (
    <div className="flex flex-col gap-4 px-10">
      <Breadcrumbs items={['홈', '나의 홈', '프론트엔드 6기 만족도 조사 1주차']} />

      <div className="relative flex flex-col w-full gap-10 p-10 bg-pollloop-bg-02 rounded-2xl">
        <Button variant="primary" size="md" className="absolute w-40 top-10 right-10 ">
          참여 링크 공유하기
        </Button>
        <h2 className="font-semibold text-[22px]">{overviewData.title}</h2>
        <section className="flex flex-col gap-4">
          <h3 className="font-semibold text-[22px]">통계</h3>
          <div className="flex gap-8">
            {statisticsItems.map(item => (
              <div key={item.key}>
                <p className="text-lg font-normal">{item.key}</p>
                <span className="text-pollloop-brown-03 font-extrabold text-[40px] leading-none">
                  {item.key === '완료율' ? `${item.value * 100}%` : item.value}
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-6">
          <div className="flex gap-4">
            {tabInfo.map((info, index) => (
              <button
                key={info.tabName}
                onClick={() => changeTab(index)}
                className={`font-semibold text-[22px] ${
                  activeIndex === index
                    ? 'text-pollloop-brown-01 underline underline-offset-8'
                    : 'text-pollloop-brown-01/60'
                }`}
              >
                {info.tabName}
              </button>
            ))}
          </div>

          <div className="w-full">{activeTab.content}</div>
        </section>
      </div>
    </div>
  );
}
