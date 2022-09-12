import { rest } from 'msw'
export const handlers = [
  rest.post('http://127.0.0.1:4141/api/v1/auth/signin', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ isSuccess: true, message: 'MSW mock return' })
    )
  }),
]
