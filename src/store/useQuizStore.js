import create from 'zustand'
import { questions } from '../data/questions'

const LOCAL_KEY = 'quiz-state'

// Load saved state
const loadState = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(LOCAL_KEY))
    if (!saved) return null
    return saved
  } catch {
    return null
  }
}

export const useQuizStore = create((set, get) => ({
  questions,
  index: 0,
  answers: {},
  finished: false,
  score: 0,

  init: () => {
    const saved = loadState()
    if (saved) set(saved)
  },

  answerQuestion: (id, value) => {
    const normalized = String(value || '').trim().toLowerCase()
    const q = get().questions.find(x => x.id === id)
    const correct = q && q.answer.trim().toLowerCase() === normalized

    const updatedAnswers = { ...get().answers, [id]: { value, correct } }
    const score = Object.values(updatedAnswers).filter(a => a.correct).length

    const newState = { ...get(), answers: updatedAnswers, score }
    set(newState)
    saveState(newState)
    return correct
  },

  goNext: () => {
    const state = get()
    const newIndex = Math.min(state.index + 1, state.questions.length - 1)
    const newState = { ...state, index: newIndex }
    set(newState)
    saveState(newState)
  },

  goPrev: () => {
    const state = get()
    const newIndex = Math.max(state.index - 1, 0)
    const newState = { ...state, index: newIndex }
    set(newState)
    saveState(newState)
  },

  finish: () => {
    const newState = { ...get(), finished: true }
    set(newState)
    saveState(newState)
  },

  reset: () => {
    const fresh = { index: 0, answers: {}, finished: false, score: 0, questions }
    set(fresh)
    localStorage.removeItem(LOCAL_KEY)
  },
}))

function saveState(state) {
  try {
    const snapshot = {
      index: state.index,
      answers: state.answers,
      finished: state.finished,
      score: state.score,
      questions: state.questions,
    }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(snapshot))
  } catch (e) {
    console.error('Failed to save quiz:', e)
  }
}
