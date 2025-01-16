import kakaoLogo from '@/assets/kakao_logo.svg';
export default function KakaoLoginButton() {
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;

  const hadleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };
  return (
    <button
      onClick={hadleKakaoLogin}
      type="button"
      className="flex justify-center items-center gap-2 w-full h-10 bg-[#FEE500] px-4 py-2 rounded-lg"
    >
      <img src={kakaoLogo} alt="카카오 로고" className="w-5 h-5" />
      <p className="text-[#000000] text-opacity-85 text-sm">카카오 로그인</p>
    </button>
  );
}
