import { authAPI } from '@/api/auth';
import FormActionButton from '@/components/auth/FormActionButton';
import LogoWithTitle from '@/components/common/LogoWithTitle';
import Input from '@/components/form/Input';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import { FindPasswordFormValue, findPasswordSchema } from '@/schemas/auth';
import { errorToast, successToast } from '@/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function RequestPasswordReset() {
  const [isLoading, setIsloading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindPasswordFormValue>({
    resolver: zodResolver(findPasswordSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FindPasswordFormValue) => {
    setIsloading(true);
    try {
      const response = await authAPI.requestPasswordReset(data.email);
      successToast(response.message);
    } catch (error: any) {
      console.log('비밀번호 재설정 요청 실패:', error);
      errorToast(error.error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="w-[400px] flex flex-col items-center bg-pollloop-light-beige text-pollloop-brown-01 p-10 rounded-2xl gap-10">
      <LogoWithTitle title="비밀번호 찾기" />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-10">
        <fieldset>
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
        </fieldset>
        <FormActionButton
          submitButtonText={isLoading ? '이메일 전송 중...' : '이메일로 찾기/재설정'}
          linkButtonText="로그인"
          path="/login"
          disabled={isLoading}
        />
      </form>
    </div>
  );
}
