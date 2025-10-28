
import create from 'zustand'
import { questions } from '../data/questions'

export const useQuizStore = create((set, get) => ({
  questions,
  index: 0,
  answers: {},
  finished: false,
  score: 0,

  answerQuestion: (id, value) => {
    const normalized = String(value || '').trim().toLowerCase()
    const q = get().questions.find(x => x.id === id)
    const correct = q && q.answer.trim().toLowerCase() === normalized
    const updated = { ...get().answers, [id]: { value, correct } }
    set({ answers: updated })
    const score = Object.values(updated).filter(a => a.correct).length
    set({ score })
    return correct
  },
  goNext: () => set(state => ({ index: Math.min(state.index + 1, state.questions.length - 1) })),
  goPrev: () => set(state => ({ index: Math.max(state.index - 1, 0) })),
  finish: () => set({ finished: true }),
  reset: () => set({ index: 0, answers: {}, finished: false, score: 0 })
}))
