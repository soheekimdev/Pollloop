import { CircleUserRound, Pencil, Settings } from 'lucide-react';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import Input from '@/components/form/Input';
import Button from '@/components/common/Button';
import { useState } from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export default function Profile() {
  const [isclickedSetting, setIsClickedSetting] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const toggleSettingModal = () => setIsClickedSetting(prev => !prev);
  const openPasswordModal = () => setIsPasswordModalOpen(prev => !prev);

  return (
    <div className="h-full flex flex-col items-center gap-[170px]">
      <Breadcrumbs items={['홈', '프로필']} className="px-10 w-full" />
      <div className="relative w-[480px] flex flex-col bg-pollloop-light-beige p-10 gap-10 items-center rounded-2xl">
        <div className="flex h-6 pl-[170px] justify-end items-start gap-[147px]">
          <h1 className="text-lg font-extrabold">내 정보</h1>
          <button>
            <Settings className=" w-6 h-6 " onClick={toggleSettingModal} />
          </button>
          {isclickedSetting && (
            <div className="absolute top-[75px] right-[-50px] py-2 w-[120px] border-[0.5px] border-solid border-[#E0D5C3] shadow-[0_2px_10px_0_rgba(0,0,0,0.13)] bg-pollloop-light-beige rounded-lg ">
              <p className="px-4 py-2 text-status-red-text hover:cursor-pointer">탈퇴</p>
            </div>
          )}
        </div>
        <div className="flex w-24 h-24 justify-center relative">
          <CircleUserRound className="w-full h-full" />
          <button className="absolute flex justify-center items-center w-8 h-8 top-16 left-16 bg-pollloop-light-beige rounded-2xl border-[0.5px] border-solid border-[rgba(133,88,43,0.3)]">
            <Pencil className="w-4 h-4" />
          </button>
        </div>
        <div className="w-full flex flex-col gap-4">
          <InputWithLabel>
            <Label htmlFor="userEmail" text="아이디" />
            <Input id="userEmail" value="sample@email.com" disabled />
          </InputWithLabel>
          <div className="flex flex-col gap-2">
            <Label text="비밀번호" />
            <Button onClick={openPasswordModal}>계정 비밀전호 변경</Button>
          </div>
        </div>
        <button className="text-button-secondary-bg text-sm">로그아웃</button>
      </div>
    </div>
  );
}
