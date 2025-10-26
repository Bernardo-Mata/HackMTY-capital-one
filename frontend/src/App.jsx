import { useState, useEffect } from 'react'
import { authService } from './components/AuthService'
import Login from './components/Login'
import Register from './components/Register'
import StartJourney from './components/startjourney'
import Lessons from './components/lessons'
import Trivia from './components/trivia/trivia'
import Results from './components/trivia/ResultsTrivia'

function App() {
  const [token, setToken] = useState(null) // ← CAMBIAR: inicializar en null
  const [userName, setUserName] = useState('') // ← AGREGAR: nombre de usuario
  const [showRegister, setShowRegister] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // ← AGREGAR: estado de carga
  
  // Estados del flujo de navegación
  const [currentView, setCurrentView] = useState('journey')
  const [currentCategory, setCurrentCategory] = useState('diagnostic')
  const [triviaResults, setTriviaResults] = useState(null)

  // ==================== VERIFICAR TOKEN AL MONTAR ====================
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = authService.getToken()
      
      if (storedToken) {
        try {
          // Verificar si el token es válido
          const user = await authService.getCurrentUser()
          console.log('✅ Token válido, usuario autenticado')
          setToken(storedToken)
          setUserName(user.username || user.user_id || 'User')
          setCurrentView('journey')
        } catch (error) {
          console.warn('⚠️ Token inválido, limpiando sesión')
          // Token inválido, limpiar
          authService.logout()
          setToken(null)
          setUserName('')
        }
      }
      
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await authService.logout()
      setToken(null)
      setUserName('')
      setShowRegister(false)
      setCurrentView('journey')
      setCurrentCategory('diagnostic')
      setTriviaResults(null)
      console.log('✅ Logout successful')
    } catch (error) {
      console.error('❌ Logout error:', error)
      setToken(null)
      setUserName('')
      setShowRegister(false)
      setCurrentView('journey')
      setCurrentCategory('diagnostic')
      setTriviaResults(null)
    }
  }

  const handleStartJourney = () => {
    console.log('🚀 Starting diagnostic trivia...')
    setCurrentCategory('diagnostic')
    setCurrentView('diagnostic')
  }

  const handleDiagnosticComplete = (results) => {
    console.log('✅ Diagnostic trivia completed:', results)
    setTriviaResults(results)
    setCurrentView('results')
  }

  const handleContinueToLessons = () => {
    console.log('📚 Continuing to lessons...')
    setCurrentView('lessons')
  }

  const handleSelectModule = (category) => {
    console.log(`📖 Starting ${category} module trivia...`)
    setCurrentCategory(category)
    setCurrentView('module-trivia')
  }

  const handleModuleTriviaComplete = (results) => {
    console.log('✅ Module trivia completed:', results)
    setTriviaResults(results)
    setCurrentView('module-results')
  }

  const handleBackToLessons = () => {
    console.log('🔙 Returning to lessons...')
    setCurrentView('lessons')
    setTriviaResults(null)
  }

  const handleSwitchToRegister = () => {
    setShowRegister(true)
  }

  const handleSwitchToLogin = () => {
    setShowRegister(false)
  }

  const handleLoginSuccess = (newToken) => {
    console.log('✅ Login successful, starting journey')
    setToken(newToken)
    // Obtener información del usuario
    authService.getCurrentUser().then(user => {
      setUserName(user.username || user.user_id || 'User')
    }).catch(err => {
      console.error('Error getting user info:', err)
      setUserName('User')
    })
    setCurrentView('journey')
  }

  const handleRegisterSuccess = (newToken) => {
    console.log('✅ Registration successful, starting journey')
    setToken(newToken)
    // Obtener información del usuario
    authService.getCurrentUser().then(user => {
      setUserName(user.username || user.user_id || 'User')
    }).catch(err => {
      console.error('Error getting user info:', err)
      setUserName('User')
    })
    setCurrentView('journey')
  }

  // ==================== LOADING STATE ====================
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#0B1220',
        color: '#eaf1ff',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    )
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
      return (
        <Trivia 
          category="diagnostic" 
          onComplete={handleDiagnosticComplete} 
        />
      )

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
          onSelectModule={handleSelectModule}
          userName={userName}
        />
      )

    case 'module-trivia':
      return (
        <Trivia 
          category={currentCategory} 
          onComplete={handleModuleTriviaComplete} 
        />
      )

    case 'module-results':
      return (
        <Results 
          results={triviaResults} 
          onTryRealLife={handleBackToLessons} 
        />
      )

    default:
      return <StartJourney onStart={handleStartJourney} />
  }
}

export default App
