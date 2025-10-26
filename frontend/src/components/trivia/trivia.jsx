import React, { useState } from 'react'
import Question from './Question'
import { triviaQuestions } from './questions'
import capyThink from '../../assets/imagenes-planetas/capibara.png'

/**
 * Componente CEREBRO - Controla toda la lógica de la trivia
 * 
 * Responsabilidades:
 * - Mantener el estado (pregunta actual, respuestas, puntaje)
 * - Decidir qué pregunta mostrar
 * - Calcular el progreso
 * - Validar respuestas
 * - Navegar entre preguntas
 */

export default function Trivia({ onComplete }) {
  // ==================== ESTADO ====================
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [score, setScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])

  // ==================== CÁLCULOS ====================
  const currentQuestion = triviaQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / triviaQuestions.length) * 100
  const isLastQuestion = currentQuestionIndex === triviaQuestions.length - 1

  // ==================== HANDLERS ====================
  
  /**
   * Maneja la selección de una opción
   */
  const handleSelectOption = (optionIndex) => {
    setSelectedOption(optionIndex)
  }

  /**
   * Maneja el botón "Continue"
   * - Valida la respuesta
   * - Actualiza el puntaje
   * - Avanza a la siguiente pregunta o termina
   */
  const handleContinue = () => {
    if (selectedOption === null) return

    const isCorrect = selectedOption === currentQuestion.correctAnswer
    
    const answer = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      selectedOption,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect
    }
    
    const newAnswers = [...userAnswers, answer]
    setUserAnswers(newAnswers)

    if (isCorrect) {
      setScore(score + 1)
    }

    if (isLastQuestion) {
      // Pasar resultados completos con score, total y answers
      onComplete && onComplete({
        score: isCorrect ? score + 1 : score,
        total: triviaQuestions.length,
        answers: newAnswers
      })
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
    }
  }

  // ==================== RENDER ====================
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* ========== ESTILOS CSS ========== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap');
        
        :root{
          --bg-900:#0B1220;
          --bg-800:#0e1a2c;
          --card-900:#0f1f34;
          --card-800:#12263f;
          --text:#e9f0fb;
          --muted:#9cb6e6;
          --outline:rgba(255,255,255,.08);
          --brand:#2c7ee9;
          --brand-700:#1e5fb9;
          --badge:#6f5cff;
          --opt:#142940;
          --opt-hl:#1b3756;
          --opt-selected:#9be2a7;
          --opt-selected-text:#0d2a20;
          --radius-lg:16px;
          --radius-md:12px;
          --radius-sm:10px;
          --shadow:0 18px 36px rgba(0,0,0,.45);
        }

        .trivia-wrapper *{
          box-sizing:border-box;
          font-family:'Montserrat', system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .trivia-wrapper{
          position:relative;
          min-height:100vh;
          color:var(--text);
          background:
            radial-gradient(1100px 720px at 45% 0%, var(--bg-800) 0%, var(--bg-900) 60%) no-repeat,
            var(--bg-900);
        }

        .top{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:16px;
          padding:14px 18px;
        }

        .brand{
          display:flex;
          align-items:center;
          gap:10px;
          font-weight:700;
          letter-spacing:.2px;
        }

        .logo{
          width:30px;
          height:30px;
          border-radius:50%;
          display:grid;
          place-items:center;
          background:linear-gradient(145deg,#2a4d7f,#1a2f50);
          border:2px solid rgba(255,255,255,.75);
        }

        .logo:before{
          content:"";
          width:16px;
          height:16px;
          border-radius:50%;
          background:#15233c;
          display:block;
        }

        .progress{
          flex:1;
          display:flex;
          justify-content:flex-end;
          gap:14px;
          align-items:center;
        }

        .bar{
          width:min(220px,38vw);
          height:8px;
          border-radius:999px;
          background:#15243a;
          position:relative;
          box-shadow:inset 0 1px 0 rgba(255,255,255,.06);
        }

        .bar > span{
          position:absolute;
          inset:0;
          width:var(--progress-width, 0%);
          background:linear-gradient(90deg,#4fa0ff,#2e6ddb);
          border-radius:999px;
          transition: width 0.3s ease;
        }

        .stars{
          display:flex;
          align-items:center;
          gap:8px;
          font-weight:700;
        }

        .stars svg{
          width:20px;
          height:20px;
          fill:#87ff7a;
          filter:drop-shadow(0 0 4px rgba(135,255,122,.35));
        }

        .wrap{
          max-width:1100px;
          margin:0 auto;
          padding:6px 18px 36px;
          display:grid;
          grid-template-columns: 1.05fr .95fr;
          align-items:center;
          gap:28px;
          min-height:calc(100dvh - 60px);
        }

        .title{
          font-size:28px;
          font-weight:700;
          margin:12px 0 16px;
        }

        .card{
          background:linear-gradient(180deg, rgba(18,38,63,.95), rgba(15,31,52,.93));
          border:1px solid var(--outline);
          border-radius:var(--radius-lg);
          padding:20px;
          box-shadow:var(--shadow);
          max-width:540px;
        }

        .q-head{
          display:flex;
          align-items:center;
          gap:12px;
          font-size:18px;
          font-weight:700;
          margin-bottom:14px;
        }

        .badge{
          width:28px;
          height:28px;
          border-radius:9px;
          background:var(--badge);
          display:grid;
          place-items:center;
          color:white;
          font-weight:800;
          box-shadow:0 4px 10px rgba(111,92,255,.35);
        }

        .options{
          display:grid;
          gap:10px;
          margin:14px 0 16px;
        }

        .opt{
          background:var(--opt);
          border:1px solid rgba(255,255,255,.08);
          color:#cfe0ff;
          padding:12px 14px;
          border-radius:10px;
          font-weight:600;
          cursor:pointer;
          transition:filter .15s ease, background .15s ease, transform .04s ease;
          text-align:left;
        }

        .opt:hover{
          background:var(--opt-hl);
        }

        .opt:active{
          transform:translateY(1px);
        }

        .opt.is-selected{
          background:var(--opt-selected);
          color:var(--opt-selected-text);
          border-color:rgba(0,0,0,.06);
        }

        .btn{
          margin-top:8px;
          width:140px;
          padding:11px 14px;
          border:none;
          border-radius:12px;
          background:linear-gradient(180deg, var(--brand), var(--brand-700));
          color:white;
          font-weight:700;
          cursor:pointer;
          box-shadow:0 10px 18px rgba(44,126,233,.35), inset 0 1px 0 rgba(255,255,255,.12);
          transition:filter .15s ease, transform .05s ease;
        }

        .btn:hover{
          filter:brightness(1.05);
        }

        .btn:active{
          transform:translateY(1px);
        }

        .btn:disabled{
          opacity:0.5;
          cursor:not-allowed;
        }

        .mascot{
          position:relative;
          display:grid;
          place-items:center;
        }

        .mascot img{
          width:min(340px, 80%);
          height:auto;
          filter:drop-shadow(0 16px 28px rgba(0,0,0,.55));
        }

        .stars-bg{
          position:absolute;
          inset:0;
          pointer-events:none;
          opacity:.55;
        }

        .stars-bg:before,.stars-bg:after{
          content:"";
          position:absolute;
          inset:0;
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

        @media (max-width: 980px){
          .wrap{
            grid-template-columns:1fr;
            gap:18px;
            padding-bottom:28px;
          }
          .mascot{ order:2 }
          .card{ order:1; max-width:640px }
          .title{ text-align:left }
        }
      `}</style>

      {/* ========== CONTENIDO ========== */}
      <div className="trivia-wrapper">
        <div className="stars-bg" aria-hidden="true"></div>

        {/* Barra superior con progreso */}
        <header className="top" role="banner">
          <div className="brand">
            <span className="logo" aria-hidden="true"></span>
            <span>Capiverse</span>
          </div>

          <div className="progress" aria-label="Progress and score">
            <div className="bar" aria-hidden="true" style={{ '--progress-width': `${progress}%` }}>
              <span></span>
            </div>
            <div className="stars" aria-live="polite">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.5l2.8 5.7 6.3.9-4.6 4.5 1.1 6.3L12 17.8 6.4 19.9l1.1-6.3-4.6-4.5 6.3-.9L12 2.5z"/>
              </svg>
              <span>{score}</span>
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="wrap" role="main">
          <section>
            <h1 className="title">Answer the diagnostic trivia</h1>

            {/* Componente MOLDE - Recibe datos y callbacks */}
            <Question
              questionData={currentQuestion}
              selectedOption={selectedOption}
              onSelectOption={handleSelectOption}
              onContinue={handleContinue}
              questionNumber={currentQuestionIndex + 1}
              isLastQuestion={isLastQuestion}
            />
          </section>

          {/* Mascota */}
          <aside className="mascot" aria-hidden="true">
            <img src={capyThink} alt="Capybara astronaut thinking" />
          </aside>
        </main>
      </div>
    </div>
  )
}