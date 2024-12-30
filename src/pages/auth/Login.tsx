import Button from '@/components/common/Button';
import KakaoLoginButton from '@/components/auth/KakaoLoginButton';
import Input from '@/components/form/Input';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import { Link } from 'react-router-dom';
import SocialLoginDivider from '@/components/auth/SocialLoginDivider';
import LogoWithTitle from '@/components/common/LogoWithTitle';

export default function Login() {
  return (
    <div className="w-[400px] flex flex-col gap-10 items-center bg-pollloop-light-beige text-pollloop-brown-01 p-10 rounded-2xl">
      <LogoWithTitle title="로그인" />
      <form className="w-full flex flex-col gap-10">
        <fieldset className="w-full flex flex-col gap-4">
          <InputWithLabel>
            <Label text="아이디" />
            <Input type="email" placeholder="name@example.com" />
          </InputWithLabel>
          <InputWithLabel>
            <Label text="비밀번호" />
            <Input type="password" />
            <p className="text-sm underline self-end">
              <Link to="/">비밀번호 찾기</Link>
            </p>
          </InputWithLabel>
        </fieldset>
        <div className="w-full flex flex-col gap-4">
          <Button size="md" variant="primary" fullWidth={true} className="text-sm">
            로그인
          </Button>
          <p className="text-13 text-pollloop-orange text-center">
            <Link to="/register"> 회원가입</Link>
          </p>
        </div>
      </form>

      <SocialLoginDivider />
      <KakaoLoginButton />
    </div>
  );
}
