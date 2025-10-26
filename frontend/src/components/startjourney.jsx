import React from 'react'
import capyHello from '../assets/imagenes-planetas/capibara.png'

export default function StartJourney({ onStart }) {
  return (
    <div style={{position:'relative', height:'100vh', overflow:'hidden'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&display=swap');
        
        :root{
          --bg-900:#0B1220;
          --bg-800:#0e1a2c;
          --pill:#172836;
          --text:#e9f0fb;
          --shadow:0 18px 40px rgba(0,0,0,.45);
          --radius-pill:22px;
        }

        .start-wrapper *{
          box-sizing:border-box;
          font-family:'Montserrat', system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .start-wrapper{
          position:relative;
          height:100vh;
          display:grid;
          place-items:center;
          padding:24px;
          color:var(--text);
          background:
            radial-gradient(1100px 700px at 50% 15%, var(--bg-800) 0%, var(--bg-900) 55%) no-repeat,
            var(--bg-900);
          overflow:hidden;
        }

        .stars{
          position:absolute;
          inset:0;
          pointer-events:none;
          opacity:.55;
          background:
            radial-gradient(2px 2px at 12% 18%, #fff 45%, transparent 46%),
            radial-gradient(2px 2px at 83% 32%, #fff 45%, transparent 46%),
            radial-gradient(2px 2px at 28% 64%, #fff 45%, transparent 46%),
            radial-gradient(1.6px 1.6px at 61% 22%, #fff 45%, transparent 46%),
            radial-gradient(1.6px 1.6px at 72% 74%, #fff 45%, transparent 46%),
            radial-gradient(1.6px 1.6px at 38% 40%, #fff 45%, transparent 46%);
          background-repeat:no-repeat;
          filter:drop-shadow(0 0 2px rgba(255,255,255,.2));
        }

        .column{
          position:relative;
          width:min(560px, 92vw);
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:22px;
          text-align:center;
        }

        .pill{
          background:var(--pill);
          border-radius:var(--radius-pill);
          padding:18px 28px;
          font-weight:700;
          font-size:clamp(18px, 2.6vw, 28px);
          line-height:1.15;
          letter-spacing:.2px;
          box-shadow:var(--shadow);
          user-select:none;
          cursor:pointer;
          transition:transform .06s ease, filter .15s ease;
          border:none;
          color:inherit;
        }
        .pill:hover{ filter:brightness(1.04) }
        .pill:active{ transform:translateY(1px) }

        .mascot-wrap{
          position:relative;
          display:grid;
          place-items:center;
          width:100%;
          margin-top:6px;
        }

        .moon{
          position:absolute;
          bottom:-8px;
          width:68%;
          aspect-ratio:3/1;
          background:
            radial-gradient(100% 120% at 50% 100%, #2a3b52 10%, #223348 60%, transparent 61%);
          border-bottom-left-radius:999px;
          border-bottom-right-radius:999px;
          filter:blur(.2px) drop-shadow(0 -2px 12px rgba(0,0,0,.35));
          z-index:0;
        }

        .mascot{
          position:relative;
          z-index:1;
          width:min(280px, 70%);
          height:auto;
          filter: drop-shadow(0 16px 28px rgba(0,0,0,.55));
        }

        @media (max-width:420px){
          .pill{ padding:14px 18px }
          .moon{ width:78% }
        }
      `}</style>

      <main className="start-wrapper" role="main" aria-label="Start Screen">
        <div className="stars" aria-hidden="true"></div>

        <div className="column">
          {/* Cartel redondeado */}
          <button 
            className="pill" 
            onClick={onStart}
            aria-label="Click here to start your journey"
          >
            Click here to start<br/>your journey!
          </button>

          {/* Personaje sobre la luna */}
          <div className="mascot-wrap" aria-hidden="true">
            <div className="moon"></div>
            <img 
              className="mascot" 
              src={capyHello} 
              alt="Capybara astronaut waving and holding a tablet" 
            />
          </div>
        </div>
      </main>
    </div>
  )
}