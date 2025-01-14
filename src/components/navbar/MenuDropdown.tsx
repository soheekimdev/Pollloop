import { AppDispatch } from '@/store';
import { logoutUser } from '@/store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../common/Dropdown';

interface MenuDropdownProps {
  setIsMenuOpen: (value: boolean) => void;
}

export default function MenuDropdown({ setIsMenuOpen }: MenuDropdownProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const moveToProfile = () => {
    navigate('/profile');
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate('/login');
    } catch (error) {
      console.error('로그아웃 실패', error);
    }
  };
  return (
    <Dropdown
      position={{ top: '70px', right: '38px' }}
      items={[
        { label: '프로필', onClick: moveToProfile },
        { label: '로그아웃', onClick: handleLogout, isDestructive: true },
      ]}
      onClose={() => setIsMenuOpen(false)}
    />
  );
}
