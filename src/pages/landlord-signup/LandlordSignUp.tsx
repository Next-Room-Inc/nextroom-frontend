import LandlordSignupLayout from "@src/layouts/LandlordSignUp.Layout";
import { useFormik } from "formik";
import { LandlordSignUpAuth } from "./components/LandlordSignUpAuth";
import { BasicDetails } from "./components/BasicDetails";
import { EmailVerification } from "./components/EmailVerification";
import { IdentityVerification } from "./components/IdentityVerification";
import { AIVerification } from "./components/AiVerification";
import { CheckIcon } from "@heroicons/react/20/solid";

const LandlordSignUp = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      title: "",
      companyName: "",
      ownership: "",
      propertiesCount: "",
      alternativeEmail: "",
      alternativePhoneNumber: "",
      step: 1,
    },
    validationSchema: "",
    onSubmit: () => { },
  });

  const currentStep = formik.values.step;

  const goToNextStep = () => {
    formik.setFieldValue("step", currentStep + 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <LandlordSignUpAuth formik={formik} onNext={goToNextStep} />;
      case 2:
        return <BasicDetails formik={formik} onNext={goToNextStep} />;
      case 3:
        return <EmailVerification formik={formik} onNext={goToNextStep} />;
      case 4:
        return <IdentityVerification formik={formik} onNext={goToNextStep} />;
      case 5:
        return <AIVerification formik={formik} onNext={goToNextStep} />;
      default:
        return <div>All done!</div>;
    }
  };

  return (
    <LandlordSignupLayout>
      {currentStep === 1 ? null : (
        <div className="md:flex flex-col md:flex-row items-center justify-between w-full px-4">
          {[1, 2, 3, 4].map((stepNum, index) => {
            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center relative"
              >
                {index !== 3 && (
                  <div className="absolute hidden md:block top-5 left-1/2 w-full h-[2px] bg-[#B3322F]" />
                )}
                <div
                  className={`flex items-center justify-center w-10 h-10 md:mt-0 rounded-full border-2 z-10 ${currentStep > stepNum
                      ? "bg-[#B3322F] border-[#B3322F] text-white"
                      : "bg-white border-[#B3322F] text-[#B3322F]"
                    }`}
                >
                  <CheckIcon className="w-5" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Dynamic Form Content */}
      {renderStepContent()}
    </LandlordSignupLayout>
  );
};

export default LandlordSignUp;
