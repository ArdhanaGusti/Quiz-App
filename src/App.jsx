import React, { useEffect, useState } from 'react'
import { useQuizStore } from './store/useQuizStore'
import Landing from './components/Landing'
import Quiz from './components/Quiz'
import Result from './components/Result'

function App() {
  const { finished, index, answers, init, questions, reset } = useQuizStore()
  const [started, setStarted] = useState(false)

  useEffect(() => {
    init()
  }, [init])

  useEffect(() => {
    const hasProgress = Object.keys(answers).length > 0 || index > 0
    console.log(hasProgress);
    if (hasProgress && !finished) setStarted(true)
  }, [answers, index, finished])

  if (finished) return <Result onRestart={() => { reset(); setStarted(false) }} />
  if (started) return <Quiz onFinish={() => setStarted(false)} onBack={() => setStarted(false)} />
  return <Landing onStart={() => setStarted(true)} />
}

export default App
