import { useNavigate } from 'react-router-dom';

export default function MenuModal() {
  const navigate = useNavigate();
  const moveToProfile = () => {
    navigate('/profile');
  };
  return (
    <div className="absolute top-[70px] right-[38px] w-[120px] bg-pollloop-light-beige py-2 items-start rounded-lg text-sm font-gothic shadow-[0_2px_10px_0_rgba(0,0,0,0.3)]">
      <ul>
        <li className="px-4 py-2 hover:cursor-pointer" onClick={moveToProfile}>
          프로필
        </li>
        <li className="px-4 py-2 text-status-red-text hover:cursor-pointer">로그아웃</li>
      </ul>
    </div>
  );
}
