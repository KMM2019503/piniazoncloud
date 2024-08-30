import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import Loading from "../components/ui/Loading";

const HomePage = () => {
  const navigate = useNavigate();
  const { logout, user, checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    const authenticate = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.log("🚀 ~ authenticate ~ error:", error);
        navigate("/login");
      }
    };

    authenticate();
  }, []);

  const onLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("🚀 ~ onLogout ~ error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <p>{user?.username}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
