import KakaoLoginButton from '@/components/auth/KakaoLoginButton';
import Input from '@/components/form/Input';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLoginDivider from '@/components/auth/SocialLoginDivider';
import LogoWithTitle from '@/components/common/LogoWithTitle';
import FormActionButton from '@/components/auth/FormActionButton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/store/userSlice';
import { AppDispatch, RootState } from '@/store';
import { LoginFormValue, loginSchema } from '@/schemas/auth';
import { errorToast } from '@/utils/toast';

export default function Login() {
  const { status } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValue>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormValue) => {
    try {
      await dispatch(loginUser({ email: data.email, password: data.password })).unwrap();
      const from = location.state?.from || '/';
      navigate(from);
    } catch (error: any) {
      console.error('로그인 실패', error);
      errorToast(error);
    }
  };

  return (
    <div className="w-full sm:w-cardWidth flex flex-col gap-10 items-center bg-pollloop-light-beige text-pollloop-brown-01 p-10 rounded-2xl">
      <LogoWithTitle title="로그인" />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-10">
        <div className="w-full flex flex-col gap-4">
          <InputWithLabel>
            <Label htmlFor="email" text="아이디" />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register('email')}
              error={errors.email?.message}
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
            <p className="text-sm underline self-end">
              <Link to="/password">비밀번호 찾기/재설정</Link>
            </p>
          </InputWithLabel>
        </div>
        <FormActionButton
          submitButtonText={status === 'loading' ? '로그인 중...' : '로그인'}
          linkButtonText="회원가입"
          path="/register"
          disabled={status === 'loading'}
        />
      </form>
      <SocialLoginDivider />
      <KakaoLoginButton />
    </div>
  );
}
