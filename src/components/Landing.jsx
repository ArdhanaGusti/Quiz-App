
import React from 'react'
import { motion } from 'framer-motion'

export default function Landing({ onStart }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div className="card max-w-xl w-full" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">Minimal Quiz — Essay Style</h1>
          <p className="text-sm text-gray-500 mb-6">Type answers in essay style. You cannot proceed until the current answer matches the correct one (case-insensitive).</p>

          <div className="mt-6 flex justify-center gap-4 items-center">
            <motion.button whileTap={{ scale: 0.98 }} onClick={onStart} className="btn-primary">
              Start Quiz
            </motion.button>
            <a className="text-sm text-gray-500" href="#" onClick={e => e.preventDefault()}>How it works</a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
