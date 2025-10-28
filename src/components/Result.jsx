
import React from 'react'
import { useQuizStore } from '../store/useQuizStore'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'
import useWindowSize from '../utils/useWindowSize'

export default function Result() {
  const score = useQuizStore(s => s.score)
  const total = useQuizStore(s => s.questions.length)
  const { width, height } = useWindowSize()

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div className="card w-full max-w-xl text-center" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-bold">You got {score}/{total}!</h2>
        <p className="mt-3 text-gray-600">🎉 Congratulations! You completed the quiz!</p>

        <div className="mt-6">
          <div className="inline-block px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-100 to-indigo-50 text-indigo-700 shadow-inner">
            Well done — keep learning!
          </div>
        </div>

        <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />
      </motion.div>
    </div>
  )
}
