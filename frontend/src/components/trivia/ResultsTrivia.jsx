import React from 'react'
import mascot from '../../assets/imagenes-planetas/capibara.png'

/**
 * Results (Feedback) — componente de presentación de resultados de trivia
 * 
 * Props:
 * - results: objeto con { score, total, answers }
 *   - score: número de respuestas correctas
 *   - total: número total de preguntas
 *   - answers: array de respuestas del usuario
 * - onTryRealLife: callback para el CTA
 */
export default function Results({ results, onTryRealLife }) {
  // Calcular porcentaje
  const percentage = Math.round((results.score / results.total) * 100)

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap');
        
        :root{
          --bg-900:#0B1220;
          --bg-800:#0e1a2c;
          --ink:#eaf1ff;
          --muted:#c7d6f2;
          --chip:#123652;
          --chip-brd:rgba(255,255,255,.12);
          --cta:#2c7ee9;
          --cta-700:#1e5fb9;
          --ring-base:#123f3a;
          --ring-fill:#33d6a5;
          --ring-inner:#0b2031;
          --outline:rgba(255,255,255,.08);
          --shadow:0 18px 36px rgba(0,0,0,.45);
          --r-lg:16px; --r-md:12px; --r-sm:10px;
        }
        
        *{box-sizing:border-box}
        html,body{height:100%}
        
        .results-wrapper{
          min-height:100vh;
          color:var(--ink);
          font-family:'Montserrat',system-ui,-apple-system,Segoe UI,Roboto,'Helvetica Neue',Arial,sans-serif;
          background:
            radial-gradient(1100px 720px at 45% -12%, var(--bg-800) 0%, var(--bg-900) 60%) no-repeat,
            var(--bg-900);
        }
        
        .stars{position:absolute; inset:0; pointer-events:none; opacity:.55}
        .stars:before{content:""; position:absolute; inset:0;
          background:
            radial-gradient(2px 2px at 9% 28%, #fff 45%, transparent 46%),
            radial-gradient(2px 2px at 38% 18%, #fff 45%, transparent 46%),
            radial-gradient(2px 2px at 76% 34%, #fff 45%, transparent 46%),
            radial-gradient(1.6px 1.6px at 30% 62%, #fff 45%, transparent 46%),
            radial-gradient(1.6px 1.6px at 66% 74%, #fff 45%, transparent 46%),
            radial-gradient(1.6px 1.6px at 84% 52%, #fff 45%, transparent 46%);
          background-repeat:no-repeat;
          filter:drop-shadow(0 0 2px rgba(255,255,255,.2));
        }
        
        .wrap{position:relative; max-width:1120px; margin:0 auto; padding:18px 18px 48px}
        
        .topline{
          display:flex; align-items:center; justify-content:space-between; gap:16px;
          font-weight:600; color:#d8e5ff; opacity:.95; margin-bottom:8px;
        }
        
        .crumbs{display:flex; gap:8px; align-items:center; font-size:14px}
        .crumbs .sep{opacity:.45}
        
        .chip{
          background:var(--chip); border:1px solid var(--chip-brd);
          color:#bfe0ff; font-weight:700; font-size:12px;
          padding:7px 12px; border-radius:999px;
        }
        
        .grid{
          display:grid; grid-template-columns:1.05fr .95fr; gap:28px; align-items:center;
          min-height:calc(100dvh - 96px);
        }
        
        .title{ font-size:36px; font-weight:800; letter-spacing:.2px; margin:6px 0 6px }
        .subtitle{ color:#7ac4ff; font-weight:800; font-size:26px; margin:0 0 18px }
        
        .stats{
          display:flex;
          gap:16px;
          margin:20px 0;
          font-weight:600;
        }
        
        .stat{
          background:rgba(18,54,82,.6);
          border:1px solid rgba(255,255,255,.08);
          border-radius:10px;
          padding:12px 18px;
          min-width:120px;
        }
        
        .stat-label{
          font-size:12px;
          color:var(--muted);
          margin-bottom:4px;
        }
        
        .stat-value{
          font-size:24px;
          font-weight:800;
          color:#33d6a5;
        }
        
        .meter{
          width:200px; 
          height:200px; 
          border-radius:50%;
          background:
            conic-gradient(var(--ring-fill) calc(var(--percentage) * 1%), var(--ring-base) 0);
          display:grid; 
          place-items:center;
          box-shadow:0 16px 28px rgba(0,0,0,.35), inset 0 0 0 6px rgba(0,0,0,.18);
          position:relative;
          margin:24px 0;
        }
        
        .meter::before{
          content:"";
          width:156px; height:156px; border-radius:50%;
          background:var(--ring-inner);
          box-shadow:inset 0 2px 0 rgba(255,255,255,.06);
        }
        
        .meter span{
          position:absolute;
          font-size:42px; font-weight:800; color:#d8ffee;
          text-shadow:0 2px 8px rgba(0,0,0,.35);
        }
        
        .cta{
          margin-top:28px; width:320px; max-width:90%;
          padding:13px 16px; border:none; border-radius:12px;
          background:linear-gradient(180deg,var(--cta),var(--cta-700));
          color:white; font-weight:700; cursor:pointer;
          box-shadow:0 12px 22px rgba(44,126,233,.35), inset 0 1px 0 rgba(255,255,255,.12);
          transition:filter .15s ease, transform .05s ease;
        }
        .cta:hover{ filter:brightness(1.05) }
        .cta:active{ transform:translateY(1px) }
        
        .mascot{ position:relative; display:grid; place-items:center }
        .mascot img{ 
          width:min(360px, 90%); 
          height:auto; 
          filter:drop-shadow(0 16px 28px rgba(0,0,0,.55)) 
        }
        
        @media (max-width:980px){
          .grid{ grid-template-columns:1fr; gap:18px }
          .mascot{ order:2 }
          .cta{ width:100% }
          .title{ font-size:32px }
          .subtitle{ font-size:22px }
          .stats{ flex-direction:column }
          .stat{ min-width:auto }
        }
      `}</style>

      <div className="results-wrapper" style={{ '--percentage': percentage }}>
        <div className="stars" aria-hidden="true"></div>

        <div className="wrap">
          {/* Breadcrumb */}
          <div className="topline">
            <div className="crumbs">
              <span>Savings</span><span className="sep"> / </span>
              <span>Courses</span><span className="sep"> / </span>
              <span>Diagnostic Trivia</span>
            </div>
            <span className="chip">Feedback</span>
          </div>

          {/* Contenido principal */}
          <section className="grid" role="main" aria-label="Module feedback">
            <div>
              <h1 className="title">Diagnostic Trivia</h1>
              <h2 className="subtitle">Your Results</h2>

              {/* Estadísticas */}
              <div className="stats">
                <div className="stat">
                  <div className="stat-label">Correct</div>
                  <div className="stat-value">{results.score}</div>
                </div>
                <div className="stat">
                  <div className="stat-label">Total</div>
                  <div className="stat-value">{results.total}</div>
                </div>
              </div>

              {/* Medidor circular con porcentaje dinámico */}
              <div
                className="meter"
                aria-label={`Score ${percentage}%`}
                style={{ '--percentage': percentage }}
              >
                <span>{percentage}%</span>
              </div>

              {/* CTA */}
              <button
                className="cta"
                type="button"
                onClick={() => onTryRealLife && onTryRealLife()}
              >
                Continue to Homepage
              </button>
            </div>

            {/* Mascota */}
            <aside className="mascot" aria-hidden="true">
              <img src={mascot} alt="Astronaut capybara celebrating" />
            </aside>
          </section>
        </div>
      </div>
    </div>
  )
}