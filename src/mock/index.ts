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
  rest.get('http://127.0.0.1:4141/api/v1/lessons', async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json([
        {
          id: 1,
          questionMessage: '想定結果と同じ実行結果を取得しましょう',
          ansTableHeader: ['id', 'nickname'],
          ansRows: [
            { id: 1, nickname: '太郎' },
            { id: 2, nickname: '花子' },
          ],
        },
      ])
    )
  }),
]
