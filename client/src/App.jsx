import { Route, Routes } from "react-router-dom";

import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import EmailVerifyPage from "./pages/EmailVerifyPage";

import { Toaster } from "react-hot-toast";

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
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              padding: "4px 10px",
              color: "#713200",
              borderRadius: "5px",
            },
            success: {
              style: {
                border: "1px solid #301934",
              },
            },
            error: {
              style: {
                border: "1px solid #D22B2B",
              },
            },
          }}
        />
      </main>
    </>
  );
}

export default App;
