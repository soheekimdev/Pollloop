import Button from '@/components/common/Button';
import Input from '@/components/form/Input';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import { ResetPasswordFormValue, resetPasswordSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { authAPI } from '@/api/auth';
import { errorToast, successToast } from '@/utils/toast';
import { useState } from 'react';
import CircleLoader from '@/components/common/loaders/CircleLoader';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { uuid, token } = useParams();
  const [isLoading, setIsloading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValue>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ResetPasswordFormValue) => {
    setIsloading(true);

    try {
      if (!uuid || !token) {
        throw new Error('잘못된 요청입니다. UUID 또는 토큰이 없습니다.');
      }
      const response = await authAPI.resetPassword(
        uuid,
        token,
        data.password,
        data.confirmPassword,
      );
      successToast(response.message, {
        onClose: () => navigate('/login'),
      });
    } catch (error: any) {
      if (error?.non_field_errors && Array.isArray(error.non_field_errors)) {
        errorToast(error.non_field_errors[0]);
      } else if (error.error) {
        console.error('비밀번호 재설정 실패', error);
        errorToast(error.error);
      }
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="bg-pollloop-light-beige w-[400px] p-6 flex flex-col gap-6 rounded-2xl">
      <p className="text-lg font-semibold">비밀번호 재설정</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputWithLabel>
          <Label htmlFor="new-password" text="새 비밀번호" />
          <Input
            id="new-password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
        </InputWithLabel>
        <InputWithLabel>
          <Label htmlFor="confirm-new-password" text="새 비밀번호 확인" />
          <Input
            id="confirm-new-password"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
        </InputWithLabel>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? '재설정 중...' : '재설정'} {isLoading && <CircleLoader size={16} />}
        </Button>
      </form>
    </div>
  );
}
