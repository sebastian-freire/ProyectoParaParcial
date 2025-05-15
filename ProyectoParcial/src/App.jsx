import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import QuizSelectorPage from "./pages/quizSelectorPage";
import QuizPage from "./pages/quizPage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Navigate replace to="/login" />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/quiz_selector" element={<QuizSelectorPage />} />

        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </>
  );
}

export default App;
