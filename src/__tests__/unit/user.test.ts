import { user } from '../../zod'

describe('zod user schema', () => {
  it('正常系', () => {
    expect(
      user.parse({ email: 'hanako@example.com', password: 'password' })
    ).toEqual({ email: 'hanako@example.com', password: 'password' })
  })

  it('異常系', () => {
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

    expect(() => user.parse({ email: 'hanako@example.com', password: '' }))
      .toThrow(`[
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

    expect(() => user.parse({ email: '', password: '12345678' })).toThrow(
      `[
  {
    \"validation\": \"email\",
    \"code\": \"invalid_string\",
    \"message\": \"Emailを入力してください。\",
    \"path\": [
      \"email\"
    ]
  }
]`
    )
  })
})
