import { Routes, Route, Navigate, Link } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import QuizSelectorPage from "./pages/quizSelectorPage";
import QuizPage from "./pages/quizPage";
import QuestionPage from "./pages/questionPage";
import CreateQuestion from "./pages/createQuestion";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";
import ResultsPage from "./pages/resultsPage";

import { useTheme } from "./context/themeContext";

import { useUser } from "./context/userContext";
import { useEffect } from "react";

function App() {
  const { user } = useUser();

  const { darkMode, toggleHandle } = useTheme();

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  return (
    <>
      <button onClick={toggleHandle} className="theme">
        {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>

      <h4>Usuario logeado: {user}</h4>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/quiz_selector"
          element={
            <ProtectedRoute>
              <QuizSelectorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:id_quiz"
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz/:id_quiz/create_question"
          element={
            <ProtectedRoute>
              <CreateQuestion />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz/:id_quiz/question/:id_question"
          element={
            <ProtectedRoute>
              <QuestionPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <ResultsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
