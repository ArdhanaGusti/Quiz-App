import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Password({ onSuccess }) {
  const [input, setInput] = useState("")
  const [error, setError] = useState("")

  const correctPassword = "22090009"

  useEffect(() => {
    const saved = localStorage.getItem("quiz_access")
    if (saved === "granted") {
      onSuccess()
    }
  }, [onSuccess])

  const handleSubmit = () => {
    if (input === correctPassword) {
      localStorage.setItem("quiz_access", "granted")
      onSuccess()
    } else {
      setError("Wrong password. Try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0c0f17]">
      <motion.div
        className="card w-full max-w-sm text-center p-6 bg-[#121521] rounded-xl shadow-xl border border-cyan-800/20"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
          Security Access
        </h2>

        <p className="text-gray-400 text-sm mb-5">
          Enter the mission password to continue your journey.
        </p>

        {/* ▼ Input with futuristic theme */}
        <input
          type="password"
          className="w-full px-4 py-3 rounded-lg bg-[#1b1f2e] border border-cyan-700/30 text-cyan-300 focus:outline-none focus:border-cyan-400 shadow-inner"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="•••••••"
        />

        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="btn-primary w-full mt-5"
        >
          Unlock Mission
        </motion.button>
      </motion.div>
    </div>
  )
}
