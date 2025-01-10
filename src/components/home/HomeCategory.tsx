import { HomeCategoryProps } from '../../types/home/home.types';
import { CategoryHeader } from './parts/CategoryHeader';
import { CreateItemButton } from './parts/CreateItemButton';
import { ItemList } from './parts/ItemList';

export default function HomeCategory({
  title,
  buttonText,
  items,
  moreLink,
  createLink,
}: HomeCategoryProps) {
  return (
    <section className="flex flex-col w-full gap-4">
      <CategoryHeader title={title} moreLink={moreLink} />
      <>
        {items.length === 0 ? (
          <CreateItemButton createLink={createLink} buttonText={buttonText} />
        ) : (
          <ItemList items={items} />
        )}
      </>
    </section>
  );
}
