import { useState, useEffect } from 'react'
import { authService } from './components/AuthService'
import Login from './components/Login'
import StartJourney from './components/startjourney'
import Lessons from './components/lessons'
import Trivia from './components/trivia/Trivia'
import Results from './components/trivia/ResultsTrivia'

function App() {
  const [token, setToken] = useState(() => authService.getToken())
  
  const [showJourney, setShowJourney] = useState(true)
  const [showTrivia, setShowTrivia] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [triviaResults, setTriviaResults] = useState(null)

  useEffect(() => {
    // El token ya se maneja en authService, no hace falta guardar aquí
  }, [token])

  const handleLogout = async () => {
    try {
      // Llamar al endpoint de logout
      await authService.logout()
      
      // Resetear todos los estados
      setToken(null)
      setShowJourney(true)
      setShowTrivia(false)
      setShowResults(false)
      setTriviaResults(null)
      
      console.log('Logout successful')
    } catch (error) {
      console.error('Logout error:', error)
      // Igual limpiamos el estado local aunque falle
      setToken(null)
      setShowJourney(true)
      setShowTrivia(false)
      setShowResults(false)
      setTriviaResults(null)
    }
  }

  const handleTriviaComplete = (results) => {
    console.log('Trivia completada:', results)
    setTriviaResults(results)
    setShowTrivia(false)
    setShowResults(true)
  }

  const handleContinueFromResults = () => {
    setShowResults(false)
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
