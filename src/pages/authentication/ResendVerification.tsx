import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { LoaderComponent } from "../../components/Loader";
import StudentSignupLayout from "@src/layouts/StudentSignup.Layout";
import { useResendVerificationMutation } from "@src/redux/services/auth.service";
import { ROUTES } from "@src/utils/constants";
import { ResendVerificationSchema } from "@src/utils/schemas/auth.schema";


const inputClass = `block w-full rounded-full  drop-shadow-md shadow-lg bg-white px-3 py-2 text-base text-gray-900 outline  placeholder:text-gray-400 sm:text-sm/6`;
const buttonClass = `w-[100%] bg-[#B3322F] hover:bg-[#C94541] mt-5 py-2 text-white rounded-full `;

const ResendVerification = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [resendVerification, { isSuccess }] = useResendVerificationMutation();


  // Submit Resend Code

  const handleSubmit = async (values: any) => {
    setLoading(true)
    try {
      const res = await resendVerification(values);
      const errorMessage = (res.error as any)?.data ?? "Resend Verification Failed";
      if (res.error) toast.error(errorMessage);
      else {
        toast.success("If your account is unverified, a new verification email has been sent!");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred");
    }
    setLoading(false)
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: toFormikValidationSchema(ResendVerificationSchema),
    onSubmit: handleSubmit,
  });

  return (
    <>
      <StudentSignupLayout>
        <form onSubmit={formik.handleSubmit}>


          {loading && (
            <>
              <div className="flex items-start gap-3 mx-auto mt-3">
                <div className="w-6 h-6 min-w-6 bg-[#B3322F] rounded-full shadow-lg border-6 border-white flex-shrink-0 mb-10" />
                <p className="text-sm text-gray-700">
                  Please wait a moment...
                </p>
              </div>
              <LoaderComponent />
            </>
          )}



          {(isSuccess && !loading) && (
            <div className="text-center">
              <div className="flex items-start gap-3 mx-auto mt-3">
                <div className="w-6 h-6 min-w-6 bg-[#28A745] rounded-full shadow-lg border-6 border-white flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  Your email has been verified successfully. You may now log in.
                </p>
              </div>


              <motion.button
                className={buttonClass}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                type="button"
                onClick={() => navigate(ROUTES.LOGIN)}
              >
                Login
              </motion.button>

            </div>
          )}


          {!isSuccess && !loading && (
            <>
              {/* Info Message */}
              <div className="flex items-start gap-3 mx-auto mt-3">
                <div className="w-6 h-6 min-w-6 bg-[#B3322F] rounded-full shadow-lg border-6 border-white flex-shrink-0" />
                <p className="text-[14px] tracking-tight leading-snug text-gray-700">
                  Didn’t receive the verification code or it's expired? You can resend it below.
                </p>
              </div>

              {/* Alternative Email Input */}
              <div className="flex flex-col gap-4 pt-8 pb-4">
                <input
                  placeholder="Enter email to resend verification"
                  id="email"
                  name="email"
                  type="text"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${inputClass} ${formik.touched.email && formik.errors.email
                    ? "outline-red-600"
                    : "outline-white"
                    }`}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-sm text-red-600 ml-5 -mt-2">{formik.errors.email}</div>
                ) : null}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={buttonClass}
                  type="submit" >
                  Resend Code
                </motion.button>
              </div>
            </>
          )}

        </form>
      </StudentSignupLayout>
    </>

  );
};

export default ResendVerification;
