import KakaoLoginButton from '@/components/auth/KakaoLoginButton';
import Input from '@/components/form/Input';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import SocialLoginDivider from '@/components/auth/SocialLoginDivider';
import LogoWithTitle from '@/components/common/LogoWithTitle';
import FormActionButton from '@/components/auth/FormActionButton';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const registerSchema = z
  .object({
    email: z
      .string()
      .trim()
      .nonempty('이메일을 입력해주세요.')
      .email('유효한 이메일 주소를 입력해주세요.'),
    password: z
      .string()
      .nonempty('비밀번호를 입력해주세요.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
        '영문,숫자,특수문자(!,@,#,$,%,&,*,?) 조합 8~25자리를 입력해주세요.',
      ),
    confirmPassword: z.string().nonempty('비밀번호 확인을 입력해주세요.'),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

type RegisterFormValue = z.infer<typeof registerSchema>;
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValue>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: RegisterFormValue) => {
    alert('회원가입 성공!');
    console.log('회원가입 성공!', data);
  };
  return (
    <div className="w-[400px] flex flex-col items-center bg-pollloop-light-beige p-10 rounded-2xl gap-10">
      <LogoWithTitle title="회원가입" />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-10">
        <fieldset className="w-full flex flex-col gap-4">
          <InputWithLabel>
            <Label htmlFor="email" text="아이디" />
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-2 text-xs text-status-red-text">{errors.email?.message}</p>
            )}
          </InputWithLabel>
          <InputWithLabel>
            <Label htmlFor="password" text="비밀번호" />
            <Input id="password" type="password" {...register('password')} />
            {errors.password && (
              <p className="mt-2 text-xs text-status-red-text">{errors.password?.message}</p>
            )}
          </InputWithLabel>
          <InputWithLabel>
            <Label htmlFor="confirmPassword" text="비밀번호 확인" />
            <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
            {errors.confirmPassword && (
              <p className="mt-2 text-xs text-status-red-text">{errors.confirmPassword?.message}</p>
            )}
          </InputWithLabel>
        </fieldset>
        <FormActionButton submitButtonText="회원가입" linkButtonText="로그인" path="/login" />
      </form>
      <SocialLoginDivider />
      <KakaoLoginButton />
    </div>
  );
}
