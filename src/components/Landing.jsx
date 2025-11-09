import React from 'react'
import { motion } from 'framer-motion'

export default function Landing({ onStart }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8">
      <motion.div
        className="card w-full max-w-lg sm:max-w-xl text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
          Quiz Challenge
        </h1>
        <p className="text-gray-400 mb-6 text-sm sm:text-base">
          Type the correct answer to move forward. Stay sharp, traveler.
        </p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="btn-primary"
        >
          Begin Mission
        </motion.button>
      </motion.div>
    </div>
  )
}
