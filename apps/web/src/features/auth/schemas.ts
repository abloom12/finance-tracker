import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(1, 'Password is required')
  .superRefine((password, ctx) => {
    if (!password) {
      ctx.addIssue({ code: 'custom', message: 'Password is required.' });
      return;
    }
  });

export const signupSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z
      .string()
      .trim()
      .min(1, 'Email is required')
      .refine((v) => (v ? z.email().safeParse(v).success : true), {
        message: 'Invalid email address',
      }),
    password: passwordSchema,
    confirm: z.string(),
    image: z.string().optional(),
  })
  .refine(({ password, confirm }) => !password || !!confirm, {
    message: 'Please confirm your password.',
    path: ['confirm'],
  })
  .refine(
    ({ password, confirm }) => !password || !confirm || password === confirm,
    { message: 'Passwords do not match', path: ['confirm'] },
  );

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(128),
  rememberMe: z.boolean().optional(),
});

export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
