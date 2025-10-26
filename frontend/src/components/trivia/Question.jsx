import React from 'react'

/**
 * Componente MOLDE - Solo se encarga de MOSTRAR una pregunta
 * 
 * Props que recibe:
 * - questionData: objeto con { question, options }
 * - selectedOption: índice de la opción seleccionada (o null)
 * - onSelectOption: función callback cuando se selecciona una opción
 * - onContinue: función callback cuando se presiona "Continue"
 * - questionNumber: número de pregunta actual
 * - isLastQuestion: boolean para saber si es la última pregunta
 */

export default function Question({ 
  questionData, 
  selectedOption, 
  onSelectOption, 
  onContinue,
  questionNumber,
  isLastQuestion 
}) {
  return (
    <article className="card" aria-labelledby={`question-${questionNumber}`}>
      {/* Encabezado de la pregunta */}
      <div className="q-head">
        <span className="badge" aria-hidden="true">?</span>
        <h2 id={`question-${questionNumber}`} style={{ margin: 0, font: 'inherit' }}>
          {questionData.question}
        </h2>
      </div>

      {/* Opciones de respuesta */}
      <div className="options" role="group" aria-label="Answer options">
        {questionData.options.map((option, index) => (
          <button
            key={index}
            className={`opt ${selectedOption === index ? 'is-selected' : ''}`}
            onClick={() => onSelectOption(index)}
            aria-pressed={selectedOption === index}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Botón de continuar */}
      <button 
        className="btn" 
        type="button" 
        onClick={onContinue}
        disabled={selectedOption === null}
      >
        {isLastQuestion ? 'Finish' : 'Continue'}
      </button>
    </article>
  )
}