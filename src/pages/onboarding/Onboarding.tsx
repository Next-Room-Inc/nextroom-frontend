import { useState } from 'react';
import OnboardingLayout from '../../layouts/Onboarding.Layout';
import PropertySection from './PropertySection';
import { ExitConfirmationSection, transitionVariants } from './CommonComponents';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { motion } from 'framer-motion';
import { ICONS } from '../../utils/constants/app-info.constant';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import ReactConfetti from 'react-confetti';

interface AnswerSections {
    PROPERTY_SECTION: Record<string, unknown>;
    LIFE_STYLE_SECTION: Record<string, unknown>;
    ROOMMATES_SECTION: Record<string, unknown>;
    SITUATION_BASED_SECTION: Record<string, unknown>;
}

const Onboarding = () => {
    const [exitForm, setExitForm] = useState(false);
    const [section, setSection] = useState<keyof AnswerSections>('PROPERTY_SECTION');
    const [formStep, setFormStep] = useState({ PROPERTY_SECTION: 0, LIFE_STYLE_SECTION: 0, ROOMMATES_SECTION: 0, SITUATION_BASED_SECTION: 0 });
    const [answers, setAnswers] = useState<AnswerSections>({
        PROPERTY_SECTION: { RENTAL_TYPE: null, MOVE_IN_DATE: null, STAY_DURATION: null, MONTHLY_BUDGET: null, DISTANCE_FROM_CAMPUS: null, PREFERRED_LOCATION: null, RENTAL_PREFERENCE: null, BRINGING_ROOMMATES: null, ROOMMATE_COUNT: 0, NEED_ROOMMATE_MATCHING: null },
        LIFE_STYLE_SECTION: { RENTAL_TYPE: null },
        ROOMMATES_SECTION: { RENTAL_TYPE: null },
        SITUATION_BASED_SECTION: { RENTAL_TYPE: null },
    });

    const handleAnswer = (section: keyof AnswerSections, field: string, value: unknown) => {
        setAnswers(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
    };

    const changeStep = (delta: number) => {
        setFormStep(prev => ({ ...prev, [section]: Math.max(0, prev[section] + delta) }));
    };

    const nextStepHandler = () => {
        setFormStep((prevState) => ({
            ...prevState,
            [section]: prevState[section] + 1,
        }));
    };

    const previousStepHandler = () => {
        setFormStep((prevState) => ({
            ...prevState,
            [section]: prevState[section] > 0 ? prevState[section] - 1 : 0,
        }));
    };


    const payload = { answers, setAnswers, handleAnswer, section, setSection, changeStep, formStep, nextStepHandler, previousStepHandler };

    return (
        <>
            {section === 'PROPERTY_SECTION' && formStep[section] === 0 && <ReactConfetti numberOfPieces={400} />}
            <OnboardingLayout>
                {exitForm ? (
                    <ExitConfirmationSection setExitForm={setExitForm} />
                ) : (
                    <>
                        {(section !== 'PROPERTY_SECTION' || formStep[section] !== 0) && <FormStepper {...{ section, answers, setExitForm, setSection, formStep, changeStep }} />}
                        <motion.div className="mt-15" variants={transitionVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
                            {/* eslint-disable-next-line */}
                            {section === 'PROPERTY_SECTION' && <PropertySection {...payload} />}
                        </motion.div>
                    </>
                )}
            </OnboardingLayout>
        </>
    );
};

export default Onboarding;

const FormStepper: React.FC<{
    changeStep: (delta: number) => void;
    formStep: Record<string, number>;
    section: keyof AnswerSections;
    answers: AnswerSections;
    setExitForm: (value: boolean) => void;
    setSection: (value: keyof AnswerSections) => void;
}> = ({ changeStep, formStep, setSection, section, answers, setExitForm }) => {
    const hasAnsweredAnyQuestion = Object.values(answers[section]).some(answer => answer !== null);

    const totalQuestions = (sec: keyof AnswerSections) => Object.keys(answers[sec]).length || 1;
    const totalAnswered = (sec: keyof AnswerSections) => Object.values(answers[sec]).filter(ans => ans !== null).length;
    const steps = [
        { label: 'Property', name: 'PROPERTY_SECTION' },
        { label: 'Lifestyle', name: 'LIFE_STYLE_SECTION' },
        { label: 'Roommates', name: 'ROOMMATES_SECTION' },
        { label: 'Situation-Based', name: 'SITUATION_BASED_SECTION' },
    ];

    return (
        <>

            {formStep[section] > 0 && (
                <div className="text-sm font-bold flex items-center justify-end pr-10 -mb-5 text-[#B3322F] hover:text-[#b3312f6b] mt-4" onClick={() => changeStep(-1)}>
                    <ArrowLeftIcon className="h-5 mr-2" />
                    <span className="cursor-pointer">Previous Step</span>
                </div>
            )}

            <div className="text-center flex items-end gap-3 md:px-30 px-10">
                {steps.map((step, index) => {
                    const progress = (totalAnswered(step.name as keyof AnswerSections) / totalQuestions(step.name as keyof AnswerSections)) * 100;
                    return (
                        <div key={step.label + index} className="w-[25%] group">
                            <motion.div className="text-black hidden md:block py-1 group-hover:opacity-100 opacity-0 shadow-[#D9D9D9] mb-3 w-max px-6 mx-auto rounded-xl drop-shadow-md shadow-md bg-white">
                                {step.label}
                            </motion.div>
                            <motion.div className="w-full bg-[#D9D9D9] rounded-full h-8 overflow-hidden">
                                <motion.div onClick={() => setSection(step.name as keyof AnswerSections)} className="w-full h-full" variants={transitionVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}>
                                    <motion.div className="bg-[#B3322F] rounded-full h-full" initial={{ width: '0%' }} animate={{ width: `${progress}%` }} transition={{ duration: 1, ease: 'easeOut' }} />
                                </motion.div>
                            </motion.div>
                        </div>
                    );
                })}
                {hasAnsweredAnyQuestion && (
                    <Popover className="relative">
                        <PopoverButton className="focus:outline-none items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
                            <div className="bg-white pt-3 pb-2 px-4 drop-shadow-md shadow-md rounded-full">
                                <img alt="Arrow Down" className="h-3" src={ICONS.ARROW_DOWN_RED} />
                            </div>
                        </PopoverButton>
                        <PopoverPanel className="absolute -left-18 md:-left-15 z-10 mt-1 flex w-screen max-w-min -translate-x-1/2 px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in">
                            <div className="w-max px-3 shrink rounded-xl bg-white py-2 md:py-4 text-[14px] font-semibold text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                                <div className="flex text-xs font-normal items-center justify-center text-[#808080]">
                                    <img alt="Save" className="h-7" src={ICONS.SAVE_ICON} />
                                    All Answers Saved
                                </div>
                                <button onClick={() => setExitForm(true)} className="bg-[#B3322F] px-6 py-2 rounded-full text-white font-normal text-sm mt-2 mb-2">
                                    Start Housing Search Now
                                </button>
                            </div>
                        </PopoverPanel>
                    </Popover>
                )}
            </div>
        </>
    );
};