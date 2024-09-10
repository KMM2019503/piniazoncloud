import { Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense, lazy, useMemo, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import Loading from "./components/ui/Loading";

import PropTypes from "prop-types";
import ImagePage from "./pages/ImagePage";

const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LogInPage = lazy(() => import("./pages/LogInPage"));
const EmailVerifyPage = lazy(() => import("./pages/EmailVerifyPage"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPasswrod"));

const ProtectedRoute = React.memo(({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/email-verify" replace />;
  }

  return children;
});

ProtectedRoute.displayName = "ProtectedRoute";

// Prop validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

const RedirectUser = React.memo(({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
});
RedirectUser.displayName = "RedirectUser";

RedirectUser.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  const { checkAuth, isLoading, user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const renderRoutes = useMemo(
    () => (
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
          path="/image/:imageId"
          element={
            <ProtectedRoute>
              <ImagePage />
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
              <ForgotPassword />
            </RedirectUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectUser>
              <ResetPassword />
            </RedirectUser>
          }
        />
      </Routes>
    ),
    [isAuthenticated, user]
  );

  if (isLoading) {
    return (
      <div className="min-h-svh flex items-center justify-center relative overflow-hidden text-gray-300 bg-secondary-dark">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <main className="min-h-svh flex  relative overflow-hidden text-gray-300 bg-black">
        <div className="absolute inset-0 h-full w-full bg-black bg-[radial-gradient(#7A1CAC_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,transparent_1%,black)] z-0"></div>
        <Suspense fallback={<Loading />}>{renderRoutes}</Suspense>
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
