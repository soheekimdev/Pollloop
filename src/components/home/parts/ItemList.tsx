import { AskDetails, FormDetails } from '../../../types/home/home.types';
import HomeAskCard from '../HomeAskCard';
import HomeFormCard from '../HomeFormCard';

interface ItemListProps {
  items: Array<FormDetails | AskDetails>;
}

export function ItemList({ items }: ItemListProps) {
  const isForm = (item: FormDetails | AskDetails): item is FormDetails => {
    return 'target_count' in item;
  };

  return (
    <ul className="flex flex-wrap w-full h-full gap-4">
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
