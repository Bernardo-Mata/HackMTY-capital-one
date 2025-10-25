import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'  // <- nuevo componente

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  if (!token) {
    return <Login onLogin={setToken} />
  }

  return (
    <>
      
    </>
  )
}

export default App
