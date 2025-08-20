import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';
// import QRCode from "react-qr-code";
import { LoaderComponent } from '../../../components/Loader';
import { ICONS } from '@src/utils/constants/app-info.constant';
import { updateOnboardingStatusPayload } from '@src/utils/interfaces';
import { NextButton, PrimaryButton, SkipNextQuestionSection, transitionVariants } from "./CommonComponents";
import { Button } from '../../../components/Button';
import { comunityAmenities, unitAmenities } from '@src/static-data/index';


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
    updateOnboardingStatusHandler: (payload: updateOnboardingStatusPayload) => void
}


const PropertySection = (props: any) => {
    const {
        updateOnboardingStatusHandler,
        formStep: step,
        section,
        answers,
        handleAnswer,
        nextStepHandler,
        previousStepHandler,
        nextSectionHandler,
        runConfettiHandler,
        setRunConfetti,
        name
    } = props

    const formStep = step[section]
    const [exitForm, setExitForm] = useState(false);

    const params: PropertySectionParams = {
        updateOnboardingStatusHandler,
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
        AmenitiesSection,
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
    updateOnboardingStatusHandler: (payload: updateOnboardingStatusPayload) => void;
}> = ({ name, nextStepHandler, updateOnboardingStatusHandler }) => {
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

                    <PrimaryButton button={true} onClick={() => updateOnboardingStatusHandler({ onboardingFormSkipped: true })} >
                        I’ll Search On My Own
                    </PrimaryButton>
                </div>
            </div>
        </>
    )
}













const AmenitiesSection: React.FC<{
    previousStepHandler: () => void;
    handleAnswer: (sectino: string, key: string, value: string | number | string[]) => void;
    nextStepHandler: () => void;
    answers: {
        unitAmenities?: string[] | [];
        communityAmenities?: string[] | [];
    };
}> = ({ handleAnswer, answers, nextStepHandler, previousStepHandler }) => {
    const [error] = useState(false)
    const [selectedUnitAmenities, setSelectedUnitAmenities] = useState<string[]>(answers.unitAmenities || [])
    const [selectedComunityAmenities, setSelectedComunityAmenities] = useState<string[]>(answers.communityAmenities || [])

    const handleUnitAmenityToggle = (amenity: string) => {
        setSelectedUnitAmenities((prev: string[]) =>
            prev.includes(amenity)
                ? prev.filter((a: string) => a !== amenity) // remove
                : [...prev, amenity] // add
        );
    };
    const handleCommunityAmenityToggle = (amenity: string) => {
        setSelectedComunityAmenities((prev: string[]) =>
            prev.includes(amenity)
                ? prev.filter((a: string) => a !== amenity) // remove
                : [...prev, amenity] // add
        );
    };

    // const scrollHandler = () => {
    //     setError(true)
    //     if (answers.unitAmenities === null) {
    //         const section = document.getElementById('unitAmenities');
    //         section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //     }
    //     else if (answers.communityAmenities === null) {
    //         const section = document.getElementById('communityAmenities');
    //         section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //     }
    // }

    // const disabled = answers.unitAmenities === null || answers.communityAmenities === null




    const nextButtonHandler = () => {
        handleAnswer('PROPERTY_SECTION', 'unitAmenities', selectedUnitAmenities)
        handleAnswer('PROPERTY_SECTION', 'communityAmenities', selectedComunityAmenities)
        nextStepHandler()
    }
    return (
        <>
            <p className='text-2xl text-[#B3322F] font-semibold w-full  px-10 text-center mx-auto'> What type of amenities are you looking for? </p>
            <div id="unitAmenities" className={`mt-10 rounded-2xl mx-1 py-10 ${error && answers.unitAmenities === null ? "bg-[#B3322F]/20" : ""}`}>
                <p className='text-2xl  font-semibold w-full  px-10 text-center mx-auto'> Unit Amenities </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 mt-6  mx-auto max-w-fit   ">
                    {unitAmenities.map((amenity, index) => (
                        <PrimaryButton key={index} selected={selectedUnitAmenities.includes(amenity.name)} onClick={() => handleUnitAmenityToggle(amenity.name)}>
                            <div className='flex items-center w-full gap-2 px-4'>
                                <div className='flex-shrink-0 w-6 h-6'>
                                    <img
                                        alt={amenity.name || "Amenity icon"}
                                        className="w-full h-full object-contain"
                                        src={`/assets/img/onboarding-icons/${amenity.icon}`}
                                    />
                                </div>
                                <div className='flex-grow text-center truncate'>
                                    {amenity.name}
                                </div>
                            </div>
                        </PrimaryButton>
                    ))}
                </div>
            </div>
            <div id="communityAmenities" className={`rounded-2xl mx-1 py-10 ${error && answers.communityAmenities === null ? "bg-[#B3322F]/20" : ""}`}>
                <p className='text-2xl  font-semibold w-full  px-10 text-center mx-auto'> Community Amenities </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 mt-6  mx-auto max-w-fit">
                    {comunityAmenities.map((amenity, index) => (
                        <PrimaryButton key={index} selected={selectedComunityAmenities.includes(amenity.name)} onClick={() => handleCommunityAmenityToggle(amenity.name)}>
                            <div className='flex items-center w-full gap-2 px-4'>
                                <div className='flex-shrink-0 w-6 h-6'>
                                    <img
                                        alt={amenity.name || "Amenity icon"}
                                        className="w-full h-full object-contain"
                                        src={`/assets/img/onboarding-icons/${amenity.icon}`}
                                    />
                                </div>
                                <div className='flex-grow text-center truncate'>
                                    {amenity.name}
                                </div>
                            </div>
                        </PrimaryButton>
                    ))}
                </div>
            </div>


            <NextButton onClick={nextButtonHandler} previousStepHandler={previousStepHandler} />
        </>
    )

}

const RoommatesSection: React.FC<{
    previousStepHandler: () => void;
    handleAnswer: (sectino: string, key: string, value: string | number | boolean) => void;
    nextSectionHandler: () => void;
    answers: {
        wantsRoommates?: boolean;
        roommateCount?: number | null;
        wantsRoommateMatching?: boolean;
    };
}> = ({ handleAnswer, answers, nextSectionHandler, previousStepHandler }) => {
    // const navigate = useNavigate()
    // const [count, setcount] = useState(0)
    // const [skipQuestionSection, setSkipQuestionSection] = useState(false)
    const count = answers?.roommateCount || 0
    const increment = () => { handleAnswer('PROPERTY_SECTION', 'roommateCount', count + 1) }
    const decrement = () => { if (count > 0) handleAnswer('PROPERTY_SECTION', 'roommateCount', count - 1) }

    const [error, setError] = useState(false)

    const scrollHandler = () => {
        setError(true)
        if (answers.wantsRoommates === null) {
            const section = document.getElementById('wantsRoommates');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        else if (answers.wantsRoommateMatching === null) {
            const section = document.getElementById('wantsRoommateMatching');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.wantsRoommates === null || answers.wantsRoommates ? answers.wantsRoommateMatching === null : false

    const nextHandler = () => {
        nextSectionHandler()
        // if (answers?.wantsRoommateMatching === 'No') {
        //     navigate(ROUTES.SEARCH_PROPERTY)
        // }
        // else { nextSectionHandler() }
    }

    return (
        <>
            <div id="wantsRoommates" className={`mt-10 rounded-2xl mx-1 py-10 ${error && answers.wantsRoommates === null ? "bg-[#B3322F]/20" : ""}`}>
                <p className='text-2xl text-[#B3322F] font-semibold w-full  px-10 text-center mx-auto'> Would you like to bring any roommates? </p>

                <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-15 text-md px-10'>
                    <PrimaryButton selected={answers?.wantsRoommates} onClick={() => handleAnswer('PROPERTY_SECTION', 'wantsRoommates', true)} > Yes </PrimaryButton>
                    <PrimaryButton selected={!answers?.wantsRoommates} onClick={() => handleAnswer('PROPERTY_SECTION', 'wantsRoommates', false)} > No </PrimaryButton>
                </div>
            </div>

            {answers.wantsRoommates && <>

                <p className='text-2xl text-[#B3322F]   font-semibold w-full  px-10 text-center mx-auto'> How many roommates are joining you? </p>

                <div className='flex justify-center items-center px-15'>
                    <div className='flex gap-6 justify-center items-center mt-5 text-md px-10 bg-white py-3 rounded-full shadow-[#D9D9D9] drop-shadow-xl shadow-md w-full md:w-auto'>

                        {/* Decrement Button */}
                        <motion.button
                            whileTap={{ scale: 0.85 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                            className='bg-[#B3322F] text-center pb-1 px-4 text-white rounded-full '
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
                            className='bg-[#B3322F] text-center pb-1 px-4 text-white rounded-full '
                            onClick={increment}
                        >
                            +
                        </motion.button>

                    </div>
                </div>


                <div id="wantsRoommateMatching" className={` rounded-2xl mx-1 py-10 ${error && answers.wantsRoommateMatching === null ? "bg-[#B3322F]/20" : ""}`}>
                    <p className='text-2xl text-[#B3322F]   font-semibold w-full  px-10 text-center mx-auto'> Do you want help finding additional roommates? </p>
                    <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-15 text-md px-10'>
                        <PrimaryButton selected={answers?.wantsRoommateMatching} onClick={() => handleAnswer('PROPERTY_SECTION', 'wantsRoommateMatching', true)}> Yes </PrimaryButton>
                        <PrimaryButton selected={!answers?.wantsRoommateMatching} onClick={() => handleAnswer('PROPERTY_SECTION', 'wantsRoommateMatching', false)} > No </PrimaryButton>
                    </div>
                </div>

                {
                    !answers?.wantsRoommateMatching ? <div>
                        <p className='text-2xl text-[#B3322F] mt-10 font-semibold w-full  px-10 text-center mx-auto'> Skip the next questions, invite your friends now! </p>
                        <SkipNextQuestionSection />
                    </div>
                        : ""
                }
            </>}
            <NextButton onClick={disabled ? scrollHandler : nextHandler} previousStepHandler={previousStepHandler} />

        </>
    )
}

const LookingForSection: React.FC<{
    previousStepHandler: () => void;
    nextStepHandler: () => void;
    handleAnswer: (section: string, key: string, value: unknown) => void;
    answers: Record<string, unknown>; // You can later replace 'unknown' with a stricter type
}> = ({ nextStepHandler, handleAnswer, answers, previousStepHandler }) => {
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
        if (answers.accommodationType === null) {
            const section = document.getElementById('accommodationType');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.accommodationType === null
    const [rentalDescription, setRentalDescription] = useState<string | null>(null)
    return (
        <>
            <div id="accommodationType" className={`mt-10 rounded-2xl mx-1 py-10 ${error && answers.accommodationType === null ? "bg-[#B3322F]/20" : ""}`}>
                <p className='text-2xl text-[#B3322F] font-semibold w-[60%]  md:w-[80%] text-center mx-auto'> What type of rental are you looking for? </p>

                <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-10 text-md px-10'>
                    {rentalTypes.map(rental => (
                        <div className='w-full  md:w-auto group'>

                            {rentalDescription === rental.name ? (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className={`
                                        max-w-[200px] text-[8px] mx-auto px-2 py-2 mb-3 bg-white shadow-[#D9D9D9] drop-shadow-xl shadow-md
                                        
                                        `}
                                >
                                    {rental.details}
                                </motion.p>
                            ) : <p className={`
                                max-w-[200px] text-[8px] mx-auto px-2 py-2 mb-3 bg-white shadow-[#D9D9D9] drop-shadow-xl shadow-md
                                opacity-0 hidden md:flex
                                `}>{rental.details}</p>}

                            <Button
                                onClick={() => handleAnswer('PROPERTY_SECTION', 'accommodationType', rental.name)}
                                className={` border border-white ${answers.accommodationType === rental.name ? 'bg-[#B3322F] hover:bg-[#b3312fa2]' : 'bg-[#D9D9D9] hover:bg-[#d9d9d9a4]'}bg-[#B3322F] w-full md:w-[250px] text-sm text-center py-3 text-white  rounded-full flex justify-end items-center gap-2 px-2`}>
                                <div className='flex gap-2  w-full justify-center'>
                                    <img alt="" className="h-5 " src={`/assets/img/icons/${rental.icon}`} />
                                    {rental.name}
                                </div>

                                <img alt="" onClick={() => rentalDescription === rental.name ? setRentalDescription(null) : setRentalDescription(rental.name)} className="h-6 relative right-1 mr-2 group" src={`/assets/img/icons/question_circle_icon.svg`} />
                            </Button>

                        </div>
                    ))}
                </div>
            </div>

            <NextButton onClick={disabled ? scrollHandler : nextStepHandler} previousStepHandler={previousStepHandler} />


        </>
    )
}


const WhereToBeLocatedSection: React.FC<{
    previousStepHandler: () => void;
    nextStepHandler: () => void;
    handleAnswer: (section: string, key: string, value: unknown) => void;
    runConfettiHandler: () => void;
    setRunConfetti: (value: boolean) => void;
    answers: any; // You can later replace 'unknown' with a stricter type
}> = ({ nextStepHandler, handleAnswer, answers, runConfettiHandler, setRunConfetti, previousStepHandler }) => {
    const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY; // Replace this securely
    console.log("area====>", answers)
    const [search, setSearch] = useState(answers?.areaPreferenceType || '');
    const [suggestions, setSuggestions] = useState<string[]>(answers?.areaPreferenceType ? [answers?.areaPreferenceType] : []);
    const [loading, setLoading] = useState(false);

    // const suggestions = [
    //     "400 Rideau Street, Ottawa, ON",
    //     "Rideau Canal, Ottawa, ON",
    //     "Rideau Carleton Casino, Future Hard Rock, Ottawa, ON",
    //     "Rideau Cottage, Sussex Drive, Ottawa, ON",
    //     "Rideau Falls, Ottawa, ON",
    // ];

    useEffect(() => {
        if (answers?.areaPreferenceType === search) return

        const delayDebounce = setTimeout(() => {
            if (search.trim().length > 0) fetchSuggestions(search);
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [search]);

    const fetchSuggestions = async (query: string) => {
        try {
            setLoading(true);
            const response = await axios.post(
                `https://places.googleapis.com/v1/places:autocomplete`,
                { "input": query, },
                { headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': GOOGLE_API_KEY, } }
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

    // console.log(loading)

    const [error, setError] = useState(false)

    const scrollHandler = () => {
        setError(true)
        if (answers.preferredArea === null) {
            const section = document.getElementById('preferredArea');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.preferredArea === null



    return (
        <>
            <div id="preferredArea" className={`mt-10 rounded-2xl mx-1 py-10 ${error && answers.preferredArea === null ? "bg-[#B3322F]/20" : ""}`}>
                <p className='text-2xl text-[#B3322F] font-semibold w-[60%]  md:w-[80%] text-center mx-auto'> Where would you like to be located? </p>

                <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-20 text-md px-10'>
                    <PrimaryButton selected={answers.preferredArea === "Surprise Me"} onClick={() => {
                        setRunConfetti(true);
                        runConfettiHandler();
                        handleAnswer('PROPERTY_SECTION', 'preferredArea', 'Surprise Me')
                    }} > I Don’t Know Yet - Surprise Me </PrimaryButton>
                    <PrimaryButton selected={answers.preferredArea !== "Surprise Me" && answers.preferredArea !== null} onClick={() => handleAnswer('PROPERTY_SECTION', 'preferredArea', 'Yes')} > I Have A Preferred Area </PrimaryButton>
                </div>

                {answers.preferredArea !== "Surprise Me" && answers.preferredArea !== null &&
                    <div className='px-10 md:px-0 mt-12'>
                        {/* Google Search */}
                        <div className='shadow-[#D9D9D9] mb-3  md:w-[50%] pl-4 pr-8 py-2 mx-auto rounded-full drop-shadow-md shadow-md bg-white mt-5 flex items-center  justify-center gap-3'>
                            <input
                                onChange={(e) => { setLoading(true); setSearch(e.target.value) }}
                                value={search}
                                placeholder='Start searching for your preferred area or address (e.g. The Glebe or Rideau Centre)'
                                className=' focus:outline-none  w-full px-2 py-2'
                            />
                            {/* <img alt="" className="h-8 mt-1" src="assets/img/icons/google_logo.svg" /> */}
                            <MagnifyingGlassIcon className="h-8 text-[#B3322F] mt-1" />
                        </div>
                        {/* Google Suggestion */}
                        {search.length > 0 && <div className='shadow-[#D9D9D9] mb-3 overflow-hidden md:w-[50%]  py-2 mx-auto rounded-3xl drop-shadow-md shadow-md bg-white mt-5 gap-3 text-xs'>
                            {loading ? <div>
                                <LoaderComponent />
                            </div> : <div>
                                {suggestions?.length > 0 ?
                                    suggestions.map(searchString => (
                                        <div className={` pl-4 pr-8 flex gap-2 py-1.5  text-left ${searchString === answers.areaPreferenceType ? 'bg-gray-200' : ''}`}
                                            onClick={() => handleAnswer('PROPERTY_SECTION', 'areaPreferenceType', searchString)} >
                                            <img alt="" className="h-3" src="assets/img/icons/location_logo.svg" />
                                            {searchString}
                                        </div>
                                    )) : <div className='py-5'>
                                        Oops! We couldn't find a match. Try searching for another place.
                                    </div>
                                }
                            </div>

                            }
                        </div>}
                    </div>
                }
            </div >

            <NextButton onClick={disabled ? scrollHandler : nextStepHandler} previousStepHandler={previousStepHandler} />

        </>
    )
}


const CloseToCampusSection: React.FC<{
    previousStepHandler: () => void;
    nextStepHandler: () => void;
    handleAnswer: (section: string, key: string, value: unknown) => void;
    answers: Record<string, unknown>; // You can later replace 'unknown' with a stricter type
}> = ({ nextStepHandler, handleAnswer, answers, previousStepHandler }) => {
    // const [value, setValue] = useState(1200);
    const [error, setError] = useState(false)
    const min = 1;
    const max = 20;
    const value = Number(answers?.campusDistanceKm ?? min);

    // Calculate percentage position
    const getLeftPosition = () => {
        const percentage = ((value - min) / (max - min)) * 100;
        return `calc(${percentage}% - 24px)`; // Adjust the offset to center the label
    };


    const scrollHandler = () => {
        setError(true)
        if (answers.campusDistanceKm === null) {
            const section = document.getElementById('campusDistanceKm');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.campusDistanceKm === null

    return (
        <>
            <div id="campusDistanceKm" className={`mt-10 rounded-2xl mx-1 py-10 ${error && answers.campusDistanceKm === null ? "bg-[#B3322F]/20" : ""}`}>
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
                            onChange={(e) => handleAnswer('PROPERTY_SECTION', 'campusDistanceKm', Number(e.target.value))}
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

            <NextButton onClick={disabled ? scrollHandler : nextStepHandler} previousStepHandler={previousStepHandler} />


        </>
    )
}


const BudgetSection: React.FC<{
    previousStepHandler: () => void;
    nextStepHandler: () => void;
    handleAnswer: (section: string, key: string, value: unknown) => void;
    answers: Record<string, unknown>; // You can later replace 'unknown' with a stricter type
}> = ({ nextStepHandler, handleAnswer, answers, previousStepHandler }) => {
    const [error, setError] = useState(false)
    const min = 500;
    const max = 2000;

    // Use fallback if budgetMax is null or undefined
    const budgetMax = Number(answers.budgetMax ?? min);

    // Calculate percentage position
    const getLeftPosition = () => {
        const percentage = ((budgetMax - min) / (max - min)) * 100;
        return `calc(${percentage}% - 24px)`; // Center the label
    };

    const scrollHandler = () => {
        setError(true)
        if (answers.budgetMax === null) {
            const section = document.getElementById('budgetMax');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.budgetMax === null

    return (
        <>

            <div id="budgetMax" className={`mt-10 rounded-2xl mx-1 py-10 ${error && answers.budgetMax === null ? "bg-[#B3322F]/20" : ""}`}>
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
                            value={budgetMax}
                            onChange={(e) => handleAnswer('PROPERTY_SECTION', 'budgetMax', Number(e.target.value))}
                        />

                        {/* Moving label */}
                        <div
                            className="absolute top-8 font-bold text-sm"
                            style={{ left: getLeftPosition() }}
                        >
                            ${budgetMax}
                        </div>
                    </div>
                </div>

            </div>

            <NextButton onClick={disabled ? scrollHandler : nextStepHandler} previousStepHandler={previousStepHandler} />
        </>
    );
};


const HowLongToStaySection: React.FC<{
    nextStepHandler: () => void;
    handleAnswer: (section: string, key: string, value: unknown) => void;
    previousStepHandler: () => void;
    answers: Record<string, unknown>; // You can later replace 'unknown' with a stricter type
}> = ({ nextStepHandler, handleAnswer, answers, previousStepHandler }) => {
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
        if (answers.stayDurationMonths === null) {
            const section = document.getElementById('stayDurationMonths');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.stayDurationMonths === null

    return (
        <>
            <div id="stayDurationMonths" className={`mt-10 rounded-2xl mx-1 py-10 ${error && answers.stayDurationMonths === null ? "bg-[#B3322F]/20" : ""}`}>
                <p className='text-2xl text-[#B3322F] font-semibold w-[60%]  md:w-[80%] text-center mx-auto'> How long is your stay? </p>
                <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-20 text-md px-10'>
                    <PrimaryButton selected={answers.stayDurationMonths === '4 Months'} onClick={() => handleAnswer('PROPERTY_SECTION', 'stayDurationMonths', '4 Months')}  > 4 Months </PrimaryButton>
                    <PrimaryButton selected={answers.stayDurationMonths === '6 Months'} onClick={() => handleAnswer('PROPERTY_SECTION', 'stayDurationMonths', '6 Months')} > 6 Months </PrimaryButton>
                    <PrimaryButton selected={answers.stayDurationMonths === '8 Months'} onClick={() => handleAnswer('PROPERTY_SECTION', 'stayDurationMonths', '8 Months')} > 8 Months </PrimaryButton>
                    <PrimaryButton selected={answers.stayDurationMonths === '12 Months'} onClick={() => handleAnswer('PROPERTY_SECTION', 'stayDurationMonths', '12 Months')}> 12 Months </PrimaryButton>
                </div>
                <div className={`border border-white 
                ${(
                        answers.stayDurationMonths !== '4 Months' &&
                        answers.stayDurationMonths !== '6 Months' &&
                        answers.stayDurationMonths !== '8 Months' &&
                        answers.stayDurationMonths !== '12 Months' &&
                        answers.stayDurationMonths !== null) ? "bg-[#B3322F]" : "bg-[#D9D9D9]"}
                 mt-6 md:mt-10 rounded-full mx-15 md:w-max md:mx-auto`} onClick={handleDateWrapperClick}>
                    <input onChange={(e) => handleAnswer('PROPERTY_SECTION', 'stayDurationMonths', `${e.target.value}`)} type="date" className=' input-white-calendar px-10 text-center py-2 text-white focus:outline-none   ' ref={dateInputRef} />
                </div>


            </div >

            <NextButton onClick={disabled ? scrollHandler : nextStepHandler} previousStepHandler={previousStepHandler} />


        </>
    )
}

const WhenYouAreMovingSection: React.FC<{
    nextStepHandler: () => void;
    handleAnswer: (section: string, key: string, value: unknown) => void;
    previousStepHandler: () => void;
    answers: Record<string, unknown>; // You can later replace 'unknown' with a stricter type
}> = ({ nextStepHandler, handleAnswer, answers, previousStepHandler }) => {
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
        if (answers.moveInDate === null) {
            const section = document.getElementById('moveInDate');
            section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const disabled = answers.moveInDate === null

    return (
        <>
            <div id="moveInDate" className={`mt-10 rounded-2xl mx-1 py-10 ${error && answers.moveInDate === null ? "bg-[#B3322F]/20" : ""}`}>

                <p className='text-2xl text-[#B3322F] font-semibold w-[60%]  md:w-[80%] text-center mx-auto'> When are you moving in? </p>

                <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-20 text-md px-10'>
                    <PrimaryButton selected={answers.moveInDate === 'September 1'} onClick={() => handleAnswer('PROPERTY_SECTION', 'moveInDate', 'September 1')}  > September 1 </PrimaryButton>
                    <PrimaryButton selected={answers.moveInDate === 'May 1'} onClick={() => handleAnswer('PROPERTY_SECTION', 'moveInDate', 'May 1')} > May 1 </PrimaryButton>
                </div>

                {/* <Button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full mt-10'> May 1 </Button> */}
                <div className={`
                ${(answers.moveInDate !== 'September 1' && answers.moveInDate !== 'May 1' && answers.moveInDate !== null) ? "bg-[#B3322F]" : "bg-[#D9D9D9] border-white border"}
                 mt-6 md:mt-10 rounded-full   mx-15 md:w-max md:mx-auto`} onClick={handleDateWrapperClick}>
                    <input onChange={(e) => handleAnswer('PROPERTY_SECTION', 'moveInDate', `${e.target.value}`)} type="date" className=' input-white-calendar px-10 text-center py-2 text-white focus:outline-none   ' ref={dateInputRef} />
                </div>

            </div>

            <NextButton onClick={disabled ? scrollHandler : nextStepHandler} previousStepHandler={previousStepHandler} />

        </>
    )
}

const TypeOfRentalSection: React.FC<{
    nextStepHandler: () => void;
    handleAnswer: (section: string, field: string, value: string) => void;
    previousStepHandler: () => void;
    answers: {
        rentalType?: string | null;
    };
}> = ({
    nextStepHandler,
    handleAnswer,
    answers,
    previousStepHandler
}) => {
        const [error, setError] = useState(false)

        const options = [
            { label: 'Lease', value: 'lease' },
            { label: 'Sublet', value: 'sublet' },
        ];


        const scrollHandler = () => {
            setError(true)
            if (answers.rentalType === null) {
                const section = document.getElementById('rentalType');
                section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        const disabled = answers.rentalType === null

        return (
            <div className="text-center">

                <div id="rentalType" className={`mt-10 rounded-2xl mx-1 py-10 ${error && answers.rentalType === null ? "bg-[#B3322F]/20" : ""}`}>
                    <p className="text-2xl text-[#B3322F] font-semibold w-[60%] md:w-[80%] mx-auto ">
                        What type of rental are you looking for?
                    </p>

                    <div className={`  flex flex-col  md:flex-row gap-6 justify-center items-center text-md px-10 mt-10`}>
                        {options.map(({ label, value }) => (
                            <PrimaryButton
                                key={value}
                                onClick={() => handleAnswer('PROPERTY_SECTION', 'rentalType', value)}
                                selected={answers.rentalType === value}
                            >
                                {label}
                            </PrimaryButton>
                        ))}
                    </div>
                </div>

                <div className="mt-0">
                    <NextButton onClick={disabled ? scrollHandler : nextStepHandler} previousStepHandler={previousStepHandler} />
                </div>
            </div>
        );
    };




