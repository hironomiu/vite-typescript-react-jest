import * as z from 'zod'

export const user = z.object({
  email: z.string().email({ message: 'Emailを入力してください。' }),
  password: z.string().min(8, { message: '8文字以上です' }),
})

export type User = z.infer<typeof user>
