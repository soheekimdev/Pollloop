import FormActionButton from '@/components/auth/FormActionButton';
import LogoWithTitle from '@/components/common/LogoWithTitle';
import Input from '@/components/form/Input';
import InputWithLabel from '@/components/form/InputWithLabel';
import Label from '@/components/form/Label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const findPasswordSchema = z.object({
  email: z.string().nonempty('이메일을 입력해주세요.').email('유효한 이메일 형식이 아닙니다.'),
});

type FindPasswordFormValue = z.infer<typeof findPasswordSchema>;

export default function PasswordRetrieval() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindPasswordFormValue>({
    resolver: zodResolver(findPasswordSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: FindPasswordFormValue) => {
    alert('이메일 전송!');
    console.log(data);
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
        <FormActionButton submitButtonText="이메일로 찾기" linkButtonText="로그인" path="/login" />
      </form>
    </div>
  );
}
