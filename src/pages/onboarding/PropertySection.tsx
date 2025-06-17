import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';
import QRCode from "react-qr-code";
import { ICONS } from '../../utils/constants/app-info.constant';
import { NextButton, PrimaryButton, ShareSection, transitionVariants } from "./CommonComponents";
import axios from 'axios';


interface PropertySectionParams {
    formStep: number;
    name: string;
    nextStepHandler: () => void;
    previousStepHandler: () => void;
    nextSectionHandler: () => void;
    runConfettiHandler: () => void;
    setRunConfetti: (value: boolean) => void;
    propertyValue: number;
    answers: Record<string, unknown>; // Assuming unknown type for answers keys
    handleAnswer: (section: string, field: string, value: unknown) => void;
    exitForm: boolean;
    setExitForm: React.Dispatch<React.SetStateAction<boolean>>;
}


const PropertySection = (props: any) => {
    const {
        formStep: step,
        section,
        answers,
        handleAnswer,
        nextStepHandler,
        previousStepHandler,
        nextSectionHandler,
        runConfettiHandler,
        setRunConfetti,

    } = props
    const name = "Paul Brooks";
    const formStep = step[section]
    const [exitForm, setExitForm] = useState(false);

    const params: PropertySectionParams = {
        formStep,
        name,
        nextStepHandler,
        previousStepHandler,
        propertyValue: formStep,
        answers: answers.PROPERTY_SECTION as Record<string, unknown>,
        handleAnswer,
        exitForm,
        setExitForm,
        nextSectionHandler,
        runConfettiHandler,
        setRunConfetti
    };

    const formSteps = [
        WelcomeScreen,
        TypeOfRentalSection,
        WhenYouAreMovingSection,
        HowLongToStaySection,
        BudgetSection,
        CloseToCampusSection,
        WhereToBeLocatedSection,
        LookingForSection,
        RoommatesSection,
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

export default PropertySection



const WelcomeScreen: React.FC<{
    name: string;
    nextStepHandler: () => void;
}> = ({ name, nextStepHandler }) => {
    const [runConfetti, setRunConfetti] = useState(false);
    setTimeout(() => {
        setRunConfetti(false);
    }, 3000);

    return (
        <>
            {runConfetti && <Confetti numberOfPieces={400} />}


            <div className='text-center mt-35'>
                <p className='text-3xl text-[#B3322F]'>Welcome To Next Room <br /> <span className='font-bold'>{name}</span></p>

                <img alt="" className="h-40 pr-1 mx-auto -my-4" src="/assets/img/icons/survey_icon.svg" />

                <p className='text-md'> Let's Find Your Perfect Home. <br /> We'll Ask A Few Questions To Get Started </p>

                <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-12 text-md'>
                    <PrimaryButton
                        button={true} onClick={nextStepHandler}
                        icon={ICONS.ARROW_RIGHT_WHITE}
                    >
                        Get Started
                    </PrimaryButton>

                    <PrimaryButton button={true}  >
                        I’ll Search On My Own
                    </PrimaryButton>
                </div>
            </div>
        </>
    )
}





const LetsBecomeRoomMateSection: React.FC<{
    url: string
}> = ({ url }) => {
    return (
        <>
            <img alt="" className="h-25 mx-auto" src={`/assets/img/logo/primary_logo.png`} />



            <p className='text-2xl text-[#B3322F]  w-full  px-10 text-center mx-auto'>

                Let’s Become Roommates!
            </p>

            <img alt="" className="h-60 mx-auto -mt-5" src={`/assets/img/icons/roommates.svg`} />


            <p className='text-lg text-[#B3322F]  w-full  px-10 text-center mx-auto'>

                Join by scanning the <br />
                QR Code or follow the link below:
            </p>

            <p className='text-center px-10'>http://sample.info/?insect=fireman&porter=attraction#cave</p>
            {/* <img alt="" className="h-35 mx-auto mt-8" src={`/assets/img/icons/qr_code.svg`} /> */}
            <QRCode value={url} className="h-35 mx-auto mt-10" />


            <p className='text-lg text-[#B3322F] mt-15 w-full  px-10 text-center mx-auto font-semibold'>What is Next Room?</p>


            <p className='w-[80%] md:[70%] lg:w-[60%] xl:w-[50%] text-center mx-auto mt-3'>

                Next Room is the future of student housing—built to make finding a place (and people to live with) actually simple. From verified listings to smart roommate matching and easy sublets, it’s everything you wish existed when the group chat said “who’s signing the lease?”
                <br />
                <br />
                You’ve been invited to join your roommate’s housing search. Next Room helps you find a home together—without the scams, stress, or endless scrolling.
            </p>

            <p className='w-[80%] md:[70%] lg:w-[60%] xl:w-[50%] text-center mx-auto mt-3 font-bold'>
                Fast. Verified. Student-focused. Join your friend on Next Room today!<br />
                Your future home is waiting—together.
            </p>
        </>
    )
}





const SkipNextQuestionSection = () => {
    const inviteRef = useRef<HTMLDivElement>(null);
    const url = "www.nextroom.ca"



    return (
        <>

            {/* Hidden container to capture */}
            <div ref={inviteRef} className="py-30 absolute left-[-9999px] top-0"  >
                <LetsBecomeRoomMateSection {...{ url }} />
            </div>

            <p className='text-2xl text-[#B3322F] mt-10 font-semibold w-full  px-10 text-center mx-auto'> Skip the next questions, invite your friends now! </p>


            <ShareSection />

        </>
    )
}

const RoommatesSection: React.FC<{
    handleAnswer: (sectino: string, key: string, value: string | number) => void;
    nextSectionHandler: () => void;
    answers: {
        BRINGING_ROOMMATES?: string;
        ROOMMATE_COUNT?: number;
        NEED_ROOMMATE_MATCHING?: string;
    };
}> = ({ handleAnswer, answers, nextSectionHandler }) => {
    // const [count, setcount] = useState(0)
    // const [skipQuestionSection, setSkipQuestionSection] = useState(false)
    const count = answers?.ROOMMATE_COUNT || 0
    const increment = () => { handleAnswer('PROPERTY_SECTION', 'ROOMMATE_COUNT', count + 1) }
    const decrement = () => { if (count > 0) handleAnswer('PROPERTY_SECTION', 'ROOMMATE_COUNT', count - 1) }

    const [error, setError] = useState(false)

    const scrollHandler = () => {
        setError(true)
        if (answers.BRINGING_ROOMMATES === null) {
            const section = document.getElementById('BRINGING_ROOMMATES');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        else if (answers.NEED_ROOMMATE_MATCHING === null) {
            const section = document.getElementById('NEED_ROOMMATE_MATCHING');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.BRINGING_ROOMMATES === null || answers.NEED_ROOMMATE_MATCHING === null

    return (
        <>
            <div id="BRINGING_ROOMMATES" className={`mt-10 rounded-2xl mx-1 py-10 ${error && answers.BRINGING_ROOMMATES === null ? "bg-[#B3322F]/20" : ""}`}>
                <p className='text-2xl text-[#B3322F] font-semibold w-full  px-10 text-center mx-auto'> Would you like to bring any roommates? </p>

                <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-15 text-md px-10'>
                    <PrimaryButton selected={answers?.BRINGING_ROOMMATES === 'Yes'} onClick={() => handleAnswer('PROPERTY_SECTION', 'BRINGING_ROOMMATES', 'Yes')} > Yes </PrimaryButton>
                    <PrimaryButton selected={answers?.BRINGING_ROOMMATES === 'No'} onClick={() => handleAnswer('PROPERTY_SECTION', 'BRINGING_ROOMMATES', 'No')} > No </PrimaryButton>
                </div>
            </div>



            <p className='text-2xl text-[#B3322F] mt-12 font-semibold w-full  px-10 text-center mx-auto'> How many roommates are joining you? </p>

            <div className='flex justify-center items-center px-15'>
                <div className='flex gap-6 justify-center items-center mt-5 text-md px-10 bg-white py-3 rounded-full shadow-[#D9D9D9] drop-shadow-xl shadow-md w-full md:w-auto'>

                    {/* Decrement Button */}
                    <motion.button
                        whileTap={{ scale: 0.85 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className='bg-[#B3322F] text-center pb-1 px-4 text-white rounded-full cursor-pointer'
                        onClick={decrement}
                    >
                        -
                    </motion.button>

                    {/* Animate the count change */}
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={count}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.1 }}
                        >
                            {count}
                        </motion.span>
                    </AnimatePresence>

                    {/* Increment Button */}
                    <motion.button
                        whileTap={{ scale: 0.85 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className='bg-[#B3322F] text-center pb-1 px-4 text-white rounded-full cursor-pointer'
                        onClick={increment}
                    >
                        +
                    </motion.button>

                </div>
            </div>


            <div id="NEED_ROOMMATE_MATCHING" className={`mt-10 rounded-2xl mx-1 py-10 ${error && answers.NEED_ROOMMATE_MATCHING === null ? "bg-[#B3322F]/20" : ""}`}>
                <p className='text-2xl text-[#B3322F] mt-10 font-semibold w-full  px-10 text-center mx-auto'> Do you want help finding additional roommates? </p>
                <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-15 text-md px-10'>
                    <PrimaryButton selected={answers?.NEED_ROOMMATE_MATCHING === 'Yes'} onClick={() => handleAnswer('PROPERTY_SECTION', 'NEED_ROOMMATE_MATCHING', 'Yes')}> Yes </PrimaryButton>
                    <PrimaryButton selected={answers?.NEED_ROOMMATE_MATCHING === 'No'} onClick={() => handleAnswer('PROPERTY_SECTION', 'NEED_ROOMMATE_MATCHING', 'No')} > No </PrimaryButton>
                </div>
            </div>

            {
                answers?.NEED_ROOMMATE_MATCHING === 'No' ? <SkipNextQuestionSection /> : <NextButton onClick={disabled ? scrollHandler : nextSectionHandler} />
            }



        </>
    )
}

const LookingForSection: React.FC<{
    nextStepHandler: () => void;
    handleAnswer: (section: string, key: string, value: unknown) => void;
    answers: Record<string, unknown>; // You can later replace 'unknown' with a stricter type
}> = ({ nextStepHandler, handleAnswer, answers }) => {
    const rentalTypes = [
        {
            name: "House",
            icon: "house_icon.svg",
            details: `Typically shared rental homes in residential areas,  offering
                        more space and privacy; however, may be farther from campus
                        and require independent management of bills and upkeep.`,
        },
        {
            name: "Apartment",
            icon: "apartment_icon.svg",
            details: `Private or shared units in larger residential buildings,
                        often closer to city centers; however, limited community
                        amenities and may have stricter lease terms.`,
        },
        {
            name: "Student Accommodation",
            icon: "accommodation_icon.svg",
            details: `Student, purpose-built apartments or communities,
                    typically enhanced by community (building) amenities;
                    however, the cost is typically significantly more.`,
        }
    ]

    const [error, setError] = useState(false)
    const scrollHandler = () => {
        setError(true)
        if (answers.RENTAL_PREFERENCE === null) {
            const section = document.getElementById('RENTAL_PREFERENCE');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.RENTAL_PREFERENCE === null

    return (
        <>
            <div id="RENTAL_PREFERENCE" className={`mt-10 rounded-2xl mx-1 py-10 ${error && answers.RENTAL_PREFERENCE === null ? "bg-[#B3322F]/20" : ""}`}>
                <p className='text-2xl text-[#B3322F] font-semibold w-[60%]  md:w-[80%] text-center mx-auto'> Where would you like to be located? </p>

                <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-10 text-md px-10'>
                    {rentalTypes.map(RENTAL_TYPE => (
                        <div className='w-full  md:w-auto group'>
                            <p className='max-w-[200px] text-[8px] group-hover:opacity-100 opacity-0 mx-auto shadow-[#D9D9D9] drop-shadow-xl shadow-md bg-white px-2  mb-3 py-2 hidden md:flex'>{RENTAL_TYPE.details}</p>
                            <button
                                onClick={() => handleAnswer('PROPERTY_SECTION', 'RENTAL_PREFERENCE', RENTAL_TYPE.name)}
                                className={` border border-white ${answers.RENTAL_PREFERENCE === RENTAL_TYPE.name ? 'bg-[#B3322F] hover:bg-[#b3312fa2]' : 'bg-[#D9D9D9] hover:bg-[#d9d9d9a4]'}bg-[#B3322F] w-full md:w-[250px] text-sm text-center py-3 text-white  rounded-full flex justify-end items-center gap-2 px-2`}>
                                <div className='flex gap-2  w-full justify-center'>
                                    <img alt="" className="h-5 " src={`/assets/img/icons/${RENTAL_TYPE.icon}`} />
                                    {RENTAL_TYPE.name}
                                </div>

                                <img alt="" className="h-6 relative right-1 mr-2 group" src={`/assets/img/icons/question_circle_icon.svg`} />
                            </button>

                        </div>
                    ))}
                </div>
            </div>

            <div className="md:relative sticky bottom-4">
                <NextButton onClick={disabled ? scrollHandler : nextStepHandler} />
            </div>

        </>
    )
}


const WhereToBeLocatedSection: React.FC<{
    nextStepHandler: () => void;
    handleAnswer: (section: string, key: string, value: unknown) => void;
    runConfettiHandler: () => void;
    setRunConfetti: (value: string) => void;
    answers: Record<string, unknown>; // You can later replace 'unknown' with a stricter type
}> = ({ nextStepHandler, handleAnswer, answers, runConfettiHandler, setRunConfetti }) => {
    const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY; // Replace this securely

    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    // const suggestions = [
    //     "400 Rideau Street, Ottawa, ON",
    //     "Rideau Canal, Ottawa, ON",
    //     "Rideau Carleton Casino, Future Hard Rock, Ottawa, ON",
    //     "Rideau Cottage, Sussex Drive, Ottawa, ON",
    //     "Rideau Falls, Ottawa, ON",
    // ];

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (search.trim().length > 0) fetchSuggestions(search);
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [search]);

    const fetchSuggestions = async (query: string) => {
        try {
            setLoading(true);
            // const response = await axios.get(
            //     `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${GOOGLE_API_KEY}&query=${query}`,
            //     // {
            //     //     headers: {
            //     //         'Content-Type': 'application/json',
            //     //         'X-Goog-Api-Key': GOOGLE_API_KEY,
            //     //         'X-Goog-FieldMask': 'places.displayName,places.formattedAddress'
            //     //     },
            //     //     // data: {
            //     //     //     textQuery: query
            //     //     // }
            //     // }
            // );
            const response = await axios.post(
                `https://places.googleapis.com/v1/places:autocomplete`,
                {
                    "input": query,

                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Goog-Api-Key': GOOGLE_API_KEY,
                    }
                }
            );
            const results = response.data.suggestions || [];
            console.log("results==>", results)
            const newSuggestions = results.map((place: any) => place?.placePrediction?.text?.text);
            console.log("newSuggestions==>", newSuggestions)
            setSuggestions(newSuggestions);
        } catch (error) {
            console.error('Google Places API error:', error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    console.log(loading)

    const [error, setError] = useState(false)

    const scrollHandler = () => {
        setError(true)
        if (answers.PREFERRED_LOCATION === null) {
            const section = document.getElementById('PREFERRED_LOCATION');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.PREFERRED_LOCATION === null



    return (
        <>
            <div id="PREFERRED_LOCATION" className={`mt-10 rounded-2xl mx-1 py-10 ${error && answers.PREFERRED_LOCATION === null ? "bg-[#B3322F]/20" : ""}`}>
                <p className='text-2xl text-[#B3322F] font-semibold w-[60%]  md:w-[80%] text-center mx-auto'> Where would you like to be located? </p>

                <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-20 text-md px-10'>
                    <PrimaryButton selected={answers.PREFERRED_LOCATION === "Surprise Me"} onClick={() => {
                        setRunConfetti(true);
                        runConfettiHandler();
                        handleAnswer('PROPERTY_SECTION', 'PREFERRED_LOCATION', 'Surprise Me')
                    }} > I Don’t Know Yet - Surprise Me </PrimaryButton>
                    <PrimaryButton selected={answers.PREFERRED_LOCATION !== "Surprise Me" && answers.PREFERRED_LOCATION !== null} onClick={() => handleAnswer('PROPERTY_SECTION', 'PREFERRED_LOCATION', '')} > I Have A Preferred Area </PrimaryButton>
                </div>

                {answers.PREFERRED_LOCATION !== "Surprise Me" && answers.PREFERRED_LOCATION !== null &&
                    <div className='px-10 md:px-0 mt-12'>
                        {/* Google Search */}
                        <div className='shadow-[#D9D9D9] mb-3  md:w-[50%] pl-4 pr-8 py-2 mx-auto rounded-full drop-shadow-md shadow-md bg-white mt-5 flex items-center  justify-center gap-3'>
                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                placeholder='Start searching for your preferred area or address (e.g. The Glebe or Rideau Centre)'
                                className=' focus:outline-none  w-full px-2 py-2'
                            />
                            <img alt="" className="h-8 mt-1" src="assets/img/icons/google_logo.svg" />
                        </div>
                        {/* Google Suggestion */}
                        {search.length > 0 && <div className='shadow-[#D9D9D9] mb-3 overflow-hidden md:w-[50%]  py-2 mx-auto rounded-3xl drop-shadow-md shadow-md bg-white mt-5 gap-3 text-xs'>
                            {suggestions.map(searchString => (
                                <div className={` pl-4 pr-8 flex gap-2 py-1.5 cursor-pointer text-left ${searchString === answers.PREFERRED_LOCATION_NAME ? 'bg-gray-200' : ''}`}
                                    onClick={() => handleAnswer('PROPERTY_SECTION', 'PREFERRED_LOCATION_NAME', searchString)} >
                                    <img alt="" className="h-3" src="assets/img/icons/location_logo.svg" />
                                    {searchString}
                                </div>
                            ))}
                        </div>}
                    </div>
                }
            </div >
            <div className="md:relative sticky bottom-4">
                <NextButton onClick={disabled ? scrollHandler : nextStepHandler} />
            </div>
        </>
    )
}


const CloseToCampusSection: React.FC<{
    nextStepHandler: () => void;
    handleAnswer: (section: string, key: string, value: unknown) => void;
    answers: Record<string, unknown>; // You can later replace 'unknown' with a stricter type
}> = ({ nextStepHandler, handleAnswer, answers }) => {
    // const [value, setValue] = useState(1200);
    const [error, setError] = useState(false)
    const min = 1;
    const max = 20;
    const value = Number(answers?.DISTANCE_FROM_CAMPUS ?? min);

    // Calculate percentage position
    const getLeftPosition = () => {
        const percentage = ((value - min) / (max - min)) * 100;
        return `calc(${percentage}% - 24px)`; // Adjust the offset to center the label
    };


    const scrollHandler = () => {
        setError(true)
        if (answers.DISTANCE_FROM_CAMPUS === null) {
            const section = document.getElementById('DISTANCE_FROM_CAMPUS');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.DISTANCE_FROM_CAMPUS === null

    return (
        <>
            <div id="DISTANCE_FROM_CAMPUS" className={`mt-10 rounded-2xl mx-1 py-10 ${error && answers.DISTANCE_FROM_CAMPUS === null ? "bg-[#B3322F]/20" : ""}`}>
                <p className='text-2xl text-[#B3322F] font-semibold w-[60%]  md:w-[80%] text-center mx-auto'> How close to campus is your preferred rental? </p>
                <div className="mt-10  px-10 md:px-50">
                    <div className="flex justify-between text-black font-semibold mb-2">
                        <p>{min} km</p>
                        <p>{max} km</p>
                    </div>
                    <div className="relative w-full">
                        {/* Slider */}
                        <input
                            type="range"
                            className="custom-slider w-full"
                            min={min}
                            max={max}
                            value={value}
                            onChange={(e) => handleAnswer('PROPERTY_SECTION', 'DISTANCE_FROM_CAMPUS', Number(e.target.value))}
                        />
                        {/* Moving label */}
                        <div
                            className="absolute top-8  font-bold text-sm w-max"
                            style={{ left: getLeftPosition() }}
                        >
                            {value} km
                        </div>
                    </div>
                </div>

            </div>

            <div className="md:relative sticky bottom-4">
                <NextButton onClick={disabled ? scrollHandler : nextStepHandler} />
            </div>

        </>
    )
}


const BudgetSection: React.FC<{
    nextStepHandler: () => void;
    handleAnswer: (section: string, key: string, value: unknown) => void;
    answers: Record<string, unknown>; // You can later replace 'unknown' with a stricter type
}> = ({ nextStepHandler, handleAnswer, answers }) => {
    const [error, setError] = useState(false)
    const min = 500;
    const max = 2000;

    // Use fallback if MONTHLY_BUDGET is null or undefined
    const MONTHLY_BUDGET = Number(answers.MONTHLY_BUDGET ?? min);

    // Calculate percentage position
    const getLeftPosition = () => {
        const percentage = ((MONTHLY_BUDGET - min) / (max - min)) * 100;
        return `calc(${percentage}% - 24px)`; // Center the label
    };

    const scrollHandler = () => {
        setError(true)
        if (answers.MONTHLY_BUDGET === null) {
            const section = document.getElementById('MONTHLY_BUDGET');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.MONTHLY_BUDGET === null

    return (
        <>

            <div id="MONTHLY_BUDGET" className={`mt-10 rounded-2xl mx-1 py-10 ${error && answers.MONTHLY_BUDGET === null ? "bg-[#B3322F]/20" : ""}`}>
                <p className='text-2xl text-[#B3322F] font-semibold w-[60%]  md:w-[80%] text-center mx-auto'>
                    What is your monthly budget?
                </p>

                <div className="mt-10  px-10 md:px-50">
                    <div className="flex justify-between text-black font-semibold mb-2">
                        <p>$500</p>
                        <p>$2000</p>
                    </div>

                    <div className="relative w-full">
                        {/* Slider */}
                        <input
                            type="range"
                            className="custom-slider w-full"
                            min={min}
                            max={max}
                            value={MONTHLY_BUDGET}
                            onChange={(e) => handleAnswer('PROPERTY_SECTION', 'MONTHLY_BUDGET', Number(e.target.value))}
                        />

                        {/* Moving label */}
                        <div
                            className="absolute top-8 font-bold text-sm"
                            style={{ left: getLeftPosition() }}
                        >
                            ${MONTHLY_BUDGET}
                        </div>
                    </div>
                </div>

            </div>

            <div className="md:relative sticky bottom-4">
                <NextButton onClick={disabled ? scrollHandler : nextStepHandler} />
            </div>
        </>
    );
};


const HowLongToStaySection: React.FC<{
    nextStepHandler: () => void;
    handleAnswer: (section: string, key: string, value: unknown) => void;
    answers: Record<string, unknown>; // You can later replace 'unknown' with a stricter type
}> = ({ nextStepHandler, handleAnswer, answers }) => {
    const dateInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState(false)

    const handleDateWrapperClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker?.(); // preferred (modern browsers)
            dateInputRef.current.focus();        // fallback
        }
    };


    const scrollHandler = () => {
        setError(true)
        if (answers.STAY_DURATION === null) {
            const section = document.getElementById('STAY_DURATION');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.STAY_DURATION === null

    return (
        <>
            <div id="STAY_DURATION" className={`mt-10 rounded-2xl mx-1 py-10 ${error && answers.STAY_DURATION === null ? "bg-[#B3322F]/20" : ""}`}>
                <p className='text-2xl text-[#B3322F] font-semibold w-[60%]  md:w-[80%] text-center mx-auto'> How long is your stay? </p>
                <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-20 text-md px-10'>
                    <PrimaryButton selected={answers.STAY_DURATION === '4 Months'} onClick={() => handleAnswer('PROPERTY_SECTION', 'STAY_DURATION', '4 Months')}  > 4 Months </PrimaryButton>
                    <PrimaryButton selected={answers.STAY_DURATION === '6 Months'} onClick={() => handleAnswer('PROPERTY_SECTION', 'STAY_DURATION', '6 Months')} > 6 Months </PrimaryButton>
                    <PrimaryButton selected={answers.STAY_DURATION === '8 Months'} onClick={() => handleAnswer('PROPERTY_SECTION', 'STAY_DURATION', '8 Months')} > 8 Months </PrimaryButton>
                    <PrimaryButton selected={answers.STAY_DURATION === '12 Months'} onClick={() => handleAnswer('PROPERTY_SECTION', 'STAY_DURATION', '12 Months')}> 12 Months </PrimaryButton>
                </div>
                <div className={`border border-white 
                ${(
                        answers.STAY_DURATION !== '4 Months' &&
                        answers.STAY_DURATION !== '6 Months' &&
                        answers.STAY_DURATION !== '8 Months' &&
                        answers.STAY_DURATION !== '12 Months' &&
                        answers.STAY_DURATION !== null) ? "bg-[#B3322F]" : "bg-[#D9D9D9]"}
                 mt-6 md:mt-10 rounded-full mx-15 md:w-max md:mx-auto`} onClick={handleDateWrapperClick}>
                    <input onChange={(e) => handleAnswer('PROPERTY_SECTION', 'STAY_DURATION', `${e.target.value}`)} type="date" className=' input-white-calendar px-10 text-center py-2 text-white focus:outline-none   ' ref={dateInputRef} />
                </div>


            </div >

            <div className="md:relative sticky bottom-4">
                <NextButton onClick={disabled ? scrollHandler : nextStepHandler} />
            </div>


        </>
    )
}

const WhenYouAreMovingSection: React.FC<{
    nextStepHandler: () => void;
    handleAnswer: (section: string, key: string, value: unknown) => void;
    answers: Record<string, unknown>; // You can later replace 'unknown' with a stricter type
}> = ({ nextStepHandler, handleAnswer, answers }) => {
    const dateInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState(false)

    const handleDateWrapperClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker?.(); // preferred (modern browsers)
            dateInputRef.current.focus();        // fallback
        }
    };

    const scrollHandler = () => {
        setError(true)
        if (answers.MOVE_IN_DATE === null) {
            const section = document.getElementById('MOVE_IN_DATE');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.MOVE_IN_DATE === null

    return (
        <>
            <div id="MOVE_IN_DATE" className={`mt-10 rounded-2xl mx-1 py-10 ${error && answers.MOVE_IN_DATE === null ? "bg-[#B3322F]/20" : ""}`}>

                <p className='text-2xl text-[#B3322F] font-semibold w-[60%]  md:w-[80%] text-center mx-auto'> When are you moving in? </p>

                <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-20 text-md px-10'>
                    <PrimaryButton selected={answers.MOVE_IN_DATE === 'September 1'} onClick={() => handleAnswer('PROPERTY_SECTION', 'MOVE_IN_DATE', 'September 1')}  > September 1 </PrimaryButton>
                    <PrimaryButton selected={answers.MOVE_IN_DATE === 'May 1'} onClick={() => handleAnswer('PROPERTY_SECTION', 'MOVE_IN_DATE', 'May 1')} > May 1 </PrimaryButton>
                </div>

                {/* <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full mt-10'> May 1 </button> */}
                <div className={`
                ${(answers.MOVE_IN_DATE !== 'September 1' && answers.MOVE_IN_DATE !== 'May 1' && answers.MOVE_IN_DATE !== null) ? "bg-[#B3322F]" : "bg-[#D9D9D9] border-white border"}
                 mt-6 md:mt-10 rounded-full   mx-15 md:w-max md:mx-auto`} onClick={handleDateWrapperClick}>
                    <input onChange={(e) => handleAnswer('PROPERTY_SECTION', 'MOVE_IN_DATE', `${e.target.value}`)} type="date" className=' input-white-calendar px-10 text-center py-2 text-white focus:outline-none   ' ref={dateInputRef} />
                </div>

            </div>

            <div className="md:relative sticky bottom-4">
                <NextButton onClick={disabled ? scrollHandler : nextStepHandler} />
            </div>

        </>
    )
}

const TypeOfRentalSection: React.FC<{
    nextStepHandler: () => void;
    handleAnswer: (section: string, field: string, value: string) => void;
    answers: {
        RENTAL_TYPE?: string | null;
    };
}> = ({
    nextStepHandler,
    handleAnswer,
    answers,
}) => {
        const [error, setError] = useState(false)

        const options = [
            { label: 'Lease', value: 'lease' },
            { label: 'Sublet', value: 'sublet' },
        ];


        const scrollHandler = () => {
            setError(true)
            if (answers.RENTAL_TYPE === null) {
                const section = document.getElementById('RENTAL_TYPE');
                section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        const disabled = answers.RENTAL_TYPE === null

        return (
            <div className="text-center">

                <div id="RENTAL_TYPE" className={`mt-10 rounded-2xl mx-1 py-10 ${error && answers.RENTAL_TYPE === null ? "bg-[#B3322F]/20" : ""}`}>
                    <p className="text-2xl text-[#B3322F] font-semibold w-[60%] md:w-[80%] mx-auto ">
                        What type of rental are you looking for?
                    </p>

                    <div className={`  flex flex-col  md:flex-row gap-6 justify-center items-center text-md px-10 mt-10`}>
                        {options.map(({ label, value }) => (
                            <PrimaryButton
                                key={value}
                                onClick={() => handleAnswer('PROPERTY_SECTION', 'RENTAL_TYPE', value)}
                                selected={answers.RENTAL_TYPE === value}
                            >
                                {label}
                            </PrimaryButton>
                        ))}
                    </div>
                </div>

                <div className="mt-0">
                    <NextButton onClick={disabled ? scrollHandler : nextStepHandler} />
                </div>
            </div>
        );
    };




