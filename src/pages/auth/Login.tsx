import KakaoLoginButton from '@/components/auth/KakaoLoginButton';
import Input from '@/components/form/Input';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import { Link } from 'react-router-dom';
import SocialLoginDivider from '@/components/auth/SocialLoginDivider';
import LogoWithTitle from '@/components/common/LogoWithTitle';
import FormActionButton from '@/components/auth/FormActionButton';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty('이메일을 입력해주세요.')
    .email('유효한 이메일 형식이 아닙니다.'),
  password: z.string().nonempty('비밀번호를 입력해주세요.'),
});

type LoginFormValue = z.infer<typeof loginSchema>;
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValue>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: LoginFormValue) => {
    alert('로그인 성공!');
    console.log('로그인 성공!', data);
  };

  return (
    <div className="w-[400px] flex flex-col gap-10 items-center bg-pollloop-light-beige text-pollloop-brown-01 p-10 rounded-2xl">
      <LogoWithTitle title="로그인" />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-10">
        <fieldset className="w-full flex flex-col gap-4">
          <InputWithLabel>
            <Label htmlFor="email" text="아이디" />
            <Input id="email" type="email" placeholder="name@example.com" {...register('email')} />
            {errors.email && (
              <p className="mt-2 text-xs text-status-red-text">{errors.email.message}</p>
            )}
          </InputWithLabel>
          <InputWithLabel>
            <Label htmlFor="password" text="비밀번호" />
            <Input id="password" type="password" {...register('password')} />
            {errors.password && (
              <p className="mt-2 text-xs text-status-red-text">{errors.password.message}</p>
            )}
            <p className="text-sm underline self-end">
              <Link to="/password">비밀번호 찾기</Link>
            </p>
          </InputWithLabel>
        </fieldset>
        <FormActionButton submitButtonText="로그인" linkButtonText="회원가입" path="/register" />
      </form>
      <SocialLoginDivider />
      <KakaoLoginButton />
    </div>
  );
}
