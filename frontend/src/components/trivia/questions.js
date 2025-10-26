/**
 * Base de datos de preguntas de trivia
 * 
 * DIAGNOSTIC TRIVIA: Preguntas iniciales para evaluar conocimiento general
 * MODULE TRIVIAS: Preguntas específicas por categoría (savings, habits, investments)
 */

// ==================== TRIVIA DIAGNÓSTICA ====================
export const diagnosticQuestions = [
  {
    id: 1,
    question: "What's the most important thing when investing money?",
    options: [
      "Getting profits as fast as possible.",
      "Understanding the risks before investing.",
      "Avoiding investment because you might lose money.",
      "Investing only if others are doing it too."
    ],
    correctAnswer: 1,
    category: "diagnostic"
  },
  {
    id: 2,
    question: "If you suddenly lose part of your savings, what's your first reaction?",
    options: [
      "I panic and try to recover it fast.",
      "I analyze what happened before acting.",
      "I ignore it and hope it fixes itself.",
      "I blame others or the market."
    ],
    correctAnswer: 1,
    category: "diagnostic"
  },
  {
    id: 3,
    question: "When deciding whether to spend or save, what do you usually do?",
    options: [
      "I spend first and figure it out later.",
      "I try to balance enjoying and saving.",
      "I save no matter what.",
      "I don't really think about it."
    ],
    correctAnswer: 1,
    category: "diagnostic"
  }
]

// ==================== SAVINGS (AHORROS) ====================
export const savingsQuestions = [
  {
    id: 101,
    question: "What's the main reason to save money?",
    options: [
      "To spend it all later on something big.",
      "To feel safe and prepared for unexpected expenses.",
      "Because everyone says it's important.",
      "I don't really see a reason to save."
    ],
    correctAnswer: 1,
    category: "savings"
  },
  {
    id: 102,
    question: "You just received your paycheck — what do you do first?",
    options: [
      "Pay my bills and save a fixed amount.",
      "Buy something I've been wanting and save what's left.",
      "Spend most of it and plan to save next month.",
      "I don't really track what I do with it."
    ],
    correctAnswer: 0,
    category: "savings"
  },
  {
    id: 103,
    question: "If your laptop suddenly broke and you need it for work, how would you handle it?",
    options: [
      "Use my emergency savings.",
      "Borrow money from a friend or family member.",
      "Pay it with a credit card, even if I can't pay it off soon.",
      "Wait until my next paycheck and stop working meanwhile."
    ],
    correctAnswer: 0,
    category: "savings"
  }
]

// ==================== HABITS (HÁBITOS FINANCIEROS) ====================
export const habitsQuestions = [
  {
    id: 201,
    question: "How often do you review your monthly expenses?",
    options: [
      "I review them regularly every month.",
      "Only when I feel I'm running out of money.",
      "I check once in a while, but not consistently.",
      "I never really check my expenses."
    ],
    correctAnswer: 0,
    category: "habits"
  },
  {
    id: 202,
    question: "When you want to buy something expensive, what do you do?",
    options: [
      "I plan and save for it over time.",
      "I buy it immediately if I have the money.",
      "I use credit even if I can't pay it back quickly.",
      "I wait to see if I still want it later."
    ],
    correctAnswer: 0,
    category: "habits"
  },
  {
    id: 203,
    question: "Do you have a monthly budget for your expenses?",
    options: [
      "Yes, and I follow it strictly.",
      "I have one, but I don't always stick to it.",
      "I've tried, but I never maintain it.",
      "No, I just spend as needed."
    ],
    correctAnswer: 0,
    category: "habits"
  }
]

// ==================== INVESTMENTS (INVERSIONES) ====================
export const investmentsQuestions = [
  {
    id: 301,
    question: "What do you think is the biggest risk when investing?",
    options: [
      "Losing all my money overnight.",
      "Not understanding what I'm investing in.",
      "Missing out on better opportunities.",
      "That it takes too long to see returns."
    ],
    correctAnswer: 1,
    category: "investments"
  },
  {
    id: 302,
    question: "If someone offers you an investment with guaranteed high returns, what do you do?",
    options: [
      "Research thoroughly before deciding.",
      "Jump in quickly before the opportunity is gone.",
      "Ask friends or family what they think.",
      "Ignore it because it sounds too good to be true."
    ],
    correctAnswer: 0,
    category: "investments"
  },
  {
    id: 303,
    question: "How do you feel about investing in the stock market?",
    options: [
      "I'm interested and willing to learn more.",
      "It's too risky, I'd rather avoid it.",
      "I'd only invest if someone guides me.",
      "I don't understand it at all."
    ],
    correctAnswer: 0,
    category: "investments"
  }
]

// ==================== HELPER FUNCTION ====================
/**
 * Obtener preguntas por categoría
 * @param {string} category - 'diagnostic' | 'savings' | 'habits' | 'investments'
 * @returns {Array} Array de preguntas de la categoría
 */
export function getQuestionsByCategory(category) {
  switch (category) {
    case 'diagnostic':
      return diagnosticQuestions
    case 'savings':
      return savingsQuestions
    case 'habits':
      return habitsQuestions
    case 'investments':
      return investmentsQuestions
    default:
      return []
  }
}