import KakaoLoginButton from '@/components/auth/KakaoLoginButton';
import Input from '@/components/form/Input';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import { Link, useNavigate } from 'react-router-dom';
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
      navigate('/');
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

      {status === 'loading' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
}
