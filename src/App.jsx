import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import WizardWrapper from "./wizard/WizardWrapper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Si estoy en "/", redirige automáticamente a "/wizard/step1" */}
        <Route path="/" element={<Navigate to="/wizard/Usuario" />} />
        <Route path="/wizard/*" element={<WizardWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
