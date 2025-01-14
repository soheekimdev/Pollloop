import { CircleUserRound, Pencil, Settings } from 'lucide-react';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import Input from '@/components/form/Input';
import Button from '@/components/common/Button';
import { useRef, useState } from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser, updateUserProfileImage } from '@/store/userSlice';
import { AppDispatch, RootState } from '@/store';
import ChangePasswordModal from '@/components/auth/ChangePasswordModal';
import { authAPI } from '@/api/auth';
import { errorToast, successToast } from '@/utils/toast';
import DeleteAccountModal from '@/components/auth/DeleteAccountModal';
import Dropdown from '@/components/common/Dropdown';

export default function Profile() {
  const [isclickedSetting, setIsClickedSetting] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  const toggleSettingModal = () => setIsClickedSetting(prev => !prev);
  const openDeleteAccountModal = () => setIsDeleteAccountModalOpen(true);
  const openPasswordModal = () => setIsPasswordModalOpen(true);
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate('/login');
    } catch (error) {
      console.error('로그아웃 실패', error);
    }
  };

  const handleEditProfileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFilechange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const MAX_FILE_SIZE = 1 * 1024 * 1024;

      if (file.size > MAX_FILE_SIZE) {
        errorToast('파일 크기는 1MB 이하여야 합니다.');
        if (event.target) {
          event.target.value = '';
        }
        return;
      }
      const formData = new FormData();
      formData.append('input_source', 'profile');
      formData.append('file', file);
      try {
        const response = await authAPI.inputFile(formData);
        const profileImage = response.file_url;

        if (!profileImage) {
          throw new Error('파일 URL을 받지 못했습니다.');
        }
        if (user?.email) {
          const response = await authAPI.updateUserProfile(user.email, profileImage);
          dispatch(updateUserProfileImage(response.profile));
          successToast('프로필 이미지가 업데이트되었습니다.');
        }
      } catch (error) {
        console.error('파일 업로드 실패', error);
        errorToast('이미지 업로드에 실패하였습니다.');
      }
    }
  };

  return (
    <div className="h-full flex flex-col items-center gap-[170px] ">
      <Breadcrumbs items={['홈', '프로필']} className="px-10 w-full" />
      <div className="w-[480px] flex flex-col bg-pollloop-light-beige p-10 gap-10 items-center rounded-2xl -translate-y-10">
        <div className="flex h-6 pl-[170px] justify-end items-start gap-[147px]">
          <h1 className="text-lg font-extrabold">내 정보</h1>
          <button onClick={toggleSettingModal}>
            <Settings className=" w-6 h-6 " />
          </button>
          {isclickedSetting && (
            <Dropdown
              position={{ top: '75px', right: '-50px' }}
              className="border-[0.5px] borer-solid border-[#E0D5C3]"
              items={[{ label: '탈퇴', onClick: openDeleteAccountModal, isDestructive: true }]}
              onClose={() => setIsClickedSetting(false)}
            />
          )}
        </div>
        <div className="flex w-24 h-24 justify-center relative">
          {user?.profileImage ? (
            <img src={user?.profileImage} alt="프로필 이미지" className="rounded-full" />
          ) : (
            <CircleUserRound className="w-full h-full" />
          )}
          <button
            onClick={handleEditProfileClick}
            className="absolute flex justify-center items-center w-8 h-8 top-16 left-16 bg-pollloop-light-beige rounded-2xl border-[0.5px] border-solid border-[rgba(133,88,43,0.3)]"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <input
            onChange={handleFilechange}
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <InputWithLabel>
            <Label htmlFor="userEmail" text="아이디" />
            <Input id="userEmail" value={user?.email} disabled />
          </InputWithLabel>
          <div className="flex flex-col gap-2">
            <Label text="비밀번호" />
            <Button onClick={openPasswordModal}>계정 비밀번호 변경</Button>
          </div>
        </div>
        <button onClick={handleLogout} className="text-button-secondary-bg text-sm">
          로그아웃
        </button>
      </div>
      {isDeleteAccountModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-scrim">
          <DeleteAccountModal
            isOpen={isDeleteAccountModalOpen}
            onClose={() => setIsDeleteAccountModalOpen(false)}
          />
        </div>
      )}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-scrim">
          <ChangePasswordModal
            isOpen={isPasswordModalOpen}
            onClose={() => {
              setIsPasswordModalOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
