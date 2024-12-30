import FormActionButton from '@/components/auth/FormActionButton';
import LogoWithTitle from '@/components/common/LogoWithTitle';
import Input from '@/components/form/Input';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';

export default function PasswordRetrieval() {
  return (
    <div className="w-[400px] flex flex-col items-center bg-pollloop-light-beige text-pollloop-brown-01 p-10 rounded-2xl gap-10">
      <LogoWithTitle title="비밀번호 찾기" />
      <form className="w-full">
        <fieldset>
          <InputWithLabel>
            <Label text="아이디" />
            <Input type="email" placeholder="name@example.com" />
          </InputWithLabel>
        </fieldset>
      </form>
      <FormActionButton submitButtonText="이메일로 찾기" linkButtonText="로그인" path="/login" />
    </div>
  );
}
