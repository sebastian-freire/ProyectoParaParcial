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
      <Link to="/login">Ir a login</Link>
      <Link to="/quiz_selector">Ir a Quiz Selector</Link>
      <h3>Prueba de Usuario: {user}</h3>
      <Routes>
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
          path="/quiz/:id"
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/question/:id"
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
