import { useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

export default function Login({ onLogin }) {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, password: password || undefined })
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: res.statusText }))
        throw new Error(err.detail || 'Login failed')
      }
      const data = await res.json()
      onLogin(data.access_token)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{maxWidth:400, margin:'60px auto', padding:20, border:'1px solid #eee', borderRadius:8}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div style={{marginBottom:8}}>
          <label>User ID</label>
          <input value={userId} onChange={e => setUserId(e.target.value)} required style={{width:'100%'}} />
        </div>
        <div style={{marginBottom:8}}>
          <label>Password (opcional)</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{width:'100%'}} />
        </div>
        <button type="submit" disabled={loading} style={{width:'100%'}}>
          {loading ? 'Logging...' : 'Login'}
        </button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      <p style={{marginTop:12, fontSize:12, color:'#666'}}>Usa el botón Login para obtener token y acceder a la app.</p>
    </div>
  )
}