import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LoaderComponent } from "../../components/Loader";
import StudentSignupLayout from "@src/layouts/StudentSignup.Layout";
import { useVerifyEmailMutation } from "@src/redux/services/auth.service";
import { ROUTES } from "@src/utils/constants";
import { motion } from "framer-motion";

const buttonClass = `w-[100%] bg-[#B3322F] hover:bg-[#C94541] mt-5 py-2 text-white rounded-full cursor-pointer`;

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [verifyEmail, { isSuccess, isError }] = useVerifyEmailMutation();

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        toast.error("Verification token is missing.");
        setLoading(false);
        return;
      }

      try {
        await verifyEmail({ token });
      } catch (err) {
        console.error("Unexpected error:", err);
        toast.error("An unexpected error occurred during verification.");
      }
      setLoading(false);
    };

    verify();
  }, [token, verifyEmail, navigate]);


  return (
    <StudentSignupLayout>
      {loading && (
        <>
          <div className="flex items-start gap-3 mx-auto mt-3">
            <div className="w-6 h-6 min-w-6 bg-[#B3322F] rounded-full shadow-lg border-6 border-white flex-shrink-0 mb-10" />
            <p className="text-sm text-gray-700">
              Verifying your email. Please wait a moment. Once verification is complete, you'll be able to log in...
            </p>
          </div>
          <LoaderComponent />
        </>
      )}

      {isError && !loading && (
        <>
          <div className="flex items-start gap-3 mx-auto mt-3">
            <div className="w-6 h-6 min-w-6 bg-[#B3322F] rounded-full shadow-lg border-6 border-white flex-shrink-0" />
            <p className="text-sm text-gray-700">
              Verification code is expired? You can resend it.
            </p>
          </div>

          <div className="text-center">
            <motion.button
              type="button"
              onClick={() => navigate(ROUTES.RESEND_VERIFICATION)}
              className={buttonClass}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Request Verfication Code
            </motion.button>
          </div>
        </>
      )}

      {isSuccess && !loading && (
        <div className="text-center">
          <div className="flex items-start gap-3 mx-auto mt-3">
            <div className="w-6 h-6 min-w-6 bg-[#28A745] rounded-full shadow-lg border-6 border-white flex-shrink-0" />
            <p className="text-sm text-gray-700">
              Your email has been verified successfully. You may now log in.
            </p>
          </div>


          <motion.button
            type="button"
            onClick={() => navigate(ROUTES.LOGIN)}
            className={buttonClass}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Login
          </motion.button>

        </div>
      )}
    </StudentSignupLayout>
  );
};
export default VerifyEmail;
