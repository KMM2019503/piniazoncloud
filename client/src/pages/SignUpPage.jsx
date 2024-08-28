import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Logo from "../assets/images/Logo.jpeg";
import Input from "../components/ui/Input";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { MdPassword } from "react-icons/md";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrenthMeter";
import ButtonLoader from "../components/ui/ButtonLoader";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
  const navigate = useNavigate();

  const { signup, isLoading } = useAuthStore();

  // Define your validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    username: Yup.string()
      .required("User Name is required")
      .min(5, "User Name must be at least 5 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  // Integrate validation schema into useForm
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const password = watch("password", "");

  const onSubmit = async (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    try {
      await signup({
        email: data.email,
        password: data.password,
        username: data.username,
      });
      navigate("/email-verify");
    } catch (error) {
      console.log(error);
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
          <div className="flex justify-center items-center mb-2 gap-5">
            <img
              src={Logo}
              alt="Logo"
              className="size-20 rounded-full object-fill"
              loading="lazy"
            />
            <div>
              <div className="text-xl md:text-lg text-yellow-600 ">
                <strong className="text-orange-700 tracking-widest text-2xl">
                  Piniaz
                </strong>{" "}
                <span className="font-Jersey">On</span>{" "}
                <strong className="text-orange-700 tracking-widest text-2xl">
                  Cloud
                </strong>
              </div>
              <p className="text-xl font-light font-Jersey text-gray-300 tracking-wider">
                Create Your Account for Free
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 font-Jersey">
            {errors.email && <InputErrorMessage text={errors.email.message} />}
            <Input
              icon={MdOutlineMarkEmailRead}
              type="email"
              placeholder="Email"
              {...register("email")}
            />

            {errors.username && (
              <InputErrorMessage text={errors.username.message} />
            )}
            <Input
              icon={IoPersonOutline}
              type="text"
              placeholder="User Name"
              {...register("username")}
            />

            {errors.password && (
              <InputErrorMessage text={errors.password.message} />
            )}
            <Input
              icon={MdPassword}
              type="password"
              placeholder="Password"
              {...register("password")}
            />

            <PasswordStrengthMeter password={password} />

            <motion.button
              className="mt-3 w-full py-3 px-4 bg-gradient-to-r from-secondary-dark to-secondary text-white 
            font-bold rounded-lg shadow-lg  focus:outline-none focus:ring-2 focus:ring-secondary-light focus:ring-offset-2
             focus:ring-offset-gray-900 transition ease-in-out tracking-widest"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <ButtonLoader /> : "Sign Up"}
            </motion.button>
          </form>
        </div>

        <div className="px-8 py-4 flex flex-col justify-center items-center font-Jersey bg-zinc-900 pb-6">
          <p className="text-lg md:text-base text-gray-400">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-secondary-light hover:underline tracking-wider"
            >
              Login
            </Link>
          </p>
          <p className="text-gray-600 text-xs font-nerko">
            © PiniazOnCloud x Piniaz 2024
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
