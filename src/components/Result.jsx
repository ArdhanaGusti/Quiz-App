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
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10">
      <motion.div
        className="card w-full max-w-md sm:max-w-lg text-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
          You got {score}/{total}!
        </h2>
        <p className="mt-3 text-gray-600 text-sm sm:text-base">
          🎉 Congratulations! You completed the quiz!
        </p>

        <div className="mt-6">
          <div className="inline-block px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-100 to-indigo-50 text-indigo-700 shadow-inner text-sm sm:text-base">
            Well done — keep learning!
          </div>
        </div>

        <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />
      </motion.div>
    </div>
  )
}
