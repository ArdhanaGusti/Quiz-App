import create from 'zustand'
import { questions } from '../data/questions'

// Load saved state from localStorage
const saved = JSON.parse(localStorage.getItem('quiz-state') || '{}')

export const useQuizStore = create((set, get) => ({
  questions,
  index: saved.index ?? 0,
  answers: saved.answers ?? {},
  finished: saved.finished ?? false,
  score: saved.score ?? 0,

  answerQuestion: (id, value) => {
    const normalized = String(value || '').trim().toLowerCase()
    const q = get().questions.find(x => x.id === id)
    const correct = q && q.answer.trim().toLowerCase() === normalized
    const updated = { ...get().answers, [id]: { value, correct } }

    set({ answers: updated })
    const score = Object.values(updated).filter(a => a.correct).length
    set({ score })

    // persist after answering
    persistState()
    return correct
  },

  goNext: () => {
    set(state => {
      const newIndex = Math.min(state.index + 1, state.questions.length - 1)
      const next = { index: newIndex }
      persistState({ ...state, ...next })
      return next
    })
  },

  goPrev: () => {
    set(state => {
      const newIndex = Math.max(state.index - 1, 0)
      const prev = { index: newIndex }
      persistState({ ...state, ...prev })
      return prev
    })
  },

  finish: () => {
    set({ finished: true })
    persistState({ ...get(), finished: true })
  },

  reset: () => {
    set({ index: 0, answers: {}, finished: false, score: 0 })
    localStorage.removeItem('quiz-state')
  },
}))

// Helper function to persist current store state
function persistState(state = getStoreSnapshot()) {
  try {
    localStorage.setItem('quiz-state', JSON.stringify({
      index: state.index,
      answers: state.answers,
      finished: state.finished,
      score: state.score
    }))
  } catch (err) {
    console.error('Failed to save quiz progress:', err)
  }
}

function getStoreSnapshot() {
  try {
    const store = useQuizStore.getState()
    return store
  } catch {
    return {}
  }
}
