import Button from '@/components/common/Button';
import KakaoLoginButton from '@/components/auth/KakaoLoginButton';
import Input from '@/components/form/Input';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import { Link } from 'react-router-dom';
import SocialLoginDivider from '@/components/auth/SocialLoginDivider';
import LogoWithTitle from '@/components/common/LogoWithTitle';

export default function Register() {
  const handleSubmit = () => {};

  return (
    <div className="w-[400px] flex flex-col items-center bg-pollloop-light-beige text-pollloop-brown-01 p-10 rounded-2xl gap-10">
      <LogoWithTitle title="회원가입" />
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10">
        <fieldset className="w-full flex flex-col gap-4">
          <InputWithLabel>
            <Label text="아이디" />
            <Input type="email" placeholder="이메일을 입력해주세요" />
          </InputWithLabel>
          <InputWithLabel>
            <Label text="비밀번호" />
            <Input type="password" />
          </InputWithLabel>
          <InputWithLabel>
            <Label text="비밀번호 확인" />
            <Input type="password" />
          </InputWithLabel>
        </fieldset>
        <div className="w-full flex flex-col gap-4">
          <Button type="submit" size="md" variant="primary" fullWidth={true} className="text-sm">
            회원가입
          </Button>
          <p className="text-13 text-pollloop-orange text-center">
            <Link to="/login">로그인</Link>
          </p>
        </div>
      </form>

      <SocialLoginDivider />
      <KakaoLoginButton />
    </div>
  );
}
