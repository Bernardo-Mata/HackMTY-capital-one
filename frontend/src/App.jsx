import { useState, useEffect } from 'react'
import Login from './components/Login'
import StartJourney from './components/startjourney'
import Lessons from './components/lessons'
import Trivia from './components/trivia/Trivia'
import Results from './components/trivia/ResultsTrivia'

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)
  const [showJourney, setShowJourney] = useState(true)
  const [showTrivia, setShowTrivia] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [triviaResults, setTriviaResults] = useState(null)

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  const handleLogout = () => {
    setToken(null)
    setShowJourney(true)
    setShowTrivia(false)
    setShowResults(false)
  }

  const handleTriviaComplete = (results) => {
    console.log('Trivia completada:', results)
    setTriviaResults(results)
    setShowTrivia(false)
    setShowResults(true)
  }

  const handleContinueFromResults = () => {
    setShowResults(false)
    // Volver a Lessons o lo que necesites
  }

  if (!token) {
    return <Login onLogin={setToken} />
  }

  if (showJourney) {
    return <StartJourney onStart={() => setShowJourney(false)} />
  }

  if (showTrivia) {
    return <Trivia onComplete={handleTriviaComplete} />
  }

  if (showResults && triviaResults) {
    return <Results results={triviaResults} onTryRealLife={handleContinueFromResults} />
  }

  return <Lessons onLogout={handleLogout} onStartTrivia={() => setShowTrivia(true)} />
}

export default App
