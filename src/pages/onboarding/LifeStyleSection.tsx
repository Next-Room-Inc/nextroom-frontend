import { motion } from 'framer-motion';
import { useState } from 'react';
import { ICONS } from '../../utils/constants/app-info.constant';
import { NextButton, PrimaryButton, QuestionTitle, transitionVariants } from './CommonComponents';
const sectionName = 'LIFE_STYLE_SECTION'

interface Params {
    formStep: number;
    name: string;
    nextStepHandler: () => void;
    previousStepHandler: () => void;
    propertyValue: number;
    answers: Record<string, unknown>; // Assuming unknown type for answers keys
    handleAnswer: (section: string, field: string, value: unknown) => void;
    exitForm: boolean;
    setExitForm: React.Dispatch<React.SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LifeStyleSection = (props: any) => {
    const {
        formStep: step,
        section,
        answers,
        handleAnswer,
        nextStepHandler,
        previousStepHandler
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
        answers: answers.LIFE_STYLE_SECTION as Record<string, unknown>,
        handleAnswer,
        exitForm,
        setExitForm,
    };

    const formSteps = [
        LetsLearnAboutLifeStyleSection,
        AreaOfStudyDescription,
        DrinkAndSmokeSection,
        LifestylePreferencesSection,
        BedTimeSections,
        WhatDoYouEnjoySections
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

export default LifeStyleSection

const WhatDoYouEnjoySections = ({ nextStepHandler, }) => {
    return (
        <>
            <QuestionTitle>
                What Do You Enjoy?
            </QuestionTitle>



            <NextButton onClick={nextStepHandler} />

        </>
    )
}

const BedTimeSections = ({ nextStepHandler, answers, handleAnswer }) => {
    return (
        <>
            <QuestionTitle>
                How do you feel about going out (e.g. clubbing or partying)?
            </QuestionTitle>

            <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                {[
                    { name: 'Never', value: 'Never' },
                    { name: 'Open To It', value: 'Open To It' },
                    { name: 'Occasionally', value: 'Occasionally' },
                    { name: 'Frequently', value: 'Frequently' },

                ].map(btn => <PrimaryButton selected={answers.GOING_OUT === btn.value} onClick={() => handleAnswer(sectionName, 'GOING_OUT', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}

            </div>
            <p className='text-2xl text-[#B3322F]  w-full my-20 px-10 text-center mx-auto font-semibold'>

                What time do you typically go to bed?
            </p>

            <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center text-md px-10'>
                {[
                    { name: 'Before 10PM ', value: 'Before 10PM ' },
                    { name: 'Around 11PM', value: 'Around 11PM' },
                    { name: 'Midnight', value: 'Midnight' },
                    { name: 'After 1AM', value: 'After 1AM' },

                ].map(btn => <PrimaryButton selected={answers.BED_TIME === btn.value} onClick={() => handleAnswer(sectionName, 'BED_TIME', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}
            </div>

            <NextButton onClick={nextStepHandler} />

        </>
    )
}

const LifestylePreferencesSection = ({ nextStepHandler, answers, handleAnswer }) => {
    return (
        <>
            <p className="text-2xl text-[#B3322F] w-full mt-10 px-10 text-center mx-auto font-semibold">
                How often do you use recreational substances (e.g. cannabis)?
            </p>

            <div className="flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10">
                {[
                    { name: 'Never', value: 'Never' },
                    { name: 'Occasionally', value: 'Occasionally' },
                    { name: 'On Special Occasions', value: 'On Special Occasions' },
                    { name: 'Frequently', value: 'Frequently' },

                ].map(btn => <PrimaryButton selected={answers.RECREATIONAL_SUBSTANCES === btn.value} onClick={() => handleAnswer(sectionName, 'RECREATIONAL_SUBSTANCES', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}
            </div>

            <p className="text-2xl text-[#B3322F] w-full my-20 px-10 text-center mx-auto font-semibold">
                How tidy are you at home?
            </p>

            <div className="flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center text-md px-10">
                {[
                    { name: 'Very Tidy', value: 'Very Tidy' },
                    { name: 'Pretty Clean', value: 'Pretty Clean' },
                    { name: 'Average', value: 'Average' },
                    { name: 'Messy', value: 'Messy' },

                ].map(btn => <PrimaryButton selected={answers.AT_HOME === btn.value} onClick={() => handleAnswer(sectionName, 'AT_HOME', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}
            </div>

            <NextButton onClick={nextStepHandler} />

        </>
    );
};




const DrinkAndSmokeSection = ({ nextStepHandler, answers, handleAnswer }) => {

    return (
        <>
            <QuestionTitle>
                How often do you drink?
            </QuestionTitle>

            <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                {[
                    { name: 'Never', value: 'Never' },
                    { name: 'On Special Occasions', value: 'On Special Occasions' },
                    { name: 'Socially On Weekends', value: 'Socially On Weekends' },
                    { name: 'Most Nights', value: 'Most Nights' },

                ].map(btn => <PrimaryButton selected={answers.OFTEN_DRINK === btn.value} onClick={() => handleAnswer(sectionName, 'OFTEN_DRINK', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}
            </div>
            <p className='text-2xl text-[#B3322F]  w-full my-20 px-10 text-center mx-auto font-semibold'>
                How often do you smoke?
            </p>

            <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center text-md px-10'>

                {[
                    { name: 'Never', value: 'Never' },
                    { name: 'Trying To Quit', value: 'Trying To Quit' },
                    { name: 'Occasionally', value: 'Occasionally' },
                    { name: 'Frequently', value: 'Frequently' },

                ].map(btn => <PrimaryButton selected={answers.OFTEN_SMOKE === btn.value} onClick={() => handleAnswer(sectionName, 'OFTEN_SMOKE', btn.value)}>
                    {btn.name}
                </PrimaryButton>)}
            </div>

            <NextButton onClick={nextStepHandler} />

        </>
    )
}

const LetsLearnAboutLifeStyleSection = ({ nextStepHandler }) => {
    const name = "Paul Brooks"
    return (
        <div className='text-center'>
            <p className='text-3xl text-[#B3322F]'>Let's learn about your lifestyle, <br /> <span className='font-bold'>{name}</span></p>
            <img alt="" className="h-40 pr-1 mx-auto " src="/assets/img/icons/lifestyleicon.svg" />
            <p className='text-md pb-10'> Knowing your habits helps us match<br /> you with the best roommates and home   </p>
            {/* <button className='bg-[#B3322F] w-[250px] text-center py-2 mx-auto text-white flex rounded-full justify-center'>  <img alt="" className="h-3 pl-2 mt-1.5" src={ICONS.ARROW_RIGHT_WHITE} /> </button> */}
            <div className='flex justify-center'>
                <PrimaryButton selected={true} onClick={nextStepHandler} icon={ICONS.ARROW_RIGHT_WHITE}> Get Started</PrimaryButton>
            </div>
        </div>
    )
}

const AreaOfStudyDescription: React.FC<{ nextStepHandler: () => void }> = ({ nextStepHandler }) => {
    return (
        <div className="text-center">
            <p className='text-3xl text-[#B3322F]'>What best describes your area of study?</p>

            <NextButton onClick={nextStepHandler} />
        </div>
    );
};

