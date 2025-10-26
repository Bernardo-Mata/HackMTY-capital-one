import { useState } from 'react'
import { authService } from '../components/AuthService'
import capibara from '../assets/imagenes-planetas/capibara.png'

export default function Register({ onRegister, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    email: '',
    fullName: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.userId.trim()) {
      setError('Please enter a user ID')
      return
    }

    setLoading(true)

    try {
      const data = await authService.register(
        formData.userId,
        formData.password,
        formData.email,
        formData.fullName
      )
      console.log('Registration successful:', data)
      onRegister(data.access_token)
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{minHeight:'100vh', background:'radial-gradient(1200px 800px at 15% 30%, #0e1a2c 0%, #0B1220 55%) no-repeat, #0B1220'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap');
        
        :root{
          --bg-900:#0B1220;
          --bg-800:#0e1a2c;
          --card-bg:#12263f;
          --text:#eaf1ff;
          --muted:#9cb6e6;
          --input-bg:#0f1f34;
          --input-border:rgba(255,255,255,.12);
          --cta:#2c7ee9;
          --cta-700:#1e5fb9;
          --link:#4d9fff;
          --error:#ff6b6b;
        }
        *{box-sizing:border-box; margin:0; padding:0}
        .register-wrapper{
          font-family:'Montserrat',system-ui,-apple-system,Segoe UI,Roboto,'Helvetica Neue',Arial,sans-serif;
          color:var(--text);
        }
        .topbar{background:rgba(11,18,32,.75); backdrop-filter:blur(8px); border-bottom:1px solid rgba(255,255,255,.06)}
        .topbar__inner{max-width:1200px; margin:0 auto; padding:14px 18px; display:flex; justify-content:space-between; align-items:center}
        .brand{display:flex; align-items:center; gap:10px; font-weight:700; letter-spacing:.3px}
        .brand__logo{width:28px; height:28px; border-radius:50%; background:linear-gradient(145deg,#2a4d7f,#1a2f50); border:2px solid rgba(255,255,255,.75); display:grid; place-items:center}
        .brand__logo:before{content:""; width:14px; height:14px; border-radius:50%; background:#15233c}
        .auth-hint{font-size:14px; color:var(--muted)}
        .auth-hint a{color:var(--link); text-decoration:none; font-weight:600; cursor:pointer}
        .auth-hint a:hover{text-decoration:underline}
        .wrap{display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center; max-width:1100px; margin:0 auto; padding:40px 18px; min-height:calc(100vh - 60px)}
        .hero{position:relative; display:grid; place-items:center}
        .stars{position:absolute; inset:0; pointer-events:none; opacity:.55}
        .stars:before{content:""; position:absolute; inset:0; background:radial-gradient(2px 2px at 14% 22%, #fff 45%, transparent 46%), radial-gradient(2px 2px at 72% 38%, #fff 45%, transparent 46%), radial-gradient(1.6px 1.6px at 36% 68%, #fff 45%, transparent 46%); background-repeat:no-repeat; filter:drop-shadow(0 0 2px rgba(255,255,255,.2))}
        .hero img{width:min(420px, 90%); height:auto; filter:drop-shadow(0 18px 32px rgba(0,0,0,.55))}
        .card{background:linear-gradient(180deg, rgba(18,38,63,.95), rgba(15,31,52,.93)); border:1px solid rgba(255,255,255,.08); border-radius:16px; padding:32px; box-shadow:0 18px 36px rgba(0,0,0,.45); max-width:480px}
        .card h1{font-size:32px; font-weight:800; margin-bottom:24px; letter-spacing:.2px}
        .field{margin-bottom:18px}
        .label{display:block; font-weight:600; margin-bottom:8px; font-size:14px}
        .input{width:100%; padding:12px 14px; border:1px solid var(--input-border); border-radius:10px; background:var(--input-bg); color:var(--text); font-family:inherit; font-size:15px; transition:border .15s ease, background .15s ease}
        .input:focus{outline:none; border-color:rgba(77,159,255,.5); background:rgba(15,31,52,.98)}
        .input::placeholder{color:var(--muted); opacity:.7}
        .button{width:100%; padding:13px 16px; border:none; border-radius:12px; background:linear-gradient(180deg, var(--cta), var(--cta-700)); color:white; font-weight:700; font-size:16px; cursor:pointer; transition:filter .15s ease, transform .05s ease; box-shadow:0 10px 18px rgba(44,126,233,.35), inset 0 1px 0 rgba(255,255,255,.12); margin-top:6px}
        .button:hover{filter:brightness(1.05)}
        .button:active{transform:translateY(1px)}
        .button:disabled{opacity:.6; cursor:not-allowed}
        .error-text{color:var(--error); font-size:14px; margin-top:12px; font-weight:600}
        .help{color:var(--muted); font-size:13px; margin-top:12px; line-height:1.5}
        @media (max-width:900px){
          .wrap{grid-template-columns:1fr; gap:24px}
          .hero{order:2}
          .card{max-width:100%; order:1}
        }
      `}</style>

      <div className="register-wrapper">
        <header className="topbar">
          <div className="topbar__inner">
            <div className="brand" aria-label="Capiverse">
              <span className="brand__logo" aria-hidden="true"></span>
              <span>Capiverse</span>
            </div>
            <div className="auth-hint">
              Already have an account?
              <a onClick={onSwitchToLogin} aria-label="Log in"> Log in here</a>
            </div>
          </div>
        </header>

        <main className="wrap" role="main">
          <section className="hero" aria-hidden="true">
            <div className="stars"></div>
            <img src={capibara} alt="Capiverse astronaut mascot" />
          </section>

          <section className="card" aria-labelledby="register-title">
            <h1 id="register-title">Sign Up</h1>

            <form onSubmit={submit} noValidate>
              <div className="field">
                <label className="label" htmlFor="userId">User ID *</label>
                <input 
                  className="input" 
                  id="userId" 
                  name="userId" 
                  type="text" 
                  placeholder="Choose a unique user ID" 
                  autoComplete="username" 
                  value={formData.userId}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="field">
                <label className="label" htmlFor="fullName">Full Name (optional)</label>
                <input 
                  className="input" 
                  id="fullName" 
                  name="fullName" 
                  type="text" 
                  placeholder="Your full name" 
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label className="label" htmlFor="email">Email (optional)</label>
                <input 
                  className="input" 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="your.email@example.com" 
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <button className="button" type="submit" disabled={loading}>
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
              
              {error && <p className="error-text" role="alert">{error}</p>}
              <p className="help">* User ID is required. Other fields are optional.</p>
            </form>
          </section>
        </main>
      </div>
    </div>
  )
}