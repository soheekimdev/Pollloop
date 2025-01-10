import Button from '../common/Button';
import Input from '../form/Input';
import InputWithLabel from '../form/InputWithLabel';
import Label from '../form/Label';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePasswordFormValue, changePasswordSchema } from '@/schemas/auth';

type ChangePasswordModalProps = {
  setIsPasswordModalOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ChangePasswordModal({ setIsPasswordModalOpen }: ChangePasswordModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormValue>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  });

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const onSubmit = (data: ChangePasswordFormValue) => {};

  return (
    <div className="w-[400px] flex flex-col gap-6 p-6 bg-pollloop-light-beige flex-shrink-0 rounded-2xl">
      <p className="text-lg font-semibold">비밀번호 변경</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputWithLabel>
          <Label htmlFor="previous-password" text="기존 비밀번호" />
          <Input id="precious-password" type="password" {...register('password')} />
          {errors.password && (
            <p className="mt-2 text-xs text-status-red-text">{errors.password?.message}</p>
          )}
        </InputWithLabel>
        <InputWithLabel>
          <Label htmlFor="new-password" text="새 비밀번호" />
          <Input id="precious-password" type="password" {...register('newPassword')} />
          {errors.newPassword && (
            <p className="mt-2 text-xs text-status-red-text">{errors.newPassword.message}</p>
          )}
        </InputWithLabel>
        <InputWithLabel>
          <Label htmlFor="confirm-new-password" text="새 비밀번호 확인" />
          <Input id="confirm-new-password" type="password" {...register('confirmNewPassword')} />
          {errors.confirmNewPassword && (
            <p className="mt-2 text-xs text-status-red-text">{errors.confirmNewPassword.message}</p>
          )}
        </InputWithLabel>
        <div className="flex gap-2">
          <Button
            onClick={closePasswordModal}
            className="flex-grow flex-shrink-0 basis-0 px-4 py-2 bg-tag-default-bg text-pollloop-brown-01"
          >
            취소
          </Button>
          <Button type="submit" className="flex-grow flex-shrink-0 basis-0 px-4 py-2">
            변경
          </Button>
        </div>
      </form>
    </div>
  );
}
