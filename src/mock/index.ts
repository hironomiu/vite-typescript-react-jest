import { rest } from 'msw'
export const handlers = [
  rest.post(
    'http://127.0.0.1:4141/api/v1/auth/signin',
    async (req, res, ctx) => {
      const json = await req.json()
      if (json.email === 'hanako@example.com' && json.password === 'password') {
        return res(
          ctx.status(200),
          ctx.json({ isSuccess: true, message: 'MSW mock return' })
        )
      }
      return res(
        ctx.status(200),
        ctx.json({ isSuccess: false, message: 'MSW mock error return' })
      )
    }
  ),
]
