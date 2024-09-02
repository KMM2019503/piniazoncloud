import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Logo from "../assets/images/Logo.jpeg";
import Input from "../components/ui/Input";
import { MdPassword } from "react-icons/md";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrenthMeter";
import ButtonLoader from "../components/ui/ButtonLoader";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const { resetPassword, isLoading } = useAuthStore();

  // Define your validation schema
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("New Password is required")
      .min(8, "New Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
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
    try {
      await resetPassword(token, data.password);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
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
                Reset Your Account Password
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 font-Jersey">
            {errors.password && (
              <InputErrorMessage text={errors.password.message} />
            )}
            <Input
              icon={MdPassword}
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.confirmPassword && (
              <InputErrorMessage text={errors.confirmPassword.message} />
            )}
            <Input
              icon={MdPassword}
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
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
              {isLoading ? <ButtonLoader /> : "Submit"}
            </motion.button>
          </form>
        </div>

        <div className="px-8 py-4 flex flex-col justify-center items-center font-Jersey bg-zinc-900 pb-6">
          <p className="text-gray-600 text-xs font-nerko">
            © PiniazOnCloud x Piniaz 2024
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
