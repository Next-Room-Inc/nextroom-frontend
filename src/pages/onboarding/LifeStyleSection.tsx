import { motion } from 'framer-motion';
import { useState } from 'react';
import { ICONS } from '../../utils/constants/app-info.constant';
import { MultiSelect, NextButton, PrimaryButton, QuestionTitle, transitionVariants } from './CommonComponents';
const sectionName = 'LIFE_STYLE_SECTION'

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
const LifeStyleSection = (props: any) => {
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
        answers: answers.LIFE_STYLE_SECTION as Record<string, unknown>,
        handleAnswer,
        exitForm,
        setExitForm,
        nextSectionHandler
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

const socialOptions = [
    'Going out/clubbing',
    'Concerts/live music',
    'Campus events',
    'Shopping',
    'Eating out',
    'Sports',
    'Group hangouts',
    'Escape rooms',
    'Bars',
    'Movie theatres',
    'Museums',
    'Festivals',
    'Bowling',
    'Cafés',
]
const stayingInOptions = [
    'Movies',
    'Board games',
    'Gaming',
    'Reading',
    'Cooking/Baking',
    'Online shopping',
    'Journaling'
]

const causesInOptions = [
    'Mental health awareness',
    'LGBTQ+ advocacy ',
    'Feminism',
    'Black Lives Matter',
    'Climate change',
    'Social development',
    'Volunteering',
    'Politics',
    'World peace',
    'Equality ',
    'Disability rights',
    'Campus activism',
    'Sustainability',
    'Animal rights',
    'Human rights'
]
const personalInOptions = [
    'Entrepreneur',
    'Collector',
    'Thrifting',
    'Investing',
    'Side quests',
    'Gym and wellness',
    'Meditation ',
    'Yoga',
    'Trying new things',
    'Betting/gambling',
    'Investing',
    'Sports',
    'Vlogging/content creation',
    'Podcast',
    'Going on walks',
    'Camping',
    'Travelling',
    'Photography',
    'Singing',
    'Dancing',
    'Learning new languages',
    'Art',
    'Boating',
    'Studying'
]

const WhatDoYouEnjoySections: React.FC<{
    answers: {
        SOCIAL?: string[] | null;
        STAYING_IN?: string[] | null;
        CAUSES?: string[] | null;
        PERSONAL?: string[] | null;
    }
    nextSectionHandler: () => void;
    handleAnswer: (section: string, field: string, value: string[]) => void;
}> = ({ nextSectionHandler, answers, handleAnswer }) => {

    const [selectedSocials, setSelectedSocials] = useState<string[]>(answers.SOCIAL || []);
    const [selectedStayingIn, setSelectedStayingIn] = useState<string[]>(answers.STAYING_IN || []);
    const [selectedCauses, setSelectedCauses] = useState<string[]>(answers.CAUSES || []);
    const [selectedPersonal, setSelectedPersonal] = useState<string[]>(answers.PERSONAL || []);

    const nextStep = () => {
        handleAnswer(sectionName, 'SOCIAL', selectedSocials);
        handleAnswer(sectionName, 'STAYING_IN', selectedStayingIn);
        handleAnswer(sectionName, 'CAUSES', selectedCauses);
        handleAnswer(sectionName, 'PERSONAL', selectedPersonal);
        nextSectionHandler();
    };

    const sections = [
        { title: 'Social', options: socialOptions, selected: selectedSocials, setSelected: setSelectedSocials, img: 'social.svg' },
        { title: 'Staying In', options: stayingInOptions, selected: selectedStayingIn, setSelected: setSelectedStayingIn, img: 'staying_in.svg' },
        { title: 'Causes', options: causesInOptions, selected: selectedCauses, setSelected: setSelectedCauses, img: 'causes.svg' },
        { title: '', options: personalInOptions, selected: selectedPersonal, setSelected: setSelectedPersonal, img: 'personal.svg' }
    ];

    const [error, setError] = useState(false)


    const scrollHandler = () => {
        setError(true)
        if (selectedSocials.length < 1) {
            const section = document.getElementById('Social');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (selectedStayingIn.length < 1) {
            const section = document.getElementById('Staying In');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (selectedCauses.length < 1) {
            const section = document.getElementById('Causes');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (selectedPersonal.length < 1) {
            const section = document.getElementById('Personal');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = selectedSocials.length < 1 || selectedStayingIn.length < 1 || selectedCauses.length < 1 || selectedPersonal.length < 1

    return (
        <>
            <QuestionTitle>What Do You Enjoy?</QuestionTitle>

            <div className="flex flex-wrap justify-center gap-6 md:px-16 mt-10">
                {sections.map(({ title, options, selected, setSelected, img }) => (
                    <div id={title} key={title}  className={`w-full sm:w-[45%] lg:w-[23%] rounded-2xl mx-1 md:px-2 px-10 py-5 ${error && selected.length < 1 ? "bg-[#B3322F]/20" : ""}`} >
                        <p className="justify-center items-center bg-[#B3322F] text-white rounded-full   mb-4 flex w-full">
                            <span className=' '>{title}  </span>
                            <img alt="" className="h-10 " src={`/assets/img/icons/${img}`} />
                        </p>
                        <MultiSelect
                            options={options}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </div>
                ))}
            </div>


            <div className="md:relative sticky bottom-4">
                    <NextButton onClick={disabled ? scrollHandler : nextStep} />
                </div>

        </>
    );
};


const BedTimeSections: React.FC<{
    answers: {
        GOING_OUT?: string | null;
        BED_TIME?: string | null;
    }
    nextStepHandler: () => void;
    handleAnswer: (section: string, field: string, value: string) => void;
}> = ({ nextStepHandler, answers, handleAnswer }) => {

    const [error, setError] = useState(false)



    const scrollHandler = () => {
        setError(true)
        if (answers.GOING_OUT === null) {
            const section = document.getElementById('GOING_OUT');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        else if (answers.BED_TIME === null) {
            const section = document.getElementById('BED_TIME');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.GOING_OUT === null || answers.BED_TIME === null

    return (
        <>
            <div id="GOING_OUT" className={`  rounded-2xl mx-1 py-10 ${error && answers.GOING_OUT === null ? "bg-[#B3322F]/20" : ""}`}>
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
            </div>

            <div id="BED_TIME" className={`mt-1  rounded-2xl mx-1 py-10 ${error && answers.BED_TIME === null ? "bg-[#B3322F]/20" : ""}`}>
                <QuestionTitle>
                    What time do you typically go to bed?
                </QuestionTitle>

                <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center text-md px-10 mt-10'>
                    {[
                        { name: 'Before 10PM ', value: 'Before 10PM ' },
                        { name: 'Around 11PM', value: 'Around 11PM' },
                        { name: 'Midnight', value: 'Midnight' },
                        { name: 'After 1AM', value: 'After 1AM' },

                    ].map(btn => <PrimaryButton selected={answers.BED_TIME === btn.value} onClick={() => handleAnswer(sectionName, 'BED_TIME', btn.value)}>
                        {btn.name}
                    </PrimaryButton>)}
                </div>
            </div>

            <div className="md:relative sticky bottom-4">
                <NextButton onClick={disabled ? scrollHandler : nextStepHandler} />
            </div>

        </>
    )
}

const LifestylePreferencesSection: React.FC<{
    answers: {
        RECREATIONAL_SUBSTANCES?: string | null;
        AT_HOME?: string | null;
    }
    nextStepHandler: () => void;
    handleAnswer: (section: string, field: string, value: string) => void;
}> = ({ nextStepHandler, answers, handleAnswer }) => {


    const [error, setError] = useState(false)



    const scrollHandler = () => {
        setError(true)
        if (answers.RECREATIONAL_SUBSTANCES === null) {
            const section = document.getElementById('RECREATIONAL_SUBSTANCES');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (answers.AT_HOME === null) {
            const section = document.getElementById('AT_HOME');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.RECREATIONAL_SUBSTANCES === null || answers.AT_HOME === null

    return (
        <>

            <div id="RECREATIONAL_SUBSTANCES" className={`mt-10 rounded-2xl mx-1 py-10 ${error && answers.RECREATIONAL_SUBSTANCES === null ? "bg-[#B3322F]/20" : ""}`}>
                <QuestionTitle>How often do you use recreational substances (e.g. cannabis)?</QuestionTitle>
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
            </div>


            <div id="AT_HOME" className={`mt-1  rounded-2xl mx-1 py-10 ${error && answers.AT_HOME === null ? "bg-[#B3322F]/20" : ""}`}>
                <QuestionTitle>How tidy are you at home?</QuestionTitle>
                <div className="flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center text-md px-10 mt-10">
                    {[
                        { name: 'Very Tidy', value: 'Very Tidy' },
                        { name: 'Pretty Clean', value: 'Pretty Clean' },
                        { name: 'Average', value: 'Average' },
                        { name: 'Messy', value: 'Messy' },

                    ].map(btn => <PrimaryButton selected={answers.AT_HOME === btn.value} onClick={() => handleAnswer(sectionName, 'AT_HOME', btn.value)}>
                        {btn.name}
                    </PrimaryButton>)}
                </div>
            </div>

            <div className="md:relative sticky bottom-4">
                <NextButton onClick={disabled ? scrollHandler : nextStepHandler} />
            </div>

        </>
    );
};




const DrinkAndSmokeSection: React.FC<{
    answers: {
        OFTEN_DRINK?: string | null;
        OFTEN_SMOKE?: string | null;
    }
    nextStepHandler: () => void;
    handleAnswer: (section: string, field: string, value: string) => void;
}> = ({ nextStepHandler, answers, handleAnswer }) => {



    const [error, setError] = useState(false)



    const scrollHandler = () => {
        setError(true)
        if (answers.OFTEN_DRINK === null) {
            const section = document.getElementById('OFTEN_DRINK');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (answers.OFTEN_SMOKE === null) {
            const section = document.getElementById('OFTEN_SMOKE');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.OFTEN_DRINK === null || answers.OFTEN_SMOKE === null

    return (
        <>

            <div id="OFTEN_DRINK" className={`rounded-2xl mx-1 py-10 ${error && answers.OFTEN_DRINK === null ? "bg-[#B3322F]/20" : ""}`}>
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
            </div>


            <div id="OFTEN_SMOKE" className={`mt-1 rounded-2xl mx-1 py-10 ${error && answers.OFTEN_SMOKE === null ? "bg-[#B3322F]/20" : ""}`}>
                <QuestionTitle>
                    How often do you smoke?
                </QuestionTitle>

                <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center text-md px-10 mt-15'>

                    {[
                        { name: 'Never', value: 'Never' },
                        { name: 'Trying To Quit', value: 'Trying To Quit' },
                        { name: 'Occasionally', value: 'Occasionally' },
                        { name: 'Frequently', value: 'Frequently' },

                    ].map(btn => <PrimaryButton selected={answers.OFTEN_SMOKE === btn.value} onClick={() => handleAnswer(sectionName, 'OFTEN_SMOKE', btn.value)}>
                        {btn.name}
                    </PrimaryButton>)}
                </div>
            </div>


            <div className="md:relative sticky bottom-4">
                <NextButton onClick={disabled ? scrollHandler : nextStepHandler} />
            </div>

        </>
    )
}

const LetsLearnAboutLifeStyleSection: React.FC<{
    nextStepHandler: () => void;
}> = ({ nextStepHandler }) => {
    const name = "Paul Brooks"
    return (
        <div className='text-center mt-35'>
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


const AreaOfStudyDescription: React.FC<{
    answers: {
        AREA_OF_STUDEY?: string[] | null;
    }
    nextStepHandler: () => void;
    handleAnswer: (section: string, field: string, value: string[]) => void;
}>

    = ({ nextStepHandler, answers, handleAnswer }) => {
        const [selected, setSelected] = useState<string[]>(answers.AREA_OF_STUDEY || []);
        const [error, setError] = useState(false)

        const suggestions = [
            "Engineering & Technology",
            "Business, Management & Economics",
            "Arts, Humanities & Social Sciences",
            "Science (Biology, Chemistry, Physics, etc.)",
            "Health & Life Sciences (Nursing, Medicine, Psychology, etc.)",
            "Law, Public Policy & Political Science",
            "Education & Teaching",
            "Media, Communications & Journalism",
            "Computer Science & Data (CS, AI, Data Science, etc.)",
            "Architecture, Design & Visual Arts",
            "Environment, Geography & Sustainability",
            "Trades & Apprenticeship Programs",
            "Undeclared / General Studies",
            "Other / Not Listed",
        ];

        const nextStep = () => {
            handleAnswer(sectionName, 'AREA_OF_STUDEY', selected)
            nextStepHandler()
        }

        const disabled = selected.length < 1

        const scrollHandler = () => {
            setError(true)
            if (disabled) {
                const section = document.getElementById('AREA_OF_STUDEY');
                section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }


        return (

            <div className="text-center ">
                <div id="AREA_OF_STUDEY" className={`mt-10 rounded-2xl mx-1 py-10 ${error && disabled ? "bg-[#B3322F]/20" : ""}`}>
                    <p className="text-3xl text-[#B3322F] mb-10 px-10">What best describes your area of study?</p>
                    <div className='lg:w-[50%] md:w-[75%] mx-auto px-10'>
                        <MultiSelect
                            setSelected={setSelected}
                            options={suggestions}
                            selected={selected}
                        />
                    </div>
                </div>

                <div className="md:relative sticky bottom-4">
                    <NextButton onClick={disabled ? scrollHandler : nextStep} />
                </div>

            </div>
        );
    };

