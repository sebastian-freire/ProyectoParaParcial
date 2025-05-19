import { Routes, Route, Navigate, Link } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import QuizSelectorPage from "./pages/quizSelectorPage";
import QuizPage from "./pages/quizPage";
import QuestionPage from "./pages/questionPage";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

import { useUser } from "./context/userContext";

function App() {
  const { user } = useUser();
  return (
    <>
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
          path="/question/:id_question"
          element={
            <ProtectedRoute>
              <QuestionPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
