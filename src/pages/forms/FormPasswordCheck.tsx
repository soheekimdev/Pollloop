import Button from '@/components/common/Button';
import LogoWithTitle from '@/components/common/LogoWithTitle';
import Input from '@/components/form/Input';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import { useState } from 'react';

interface FormPasswordCheckProps {
  onSubmit: (accesscode: string) => void;
}
export default function FormPasswordCheck({ onSubmit }: FormPasswordCheckProps) {
  const [accessCode, setAccessCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(accessCode);
  };

  return (
    <div className="w-full h-full bg-pollloop-bg-03 flex items-center justify-center">
      <div className="w-full sm:w-cardWidth flex flex-col gap-10 items-center bg-pollloop-light-beige text-pollloop-brown-01 p-10 rounded-2xl">
        <LogoWithTitle title="폼 코드를 입력해주세요" />
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10">
          <div className="w-full flex flex-col">
            <InputWithLabel>
              <Label htmlFor="access-code" text="비밀번호" />
              <Input
                id="access-code"
                type="text"
                value={accessCode}
                onChange={e => setAccessCode(e.target.value)}
                placeholder="코드 8자리를 입력해주세요."
              />
            </InputWithLabel>
          </div>
          <Button type="submit">확인</Button>
        </form>
      </div>
    </div>
  );
}
