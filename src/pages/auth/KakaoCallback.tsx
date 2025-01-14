import { AppDispatch } from '@/store';
import { kakaoLoginUser } from '@/store/userSlice';
import { errorToast } from '@/utils/toast';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function KakaoCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleKakaoCallback = async () => {
      const code = new URL(window.location.href).searchParams.get('code');

      if (!code) {
        console.error('인증 코드가 없습니다.');
        navigate('/login');
        return;
      }

      try {
        await dispatch(kakaoLoginUser(code)).unwrap();
        console.log('카카오 로그인 성공');
        navigate('/');
      } catch (error) {
        console.error('카카오 로그인 실패:', error);
        errorToast('카카오 로그인에 실패했습니다.');
        navigate('/login');
      }
    };

    handleKakaoCallback();
  }, [dispatch, navigate]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  );
}
