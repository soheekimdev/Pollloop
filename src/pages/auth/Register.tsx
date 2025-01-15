import KakaoLoginButton from '@/components/auth/KakaoLoginButton';
import Input from '@/components/form/Input';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import SocialLoginDivider from '@/components/auth/SocialLoginDivider';
import LogoWithTitle from '@/components/common/LogoWithTitle';
import FormActionButton from '@/components/auth/FormActionButton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@/store/userSlice';
import { AppDispatch, RootState } from '@/store';
import { RegisterFormValue, registerSchema } from '@/schemas/auth';
import { errorToast, successToast } from '@/utils/toast';

export default function Register() {
  const { status } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValue>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormValue) => {
    try {
      const response = await dispatch(
        registerUser({
          email: data.email,
          password: data.password,
          password2: data.confirmPassword,
        }),
      ).unwrap();
      successToast(response.message);
      navigate('/login');
    } catch (error: any) {
      console.error('회원가입 실패', error);
      errorToast(error);
    }
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
              error={errors.email?.message}
              {...register('email')}
            />
          </InputWithLabel>
          <InputWithLabel>
            <Label htmlFor="password" text="비밀번호" />
            <Input
              id="password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
            />
          </InputWithLabel>
          <InputWithLabel>
            <Label htmlFor="confirmPassword" text="비밀번호 확인" />
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
          </InputWithLabel>
        </fieldset>
        <FormActionButton
          submitButtonText={status === 'loading' ? '회원가입 중...' : '회원가입'}
          linkButtonText="로그인"
          path="/login"
          disabled={status === 'loading'}
        />
      </form>
      <SocialLoginDivider />
      <KakaoLoginButton />
    </div>
  );
}
