import { Navigate, Route, Routes } from "react-router-dom";

import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import EmailVerifyPage from "./pages/EmailVerifyPage";

import { Toaster } from "react-hot-toast";
import ForgotPasswrod from "./pages/ForgotPassword";
import ResetPasswrod from "./pages/ResetPasswrod";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import Loading from "./components/ui/Loading";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/email-verify" replace />;
  }

  return children;
};

const RedirectUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-svh flex items-center justify-center relative overflow-hidden text-gray-300 bg-secondary-dark">
        <Loading />
      </div>
    );
  }
  return (
    <>
      {/* <main className="min-h-svh bg-gradient-to-tr from-primary-dark via-primary-dark to-secondary-dark flex items-center justify-center relative overflow-hidden text-gray-300"> */}
      <main className="min-h-svh flex items-center justify-center relative overflow-hidden text-gray-300 bg-black">
        <div className="absolute inset-0 h-full w-full bg-black bg-[radial-gradient(#7A1CAC_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,transparent_1%,black)] z-0"></div>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectUser>
                <SignUpPage />
              </RedirectUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectUser>
                <LogInPage />
              </RedirectUser>
            }
          />
          <Route
            path="/email-verify"
            element={
              <RedirectUser>
                <EmailVerifyPage />
              </RedirectUser>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <RedirectUser>
                <ForgotPasswrod />
              </RedirectUser>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <RedirectUser>
                <ResetPasswrod />
              </RedirectUser>
            }
          />
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
