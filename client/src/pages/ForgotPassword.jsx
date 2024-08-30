import { motion } from "framer-motion";
import ButtonLoader from "../components/ui/ButtonLoader";
import Logo from "../assets/images/Logo.jpeg";
import { useAuthStore } from "../store/authStore";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import Input from "../components/ui/Input";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { useState } from "react";
import toast from "react-hot-toast";

// import { useAuthStore } from "../store/authStore";

const ForgotPasswrod = () => {
  const { isLoading } = useAuthStore();
  const [isError, setIsError] = useState();
  const [isSuccess, setIsSuccess] = useState();

  const API_URL = "http://localhost:3007/api/auth";

  // Define your validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  // Integrate validation schema into useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error signing up");
      }

      const responseData = await response.json();
      toast.success("Reset link has been sent to your email.");
      setIsSuccess(responseData.success);
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error.message);
      setIsError(error.message);
    }
  };

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

          {isSuccess ? (
            <h2 className="my-2 text-2xl tracking-widest">Check Your Mail</h2>
          ) : (
            <h2 className="my-2 text-2xl tracking-widest">Forgot password?</h2>
          )}
          {!isError ||
            (!isSuccess && (
              <p className="my-2 text-xs tracking-wider font-sans text-nowrap">
                No worries, we&apos;ll send you reset password link to your
                email
              </p>
            ))}

          {isError && (
            <p className="my-2 text-xs tracking-wider font-sans text-red-500">
              {isError}
            </p>
          )}

          {isSuccess && (
            <p className="my-2 text-sm tracking-wider font-sans text-nowrap ">
              A password reset link has been sent to your email.
            </p>
          )}

          {!isSuccess && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-5 font-Jersey"
            >
              {errors.email && (
                <InputErrorMessage text={errors.email.message} />
              )}
              <Input
                icon={MdOutlineMarkEmailRead}
                type="email"
                placeholder="Account Email"
                {...register("email")}
              />

              <motion.button
                className="mt-3 w-full py-3 px-4 bg-gradient-to-r from-secondary-dark to-secondary text-white 
            font-bold rounded-lg shadow-lg  focus:outline-none focus:ring-2 focus:ring-secondary-light focus:ring-offset-2
             focus:ring-offset-gray-900 transition ease-in-out tracking-widest"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <ButtonLoader /> : "Sent Email"}
              </motion.button>
            </form>
          )}
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
export default ForgotPasswrod;
