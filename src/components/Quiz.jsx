import React, { useState, useEffect, useRef } from 'react'
import { useQuizStore } from '../store/useQuizStore'
import { motion } from 'framer-motion'

export default function Quiz({ onFinish, onBack }) {
  const { questions, index, answers, answerQuestion, goNext, goPrev, finish, score } = useQuizStore()
  const q = questions[index]
  const [value, setValue] = useState(answers[q.id]?.value ?? '')
  const [valid, setValid] = useState(false)
  const [isPush, setIsPush] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    setValue(answers[q.id]?.value ?? '')
    inputRef.current?.focus()
  }, [index])

  const submitAnswer = () => {
    const correct = answerQuestion(q.id, value)
    setValid(correct)
    setIsPush(true)
    if (correct && index === questions.length - 1) {
      finish()
      onFinish()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 py-8">
      <motion.div
        className="card w-full max-w-2xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="btn-ghost">← Exit</button>
          <div className="text-cyan-400 text-sm">
            Question {index + 1}/{questions.length}
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-cyan-300">
          {q.question}
        </h2>

        <textarea
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Type your answer..."
          rows={5}
          className="w-full rounded-xl bg-gray-800/70 text-gray-100 p-4 border border-cyan-500/30 focus:ring-2 focus:ring-cyan-500 focus:outline-none text-sm sm:text-base"
        />

        <div className="flex flex-col sm:flex-row justify-between items-center mt-5 gap-3">
          <div className="flex gap-3">
            <button onClick={() => goPrev()} disabled={index === 0} className="btn-ghost">Previous</button>
            <button onClick={submitAnswer} className="btn-ghost">Check</button>
          </div>

          <div className="text-sm text-gray-400">Score: {score}</div>

          <button
            disabled={!valid}
            onClick={() => {
              if (index === questions.length - 1) {
                finish()
                onFinish()
              } else goNext()
            }}
            className={`btn-primary ${!valid && 'opacity-50 cursor-not-allowed'}`}
          >
            {index === questions.length - 1 ? 'Finish' : 'Next →'}
          </button>
        </div>

        {!valid && isPush && value && (
          <p className="text-red-500 mt-4 text-sm text-center">
            Incorrect. Recalibrate and try again.
          </p>
        )}
      </motion.div>
    </div>
  )
}
