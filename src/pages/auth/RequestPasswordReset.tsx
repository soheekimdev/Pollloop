import { authAPI } from '@/api/auth';
import FormActionButton from '@/components/auth/FormActionButton';
import LogoWithTitle from '@/components/common/LogoWithTitle';
import Input from '@/components/form/Input';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import { FindPasswordFormValue, findPasswordSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function RequestPasswordReset() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindPasswordFormValue>({
    resolver: zodResolver(findPasswordSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FindPasswordFormValue) => {
    try {
      await authAPI.requestPasswordReset(data.email);
      alert('이메일로 재설정 링크가 전송되었습니다).');
    } catch (error) {
      console.error('요청 실패', error);
    }
  };

  return (
    <div className="w-[400px] flex flex-col items-center bg-pollloop-light-beige text-pollloop-brown-01 p-10 rounded-2xl gap-10">
      <LogoWithTitle title="비밀번호 찾기" />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-10">
        <fieldset>
          <InputWithLabel>
            <Label htmlFor="email" text="아이디" />
            <Input id="email" type="email" placeholder="name@example.com" {...register('email')} />
            {errors.email && (
              <p className="mt-2 text-sm text-status-red-text">{errors.email.message}</p>
            )}
          </InputWithLabel>
        </fieldset>
        <FormActionButton
          submitButtonText="이메일로 찾기/재설정"
          linkButtonText="로그인"
          path="/login"
        />
      </form>
    </div>
  );
}
