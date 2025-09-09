import * as motion from "motion/react-client";
import { FormikProps } from "formik";

const transitionVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
};

type Step = {
    name: string;
    label: string;
};

export const FormStepper: React.FC<{
    formik: FormikProps<any>;
    section: string;
    setSection: (section: string) => void;
    steps: Step[];
    color?: string | null
}> = ({ formik, section, steps, color = "B3322F" }) => {
    const totalSteps = steps.length;

    return (
        <div>
            <div className="text-center flex items-center justify-center gap-3  ">
                {steps.map((step, index) => {
                    const isActive = section === step.name;
                    const isCompleted = formik?.values?.step > index;
                    const className = totalSteps === 4 ?
                        `${isActive ? "w-[70%]" : "w-[10%]"} md:w-[25%] group` :
                        `${isActive ? "w-[70%]" : "w-[10%]"} md:w-[25%] group`;

                    return (
                        <div key={step.label + index}
                            className={className}
                        >

                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                className="w-full bg-[#D9D9D9] rounded-full h-8 overflow-hidden cursor-pointer"
                                role="button"
                                tabIndex={0}
                            // onClick={() => setSection(step.name)}
                            >
                                <motion.div
                                    className="w-full h-full"
                                    variants={transitionVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
                                >
                                    <motion.div
                                        style={{ backgroundColor: `#${color}` }}
                                        className={`  rounded-full h-full`}
                                        initial={{ width: "0%" }}
                                        animate={{ width: isCompleted ? "100%" : "0%" }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                    />
                                </motion.div>
                            </motion.div>

                            {/* Optional Step Label */}
                            {/* <div className={`text-sm mt-2 hidden md:block ${isActive ? "font-semibold text-[#B3322F]" : "text-gray-500"}`}    >
                                {step.label}
                            </div> */}
                            {/* <div className={`text-sm mt-2 hidden md:block "text-gray-500`} >
                                {step.label}
                            </div> */}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
