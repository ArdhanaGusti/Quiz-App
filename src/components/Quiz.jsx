
import React, { useState, useEffect, useRef } from 'react'
import { useQuizStore } from '../store/useQuizStore'
import { motion } from 'framer-motion'

export default function Quiz({ onFinish, onBack }) {
  const questions = useQuizStore(s => s.questions)
  const index = useQuizStore(s => s.index)
  const answers = useQuizStore(s => s.answers)
  const answerQuestion = useQuizStore(s => s.answerQuestion)
  const goNext = useQuizStore(s => s.goNext)
  const goPrev = useQuizStore(s => s.goPrev)
  const finishStore = useQuizStore(s => s.finish)
  const score = useQuizStore(s => s.score)

  const q = questions[index]
  const [value, setValue] = useState(answers[q.id]?.value ?? '')
  const [valid, setValid] = useState(!!answers[q.id]?.correct)
  const inputRef = useRef(null)

  useEffect(() => {
    setValue(answers[q.id]?.value ?? '')
    setValid(!!answers[q.id]?.correct)
    inputRef.current?.focus()
  }, [index])

  const submitAnswer = () => {
    const correct = answerQuestion(q.id, value)
    setValid(correct)
    // If last question and correct -> finish
    if (correct && index === questions.length - 1) {
      finishStore()
      onFinish()
    }
  }

  const handleNext = () => {
    if (!valid) return
    if (index === questions.length - 1) {
      finishStore()
      onFinish()
    } else {
      goNext()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      // submit on Ctrl+Enter / Cmd+Enter to allow multiline
      e.preventDefault()
      submitAnswer()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div className="card w-full max-w-2xl" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="btn-ghost">Back</button>
          <div className="text-sm text-gray-600">Question {index + 1} of {questions.length}</div>
        </div>

        <h2 className="text-2xl font-semibold">{q.question}</h2>
        <img src="https://img.freepik.com/foto-gratis/pemandangan-pegunungan-dengan-kabut_1150-18328.jpg" alt="" />

        <textarea
          ref={inputRef}
          value={value}
          onKeyDown={handleKeyDown}
          onChange={(e) => setValue(e.target.value)}
          rows={5}
          placeholder="Type your answer here... (press Ctrl+Enter to check)"
          className="mt-4 w-full rounded-xl border border-gray-200 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
        />

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => goPrev()} disabled={index === 0} className="px-4 py-2 rounded-lg border disabled:opacity-50">Previous</button>
            <button onClick={submitAnswer} className="px-4 py-2 rounded-lg bg-gray-100">Check</button>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">Score: {score}/{questions.length}</div>
            <button onClick={handleNext} disabled={!valid} className={`px-4 py-2 rounded-xl font-medium shadow transition ${valid ? 'bg-gradient-to-r from-indigo-500 to-indigo-700 text-white' : 'bg-gray-200 text-gray-400'}`}>
              {index === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>

        {!valid && answers[q.id] && answers[q.id].value !== '' && (
          <div className="mt-3 text-sm text-red-600">That answer is not correct yet — try again.</div>
        )}
      </motion.div>
    </div>
  )
}
