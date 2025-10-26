import { useState } from 'react'
import capibara from '../assets/imagenes-planetas/capibara.png'

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
    <div style={{minHeight:'100vh', background:'radial-gradient(1200px 800px at 15% 30%, #0e1a2c 0%, #0B1220 55%) no-repeat, #0B1220'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        
        :root{
          --bg-900:#0B1220;
          --bg-800:#0f1a2d;
          --panel-800:#0f1f34;
          --panel-700:#0e2944;
          --ink-100:#e8f1ff;
          --ink-300:#c8d7f3;
          --ink-500:#9cb6e6;
          --brand:#1e79d6;
          --brand-700:#1764b3;
          --shadow:0 14px 30px rgba(0,0,0,.4);
          --radius-lg:16px;
          --radius-md:12px;
          --radius-sm:10px;
        }
        
        .login-wrapper *{
          box-sizing:border-box;
          font-family:'Montserrat',system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,'Helvetica Neue',Arial,sans-serif;
        }
        
        .topbar{
          background:var(--bg-800);
          border-bottom:1px solid rgba(255,255,255,.06);
        }
        .topbar__inner{
          max-width:1200px;
          margin:0 auto;
          padding:14px 20px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:16px;
        }
        .brand{
          display:flex;align-items:center;gap:12px;
          font-weight:700;font-size:22px;letter-spacing:.2px;
          color:var(--ink-100);
        }
        .brand__logo{
          width:34px;height:34px;border-radius:50%;
          display:grid;place-items:center;
          background:linear-gradient(145deg,#2a4d7f,#1a2f50);
          border:2px solid rgba(255,255,255,.7);
          box-shadow:0 2px 8px rgba(0,0,0,.35);
        }
        .brand__logo:before{content:"";width:18px;height:18px;border-radius:50%;background:#15233c;display:block}
        
        .auth-hint{
          font-size:13px;
          color:var(--ink-300);
        }
        .auth-hint a{
          color:#9cc9ff;
          text-decoration:none;
          font-weight:600;
        }
        .auth-hint a:hover{ text-decoration:underline }
        
        .wrap{
          max-width:1200px;
          margin:0 auto;
          padding:36px 20px 64px;
          display:grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items:center;
          gap:36px;
          min-height:calc(100vh - 66px);
        }
        
        .hero{
          position:relative;
          min-height:320px;
        }
        .stars{position:absolute;inset:0;pointer-events:none;opacity:.55}
        .stars:before,.stars:after{
          content:"";
          position:absolute;inset:0;
          background:
            radial-gradient(2px 2px at 10% 18%, #ffffff 45%, transparent 46%) repeat,
            radial-gradient(1.5px 1.5px at 26% 42%, #ffffff 45%, transparent 46%) repeat,
            radial-gradient(1.5px 1.5px at 62% 14%, #ffffff 45%, transparent 46%) repeat,
            radial-gradient(1.5px 1.5px at 82% 62%, #ffffff 45%, transparent 46%) repeat,
            radial-gradient(1.5px 1.5px at 32% 78%, #ffffff 45%, transparent 46%) repeat;
          background-size: 300px 220px, 280px 260px, 360px 300px, 340px 260px, 420px 320px;
          background-position: 0 0, 40px 30px, 120px 60px, 180px 90px, 240px 120px;
          filter: drop-shadow(0 0 2px rgba(255,255,255,.2));
        }
        .hero img{
          width:min(520px, 100%);
          height:auto;
          display:block;
          margin-left:min(3vw, 16px);
          filter: drop-shadow(0 16px 28px rgba(0,0,0,.55));
        }
        
        .card{
          background:linear-gradient(180deg, rgba(15,31,52,.95), rgba(14,41,68,.9));
          border:1px solid rgba(255,255,255,.08);
          box-shadow:var(--shadow);
          border-radius:var(--radius-lg);
          padding:28px;
          max-width:420px;
          margin-left:auto;
        }
        .card h1{
          margin:0 0 18px;
          font-size:32px;
          font-weight:700;
          letter-spacing:.2px;
          color:#ffffff;
        }
        .field{
          display:grid;gap:8px;margin:14px 0 16px;
        }
        .label{
          font-size:13px;color:var(--ink-500);font-weight:600;
        }
        .input{
          appearance:none;
          width:100%;
          padding:12px 14px;
          border-radius:10px;
          border:1px solid rgba(255,255,255,.08);
          background:rgba(13,27,46,.9);
          color:#eaf1ff;
          outline:none;
          transition:border .15s ease, box-shadow .15s ease;
          box-shadow:inset 0 1px 0 rgba(255,255,255,.03);
        }
        .input::placeholder{color:#8aa3cc}
        .input:focus{
          border-color:#5aa6ff;
          box-shadow:0 0 0 3px rgba(90,166,255,.15);
        }
        
        .button{
          margin-top:8px;
          width:100%;
          padding:12px 14px;
          border:none;
          border-radius:12px;
          background:linear-gradient(180deg, var(--brand), var(--brand-700));
          color:white;
          font-weight:700;
          font-size:15px;
          cursor:pointer;
          box-shadow:0 8px 16px rgba(30,121,214,.35), inset 0 1px 0 rgba(255,255,255,.15);
          transition:transform .05s ease, filter .15s ease;
        }
        .button:hover{ filter:brightness(1.05) }
        .button:active{ transform:translateY(1px) }
        .button:disabled{ opacity:0.6; cursor:not-allowed }
        
        .help{margin-top:6px;font-size:12px;color:var(--ink-500)}
        .error-text{color:#ff6b6b;font-size:13px;margin-top:8px}
        
        @media (max-width: 980px){
          .wrap{ grid-template-columns:1fr; gap:28px; padding-top:28px }
          .hero{ order:2; min-height:260px }
          .card{ order:1; margin-left:0; max-width:520px }
          .hero img{ margin:0 auto }
          .auth-hint{ text-align:right }
        }
        @media (max-width: 420px){
          .topbar__inner{ padding:12px 14px }
          .card{ padding:22px }
          .card h1{ font-size:28px }
        }
      `}</style>

      <div className="login-wrapper">
        {/* Header */}
        <header className="topbar">
          <div className="topbar__inner">
            <div className="brand" aria-label="Capiverse">
              <span className="brand__logo" aria-hidden="true"></span>
              <span>Capiverse</span>
            </div>
            <div className="auth-hint">
              Don't have an account?
              <a href="#" aria-label="Sign up">Sign up here</a>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="wrap" role="main">
          {/* Left: mascot + stars */}
          <section className="hero" aria-hidden="true">
            <div className="stars"></div>
            <img src={capibara} alt="Capiverse astronaut mascot" />
          </section>

          {/* Right: login card */}
          <section className="card" aria-labelledby="login-title">
            <h1 id="login-title">Log in</h1>

            <form onSubmit={submit} noValidate>
              <div className="field">
                <label className="label" htmlFor="userId">User ID</label>
                <input 
                  className="input" 
                  id="userId" 
                  name="userId" 
                  type="text" 
                  placeholder="Enter your user ID" 
                  autoComplete="username" 
                  value={userId}
                  onChange={e => setUserId(e.target.value)}
                  required 
                />
              </div>

              <div className="field">
                <label className="label" htmlFor="password">Password (optional)</label>
                <input 
                  className="input" 
                  id="password" 
                  name="password" 
                  type="password" 
                  placeholder="••••••••" 
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <button className="button" type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Log in'}
              </button>
              
              {error && <p className="error-text" role="alert">{error}</p>}
              <p className="help">Use your user ID to access the platform. Token will be stored locally.</p>
            </form>
          </section>
        </main>
      </div>
    </div>
  )
}