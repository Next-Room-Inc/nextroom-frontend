import { motion } from 'framer-motion';
import { useState } from 'react';
import { LoaderComponent } from '../../../components/Loader';
import { useGetAllStudentInterestsQuery } from '../../../redux/services/onboarding.service';
import { ICONS } from '../../../utils/constants/app-info.constant';
import { MultiSelect, MultiSelectWithIds, NextButton, PrimaryButton, QuestionTitle, transitionVariants } from './CommonComponents';
import { Interest, InterestCategory } from '../../../utils/interfaces';
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

// const socialOptions = [
//     'Going out/clubbing',
//     'Concerts/live music',
//     'Campus events',
//     'Shopping',
//     'Eating out',
//     'Sports',
//     'Group hangouts',
//     'Escape rooms',
//     'Bars',
//     'Movie theatres',
//     'Museums',
//     'Festivals',
//     'Bowling',
//     'Cafés',
// ]
// const stayingInOptions = [
//     'Movies',
//     'Board games',
//     'Gaming',
//     'Reading',
//     'Cooking/Baking',
//     'Online shopping',
//     'Journaling'
// ]

// const causesInOptions = [
//     'Mental health awareness',
//     'LGBTQ+ advocacy',
//     'Feminism',
//     'Black Lives Matter',
//     'Climate change',
//     'Social development',
//     'Volunteering',
//     'Politics',
//     'World peace',
//     'Equality',
//     'Disability rights',
//     'Campus activism',
//     'Sustainability',
//     'Animal rights',
//     'Human rights'
// ]
// const personalInOptions = [
//     'Entrepreneur',
//     'Collector',
//     'Thrifting',
//     'Investing',
//     'Side quests',
//     'Gym and wellness',
//     'Meditation',
//     'Yoga',
//     'Trying new things',
//     'Betting/gambling',
//     'Investing',
//     'Sports',
//     'Vlogging/content creation',
//     'Podcast',
//     'Going on walks',
//     'Camping',
//     'Travelling',
//     'Photography',
//     'Singing',
//     'Dancing',
//     'Learning new languages',
//     'Art',
//     'Boating',
//     'Studying'
// ]




const WhatDoYouEnjoySections: React.FC<{
    answers: {
        SOCIAL?: string[] | null;
        STAYING_IN?: string[] | null;
        CAUSES?: string[] | null;
        PERSONAL?: string[] | null;
    }
    nextSectionHandler: () => void;
    handleAnswer: (section: string, field: string, value: string[]) => void;
    previousStepHandler: () => void;
}> = ({ nextSectionHandler, answers, handleAnswer, previousStepHandler }) => {

    const { data = [], isLoading } = useGetAllStudentInterestsQuery()
    console.log(data)
    const getInterestNames = (category: string): string[] =>
        data?.find((d: InterestCategory) => d.categoryName === category)?.interests?.map((i: Interest) => i.interestId) || [];
    const interestNameToIdMap = data.reduce((map, category) => {
        category.interests.forEach(interest => {
            map[interest.interestId] = interest.interestName;
        });
        return map;
    }, {} as Record<string, string>);

    const socialOptions = getInterestNames("Social");
    const stayingInOptions = getInterestNames("Staying In");
    const causesInOptions = getInterestNames("Causes");
    const personalInOptions = getInterestNames("Personal");
    console.log("causesInOptions===>", causesInOptions)
    // const [selected, setSelected] = useState<string[]>(answers.SOCIAL || []);

    const [selectedSocials, setSelectedSocials] = useState<string[]>(answers.SOCIAL || []);
    const [selectedStayingIn, setSelectedStayingIn] = useState<string[]>(answers.STAYING_IN || []);
    const [selectedCauses, setSelectedCauses] = useState<string[]>(answers.CAUSES || []);
    const [selectedPersonal, setSelectedPersonal] = useState<string[]>(answers.PERSONAL || []);
    // console.log("selectedSocials===>", selectedSocials)


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
        { title: 'Personal', options: personalInOptions, selected: selectedPersonal, setSelected: setSelectedPersonal, img: 'personal.svg' }
    ];

    const [error, setError] = useState(false)
    const totalSelected = selectedSocials.length + selectedStayingIn.length + selectedCauses.length + selectedPersonal.length
    const disabled = totalSelected < 1


    const scrollHandler = () => {
        setError(true)
        if (disabled) {
            const section = document.getElementById('enjoy');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    return (
        <div id="enjoy" className={`${error && disabled ? "bg-[#B3322F]/20" : ""}`}>
            <QuestionTitle>What Do You Enjoy?</QuestionTitle>

            <div className="flex flex-wrap justify-center gap-6 md:px-16 mt-10">
                {sections.map(({ title, options, selected, setSelected, img }) => (
                    <div id={title} key={title} className={`w-full sm:w-[45%] lg:w-[23%] rounded-2xl mx-1 md:px-2 px-10 py-5  `} >
                        <p className="justify-center items-center bg-[#B3322F] text-white rounded-full   mb-4 flex w-full">
                            <span className=' '>{title}  </span>
                            <img alt="" className="h-10 " src={`/assets/img/icons/${img}`} />
                        </p>

                        {isLoading ? <LoaderComponent /> :
                            <MultiSelectWithIds
                                idToValueMapping={interestNameToIdMap}
                                options={options}
                                selected={selected}
                                setSelected={setSelected}
                            />}
                    </div>
                ))}
            </div>
            <NextButton onClick={disabled ? scrollHandler : nextStep} previousStepHandler={previousStepHandler} />
        </div>
    );
};
// const WhatDoYouEnjoySections: React.FC<{
//     answers: {
//         SOCIAL?: string[] | null;
//         STAYING_IN?: string[] | null;
//         CAUSES?: string[] | null;
//         PERSONAL?: string[] | null;
//     }
//     nextSectionHandler: () => void;
//     handleAnswer: (section: string, field: string, value: string[]) => void;
//     previousStepHandler: () => void;
// }> = ({ nextSectionHandler, answers, handleAnswer, previousStepHandler }) => {

//     const { data = [], isLoading } = useGetAllStudentInterestsQuery()
//     console.log(data)
//     const getInterestNames = (category: string): string[] =>
//         data?.find((d: InterestCategory) => d.categoryName === category)?.interests?.map((i: Interest) => i.interestName) || [];

//     const socialOptions = getInterestNames("Social");
//     const stayingInOptions = getInterestNames("Staying In");
//     const causesInOptions = getInterestNames("Causes");
//     const personalInOptions = getInterestNames("Personal");
//     console.log("causesInOptions===>", causesInOptions)

//     const [selectedSocials, setSelectedSocials] = useState<string[]>(answers.SOCIAL || []);
//     const [selectedStayingIn, setSelectedStayingIn] = useState<string[]>(answers.STAYING_IN || []);
//     const [selectedCauses, setSelectedCauses] = useState<string[]>(answers.CAUSES || []);
//     const [selectedPersonal, setSelectedPersonal] = useState<string[]>(answers.PERSONAL || []);
//     console.log("selectedSocials===>", selectedSocials)


//     const nextStep = () => {

//         const interestNameToIdMap: Record<string, string> = {};
//         data.forEach(category => {
//             category.interests.forEach(interest => {
//                 interestNameToIdMap[interest.interestName] = interest.interestId;
//             });
//         });

//         const getInterestIds = (names: string[]) =>
//             names.map(name => interestNameToIdMap[name]).filter(Boolean);


//         const socialIds = getInterestIds(selectedSocials);
//         const stayingInIds = getInterestIds(selectedStayingIn);
//         const causesIds = getInterestIds(selectedCauses);
//         const personalIds = getInterestIds(selectedPersonal);

//         handleAnswer(sectionName, 'SOCIAL', socialIds);
//         handleAnswer(sectionName, 'STAYING_IN', stayingInIds);
//         handleAnswer(sectionName, 'CAUSES', causesIds);
//         handleAnswer(sectionName, 'PERSONAL', personalIds);


//         // handleAnswer(sectionName, 'SOCIAL', selectedSocials);
//         // handleAnswer(sectionName, 'STAYING_IN', selectedStayingIn);
//         // handleAnswer(sectionName, 'CAUSES', selectedCauses);
//         // handleAnswer(sectionName, 'PERSONAL', selectedPersonal);
//         nextSectionHandler();
//     };

//     const sections = [
//         { title: 'Social', options: socialOptions, selected: selectedSocials, setSelected: setSelectedSocials, img: 'social.svg' },
//         { title: 'Staying In', options: stayingInOptions, selected: selectedStayingIn, setSelected: setSelectedStayingIn, img: 'staying_in.svg' },
//         { title: 'Causes', options: causesInOptions, selected: selectedCauses, setSelected: setSelectedCauses, img: 'causes.svg' },
//         { title: 'Personal', options: personalInOptions, selected: selectedPersonal, setSelected: setSelectedPersonal, img: 'personal.svg' }
//     ];

//     const [error, setError] = useState(false)


//     const totalSelected = selectedSocials.length + selectedStayingIn.length + selectedCauses.length + selectedPersonal.length
//     const disabled = totalSelected < 1


//     const scrollHandler = () => {
//         setError(true)
//         if (disabled) {
//             const section = document.getElementById('enjoy');
//             section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         }
//     }

//     return (
//         <div id="enjoy" className={`${error && disabled ? "bg-[#B3322F]/20" : ""}`}>
//             <QuestionTitle>What Do You Enjoy?</QuestionTitle>

//             <div className="flex flex-wrap justify-center gap-6 md:px-16 mt-10">
//                 {sections.map(({ title, options, selected, setSelected, img }) => (
//                     <div id={title} key={title} className={`w-full sm:w-[45%] lg:w-[23%] rounded-2xl mx-1 md:px-2 px-10 py-5  `} >
//                         <p className="justify-center items-center bg-[#B3322F] text-white rounded-full   mb-4 flex w-full">
//                             <span className=' '>{title}  </span>
//                             <img alt="" className="h-10 " src={`/assets/img/icons/${img}`} />
//                         </p>

//                         {isLoading ? <LoaderComponent /> :
//                             <MultiSelect
//                                 options={options}
//                                 selected={selected}
//                                 setSelected={setSelected}
//                             />}
//                     </div>
//                 ))}
//             </div>
//             <NextButton onClick={disabled ? scrollHandler : nextStep} previousStepHandler={previousStepHandler} />
//         </div>
//     );
// };


const BedTimeSections: React.FC<{
    answers: {
        goingOutFrequency?: string | null;
        bedtime?: string | null;
    }
    nextStepHandler: () => void;
    previousStepHandler: () => void;
    handleAnswer: (section: string, field: string, value: string) => void;
}> = ({ nextStepHandler, answers, handleAnswer, previousStepHandler }) => {

    const [error, setError] = useState(false)



    const scrollHandler = () => {
        setError(true)
        if (answers.goingOutFrequency === null) {
            const section = document.getElementById('goingOutFrequency');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        else if (answers.bedtime === null) {
            const section = document.getElementById('bedtime');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.goingOutFrequency === null || answers.bedtime === null

    return (
        <>
            <div id="goingOutFrequency" className={`  rounded-2xl mx-1 py-10 ${error && answers.goingOutFrequency === null ? "bg-[#B3322F]/20" : ""}`}>
                <QuestionTitle>
                    How do you feel about going out (e.g. clubbing or partying)?
                </QuestionTitle>

                <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                    {[
                        { name: 'Never', value: 'Never' },
                        { name: 'Open To It', value: 'Open To It' },
                        { name: 'Occasionally', value: 'Occasionally' },
                        { name: 'Frequently', value: 'Frequently' },

                    ].map(btn => <PrimaryButton selected={answers.goingOutFrequency === btn.value} onClick={() => handleAnswer(sectionName, 'goingOutFrequency', btn.value)}>
                        {btn.name}
                    </PrimaryButton>)}

                </div>
            </div>

            <div id="bedtime" className={`mt-1  rounded-2xl mx-1 py-10 ${error && answers.bedtime === null ? "bg-[#B3322F]/20" : ""}`}>
                <QuestionTitle>
                    What time do you typically go to bed?
                </QuestionTitle>

                <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center text-md px-10 mt-10'>
                    {[
                        { name: 'Before 10PM ', value: 'Before 10PM ' },
                        { name: 'Around 11PM', value: 'Around 11PM' },
                        { name: 'Midnight', value: 'Midnight' },
                        { name: 'After 1AM', value: 'After 1AM' },

                    ].map(btn => <PrimaryButton selected={answers.bedtime === btn.value} onClick={() => handleAnswer(sectionName, 'bedtime', btn.value)}>
                        {btn.name}
                    </PrimaryButton>)}
                </div>
            </div>


            <NextButton onClick={disabled ? scrollHandler : nextStepHandler} previousStepHandler={previousStepHandler} />


        </>
    )
}

const LifestylePreferencesSection: React.FC<{
    answers: {
        cannabisFrequency?: string | null;
        tidinessLevel?: string | null;
    }
    nextStepHandler: () => void;
    handleAnswer: (section: string, field: string, value: string) => void;
    previousStepHandler: () => void;
}> = ({ nextStepHandler, answers, handleAnswer, previousStepHandler }) => {


    const [error, setError] = useState(false)



    const scrollHandler = () => {
        setError(true)
        if (answers.cannabisFrequency === null) {
            const section = document.getElementById('cannabisFrequency');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (answers.tidinessLevel === null) {
            const section = document.getElementById('tidinessLevel');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.cannabisFrequency === null || answers.tidinessLevel === null

    return (
        <>

            <div id="cannabisFrequency" className={`mt-10 rounded-2xl mx-1 py-10 ${error && answers.cannabisFrequency === null ? "bg-[#B3322F]/20" : ""}`}>
                <QuestionTitle>How often do you use recreational substances (e.g. cannabis)?</QuestionTitle>
                <div className="flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10">
                    {[
                        { name: 'Never', value: 'Never' },
                        { name: 'Occasionally', value: 'Occasionally' },
                        { name: 'On Special Occasions', value: 'On Special Occasions' },
                        { name: 'Frequently', value: 'Frequently' },

                    ].map(btn => <PrimaryButton selected={answers.cannabisFrequency === btn.value} onClick={() => handleAnswer(sectionName, 'cannabisFrequency', btn.value)}>
                        {btn.name}
                    </PrimaryButton>)}
                </div>
            </div>


            <div id="tidinessLevel" className={`mt-1  rounded-2xl mx-1 py-10 ${error && answers.tidinessLevel === null ? "bg-[#B3322F]/20" : ""}`}>
                <QuestionTitle>How tidy are you at home?</QuestionTitle>
                <div className="flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center text-md px-10 mt-10">
                    {[
                        { name: 'Very Tidy', value: 'Very Tidy' },
                        { name: 'Pretty Clean', value: 'Pretty Clean' },
                        { name: 'Average', value: 'Average' },
                        { name: 'Messy', value: 'Messy' },

                    ].map(btn => <PrimaryButton selected={answers.tidinessLevel === btn.value} onClick={() => handleAnswer(sectionName, 'tidinessLevel', btn.value)}>
                        {btn.name}
                    </PrimaryButton>)}
                </div>
            </div>


            <NextButton onClick={disabled ? scrollHandler : nextStepHandler} previousStepHandler={previousStepHandler} />


        </>
    );
};




const DrinkAndSmokeSection: React.FC<{
    answers: {
        drinkingFrequency?: string | null;
        smokingFrequency?: string | null;
    }
    nextStepHandler: () => void;
    handleAnswer: (section: string, field: string, value: string) => void;
    previousStepHandler: () => void;
}> = ({ nextStepHandler, answers, handleAnswer, previousStepHandler }) => {



    const [error, setError] = useState(false)



    const scrollHandler = () => {
        setError(true)
        if (answers.drinkingFrequency === null) {
            const section = document.getElementById('drinkingFrequency');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (answers.smokingFrequency === null) {
            const section = document.getElementById('smokingFrequency');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.drinkingFrequency === null || answers.smokingFrequency === null

    return (
        <>

            <div id="drinkingFrequency" className={`rounded-2xl mx-1 py-10 ${error && answers.drinkingFrequency === null ? "bg-[#B3322F]/20" : ""}`}>
                <QuestionTitle>
                    How often do you drink?
                </QuestionTitle>

                <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
                    {[
                        { name: 'Never', value: 'Never' },
                        { name: 'On Special Occasions', value: 'On Special Occasions' },
                        { name: 'Socially On Weekends', value: 'Socially On Weekends' },
                        { name: 'Most Nights', value: 'Most Nights' },

                    ].map(btn => <PrimaryButton selected={answers.drinkingFrequency === btn.value} onClick={() => handleAnswer(sectionName, 'drinkingFrequency', btn.value)}>
                        {btn.name}
                    </PrimaryButton>)}
                </div>
            </div>


            <div id="smokingFrequency" className={`mt-1 rounded-2xl mx-1 py-10 ${error && answers.smokingFrequency === null ? "bg-[#B3322F]/20" : ""}`}>
                <QuestionTitle>
                    How often do you smoke?
                </QuestionTitle>

                <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center text-md px-10 mt-15'>

                    {[
                        { name: 'Never', value: 'Never' },
                        { name: 'Trying To Quit', value: 'Trying To Quit' },
                        { name: 'Occasionally', value: 'Occasionally' },
                        { name: 'Frequently', value: 'Frequently' },

                    ].map(btn => <PrimaryButton selected={answers.smokingFrequency === btn.value} onClick={() => handleAnswer(sectionName, 'smokingFrequency', btn.value)}>
                        {btn.name}
                    </PrimaryButton>)}
                </div>
            </div>



            <NextButton onClick={disabled ? scrollHandler : nextStepHandler} previousStepHandler={previousStepHandler} />


        </>
    )
}

const LetsLearnAboutLifeStyleSection: React.FC<{
    nextStepHandler: () => void;
    name: string
}> = ({ nextStepHandler, name }) => {

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
        studyArea?: string[] | null;
    }
    nextStepHandler: () => void;
    handleAnswer: (section: string, field: string, value: string[]) => void;
    previousStepHandler: () => void;
}>

    = ({ nextStepHandler, answers, handleAnswer, previousStepHandler }) => {

        console.log("studyArea===>", answers)


        const [selected, setSelected] = useState<string[]>([]);
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
            handleAnswer(sectionName, 'studyArea', selected)
            nextStepHandler()
        }

        const disabled = selected.length < 1

        const scrollHandler = () => {
            setError(true)
            if (disabled) {
                const section = document.getElementById('studyArea');
                section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }


        return (

            <div className="text-center ">
                <div id="studyArea" className={`mt-10 rounded-2xl mx-1 py-10 ${error && disabled ? "bg-[#B3322F]/20" : ""}`}>
                    <p className="text-3xl text-[#B3322F] mb-10 px-10">What best describes your area of study?</p>
                    <div className='lg:w-[50%] md:w-[75%] mx-auto px-10'>
                        <MultiSelect
                            setSelected={setSelected}
                            options={suggestions}
                            selected={selected}
                        />
                    </div>
                </div>


                <NextButton onClick={disabled ? scrollHandler : nextStep} previousStepHandler={previousStepHandler} />


            </div>
        );
    };

