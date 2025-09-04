import LoginForm from "@src/pages/authentication/forms/LoginForm";
import SignupForm from "@src/pages/authentication/forms/SignupForm";
import { motion } from "framer-motion";

export const LoginAndSignup: React.FC<{
    showLoginForm: boolean,
    setShowLoginForm: (value: boolean) => void
}> = ({ showLoginForm, setShowLoginForm }) => {

    return (
        <>
            <div className="bg-[radial-gradient(circle_at_top_left,_#681f1c,_#4D1614)] text-white py-20 flex items-center justify-center">

                <div className="bg-[#B3322F] py-10 w-full md:w-[90%] rounded-3xl px-5 md:px-0 mx-5 md:mx-0">
                    {/* SignupForm */}
                    <div className=" py-10   mx-auto" id="loginAndSignupForm">
                        <SignupForm />
                    </div>
                    {/* LoginForm */}
                    <motion.div
                        animate={{
                            opacity: [1, 0.4, 1, 0.2, 1], // flicker steps
                        }}
                        transition={{
                            duration: 1.5,     // total duration of one flicker loop
                            repeat: Infinity,  // repeat forever
                            ease: "easeInOut",
                            times: [0, 0.2, 0.5, 0.7, 1], // control when opacity changes
                        }}

                        onClick={() => setShowLoginForm(true)} className="text-4xl text-center mb-10">Already have an account?</motion.div>
                    {showLoginForm && (
                        <motion.div
                            key="login-form"
                            initial={{ opacity: 0, y: 30 }}   // starting state
                            animate={{ opacity: 1, y: 0 }}   // animate to this
                            exit={{ opacity: 0, y: 30 }}     // animate out
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="w-full md:w-[50%] lg:w-[40%] xl:w-[30%] mx-auto"
                        >
                            <LoginForm />
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    )
}