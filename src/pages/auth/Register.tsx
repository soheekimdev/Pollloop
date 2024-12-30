import KakaoLoginButton from '@/components/auth/KakaoLoginButton';
import Input from '@/components/form/Input';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import SocialLoginDivider from '@/components/auth/SocialLoginDivider';
import LogoWithTitle from '@/components/common/LogoWithTitle';
import FormActionButton from '@/components/auth/FormActionButton';

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
        <FormActionButton submitButtonText="회원가입" linkButtonText="로그인" path="/login" />
      </form>
      <SocialLoginDivider />
      <KakaoLoginButton />
    </div>
  );
}
