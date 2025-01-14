import { Dispatch, SetStateAction } from 'react';
import Button from '../common/Button';
import { authAPI } from '@/api/auth';
import { logoutUser } from '@/store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '@/store';
import { errorToast, successToast } from '@/utils/toast';

type DeleteAccountModalProps = {
  setIsDeleteAccountModalOpen: Dispatch<SetStateAction<boolean>>;
};
export default function DeleteAccountModal({
  setIsDeleteAccountModalOpen,
}: DeleteAccountModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const closeDeleteAccountModal = () => {
    setIsDeleteAccountModalOpen(false);
  };

  const handleDeleteAccount = async () => {
    try {
      if (user?.email) {
        const response = await authAPI.deleteUser({ email: user.email, confirm: true });
        if (response && response.status === 200) {
          await dispatch(logoutUser()).unwrap();
          successToast('계정 탈퇴가 완료되었습니다.');
          navigate('/login');
        } else {
          console.error('탈퇴 요청 실패:', response);
          errorToast('탈퇴 요청이 실패하였습니다.');
        }
      }
    } catch (error) {
      console.error('탈퇴 에러', error);
    }
  };

  return (
    <div className="min-w-[360px] bg-pollloop-light-beige flex flex-col p-6 justify-center items-center rounded-2xl gap-4">
      <p className="w-full flex items-center justify-start text-lg font-semibold">회원탈퇴</p>
      <div className="w-full min-h-[88px]">
        <p>정말 탈퇴하시겠습니까?</p>
      </div>
      <div className="w-full flex gap-2">
        <Button
          onClick={closeDeleteAccountModal}
          className="flex-grow flex-shrink-0 basis-0 px-4 py-2 bg-tag-default-bg text-pollloop-brown-01"
        >
          취소
        </Button>
        <Button onClick={handleDeleteAccount} className="flex-grow flex-shrink-0 basis-0 px-4 py-2">
          확인
        </Button>
      </div>
    </div>
  );
}
