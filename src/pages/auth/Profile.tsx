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
import axios from 'axios';
import ChangePasswordModal from '@/components/auth/ChangePasswordModal';
import { authAPI } from '@/api/auth';

export default function Profile() {
  const [isclickedSetting, setIsClickedSetting] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  const toggleSettingModal = () => setIsClickedSetting(prev => !prev);
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
      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await axios.post(
          'https://api.imgbb.com/1/upload?key=f645de5a07b0cf7a43b5a44396235a47',
          formData,
        );
        console.log(response.data);
        const profileImage = response.data.data.url;
        dispatch(updateUserProfileImage(profileImage));
      } catch (error) {
        console.error('파일 업로드 실패', error);
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const confirmDelete = window.confirm('정말 탈퇴하시겠습니까?');
      if (!confirmDelete) return;
      await authAPI.deleteUser();

      await dispatch(logoutUser()).unwrap();
      alert('회원 탈퇴가 완료되었습니다.');
      navigate('/login');
    } catch (error) {
      console.error('탈퇴 에러', error);
    }
  };

  return (
    <div className="h-full flex flex-col items-center gap-[170px]">
      <Breadcrumbs items={['홈', '프로필']} className="px-10 w-full" />
      <div className="relative w-[480px] flex flex-col bg-pollloop-light-beige p-10 gap-10 items-center rounded-2xl -translate-y-10">
        <div className="flex h-6 pl-[170px] justify-end items-start gap-[147px]">
          <h1 className="text-lg font-extrabold">내 정보</h1>
          <button>
            <Settings className=" w-6 h-6 " onClick={toggleSettingModal} />
          </button>
          {isclickedSetting && (
            <div className="absolute top-[75px] right-[-50px] py-2 w-[120px] border-[0.5px] border-solid border-[#E0D5C3] shadow-[0_2px_10px_0_rgba(0,0,0,0.13)] bg-pollloop-light-beige rounded-lg ">
              <p
                onClick={handleDeleteAccount}
                className="px-4 py-2 text-status-red-text hover:cursor-pointer"
              >
                탈퇴
              </p>
            </div>
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
      {isPasswordModalOpen ? (
        <div className="fixed inset-0 flex justify-center items-center bg-scrim">
          <ChangePasswordModal setIsPasswordModalOpen={setIsPasswordModalOpen} />
        </div>
      ) : null}
    </div>
  );
}
