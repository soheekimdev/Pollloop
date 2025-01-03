import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Copy } from 'lucide-react';
import AskStatusBadge from '../common/status-badge/AskStatusBadge';
import Button from '../common/Button';

interface Ask {
  author_id: number;
  id: number;
  title: string;
  tag: string;
  is_closed: boolean;
  access_code: string;
}

interface HomeAskCardProps {
  item: Ask;
}

export default function HomeAskCard({ item }: HomeAskCardProps) {
  const { id: ask_id, title, tag, is_closed, access_code } = item;
  const [isDisplayed, setIsDisplayed] = useState(false);

  const handleDisplay = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDisplayed(true);
  };

  const handleCopy = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    navigator.clipboard.writeText(access_code);
    window.alert('비밀번호가 복사되었습니다. 토스트팝업 예정');
  };

  return (
    <li className="w-full min-h-[88px] rounded-2xl p-6 bg-pollloop-light-beige">
      <Link to={`/asks/${ask_id}`} className="flex items-center h-full">
        <div className="flex flex-col flex-1 gap-2 overflow-hidden md:flex-row">
          <AskStatusBadge is_closed={is_closed} className="flex-shrink-0 h-full" />
          <h3 className="flex-1 max-w-fit line-clamp-1">{title}</h3>
          <p className="px-2 py-1 rounded-md w-fit md:max-w-[200px] line-clamp-1 text-13 bg-tag-default-bg">
            {tag}
          </p>
        </div>
        {!is_closed &&
          (isDisplayed ? (
            <button
              onClick={handleCopy}
              className="ml-5 w-fit h-10 flex gap-2 items-center px-4 py-2 text-[15px] rounded-lg bg-button-ghost-bg-active/15 "
            >
              {access_code} <Copy size={16} />
            </button>
          ) : (
            <Button size="md" variant="secondary" onClick={handleDisplay} className="ml-5 w-fit ">
              비밀번호 확인하기
            </Button>
          ))}
      </Link>
    </li>
  );
}
