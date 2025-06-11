import { motion } from 'framer-motion';
import { useState } from 'react';
import { ICONS } from '../../utils/constants/app-info.constant';
import { NextButton, PrimaryButton, QuestionTitle, transitionVariants } from './CommonComponents';
const sectionName = 'ROOMMATES_SECTION'

interface Params {
    formStep: number;
    name: string;
    nextStepHandler: () => void;
    previousStepHandler: () => void;
    nextSectionHandler: () => void;
    propertyValue: number;
    answers: Record<string, unknown>; // Assuming unknown type for answers keys
    handleAnswer: (section: string, field: string, value: unknown) => void;
    exitForm: boolean;
    setExitForm: React.Dispatch<React.SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RoommateSection = (props: any) => {
    const {
        formStep: step,
        section,
        answers,
        handleAnswer,
        nextStepHandler,
        previousStepHandler,
        nextSectionHandler
    } = props
    const name = "Paul Brooks";
    const formStep = step[section]
    const [exitForm, setExitForm] = useState(false);

    const params: Params = {
        formStep,
        name,
        nextStepHandler,
        previousStepHandler,
        propertyValue: formStep,
        answers: answers.ROOMMATES_SECTION as Record<string, unknown>,
        handleAnswer,
        exitForm,
        setExitForm,
        nextSectionHandler
    };

    const formSteps = [
        HomeSection,
        LivingSection,
        GuestAndFriendSection,
        CookAndExpensesSection
    ];

    const CurrentStepComponent = formSteps[formStep] || null;

    return (
        <div className="text-center">
            {CurrentStepComponent && (
                <motion.div
                    key={formStep}
                    variants={transitionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                >
                    <CurrentStepComponent {...params} />
                </motion.div>
            )}
        </div>
    );
};

export default RoommateSection



const HomeSection: React.FC<{
    nextStepHandler: () => void; 
}> = ({ nextStepHandler }) => {
    const name = "Paul Brooks"
    return (
        <div className='text-center mt-35'>
            <p className='text-3xl text-[#B3322F]'>Let's discover your roommate preferences, <br /> <span className='font-bold'>{name}</span></p>
            <img alt="" className="h-30 py-5 pr-1 mx-auto " src="/assets/img/icons/roomateicon.svg" />
            <p className='text-md pb-10'> This allows us to match you with your<br />
                perfect roommate   </p>
            {/* <button className='bg-[#B3322F] w-[250px] text-center py-2 mx-auto text-white flex rounded-full justify-center'>  <img alt="" className="h-3 pl-2 mt-1.5" src={ICONS.ARROW_RIGHT_WHITE} /> </button> */}
            <div className='flex justify-center'>
                <PrimaryButton selected={true} onClick={nextStepHandler} icon={ICONS.ARROW_RIGHT_WHITE}> Get Started</PrimaryButton>
            </div>
        </div>
    )
}

const LivingSection: React.FC<{
    nextStepHandler: () => void;
    handleAnswer: (section: string, field: string, value: string) => void;
    answers: {
        COMFORT_DIFFERENT_GENDERS?: string | null;
        OPENNESS_TO_CULTURAL_DIFFERENCE?: string | null;
        LIKES_GUESTS?: string | null;
    };
}> = ({ nextStepHandler, answers, handleAnswer }) => {

    return (
        <>
            {/* Question */}
            <QuestionTitle>
                Are you comfortable living with people of different genders
            </QuestionTitle>
            <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                {[
                    { name: 'Unsure', value: 'Unsure' },
                    { name: 'Yes - Separate Bedrooms', value: 'Yes - Separate Bedrooms' },
                    { name: 'Doesn’t Matter', value: 'Doesn’t Matter' },
                    { name: 'No', value: 'No' },

                ].map(btn => <PrimaryButton selected={answers.COMFORT_DIFFERENT_GENDERS === btn.value} onClick={() => handleAnswer(sectionName, 'COMFORT_DIFFERENT_GENDERS', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}
            </div>
            {/* Question */}
            <QuestionTitle>
                How open are you to living with someone from a different cultural or spiritual background
            </QuestionTitle>
            <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                {[
                    { name: 'Very Open', value: 'Very Open' },
                    { name: 'Open', value: 'Open' },
                    { name: 'Unsure', value: 'Unsure' },
                    { name: 'Not Open', value: 'Not Open' },

                ].map(btn => <PrimaryButton selected={answers.OPENNESS_TO_CULTURAL_DIFFERENCE === btn.value} onClick={() => handleAnswer(sectionName, 'OPENNESS_TO_CULTURAL_DIFFERENCE', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}
            </div>
            {/* Question */}
            <QuestionTitle>
                Do you like to have guests over?
            </QuestionTitle>
            <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                {[
                    { name: 'Always', value: 'Always' },
                    { name: 'Sometimes', value: 'Sometimes' },
                    { name: 'Never', value: 'Never' },

                ].map(btn => <PrimaryButton selected={answers.LIKES_GUESTS === btn.value} onClick={() => handleAnswer(sectionName, 'LIKES_GUESTS', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}
            </div>



            {/* Next button */}
            <NextButton onClick={nextStepHandler} />

        </>
    )
}
const GuestAndFriendSection: React.FC<{
    nextStepHandler: () => void;
    handleAnswer: (section: string, field: string, value: string) => void;
    answers: {
        OKAY_WITH_ROOMMATE_GUESTS?: string | null;
        GUEST_CURFEW_WEEKDAYS?: string | null;
        STUDY_PLANS?: string | null;
    };
}> = ({ nextStepHandler, answers, handleAnswer }) => {

    return (
        <>
            {/* Question */}
            <QuestionTitle>
                Are you okay with your roommates having friends over?
            </QuestionTitle>
            <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                {[
                    { name: 'Always', value: 'Always' },
                    { name: 'Sometimes', value: 'Sometimes' },
                    { name: 'Never', value: 'Never' },
                ].map(btn => <PrimaryButton selected={answers.OKAY_WITH_ROOMMATE_GUESTS === btn.value} onClick={() => handleAnswer(sectionName, 'OKAY_WITH_ROOMMATE_GUESTS', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}
            </div>
            {/* Question */}
            <QuestionTitle>
                On a weekday, how late is too late for guests to stay over?
            </QuestionTitle>
            <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                {[
                    { name: 'No Guests After 10PM', value: 'No Guests After 10PM' },
                    { name: 'Anytime Is Okay', value: 'Anytime Is Okay' },

                ].map(btn => <PrimaryButton selected={answers.GUEST_CURFEW_WEEKDAYS === btn.value} onClick={() => handleAnswer(sectionName, 'GUEST_CURFEW_WEEKDAYS', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}
            </div>
            {/* Question */}
            <QuestionTitle>
                Do you plan to study in your unit?
            </QuestionTitle>
            <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                {[
                    { name: 'Yes', value: 'Yes' },
                    { name: 'No', value: 'No' },
                    { name: 'Sometimes', value: 'Sometimes' },

                ].map(btn => <PrimaryButton selected={answers.STUDY_PLANS === btn.value} onClick={() => handleAnswer(sectionName, 'STUDY_PLANS', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}
            </div>



            {/* Next button */}
            <NextButton onClick={nextStepHandler} />

        </>
    )
}
const CookAndExpensesSection: React.FC<{
    nextSectionHandler: () => void;
    handleAnswer: (section: string, field: string, value: string) => void;
    answers: {
        COOKING_PLANS?: string | null;
        SHARING_EXPENSES?: string | null;
        FRIENDSHIP_IMPORTANCE?: string | null;
        ROOMMATE_COMMUNICATION_FREQUENCY?: string | null;
    };
}> = ({ nextSectionHandler, answers, handleAnswer }) => {

    return (
        <>
            {/* Question */}
            <QuestionTitle>
                Do you plan to cook?
            </QuestionTitle>
            <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                {[
                    { name: 'Yes', value: 'Yes' },
                    { name: 'No', value: 'No' },
                    { name: 'Sometimes', value: 'Sometimes' },
                ].map(btn => <PrimaryButton selected={answers.COOKING_PLANS === btn.value} onClick={() => handleAnswer(sectionName, 'COOKING_PLANS', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}
            </div>
            {/* Question */}
            <QuestionTitle>
                How do you feel about sharing expenses (e.g. rent, utilities, groceries)
            </QuestionTitle>
            <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                {[
                    { name: 'Not At All', value: 'Not At All' },
                    { name: 'Unsure', value: 'Unsure' },
                    { name: 'Yes', value: 'Yes' },

                ].map(btn => <PrimaryButton selected={answers.SHARING_EXPENSES === btn.value} onClick={() => handleAnswer(sectionName, 'SHARING_EXPENSES', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}
            </div>
            {/* Question */}
            <QuestionTitle>
                How important is it to you to become friends with your roommates?
            </QuestionTitle>
            <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                {[
                    { name: 'Very Important', value: 'Very Important' },
                    { name: 'Somewhat', value: 'Somewhat' },
                    { name: 'Not Important', value: 'Not Important' },

                ].map(btn => <PrimaryButton selected={answers.FRIENDSHIP_IMPORTANCE === btn.value} onClick={() => handleAnswer(sectionName, 'FRIENDSHIP_IMPORTANCE', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}
            </div>
            {/* Question */}
            <QuestionTitle>
                How often would you intend to communicate with your roommates?
            </QuestionTitle>
            <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                {[
                    { name: 'Frequently', value: 'Frequently' },
                    { name: 'Sometimes', value: 'Sometimes' },
                    { name: 'Never', value: 'Never' },
                    { name: 'Unsure', value: 'Unsure' },

                ].map(btn => <PrimaryButton selected={answers.ROOMMATE_COMMUNICATION_FREQUENCY === btn.value} onClick={() => handleAnswer(sectionName, 'ROOMMATE_COMMUNICATION_FREQUENCY', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}
            </div>
            {/* Next button */}
            <NextButton onClick={nextSectionHandler} />

        </>
    )
}
