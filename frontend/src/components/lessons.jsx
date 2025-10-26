import React, { useRef, useEffect } from 'react'
import capibara from '../assets/imagenes-planetas/capibara.png'
import savings from '../assets/imagenes-planetas/savings.png'
import habits from '../assets/imagenes-planetas/habits.png'
import investments from '../assets/imagenes-planetas/investments.png'
import lockImg from '../assets/imagenes-planetas/lock.png'
import logo from '../assets/imagenes-planetas/logo.png'

export default function Lessons({ onLogout, onSelectModule, userName }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    let stars = []
    const STAR_COUNT = 140
    let rafId = null

    function rand(min, max) { return Math.random() * (max - min) + min }

    function resize() {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
      initStars()
    }

    function initStars() {
      stars = []
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: rand(0, canvas.width),
          y: rand(0, canvas.height),
          r: rand(0.3, 1.6),
          base: rand(0.2, 0.9),
          speed: rand(0.002, 0.015),
          phase: rand(0, Math.PI * 2)
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const s of stars) {
        const a = s.base + 0.5 * Math.sin(s.phase + performance.now() * s.speed)
        ctx.beginPath()
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, a))})`
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      rafId = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    resize()
    rafId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // ==================== HANDLERS ====================
  const handleModuleClick = (category) => {
    console.log(`📚 Selected module: ${category}`)
    onSelectModule && onSelectModule(category)
  }

  return (
    <div ref={containerRef} className="universe-container" style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      backgroundColor: '#0d1b3f',
      color: 'white',
      padding: '40px',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <canvas ref={canvasRef} id="starsCanvas" aria-hidden="true" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          font-family: Arial, sans-serif;
          overflow: hidden;
          box-sizing: border-box;
        }
        *, *:before, *:after {
          box-sizing: inherit;
        }
        .navbar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 70px;
          background-color: rgba(13, 27, 63, 0.9);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          z-index: 20;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .navbar-left {
          display: flex;
          align-items: center;
          gap: 20px;
          height: 100%;
        }
        .logo {
          height: 150px;
          width: auto;
          margin-top: 20px;
        }
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .user-avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background-color: #90a4ae;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          color: white;
        }
        .user-name {
          color: white;
          font-size: 0.95rem;
        }
        .logout-btn {
          padding: 10px 20px;
          background-color: #e91e63;
          color: white;
          border: none;
          border-radius: 25px;
          font-weight: bold;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }
        .logout-btn:hover {
          background-color: #c2185b;
          transform: scale(1.05);
        }
        .title {
          position: absolute;
          top: 120px;
          left: 30px;
          color: #fdd835;
          font-size: 2rem;
          font-weight: bold;
          z-index: 10;
          line-height: 1.2;
        }
        .user-info {
          display: none;
        }
        .space-object {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          cursor: pointer;
        }
        .character-image {
          width: 180px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .planet-image {
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .planet-image img {
          pointer-events: none;
        }
        .space-object:hover .planet-image {
          transform: scale(1.05);
          box-shadow: 0 0 25px 5px rgba(255, 255, 255, 0.2);
        }
        .label {
          margin-top: 15px;
          padding: 8px 30px;
          font-weight: bold;
          font-size: 1.1rem;
          text-align: center;
          color: white;
        }
        #character {
          top: 15%;
          right: 15%;
          left: auto;
          z-index: 5;
          pointer-events: none;
        }
        #savings {
          top: 55%;
          left: 15%;
        }
        #savings .planet-image {
          width: 200px;
          height: 200px;
        }
        #habitos {
          top: 35%;
          left: 38%;
        }
        #habitos .planet-image {
          width: 220px;
          height: 220px;
        }
        #investment {
          top: 58%;
          right: 18%;
          left: auto;
        }
        #investment .planet-image {
          width: 170px;
          height: 170px;
        }
        #solutions {
          top: 75%;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0.6;
          cursor: not-allowed;
          pointer-events: none;
        }
        #solutions .planet-image {
          width: 110px;
          height: 110px;
        }
        #solutions:hover .planet-image {
          transform: none;
          box-shadow: none;
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="FinancIA Logo" className="logo" />
        </div>
        <div className="navbar-right">
          <div className="user-avatar">👤</div>
          <span className="user-name">{userName || 'User'}</span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </nav>

      <h1 className="title">Welcome to the<br />finances universe!</h1>
      
      <div className="user-info">
        <div className="user-avatar">👤</div>
        <span className="user-name">{userName || 'User'}</span>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>

      <div className="space-object" id="character">
        <div className="character-image">
          <img style={{ width: '150%' }} src={capibara} alt="capibara" />
        </div>
      </div>

      {/* SAVINGS - Cambiar de <a> a <div> con onClick */}
      <div 
        className="space-object" 
        id="savings"
        onClick={() => handleModuleClick('savings')}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && handleModuleClick('savings')}
      >
        <div className="planet-image">
          <img style={{ width: '900%', height: '900%', objectFit: 'contain' }} src={savings} alt="savings" />
        </div>
        <span className="label">Savings</span>
      </div>

      {/* HABITS - Cambiar de <a> a <div> con onClick */}
      <div 
        className="space-object" 
        id="habitos"
        onClick={() => handleModuleClick('habits')}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && handleModuleClick('habits')}
      >
        <div className="planet-image">
          <img style={{ width: '500%', height: '500%', objectFit: 'contain' }} src={habits} alt="habits" />
        </div>
        <span className="label">Habits</span>
      </div>

      {/* INVESTMENTS - Cambiar de <a> a <div> con onClick */}
      <div 
        className="space-object" 
        id="investment"
        onClick={() => handleModuleClick('investments')}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && handleModuleClick('investments')}
      >
        <div className="planet-image">
          <img style={{ width: '500%', height: '500%', objectFit: 'contain' }} src={investments} alt="investments" />
        </div>
        <span className="label">Investment</span>
      </div>

      {/* SOLUTIONS - Bloqueado (sin cambios) */}
      <div className="space-object" id="solutions">
        <div className="planet-image">
          <img style={{ width: '480%', height: '480%', objectFit: 'contain' }} src={lockImg} alt="lock" />
        </div>
        <span className="label">Solutions</span>
      </div>
    </div>
  )
}