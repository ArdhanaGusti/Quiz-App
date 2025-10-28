import React, { useState } from 'react'
import Landing from './components/Landing'
import Quiz from './components/Quiz'
import Result from './components/Result'
import { useQuizStore } from './store/useQuizStore'

export default function App() {
  const finished = useQuizStore(s => s.finished)
  const [started, setStarted] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {!started && !finished && <Landing onStart={() => setStarted(true)} />}
      {started && !finished && (
        <Quiz
          onFinish={() => console.log('Finished!')}
          onBack={() => setStarted(false)}
        />
      )}
      {finished && <Result />}
    </div>
  )
}
