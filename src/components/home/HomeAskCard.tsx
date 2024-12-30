import { Link } from 'react-router-dom';
import AskStatusBadge from '../status-badge/AskStatusBadge';
import { useState } from 'react';
import { Copy } from 'lucide-react';

interface HomeAskCardProps {
  title: string;
  ask_id: number;
  tag: string;
  is_closed: boolean;
  access_code: string;
}
export default function HomeAskCard({
  title,
  ask_id,
  tag,
  is_closed,
  access_code,
}: HomeAskCardProps) {
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
    <li className="w-full h-[88px] rounded-2xl p-6 bg-pollloop-light-beige">
      <Link to={`/asks/${ask_id}`} className="flex items-center justify-between w-full h-full">
        <AskStatusBadge is_closed={is_closed} />
        <div className="flex items-center flex-1 min-w-0 gap-2">
          <h3 className="min-w-0 mx-2 overflow-hidden text-ellipsis whitespace-nowrap">{title}</h3>
          <p className="shrink-0 px-2 py-1 text-[13px] bg-tag-default-bg rounded-md">{tag}</p>
        </div>
        {!is_closed &&
          (isDisplayed ? (
            <button
              onClick={handleCopy}
              className="items-center gap-2 hidden md:flex shrink-0 ml-10 px-4 py-2 text-[15px] rounded-lg bg-button-ghost-bg-active/15 "
            >
              {access_code} <Copy size={16} />
            </button>
          ) : (
            <button
              onClick={handleDisplay}
              className="hidden md:block shrink-0 ml-10 px-4 py-2 text-[13px] rounded-lg bg-button-secondary-bg text-pollloop-light-beige"
            >
              비밀번호 확인하기
            </button>
          ))}
      </Link>
    </li>
  );
}
