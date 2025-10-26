# 🚀 Capiverse - Gamified Financial Education Platform

<div align="center">

![Capiverse Banner](https://img.shields.io/badge/Capiverse-Financial_Education-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Hackathon_MVP-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**A space-themed gamified platform that makes financial education accessible and fun for everyone.**

[Features](#-features) • [Tech Stack](#️-tech-stack) • [Installation](#-installation-guide) • [Usage](#-usage) • [API Docs](#-api-documentation)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [System Requirements](#-system-requirements)
- [Installation Guide](#-installation-guide)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Quiz Categories](#-quiz-categories--questions)
- [Roadmap](#️-roadmap)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 About the Project

**Capiverse** is an innovative educational platform that transforms financial literacy into an engaging space adventure. Users navigate through different planets, each representing a financial topic (Savings, Habits, Investments), completing interactive quizzes to unlock knowledge and track their progress.

### 🎯 The Problem

- Traditional financial education is **boring and inaccessible** for young people
- Lack of **practical, engaging tools** to learn money management
- High barrier to entry for financial literacy resources
- **No gamification** or motivation systems in existing solutions

### 💡 Our Solution

Capiverse addresses these issues by:

- ✅ **Gamifying learning** with a space-themed universe
- ✅ **Personalized diagnostic** assessment to track knowledge
- ✅ **Bite-sized quizzes** for easy consumption
- ✅ **Immediate feedback** and progress tracking
- ✅ **Beautiful, intuitive UI** that makes learning fun

---

## ✨ Features

### 🔐 **Authentication System**
- User registration and login
- Secure session management with JWT tokens
- Password protection (optional)
- Session persistence

### 🎮 **Gamified Learning Experience**
- **4 Learning Modules** (Planets):
  - 🟡 **Savings** - Learn about budgeting and emergency funds
  - 🟢 **Habits** - Develop healthy financial behaviors
  - 🔴 **Investments** - Understand basic investment principles
  - 🔒 **Solutions** - Coming soon (locked)

### 📝 **Interactive Quizzes**
- Diagnostic trivia (initial assessment)
- Module-specific quizzes (3 questions each)
- Real-time scoring system
- Instant feedback on answers
- Progress tracking

### 🎨 **Premium UI/UX**
- Space-themed design with animated starfield
- Responsive layout for all devices
- Smooth transitions between views
- Capybara astronaut mascot
- Accessibility features

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Vanilla CSS** - Styling (no frameworks)
- **HTML5 Canvas** - Star animations
- **ES6+** - Modern JavaScript

### **Backend**
- **Python 3.10+** - Programming language
- **FastAPI** - Modern web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **JSON Storage** - Simple file-based database

### **Additional Tools**
- **CORS** - Cross-origin resource sharing
- **JWT** - Token-based authentication
- **Git** - Version control

---

## 💻 System Requirements

Before installing, ensure you have:

| Software | Minimum Version | Download Link |
|----------|----------------|---------------|
| **Node.js** | 16.x or higher | [nodejs.org](https://nodejs.org/) |
| **npm** | 8.x or higher | Included with Node.js |
| **Python** | 3.10 or higher | [python.org](https://www.python.org/) |
| **pip** | 21.x or higher | Included with Python |
| **Git** | 2.x or higher | [git-scm.com](https://git-scm.com/) |

### Check Your Versions

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Python version
python --version

# Check pip version
pip --version

# Check Git version
git --version
```

---

## 📥 Installation Guide

Follow these steps carefully to set up the project on your local machine.

### **Step 1: Clone the Repository**

```bash
# Clone the project
git clone https://github.com/Bernardo-Mata/HackMTY-capital-one.git

# Navigate to project directory
cd HackMTY-capital-one
```

### **Step 2: Backend Setup**

#### 2.1 Navigate to Backend Directory

```bash
cd backend
```

#### 2.2 Create Virtual Environment (Recommended)

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt.

#### 2.3 Install Python Dependencies

```bash
pip install -r requirements.txt
```

**Expected packages:**
- fastapi
- uvicorn
- pydantic
- python-multipart

#### 2.4 Verify Storage Directory

The storage directory should already exist. Verify:

```bash
# Check if storage exists
ls app/storage/store.json

# If not, create it:
# On Windows
mkdir app\storage
echo {"users": {}, "sessions": {}} > app\storage\store.json

# On macOS/Linux
mkdir -p app/storage
echo '{"users": {}, "sessions": {}}' > app/storage/store.json
```

#### 2.5 Start Backend Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Expected output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Application startup complete.
```

✅ **Backend is now running on `http://localhost:8000`**

Keep this terminal open and proceed to frontend setup in a new terminal.

---

### **Step 3: Frontend Setup**

#### 3.1 Open New Terminal

Open a **new terminal window/tab** and navigate to the project:

```bash
cd HackMTY-capital-one/frontend
```

#### 3.2 Install Node Dependencies

```bash
npm install
```

**Expected packages:**
- react
- react-dom
- vite

This may take 1-2 minutes.

#### 3.3 Verify Environment Variables (if needed)

Check `src/services/authService.js` to ensure the API URL is correct:

```javascript
const API_URL = 'http://localhost:8000/api'
```

#### 3.4 Start Frontend Development Server

```bash
npm run dev
```

**Expected output:**
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

✅ **Frontend is now running on `http://localhost:5173`**

---

### **Step 4: Verify Installation**

#### 4.1 Check Backend API

Open your browser and visit:
```
http://localhost:8000/docs
```

You should see the **FastAPI interactive documentation** (Swagger UI) with these endpoints:
- `/api/auth/register`
- `/api/auth/login`
- `/api/auth/logout`
- `/api/auth/me`

#### 4.2 Check Frontend

Open your browser and visit:
```
http://localhost:5173
```

You should see the **FinancIA login page**.

---

## 🎮 Usage

### **First Time Setup**

1. **Register a New Account**
   - Click "Sign up here" on the login page
   - Enter a unique User ID (required)
   - Optionally add email, full name, and password
   - Click "Sign Up"

2. **Start Your Journey**
   - You'll be greeted with the "Start Journey" screen
   - Click "Start" to begin the diagnostic trivia

3. **Complete Diagnostic Trivia**
   - Answer 3 questions to assess your financial knowledge
   - Click on an option to select it
   - Click "Continue" to move to the next question
   - See your results at the end

4. **Explore the Universe**
   - Navigate to the Lessons page (planet selection)
   - Click on any unlocked planet to start a module:
     - **Savings** (yellow planet)
     - **Habits** (green planet)
     - **Investments** (red planet)
   - Complete module quizzes (3 questions each)
   - Return to the universe to explore more

5. **Logout**
   - Click "Logout" in the top-right corner of the Lessons page

---

## 📁 Project Structure

```
HackMTY-capital-one/
│
├── backend/                          # Backend application
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                   # FastAPI application entry point
│   │   │
│   │   ├── api/                      # API routes
│   │   │   ├── __init__.py
│   │   │   └── endpoints/
│   │   │       ├── __init__.py
│   │   │       ├── auth.py           # Authentication endpoints
│   │   │       ├── diagnostic.py     # Diagnostic endpoints
│   │   │       ├── feedback.py       # Feedback endpoints
│   │   │       ├── questions.py      # Questions endpoints
│   │   │       └── trivia.py         # Trivia endpoints
│   │   │
│   │   ├── core/                     # Core functionality
│   │   │   ├── __init__.py
│   │   │   └── core.py
│   │   │
│   │   ├── database/                 # Database models and connection
│   │   │   ├── __init__.py
│   │   │   ├── db.py
│   │   │   └── models.py
│   │   │
│   │   ├── service/                  # Business logic
│   │   │   └── storage.py
│   │   │
│   │   └── storage/                  # JSON file storage
│   │       └── store.json            # User and session data
│   │
│   └── requirements.txt              # Python dependencies
│
├── frontend/                         # Frontend application
│   ├── public/                       # Static assets
│   │   └── favicon.svg               # Capybara favicon
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   └── imagenes-planetas/    # Planet and character images
│   │   │       ├── capibara.png      # Capybara astronaut mascot
│   │   │       ├── savings.png       # Savings planet
│   │   │       ├── habits.png        # Habits planet
│   │   │       ├── investments.png   # Investments planet
│   │   │       └── lock.png          # Locked planet icon
│   │   │
│   │   ├── components/               # React components
│   │   │   ├── Login.jsx             # Login page
│   │   │   ├── Register.jsx          # Registration page
│   │   │   ├── startjourney.jsx      # Welcome/onboarding screen
│   │   │   ├── lessons.jsx           # Main universe/planet selection
│   │   │   │
│   │   │   └── trivia/               # Trivia components
│   │   │       ├── trivia.jsx        # Main trivia controller
│   │   │       ├── Question.jsx      # Individual question component
│   │   │       ├── ResultsTrivia.jsx # Results/feedback screen
│   │   │       └── questions.js      # Question database
│   │   │
│   │   ├── services/                 # API services
│   │   │   └── authService.js        # Authentication service
│   │   │
│   │   ├── App.jsx                   # Main app component (router)
│   │   ├── App.css                   # Global styles
│   │   ├── main.jsx                  # App entry point
│   │   └── index.css                 # Base CSS
│   │
│   ├── index.html                    # HTML template
│   ├── package.json                  # Node dependencies
│   ├── vite.config.js                # Vite configuration
│   └── eslint.config.js              # ESLint configuration
│
└── README.md                         # This file
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication Endpoints

#### **POST** `/auth/register`
Register a new user.

**Request Body:**
```json
{
  "user_id": "string (required)",
  "password": "string (optional)",
  "email": "string (optional)",
  "full_name": "string (optional)"
}
```

**Response:**
```json
{
  "user_id": "string",
  "access_token": "string",
  "token_type": "bearer",
  "message": "User registered successfully"
}
```

---

#### **POST** `/auth/login`
Authenticate an existing user.

**Request Body:**
```json
{
  "user_id": "string",
  "password": "string (optional)"
}
```

**Response:**
```json
{
  "access_token": "string",
  "token_type": "bearer",
  "user_id": "string",
  "message": "Login successful"
}
```

---

#### **POST** `/auth/logout`
Invalidate current session.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "message": "Logout successful",
  "status": "ok"
}
```

---

#### **GET** `/auth/me`
Get current user information.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "user_id": "string",
  "email": "string",
  "full_name": "string",
  "created_at": "string",
  "diagnostic_completed": "boolean",
  "progress": {
    "current_module": "string",
    "completed_modules": ["array"],
    "total_score": "number"
  }
}
```

---

### Interactive Documentation

For complete API documentation with live testing:
```
http://localhost:8000/docs
```

---

## 📊 Quiz Categories & Questions

### **Diagnostic** (Initial Assessment)
3 questions covering general financial knowledge

### **Savings** (Yellow Planet)
3 questions about:
- Emergency funds
- Budgeting strategies
- Saving habits

### **Habits** (Green Planet)
3 questions about:
- Expense tracking
- Budget management
- Purchase planning

### **Investments** (Red Planet)
3 questions about:
- Investment risks
- Decision-making processes
- Stock market basics

---

## 🗺️ Roadmap

### ✅ **Phase 1: MVP (Current)**
- [x] Authentication system
- [x] 4 modules (3 unlocked)
- [x] 12 total questions
- [x] Basic scoring system
- [x] Responsive UI

### 🚧 **Phase 2: Enhancement**
- [ ] User profiles and avatars
- [ ] Leaderboard system
- [ ] Achievement badges
- [ ] Module completion certificates
- [ ] Email notifications

### 🔮 **Phase 3: Expansion**
- [ ] More modules (debt management, credit, taxes)
- [ ] Video lessons
- [ ] Community features
- [ ] Mobile app (React Native)
- [ ] Multi-language support

### 🎯 **Phase 4: Advanced**
- [ ] AI-powered personalized learning paths
- [ ] Real-time multiplayer quizzes
- [ ] Integration with financial APIs
- [ ] Analytics dashboard
- [ ] Premium subscription tier

---

## 🐛 Troubleshooting

### **Backend Issues**

**Problem:** Port 8000 already in use
```bash
# Solution: Kill the process using port 8000
# On Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# On macOS/Linux
lsof -ti:8000 | xargs kill -9
```

**Problem:** Module not found errors
```bash
# Solution: Ensure virtual environment is activated
# and dependencies are installed
pip install -r requirements.txt
```

**Problem:** CORS errors
```bash
# Solution: Check that frontend URL is in CORS allowed origins
# in backend/app/main.py
allow_origins=["http://localhost:5173"]
```

---

### **Frontend Issues**

**Problem:** Port 5173 already in use
```bash
# Solution: Vite will automatically use next available port
# Or specify a different port:
npm run dev -- --port 3000
```

**Problem:** API connection errors
```bash
# Solution: Verify backend is running and URL is correct
# Check src/services/authService.js
const API_URL = 'http://localhost:8000/api'
```

**Problem:** Module resolution errors
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

### **Common Issues**

**Problem:** "Token invalid" errors
```bash
# Solution: Clear localStorage and login again
# In browser DevTools Console:
localStorage.clear()
# Then refresh page
```

**Problem:** Blank page on frontend
```bash
# Solution: Check browser console for errors
# Open DevTools (F12) and check Console tab
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 👥 Team

**FinancIA Development Team**

- **Bernardo Mata** - *Full Stack Developer* - [@Bernardo-Mata](https://github.com/Bernardo-Mata)

---

## 📧 Contact

**Project Link:** [https://github.com/Bernardo-Mata/HackMTY-capital-one](https://github.com/Bernardo-Mata/HackMTY-capital-one)

**Repository:** HackMTY-capital-one

---

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Montserrat Font](https://fonts.google.com/specimen/Montserrat) - Typography
- Capybara astronaut concept inspired by space exploration themes
- Capital One - Hackathon sponsor

---

## 📈 Stats

![GitHub stars](https://img.shields.io/github/stars/Bernardo-Mata/HackMTY-capital-one?style=social)
![GitHub forks](https://img.shields.io/github/forks/Bernardo-Mata/HackMTY-capital-one?style=social)
![GitHub issues](https://img.shields.io/github/issues/Bernardo-Mata/HackMTY-capital-one)

---

<div align="center">

**Made with ❤️ for financial education**

**HackMTY 2025 - Capital One Challenge**

**[⬆ Back to Top](#-financia---gamified-financial-education-platform)**

</div>