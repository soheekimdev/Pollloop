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
      errorToast(error.message || '회원가입에 실패했습니다.');
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
              {...register('email')}
            />
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
          </InputWithLabel>
          <InputWithLabel>
            <Label htmlFor="confirmPassword" text="비밀번호 확인" />
            <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
            {errors.confirmPassword && (
              <p className="mt-2 text-xs text-status-red-text">{errors.confirmPassword.message}</p>
            )}
          </InputWithLabel>
        </fieldset>
        <FormActionButton submitButtonText="회원가입" linkButtonText="로그인" path="/login" />
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
