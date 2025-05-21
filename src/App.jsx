import { Routes, Route, Navigate, Link } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import QuizSelectorPage from "./pages/quizSelectorPage";
import QuizPage from "./pages/quizPage";
import QuestionPage from "./pages/questionPage";
import ProtectedRoute from "./ProtectedRoute";
import ResultsPage from "./pages/resultsPage";
import "./App.css";

//import { useTheme } from "./context/themeContext"

/*
Flujo:                                      Componente
1. Login (loginPage) 
2. QuizSelector (quizSelectorPage)          QuizSelectorCard (se le pasa el quiz y redirige a /quiz/:id_quiz)
3. Quiz (quizPage)                          QuizCard (se le pasa el quiz y redirige a /quiz/:id_quiz/question/:id_question)
4. Question (questionPage)                  QuestionCard(Se le pasa la pregunta y decide si es multiple o test), MultipleQuestion(Se le pasa el id y las opciones), TestQuestion(Se le pasa el id y el usuario)
5. Result (resultPage) -> No implementado

*/

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
  