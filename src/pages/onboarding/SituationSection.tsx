import { motion } from 'framer-motion';
import { useState } from 'react';
import { ICONS } from '../../utils/constants/app-info.constant';
import { NextButton, PrimaryButton, QuestionTitle, ShareSection, transitionVariants } from './CommonComponents';
const sectionName = 'SITUATION_BASED_SECTION'

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
const SituationSection = (props: any) => {
    const {
        formStep: step,
        section,
        answers,
        handleAnswer,
        nextStepHandler,
        previousStepHandler,
        nextSectionHandler
    } = props;

    const name = "Paul Brooks";
    const formStep = step[section];
    const [exitForm, setExitForm] = useState(false);

    const params: Params = {
        formStep,
        name,
        nextStepHandler,
        previousStepHandler,
        propertyValue: formStep,
        answers: answers.SITUATION_BASED_SECTION as Record<string, unknown>,
        handleAnswer,
        exitForm,
        setExitForm,
        nextSectionHandler
    };

    const formSteps = [
        HomeSection,
        DisruptionHandlingSection,
        ConflictAndSafetySection,
        PartyAndMoneyConcernsSection,
        AllSetSection
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

export default SituationSection



const HomeSection: React.FC<{
    nextStepHandler: () => void;
}> = ({ nextStepHandler }) => {
    const name = "Paul Brooks"
    return (
        <div className='text-center mt-35'>
            <p className='text-3xl text-[#B3322F] px-10'>Let's discuss some possible situations, <br /> <span className='font-bold'>{name}</span></p>
            <img alt="" className="h-50 -my-5 pr-1 mx-auto " src="/assets/img/icons/situationicon.svg" />
            <p className='text-md pb-10'>Please answer these to <br />
                the best of your abilities   </p>
            {/* <button className='bg-[#B3322F] w-[250px] text-center py-2 mx-auto text-white flex rounded-full justify-center'>  <img alt="" className="h-3 pl-2 mt-1.5" src={ICONS.ARROW_RIGHT_WHITE} /> </button> */}
            <div className='flex justify-center'>
                <PrimaryButton selected={true} onClick={nextStepHandler} icon={ICONS.ARROW_RIGHT_WHITE}> Get Started</PrimaryButton>
            </div>
        </div>
    )
}

const DisruptionHandlingSection: React.FC<{
    nextStepHandler: () => void;
    handleAnswer: (section: string, field: string, value: string) => void;
    answers: {
        ROOMMATE_IMPAIRED_DISRUPTIVE?: string | null;
        LEFT_LIGHTS_ON_SHARED_UTILITIES?: string | null;
    };
}> = ({ nextStepHandler, answers, handleAnswer }) => {

    return (
        <>
            {/* Question */}
            <QuestionTitle>
                What would you do if one of your roommates <br />
                came home impaired and was disruptive?
            </QuestionTitle>
            <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                {[
                    { name: 'Call The Police', value: 'Call The Police' },
                    { name: 'Notify The Landlord', value: 'Notify The Landlord' },
                    { name: 'Talk To My Roommate', value: 'Talk To My Roommate' },
                    { name: 'Do Nothing', value: 'Do Nothing' },

                ].map(btn => <PrimaryButton selected={answers.ROOMMATE_IMPAIRED_DISRUPTIVE === btn.value} onClick={() => handleAnswer(sectionName, 'ROOMMATE_IMPAIRED_DISRUPTIVE', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}
            </div>
            {/* Question */}
            <QuestionTitle>
                What would you do if they left the lights on, and you were sharing utilities?
            </QuestionTitle>
            <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                {[
                    { name: 'Talk To My Roommate', value: 'Talk To My Roommate' },
                    { name: 'Notify The Landlord', value: 'Notify The Landlord' },
                    { name: 'Do Nothing', value: 'Do Nothing' },
                    { name: 'Turn Them Off Myself', value: 'Turn Them Off Myself' },

                ].map(btn => <PrimaryButton selected={answers.LEFT_LIGHTS_ON_SHARED_UTILITIES === btn.value} onClick={() => handleAnswer(sectionName, 'LEFT_LIGHTS_ON_SHARED_UTILITIES', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}
            </div>

            {/* Next button */}
            <NextButton onClick={nextStepHandler} />

        </>
    )
}
const ConflictAndSafetySection: React.FC<{
    nextStepHandler: () => void;
    handleAnswer: (section: string, field: string, value: string) => void;
    answers: {
        RENTAL_TYPE?: string | null;
        ROOMMATE_WITH_ILLlCIT_SUBSTANCES?: string | null;
        ROOMMATE_VERBAL_OR_PHYSICAL_ALTERCATION?: string | null;
    };
}> = ({ nextStepHandler, answers, handleAnswer }) => {
    return (
        <>
            {/* Question */}
            <QuestionTitle>
                What would you do if one of your roommates were involved with illicit substances?
            </QuestionTitle>
            <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                {[
                    { name: 'Call The Police', value: 'Call The Police' },
                    { name: 'Notify The Landlord', value: 'Notify The Landlord' },
                    { name: 'Talk To My Roommate', value: 'Talk To My Roommate' },
                    { name: 'Do Nothing', value: 'Do Nothing' },
                ].map(btn => <PrimaryButton selected={answers.ROOMMATE_WITH_ILLlCIT_SUBSTANCES === btn.value} onClick={() => handleAnswer(sectionName, 'ROOMMATE_WITH_ILLlCIT_SUBSTANCES', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}
            </div>
            {/* Question */}
            <QuestionTitle>
                What would you do if one of your roommates got into a verbal or physical altercation with you?
            </QuestionTitle>
            <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                {[
                    { name: 'Call The Police', value: 'Call The Police' },
                    { name: 'Notify The Landlord', value: 'Notify The Landlord' },
                    { name: 'Talk To My Roommate', value: 'Talk To My Roommate' },
                    { name: 'Do Nothing', value: 'Do Nothing' },
                ].map(btn => <PrimaryButton selected={answers.ROOMMATE_VERBAL_OR_PHYSICAL_ALTERCATION === btn.value} onClick={() => handleAnswer(sectionName, 'ROOMMATE_VERBAL_OR_PHYSICAL_ALTERCATION', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}
            </div>



            {/* Next button */}
            <NextButton onClick={nextStepHandler} />

        </>
    )
}
const PartyAndMoneyConcernsSection: React.FC<{
    answers: {
        FREQUENT_LOUD_PARTIES?: string | null;
        ROOMMATE_OWES_MONEY?: string | null;
    }
    nextStepHandler: () => void;
    handleAnswer: (section: string, field: string, value: string) => void;
}> = ({ nextStepHandler, answers, handleAnswer }) => {

    return (
        <>
            {/* Question */}
            <QuestionTitle>
                What would you do if your roommates frequently threw loud or disruptive parties?
            </QuestionTitle>
            <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                {[
                    { name: 'Call The Police', value: 'Call The Police' },
                    { name: 'Notify The Landlord', value: 'Notify The Landlord' },
                    { name: 'Talk To My Roommate', value: 'Talk To My Roommate' },
                    { name: 'Do Nothing', value: 'Do Nothing' },
                ].map(btn => <PrimaryButton selected={answers.FREQUENT_LOUD_PARTIES === btn.value} onClick={() => handleAnswer(sectionName, 'FREQUENT_LOUD_PARTIES', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}
            </div>
            {/* Question */}
            <QuestionTitle>
                What would you do if one of your roommates owed you money?
            </QuestionTitle>
            <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                {[

                    { name: 'Talk To Them Directly', value: 'Talk To Them Directly' },
                    { name: 'Remind Them Digitally', value: 'Remind Them Digitally' },
                    { name: 'Ask Landlord For Help', value: 'Ask Landlord For Help' },
                    { name: 'Do Nothing', value: 'Do Nothing' },

                ].map(btn => <PrimaryButton selected={answers.ROOMMATE_OWES_MONEY === btn.value} onClick={() => handleAnswer(sectionName, 'ROOMMATE_OWES_MONEY', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}
            </div>


            <img alt="" className="h-15 mt-20 mb-5 pr-1 mx-auto " src="/assets/img/icons/warningicon.svg" />

            <p className='px-10'>
                <span className='font-bold'>  It’s important to take these situations seriously. </span>Simply avoiding or not addressing <br />
                an issue puts yourself and others at risk. Use our reporting tools if you need help. <br />
                If the situation puts you in immediate danger,<span className='font-bold'> always call 911 first.</span>
            </p>

            {/* Next button */}
            <NextButton onClick={nextStepHandler} />

        </>
    )
}
const AllSetSection: React.FC<{
    nextSectionHandler: () => void;
}> = ({ nextSectionHandler }) => {

    return (
        <>

            <img alt="" className="h-35 my-5 pr-1 mx-auto " src="/assets/img/icons/owlflight2.svg" />
            {/* Question */}
            <p className='text-3xl text-[#B3322F] w-full mt-5 px-10 text-center mx-auto font-semibold'>
                You’re All Set!
            </p>
            <p className='text-2xl text-[#B3322F] w-full mt-5 px-10 text-center mx-auto '>
                Thank you for completing the questionnaire.<br />
                All your answers have been saved successfully.
            </p>

            <p className='text-3xl  w-full mt-15 px-10 text-center mx-auto font-semibold'>
                It’s not too late to invite your roommates!
            </p>

            <ShareSection />

            {/* Next button */}
            <PrimaryButton onClick={nextSectionHandler} selected={true} className='mx-auto bg-black mt-10' icon={ICONS.ARROW_RIGHT_WHITE} >
                Find Me A Home
            </PrimaryButton>

            <p className='text-center mt-5 '>
                On the next screen we'll use your answers to find you the <br />
                best home and roommates—<span className='font-bold'>automatically.</span>
            </p>

        </>
    )
}
