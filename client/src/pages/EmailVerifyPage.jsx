import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../components/ui/ButtonLoader";
import Logo from "../assets/images/Logo.jpeg";
import { useAuthStore } from "../store/authStore";

const EmailVerifyPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const { error, isLoading, verifyToken } = useAuthStore();

  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyToken(verificationCode);
      navigate("/");
      // toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      className="max-w-md w-full h-svh md:h-auto bg-blue-950 bg-opacity-20 backdrop-filter backdrop-blur-3xl md:rounded-xl shadow-2xl overflow-hidden flex items-end"
    >
      <div className="w-full">
        <div className="py-5 px-6">
          <div className="flex justify-around items-center mb-2 gap-5">
            <img
              src={Logo}
              alt="Logo"
              className="size-20 rounded-full object-fill"
              loading="lazy"
            />
          </div>
          <p className="my-2 text-sm tracking-wider">
            We&apos;ve sent a verification code to your email.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="6"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-secondary-light focus:outline-none"
                />
              ))}
            </div>
            {error && (
              <p className="text-red-500 font-semibold mt-2">{error}</p>
            )}
            <motion.button
              className="mt-3 w-full py-3 px-4 bg-gradient-to-r from-secondary-dark to-secondary text-white 
            font-bold rounded-lg shadow-lg  focus:outline-none focus:ring-2 focus:ring-secondary-light focus:ring-offset-2
             focus:ring-offset-gray-900 transition ease-in-out tracking-widest"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <ButtonLoader /> : "Verify"}
            </motion.button>
          </form>
        </div>
        <div className="px-8 py-4 flex flex-col justify-center items-center font-Jersey bg-zinc-900 pb-6">
          <p className="text-xs md:text-sm tracking-wider mb-1 text-yellow-700">
            If you can&apos;t find our email, please check your spam folder.
          </p>
          <p className="text-gray-600 text-xs font-nerko">
            © PiniazOnCloud x Piniaz 2024
          </p>
        </div>
      </div>
    </motion.div>
  );
};
export default EmailVerifyPage;
