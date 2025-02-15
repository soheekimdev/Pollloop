import { Link } from 'react-router-dom';
import AskStatusBadge from '../common/status-badge/AskStatusBadge';
import { AskDetails } from '../../types/home/home.types';
import AccessCodeSection from './parts/AccessCodeSection';
import { useAccessCode } from '../../hooks/useAccessCode';

interface HomeAskCardProps {
  item: AskDetails;
}

export default function HomeAskCard({ item }: HomeAskCardProps) {
  const { title, tag, is_closed, access_code } = item;
  const { isDisplayed, handleDisplay } = useAccessCode();

  const ASK_STATUS = is_closed ? '종료된' : '진행 중인';

  return (
    <li
      className="hover:border-pollloop-orange hover:shadow-primary w-full min-h-[88px] rounded-2xl p-6 bg-pollloop-light-beige"
      role="article"
    >
      <Link
        to="#"
        className="flex items-center h-full"
        aria-label={`${title} - ${ASK_STATUS} 애스크${access_code ? ', 비공개' : ''}`}
      >
        <div
          className="flex flex-col flex-1 gap-2 overflow-hidden md:flex-row"
          aria-label="애스크 정보"
        >
          <AskStatusBadge
            is_closed={is_closed}
            className="flex-shrink-0 h-full"
            aria-label={`상태: ${ASK_STATUS}`}
          />
          <h3 className="flex-1 max-w-fit line-clamp-1">{title}</h3>
          <p
            className="px-2 py-1 rounded-md w-fit md:max-w-[200px] line-clamp-1 text-13 bg-tag-default-bg"
            role="status"
            aria-label={`태그: ${tag}`}
          >
            {tag}
          </p>
        </div>
        <AccessCodeSection
          buttonText="비밀번호 확인하기"
          is_closed={is_closed ? 'CLOSED' : 'OPEN'}
          isDisplayed={isDisplayed}
          access_code={access_code}
          onDisplay={handleDisplay}
        />
      </Link>
    </li>
  );
}
