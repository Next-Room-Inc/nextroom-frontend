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
        nextSectionHandler,
        name
    } = props
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
        nextSectionHandler,
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
    name: string
}> = ({ nextStepHandler , name }) => {
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
    previousStepHandler: () => void;
    answers: {
        genderComfort?: string | null;
        culturalOpenness?: string | null;
        guestFrequency?: string | null;
    };
}> = ({ nextStepHandler, answers, handleAnswer , previousStepHandler}) => {



    const [error, setError] = useState(false)



    const scrollHandler = () => {
        setError(true)
        if (answers.genderComfort === null) {
            const section = document.getElementById('genderComfort');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } if (answers.culturalOpenness === null) {
            const section = document.getElementById('culturalOpenness');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (answers.guestFrequency === null) {
            const section = document.getElementById('guestFrequency');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }


    const disabled =
        answers.genderComfort === null ||
        answers.culturalOpenness === null ||
        answers.guestFrequency === null


    return (
        <>


            <div id="genderComfort" className={` rounded-2xl mx-1 py-10 ${error && answers.genderComfort === null ? "bg-[#B3322F]/20" : ""}`}>
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

                    ].map(btn => <PrimaryButton selected={answers.genderComfort === btn.value} onClick={() => handleAnswer(sectionName, 'genderComfort', btn.value)}>
                        {btn.name}
                    </PrimaryButton>)}
                </div>
            </div>


            <div id="culturalOpenness" className={`my-1 rounded-2xl mx-1 py-10 ${error && answers.culturalOpenness === null ? "bg-[#B3322F]/20" : ""}`}>
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

                    ].map(btn => <PrimaryButton selected={answers.culturalOpenness === btn.value} onClick={() => handleAnswer(sectionName, 'culturalOpenness', btn.value)}>
                        {btn.name}
                    </PrimaryButton>)}
                </div>
            </div>


            <div id="guestFrequency" className={` rounded-2xl mx-1 py-10 ${error && answers.guestFrequency === null ? "bg-[#B3322F]/20" : ""}`}>
                {/* Question */}
                <QuestionTitle>
                    Do you like to have guests over?
                </QuestionTitle>
                <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                    {[
                        { name: 'Always', value: 'Always' },
                        { name: 'Sometimes', value: 'Sometimes' },
                        { name: 'Never', value: 'Never' },

                    ].map(btn => <PrimaryButton selected={answers.guestFrequency === btn.value} onClick={() => handleAnswer(sectionName, 'guestFrequency', btn.value)}>
                        {btn.name}
                    </PrimaryButton>)}
                </div>
            </div>



            {/* Next button */}
                <NextButton onClick={disabled ? scrollHandler : nextStepHandler} previousStepHandler={previousStepHandler} />
          

        </>
    )
}
const GuestAndFriendSection: React.FC<{
    nextStepHandler: () => void;
    handleAnswer: (section: string, field: string, value: string) => void;
    previousStepHandler: () => void;
    answers: {
        roommateGuestsOk?: string | null;
        weekdayGuestLimit?: string | null;
        studyInUnit?: string | null;
    };
}> = ({ nextStepHandler, answers, handleAnswer, previousStepHandler }) => {

    const [error, setError] = useState(false)



    const scrollHandler = () => {
        setError(true)
        if (answers.roommateGuestsOk === null) {
            const section = document.getElementById('roommateGuestsOk');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } if (answers.weekdayGuestLimit === null) {
            const section = document.getElementById('weekdayGuestLimit');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (answers.studyInUnit === null) {
            const section = document.getElementById('studyInUnit');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.roommateGuestsOk === null || answers.weekdayGuestLimit === null || answers.studyInUnit === null
    return (
        <>
            <div id="roommateGuestsOk" className={` rounded-2xl mx-1 py-10 ${error && answers.roommateGuestsOk === null ? "bg-[#B3322F]/20" : ""}`}>
                {/* Question */}
                <QuestionTitle>
                    Are you okay with your roommates having friends over?
                </QuestionTitle>
                <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                    {[
                        { name: 'Always', value: 'Always' },
                        { name: 'Sometimes', value: 'Sometimes' },
                        { name: 'Never', value: 'Never' },
                    ].map(btn => <PrimaryButton selected={answers.roommateGuestsOk === btn.value} onClick={() => handleAnswer(sectionName, 'roommateGuestsOk', btn.value)}>
                        {btn.name}
                    </PrimaryButton>)}
                </div>
            </div>


            <div id="weekdayGuestLimit" className={`my-1 rounded-2xl mx-1 py-10 ${error && answers.weekdayGuestLimit === null ? "bg-[#B3322F]/20" : ""}`}>
                {/* Question */}
                <QuestionTitle>
                    On a weekday, how late is too late for guests to stay over?
                </QuestionTitle>
                <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                    {[
                        { name: 'No Guests After 10PM', value: 'No Guests After 10PM' },
                        { name: 'Anytime Is Okay', value: 'Anytime Is Okay' },

                    ].map(btn => <PrimaryButton selected={answers.weekdayGuestLimit === btn.value} onClick={() => handleAnswer(sectionName, 'weekdayGuestLimit', btn.value)}>
                        {btn.name}
                    </PrimaryButton>)}
                </div>
            </div>

            <div id="studyInUnit" className={` rounded-2xl mx-1 py-10 ${error && answers.studyInUnit === null ? "bg-[#B3322F]/20" : ""}`}>
                {/* Question */}
                <QuestionTitle>
                    Do you plan to study in your unit?
                </QuestionTitle>
                <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                    {[
                        { name: 'Yes', value: 'Yes' },
                        { name: 'No', value: 'No' },
                        { name: 'Sometimes', value: 'Sometimes' },

                    ].map(btn => <PrimaryButton selected={answers.studyInUnit === btn.value} onClick={() => handleAnswer(sectionName, 'studyInUnit', btn.value)}>
                        {btn.name}
                    </PrimaryButton>)}
                </div>
            </div>



            {/* Next button */}
                <NextButton onClick={disabled ? scrollHandler : nextStepHandler} previousStepHandler={previousStepHandler} />
         

        </>
    )
}
const CookAndExpensesSection: React.FC<{
    nextSectionHandler: () => void;
    handleAnswer: (section: string, field: string, value: string) => void;
    previousStepHandler: () => void;
    answers: {
        cookingPlans?: string | null;
        expenseSharing?: string | null;
        friendshipImportance?: string | null;
        communicationFrequency?: string | null;
    };
}> = ({ nextSectionHandler, answers, handleAnswer, previousStepHandler }) => {

    const [error, setError] = useState(false)

    const scrollHandler = () => {

        setError(true)
        if (answers.cookingPlans === null) {
            const section = document.getElementById('cookingPlans');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } if (answers.expenseSharing === null) {
            const section = document.getElementById('expenseSharing');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (answers.friendshipImportance === null) {
            const section = document.getElementById('friendshipImportance');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (answers.communicationFrequency === null) {
            const section = document.getElementById('communicationFrequency');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.cookingPlans === null || answers.expenseSharing === null || answers.friendshipImportance === null || answers.communicationFrequency === null

    return (
        <>
            <div id="cookingPlans" className={` rounded-2xl mx-1 py-10 ${error && answers.cookingPlans === null ? "bg-[#B3322F]/20" : ""}`}>
                {/* Question */}
                <QuestionTitle>
                    Do you plan to cook?
                </QuestionTitle>
                <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                    {[
                        { name: 'Yes', value: 'Yes' },
                        { name: 'No', value: 'No' },
                        { name: 'Sometimes', value: 'Sometimes' },
                    ].map(btn => <PrimaryButton selected={answers.cookingPlans === btn.value} onClick={() => handleAnswer(sectionName, 'cookingPlans', btn.value)}>
                        {btn.name}
                    </PrimaryButton>)}
                </div>
            </div>


            <div id="expenseSharing" className={`mt-1 rounded-2xl mx-1 py-10 ${error && answers.expenseSharing === null ? "bg-[#B3322F]/20" : ""}`}>
                {/* Question */}
                <QuestionTitle>
                    How do you feel about sharing expenses (e.g. rent, utilities, groceries)
                </QuestionTitle>
                <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                    {[
                        { name: 'Not At All', value: 'Not At All' },
                        { name: 'Unsure', value: 'Unsure' },
                        { name: 'Yes', value: 'Yes' },

                    ].map(btn => <PrimaryButton selected={answers.expenseSharing === btn.value} onClick={() => handleAnswer(sectionName, 'expenseSharing', btn.value)}>
                        {btn.name}
                    </PrimaryButton>)}
                </div>
            </div>


            <div id="friendshipImportance" className={`mt-1 rounded-2xl mx-1 py-10 ${error && answers.friendshipImportance === null ? "bg-[#B3322F]/20" : ""}`}>
                {/* Question */}
                <QuestionTitle>
                    How important is it to you to become friends with your roommates?
                </QuestionTitle>
                <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                    {[
                        { name: 'Very Important', value: 'Very Important' },
                        { name: 'Somewhat', value: 'Somewhat' },
                        { name: 'Not Important', value: 'Not Important' },

                    ].map(btn => <PrimaryButton selected={answers.friendshipImportance === btn.value} onClick={() => handleAnswer(sectionName, 'friendshipImportance', btn.value)}>
                        {btn.name}
                    </PrimaryButton>)}
                </div>
            </div>


            <div id="communicationFrequency" className={`mt-1 rounded-2xl mx-1 py-10 ${error && answers.communicationFrequency === null ? "bg-[#B3322F]/20" : ""}`}>
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

                    ].map(btn => <PrimaryButton selected={answers.communicationFrequency === btn.value} onClick={() => handleAnswer(sectionName, 'communicationFrequency', btn.value)}>
                        {btn.name}
                    </PrimaryButton>)}
                </div>
            </div>



            {/* Next button */}

         
                <NextButton onClick={disabled ? scrollHandler : nextSectionHandler} previousStepHandler={previousStepHandler} />
       


        </>
    )
}
