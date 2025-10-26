import { useState, useEffect } from 'react'
import { authService } from './components/AuthService'
import Login from './components/Login'
import Register from './components/Register'
import StartJourney from './components/startjourney'
import Lessons from './components/lessons'
import Trivia from './components/trivia/trivia'
import Results from './components/trivia/ResultsTrivia'

function App() {
  const [token, setToken] = useState(() => authService.getToken())
  const [showRegister, setShowRegister] = useState(false)
  
  // Estados del flujo de navegación
  const [currentView, setCurrentView] = useState('journey') // 'journey' | 'diagnostic' | 'results' | 'lessons'
  const [triviaResults, setTriviaResults] = useState(null)

  useEffect(() => {
    // Al hacer login/register, siempre empezar en journey
    if (token) {
      setCurrentView('journey')
    }
  }, [token])

  const handleLogout = async () => {
    try {
      await authService.logout()
      setToken(null)
      setShowRegister(false)
      setCurrentView('journey')
      setTriviaResults(null)
      console.log('Logout successful')
    } catch (error) {
      console.error('Logout error:', error)
      setToken(null)
      setShowRegister(false)
      setCurrentView('journey')
      setTriviaResults(null)
    }
  }

  // Callback cuando se completa StartJourney
  const handleStartJourney = () => {
    console.log('Starting diagnostic trivia...')
    setCurrentView('diagnostic')
  }

  // Callback cuando se completa la trivia diagnóstica
  const handleDiagnosticComplete = (results) => {
    console.log('Diagnostic trivia completed:', results)
    setTriviaResults(results)
    setCurrentView('results')
  }

  // Callback cuando se completan los resultados
  const handleContinueToLessons = () => {
    console.log('Continuing to lessons...')
    setCurrentView('lessons')
  }

  // Callback cuando se inicia una trivia desde Lessons
  const handleStartModuleTrivia = () => {
    console.log('Starting module trivia...')
    // Aquí puedes implementar trivias de módulos específicos
    setCurrentView('diagnostic') // Por ahora usa la misma trivia
  }

  const handleSwitchToRegister = () => {
    setShowRegister(true)
  }

  const handleSwitchToLogin = () => {
    setShowRegister(false)
  }

  const handleLoginSuccess = (newToken) => {
    setToken(newToken)
    setCurrentView('journey') // Empezar en journey
  }

  const handleRegisterSuccess = (newToken) => {
    setToken(newToken)
    setCurrentView('journey') // Empezar en journey
  }

  // ==================== RENDERIZADO CONDICIONAL ====================

  // Si no hay token, mostrar Login o Register
  if (!token) {
    if (showRegister) {
      return (
        <Register 
          onRegister={handleRegisterSuccess} 
          onSwitchToLogin={handleSwitchToLogin} 
        />
      )
    }
    return (
      <Login 
        onLogin={handleLoginSuccess} 
        onSwitchToRegister={handleSwitchToRegister} 
      />
    )
  }

  // Si hay token, mostrar la vista correspondiente
  switch (currentView) {
    case 'journey':
      return <StartJourney onStart={handleStartJourney} />

    case 'diagnostic':
      return <Trivia onComplete={handleDiagnosticComplete} />

    case 'results':
      return (
        <Results 
          results={triviaResults} 
          onTryRealLife={handleContinueToLessons} 
        />
      )

    case 'lessons':
      return (
        <Lessons 
          onLogout={handleLogout} 
          onStartTrivia={handleStartModuleTrivia} 
        />
      )

    default:
      return <StartJourney onStart={handleStartJourney} />
  }
}

export default App
