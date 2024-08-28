import { Route, Routes } from "react-router-dom";

import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import EmailVerifyPage from "./pages/EmailVerifyPage";

function App() {
  return (
    <>
      <main className="min-h-svh bg-gradient-to-tr from-primary-dark via-primary-dark to-secondary-dark flex items-center justify-center relative overflow-hidden text-gray-300">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/email-verify" element={<EmailVerifyPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
