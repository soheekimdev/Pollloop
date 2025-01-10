import Button from '@/components/common/Button';
import Input from '@/components/form/Input';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import { ResetPasswordFormValue, resetPasswordSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValue>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
  });

  const onSubmit = () => {};

  return (
    <div className="bg-pollloop-light-beige w-[400px] p-6 flex flex-col gap-6 rounded-2xl">
      <p className="text-lg font-semibold">비밀번호 재설정</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputWithLabel>
          <Label htmlFor="new-password" text="새 비밀번호" />
          <Input id="new-password" type="password" {...register('password')} />
          {errors.password && (
            <p className="mt-2 text-xs text-status-red-text">{errors.password.message}</p>
          )}
        </InputWithLabel>
        <InputWithLabel>
          <Label htmlFor="confirm-new-password" text="새 비밀번호 확인" />
          <Input id="confirm-new-password" type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && (
            <p className="mt-2 text-xs text-status-red-text">{errors.confirmPassword.message}</p>
          )}
        </InputWithLabel>
        <Button type="submit">재설정</Button>
      </form>
    </div>
  );
}
