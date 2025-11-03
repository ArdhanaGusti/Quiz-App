import React from 'react'
import { motion } from 'framer-motion'

export default function Landing({ onStart }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8">
      <motion.div
        className="card w-full max-w-md sm:max-w-lg md:max-w-xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3">
            Minimal Quiz — Essay Style
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mb-6">
            Type answers in essay style. You cannot proceed until the current answer matches
            the correct one (case-insensitive).
          </p>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4 items-center">
            <motion.button whileTap={{ scale: 0.98 }} onClick={onStart} className="btn-primary w-full sm:w-auto">
              Start Quiz
            </motion.button>
            <a className="text-sm text-gray-500 hover:text-indigo-600" href="#" onClick={e => e.preventDefault()}>
              How it works
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
