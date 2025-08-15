import { useNavigate } from "react-router-dom";
import { ROUTES } from "@src/utils/constants";
import { motion } from "framer-motion";

const SignupOrLoginModal: React.FC<{
  text: string;
}> = ({ text }) => {
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white text-xl rounded-lg overflow-hidden max-w-3xl w-full flex flex-col text-[#B3322F] text-center items-center py-15 shadow-2xl">
        <p><span className="font-bold">Sign Up</span> Or <span className="font-bold">Login</span> To {text}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(ROUTES.LOGIN)}
          className="bg-[#B3322F] text-sm mt-6 py-2 px-10 rounded-full w-fit mx-auto font-semibold text-white cursor-pointer"
        >
          Sign Up / Login
        </motion.button>
      </div>
    </div>
  );
};

export default SignupOrLoginModal;
