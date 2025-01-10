import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty('이메일을 입력해주세요.')
    .email('유효한 이메일 형식이 아닙니다.'),
  password: z.string().nonempty('비밀번호를 입력해주세요.'),
});

export const registerSchema = z
  .object({
    email: z
      .string()
      .trim()
      .nonempty('이메일을 입력해주세요.')
      .email('유효한 이메일 주소를 입력해주세요.'),
    password: z
      .string()
      .nonempty('비밀번호를 입력해주세요.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
        '영문,숫자,특수문자(!,@,#,$,%,&,*,?) 조합 8~25자리를 입력해주세요.',
      ),
    confirmPassword: z.string().nonempty('비밀번호 확인을 입력해주세요.'),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export const changePasswordSchema = z
  .object({
    password: z.string().nonempty('기존 비밀번호를 입력해주세요.'),
    newPassword: z
      .string()
      .nonempty('새 비밀번호를 입력해주세요.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
        '영문,숫자,특수문자(!,@,#,$,%,&,*,?) 조합 8~25자리를 입력해주세요.',
      ),
    confirmNewPassword: z.string().nonempty('새 비밀번호 확인을 입력해주세요.'),
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export const findPasswordSchema = z.object({
  email: z.string().nonempty('이메일을 입력해주세요.').email('유효한 이메일 형식이 아닙니다.'),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty('새 비밀번호를 입력해주세요.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
        '영문,숫자,특수문자(!,@,#,$,%,&,*,?) 조합 8~25자리를 입력해주세요.',
      ),
    confirmPassword: z.string().nonempty('새 비밀번호 확인을 입력해주세요.'),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type LoginFormValue = z.infer<typeof loginSchema>;
export type RegisterFormValue = z.infer<typeof registerSchema>;
export type ChangePasswordFormValue = z.infer<typeof changePasswordSchema>;
export type FindPasswordFormValue = z.infer<typeof findPasswordSchema>;
export type ResetPasswordFormValue = z.infer<typeof resetPasswordSchema>;
