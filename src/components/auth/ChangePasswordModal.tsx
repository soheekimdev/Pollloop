import Button from '../common/Button';
import Input from '../form/Input';
import InputWithLabel from '../form/InputWithLabel';
import Label from '../form/Label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePasswordFormValue, changePasswordSchema } from '@/schemas/auth';
import Modal from '../common/Modal';
import { authAPI } from '@/api/auth';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { errorToast, successToast } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '@/store/userSlice';

type ChangePasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormValue>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { tokens } = useSelector((state: RootState) => state.user);

  const onSubmit = async (data: ChangePasswordFormValue) => {
    if (!tokens) {
      errorToast('로그인 정보가 없습니다.');
      return;
    }
    try {
      const response = await authAPI.changePassword(
        tokens.refresh,
        data.password,
        data.newPassword,
        data.confirmNewPassword,
      );
      successToast(response.message);
      await dispatch(logoutUser());
      navigate('/login');
    } catch (error: any) {
      console.error(error);
      errorToast(error.password[0]);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="sm" closeOnScrimClick>
      <Modal.Header title="비밀번호 변경" />
      <Modal.Content>
        <form
          id="password-change-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <InputWithLabel>
            <Label htmlFor="previous-password" text="기존 비밀번호" />
            <Input
              id="precious-password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
            />
          </InputWithLabel>
          <InputWithLabel>
            <Label htmlFor="new-password" text="새 비밀번호" />
            <Input
              id="precious-password"
              type="password"
              {...register('newPassword')}
              error={errors.newPassword?.message}
            />
          </InputWithLabel>
          <InputWithLabel>
            <Label htmlFor="confirm-new-password" text="새 비밀번호 확인" />
            <Input
              id="confirm-new-password"
              type="password"
              {...register('confirmNewPassword')}
              error={errors.confirmNewPassword?.message}
            />
          </InputWithLabel>
        </form>
      </Modal.Content>
      <Modal.Footer>
        <Button
          type="button"
          onClick={onClose}
          className="flex-grow flex-shrink-0 basis-0 px-4 py-2 bg-tag-default-bg text-pollloop-brown-01"
        >
          취소
        </Button>
        <Button
          type="submit"
          form="password-change-form"
          className="flex-grow flex-shrink-0 basis-0 px-4 py-2"
        >
          변경
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
