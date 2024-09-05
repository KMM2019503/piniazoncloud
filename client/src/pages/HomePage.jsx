import { useNavigate } from "react-router-dom";

import Loading from "../components/ui/Loading";
import { useAuthStore } from "../store/authStore";

const HomePage = () => {
  const navigate = useNavigate();
  const { logout, isLoading, user, isAuthenticated } = useAuthStore();

  const onLogout = async (event) => {
    event.preventDefault();
    console.log("Logout button clicked");
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
    <div className="max-w-md w-full h-svh md:h-auto bg-blue-950 bg-opacity-20 backdrop-filter backdrop-blur-3xl md:rounded-xl shadow-2xl overflow-hidden flex flex-col items-center p-5">
      <p>{user?.username}</p>
      <p>
        {isAuthenticated
          ? "User is Authenticated"
          : "User is not Authenticated"}
      </p>

      <p>{user?.isVerified ? "User is Verified" : "User is not Verified"}</p>
      <button
        disabled={isLoading}
        onClick={onLogout}
        className="border border-gray-400 px-4 py-1 rounded-lg cursor-pointer mt-5 hover:bg-gray-800 w-full"
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;
