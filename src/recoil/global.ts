import { atom, selectorFamily } from 'recoil'

export const isSignInAtom = atom({
  key: 'isSignInAtom',
  default: false,
})

export const lessonsAtom = atom({
  key: 'lessonsAtom',
  default: [
    {
      id: 1,
      questionMessage: '想定結果と同じ実行結果を取得しましょう',
      ansTableHeader: ['id', 'nickname'],
      ansRows: [
        { id: 1, nickname: '太郎' },
        { id: 2, nickname: '花子' },
      ],
    },
  ],
})

export const lessonsSelectorFamily = selectorFamily({
  key: 'lessonsSelectorFamily',
  get:
    (id) =>
    ({ get }) => {
      const lesson = get(lessonsAtom).find((lesson) => lesson.id === id)
      return lesson
    },
})
