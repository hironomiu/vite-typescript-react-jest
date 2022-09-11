import { ZodError } from 'zod'
import { user } from '../zod'

describe('user', () => {
  it('test', () => {
    expect(
      user.parse({ email: 'hanako@example.com', password: 'password' })
    ).toEqual({ email: 'hanako@example.com', password: 'password' })
    expect(() => user.parse({ email: 'a', password: 'a' })).toThrow(`[
  {
    \"validation\": \"email\",
    \"code\": \"invalid_string\",
    \"message\": \"Emailを入力してください。\",
    \"path\": [
      \"email\"
    ]
  },
  {
    \"code\": \"too_small\",
    \"minimum\": 8,
    \"type\": \"string\",
    \"inclusive\": true,
    \"message\": \"8文字以上です\",
    \"path\": [
      \"password\"
    ]
  }
]`)
  })
})
