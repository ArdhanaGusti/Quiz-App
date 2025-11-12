import React from 'react'
import { useQuizStore } from '../store/useQuizStore'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'
import useWindowSize from '../utils/useWindowSize'

export default function Result({ onRestart }) {
  const { score, questions, reset } = useQuizStore()
  const { width, height } = useWindowSize()

  const handleRestart = () => {
    reset()
    if (onRestart) onRestart()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        className="card w-full max-w-lg text-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent mb-3">
          Mission Complete
        </h2>

        <p className="text-gray-400 mb-6 text-sm sm:text-base">
          Score: {score}/{questions.length}
        </p>

        <div className="text-cyan-300 mb-8">
          🎉 Excellent work, Soldier! You’ve completed the challenge.
          <br />
          <b>Next Clue: CTR | 3f7a1b4c9d8e0a2b | 256 | 5Bc8sxXeeTc1GCIbtW3+ytG7rh7AUtq=</b>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleRestart}
          className="btn-primary"
        >
          Restart Quiz
        </motion.button>

        <Confetti width={width} height={height} recycle={false} numberOfPieces={150} />
      </motion.div>
    </div>
  )
}
