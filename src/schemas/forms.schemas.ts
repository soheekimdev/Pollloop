import { z } from 'zod';

export const optionSchema = z.object({
  id: z.string(),
  label: z.string().min(1, '옵션을 입력해주세요.'),
});

export const questionSchema = z.object({
  id: z.string(),
  type: z.enum(['checkbox', 'short', 'long']),
  title: z.string().min(1, '질문을 입력해주세요.'),
  reqyured: z.boolean(),
  options: z.array(optionSchema).optional(),
});

export const formSchema = z.object({
  title: z.string().min(1, '폼 제목을 입력해주세요.'),
  tag: z.string(),
  target_count: z.number().min(1, '참여 인원을 입력해주세요.'),
  deadline: z.string(), // 날짜 유효성 검사 추가 필요
  isPrivate: z.boolean(),
  questions: z.array(questionSchema),
});
