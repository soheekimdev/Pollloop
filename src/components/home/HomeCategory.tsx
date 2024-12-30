import { ChevronRight, CirclePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import HomeFormCard from './HomeFormCard';
import HomeAskCard from './HomeAskCard';

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

interface HomeCategoryProps {
  title: string; // 카테고리 제목
  buttonText: string; // 버튼 이름
  items: Form[] | Ask[]; // 카테고리 아이템 리스트
  moreLink: string; // 더보기 링크
  createLink: string; // 생성 버튼 링크
}

export default function HomeCategory({
  title,
  buttonText,
  items,
  moreLink,
  createLink,
}: HomeCategoryProps) {
  const isForm = (item: Form | Ask): item is Form => {
    return 'target_count' in item && 'end_at' in item && 'status' in item;
  };

  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-center justify-between h-7">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link className="flex items-center text-sm" to={moreLink}>
          <span>더보기</span>
          <ChevronRight size={14} />
        </Link>
      </header>
      <div className="w-full">
        {items.length > 0 ? (
          <ul className="flex flex-wrap w-full h-full gap-4 [&>*]:shrink-0 [&>*]:grow-0">
            {items.map(item => {
              if (isForm(item)) {
                return (
                  <HomeFormCard
                    key={item.id}
                    form_id={item.id}
                    status={item.status}
                    title={item.title}
                    tag={item.tag}
                    target_count={item.target_count}
                    actual_count={item.actual_count}
                    end_at={item.end_at}
                  />
                );
              }

              return (
                <HomeAskCard
                  key={item.id}
                  ask_id={item.id}
                  title={item.title}
                  tag={item.tag}
                  is_closed={item.is_closed}
                  access_code={item.access_code}
                />
              );
            })}
          </ul>
        ) : (
          <Link to={createLink}>
            <button className="flex items-center justify-center w-full h-[200px] gap-1 bg-pollloop-light-beige bg-opacity-55 rounded-2xl hover:bg-pollloop-light-beige">
              <CirclePlus size={18} />
              <span>{buttonText}</span>
            </button>
          </Link>
        )}
      </div>
    </section>
  );
}
