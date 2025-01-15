import { AskDetails, FormDetails } from '../../../types/home/home.types';
import HomeAskCard from '../HomeAskCard';
import HomeFormCard from '../HomeFormCard';
import { CreateItemButtonSm } from './CreateItemButtonSmall';

interface ItemListProps {
  items: Array<FormDetails | AskDetails>;
  createLink: string;
  buttonText: string;
}

export function ItemList({ items, createLink, buttonText }: ItemListProps) {
  const isForm = (item: FormDetails | AskDetails): item is FormDetails => {
    return 'target_count' in item;
  };

  // 첫 번째 아이템으로 타입을 확인
  const isFormList = items.length > 0 && isForm(items[0]);

  return (
    <ul className="flex flex-wrap w-full h-full gap-4">
      {/* HeaderComponent는 FormDetails 타입일 때만 렌더링 */}
      {isFormList && <CreateItemButtonSm createLink={createLink} buttonText={buttonText} />}

      {items.map(item =>
        isForm(item) ? (
          <HomeFormCard key={item.uuid} item={item} />
        ) : (
          <HomeAskCard key={item.id} item={item} />
        ),
      )}
    </ul>
  );
}
