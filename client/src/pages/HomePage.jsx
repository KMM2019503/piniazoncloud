import { useNavigate } from "react-router-dom";

import Loading from "../components/ui/Loading";
import { useAuthStore } from "../store/authStore";

const HomePage = () => {
  const navigate = useNavigate();
  const { logout, isLoading, user } = useAuthStore();

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
    <div className="text-center border-gray-400 border p-10 rounded-md">
      <p>{user?.username}</p>
      <p>{user?.isVerified ? "User is Verified" : "User is not Verified"}</p>
      <button
        onClick={onLogout}
        className="border border-gray-400 px-4 py-1 rounded-lg cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;
