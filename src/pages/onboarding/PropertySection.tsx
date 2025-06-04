import { AnimatePresence, motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';
import Confetti from 'react-confetti';
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
import { ICONS } from '../../utils/constants/app-info.constant';
import { NextButton, PrimaryButton, transitionVariants } from "./CommonComponents";


interface PropertySectionParams {
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
const PropertySection = (props:any) => {
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
    return (
        <>
            <Confetti numberOfPieces={400} />
            <div className='text-center '>
                <p className='text-3xl text-[#B3322F]'>Welcome To Next Room <br /> <span className='font-bold'>{name}</span></p>

                <img alt="" className="h-40 pr-1 mx-auto -my-4" src="/assets/img/icons/survey_icon.svg" />

                <p className='text-md'> Let's Find Your Perfect Home. <br /> We'll Ask A Few Questions To Get Started </p>

                <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-12 text-md'>
                    <PrimaryButton
                        selected={true} onClick={nextStepHandler}
                        icon={ICONS.ARROW_RIGHT_WHITE}
                    >
                        Get Started
                    </PrimaryButton>

                    <PrimaryButton selected={true}  >
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
    const [showDropdown, setShowDropdown] = useState(false);
    const inviteRef = useRef<HTMLDivElement>(null);
    const url = "www.nextroom.ca"


    // const handleShare = () => {
    //     if (navigator.share) {
    //         navigator.share({
    //             title: "Join NextRoom",
    //             text: "Check this out!",
    //             url: window.location.href,
    //         }).catch((error) => console.error("Sharing failed", error));
    //     } else {
    //         alert("Share not supported on this device.");
    //     }
    // };

    const handleShare = async () => {

        if (!navigator.share || !navigator.canShare) {
            alert("Sharing not supported on this device.");
            return;
        }

        if (!inviteRef.current) return;

        // Wait to ensure it's rendered
        await new Promise((resolve) => setTimeout(resolve, 100));

        const canvas = await html2canvas(inviteRef.current, {
            backgroundColor: "#ffffff",
            scale: 2,
            useCORS: true,
        });

        // Convert canvas to blob
        canvas.toBlob(async (blob) => {
            if (!blob) {
                console.error("Failed to create blob from canvas.");
                return;
            }

            const file = new File([blob], "invite.png", { type: "image/png" });

            // Check if the device can share this file
            if (navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        title: "Join NextRoom",
                        text: "Check this out!",
                        files: [file],
                    });
                } catch (error) {
                    console.error("Sharing failed", error);
                }
            } else {
                alert("This device doesn't support sharing images.");
            }
        }, "image/png");
    };

    const handleCopy = () => {
        const url = "www.nextroom.ca"
        navigator.clipboard.writeText(url)
            .then(() => toast.success("Link copied to clipboard"))
            .catch(() => toast.success("Failed to copy link"));
    };


    const handlePrint = async () => {
        if (!inviteRef.current) return;

        // Wait a tick to make sure it's fully rendered
        await new Promise((resolve) => setTimeout(resolve, 100));

        const canvas = await html2canvas(inviteRef.current, {
            backgroundColor: '#ffffff', // or null if transparent background is needed
            scale: 2,
            useCORS: true, // in case images are hosted remotely

        });

        const link = document.createElement('a');
        link.download = 'invite.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };


    const buttons = [
        { name: "Share", icon: "share_icon.svg", onClick: () => handleShare() },
        { name: "Copy", icon: "copy_icon.svg", onClick: () => handleCopy() },
        { name: "Print Invite", icon: "print_icon.svg", onClick: () => handlePrint() },
    ]


    return (
        <>

            {/* Hidden container to capture */}
            <div ref={inviteRef} className="py-30 absolute left-[-9999px] top-0"  >
                <LetsBecomeRoomMateSection {...{ url }} />
            </div>

            <p className='text-2xl text-[#B3322F] mt-10 font-semibold w-full  px-10 text-center mx-auto'> Skip the next questions, invite your friends now! </p>
            {/* <img alt="" className="h-35 mx-auto mt-8" src={`/assets/img/icons/qr_code.svg`} /> */}
            <QRCode value={url} className="h-35 mx-auto mt-10" />

            <button onClick={() => setShowDropdown(!showDropdown)} className='bg-black w-[250px] md:w-[180px] text-center py-2 text-white  rounded-full mt-8'>  Share To Invite </button>
            <AnimatePresence>
                {showDropdown && (
                    <motion.div
                        className="mx-10"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-15 text-md px-10 bg-white py-8 rounded-xl shadow-[#D9D9D9] drop-shadow-xl shadow-md w-full md:w-max mx-auto">
                            {buttons.map((button) => (
                                <motion.button
                                    onClick={button.onClick}
                                    key={button.name}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-[#B3322F] text-white rounded-full flex w-full md:w-[200px] items-center justify-center py-2 text-center gap-2 transition-all"
                                >
                                    <p>{button.name}</p>
                                    <img
                                        alt=""
                                        className="h-4"
                                        src={`/assets/img/icons/${button.icon}`}
                                    />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </>
    )
}

const RoommatesSection: React.FC<{
    handleAnswer: (sectino: string, key: string, value: string | number) => void;
    answers: {
        BRINGING_ROOMMATES?: string;
        ROOMMATE_COUNT?: number;
        NEED_ROOMMATE_MATCHING?: string;
    };
}> = ({ handleAnswer, answers }) => {
    // const [count, setcount] = useState(0)
    const [skipQuestionSection, setSkipQuestionSection] = useState(false)
    const count = answers?.ROOMMATE_COUNT || 0
    const increment = () => { handleAnswer('PROPERTY_SECTION', 'ROOMMATE_COUNT', count + 1) }
    const decrement = () => { if (count > 0) handleAnswer('PROPERTY_SECTION', 'ROOMMATE_COUNT', count - 1) }

    return (
        <>
            <p className='text-2xl text-[#B3322F] font-semibold w-full  px-10 text-center mx-auto'> Would you like to bring any roommates? </p>

            <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-15 text-md px-10'>
                <PrimaryButton selected={answers?.BRINGING_ROOMMATES === 'Yes'} onClick={() => handleAnswer('PROPERTY_SECTION', 'BRINGING_ROOMMATES', 'Yes')} > Yes </PrimaryButton>
                <PrimaryButton selected={answers?.BRINGING_ROOMMATES === 'No'} onClick={() => handleAnswer('PROPERTY_SECTION', 'BRINGING_ROOMMATES', 'No')} > No </PrimaryButton>
            </div>

            <p className='text-2xl text-[#B3322F] mt-12 font-semibold w-full  px-10 text-center mx-auto'> How many roommates are joining you? </p>

            <div className='flex justify-center items-center px-10'>
                <div className='flex gap-6 justify-center items-center mt-5 text-md px-10 bg-white py-3 rounded-full shadow-[#D9D9D9] drop-shadow-xl shadow-md w-full md:w-auto'>
                    <button className='bg-[#B3322F]   text-center pb-1 px-4 text-white  rounded-full' onClick={decrement}> - </button>
                    {count}
                    <button className='bg-[#B3322F]   text-center pb-1 px-4 text-white  rounded-full' onClick={increment}> + </button>
                </div>
            </div>


            <p className='text-2xl text-[#B3322F] mt-10 font-semibold w-full  px-10 text-center mx-auto'> Do you want help finding additional roommates? </p>
            <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-15 text-md px-10'>
                <PrimaryButton selected={answers?.NEED_ROOMMATE_MATCHING === 'Yes'} onClick={() => handleAnswer('PROPERTY_SECTION', 'NEED_ROOMMATE_MATCHING', 'Yes')}> Yes </PrimaryButton>
                <PrimaryButton selected={answers?.NEED_ROOMMATE_MATCHING === 'No'} onClick={() => handleAnswer('PROPERTY_SECTION', 'NEED_ROOMMATE_MATCHING', 'No')} > No </PrimaryButton>
            </div>

            {
                skipQuestionSection ? <SkipNextQuestionSection /> : <NextButton onClick={() => setSkipQuestionSection(true)} />
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

    return (
        <>
            <p className='text-2xl text-[#B3322F] font-semibold w-[60%]  md:w-[80%] text-center mx-auto'> Where would you like to be located? </p>

            <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-20 text-md px-10'>
                {rentalTypes.map(RENTAL_TYPE => (
                    <div className='w-full  md:w-auto'>
                        <p className='max-w-[200px] text-[8px] mx-auto shadow-[#D9D9D9] drop-shadow-xl shadow-md bg-white px-2  mb-3 py-2 hidden md:flex'>{RENTAL_TYPE.details}</p>
                        <button
                            onClick={() => handleAnswer('PROPERTY_SECTION', 'RENTAL_PREFERENCE', RENTAL_TYPE.name)}
                            className={`${answers.RENTAL_PREFERENCE === RENTAL_TYPE.name ? 'bg-[#B3322F] hover:bg-[#b3312fa2]' : 'bg-[#D9D9D9] hover:bg-[#d9d9d9a4]'}bg-[#B3322F] w-full md:w-[250px] text-center py-3 text-white  rounded-full flex justify-center items-center gap-2`}>
                            <img alt="" className="h-5" src={`/assets/img/icons/${RENTAL_TYPE.icon}`} />
                            {RENTAL_TYPE.name}
                            {/* <img alt="" className="h-5 relative right-1" src={`/assets/img/icons/question_circle_icon.svg`} /> */}
                        </button>

                    </div>
                ))}
            </div>

            <NextButton disabled={answers.RENTAL_PREFERENCE === null} onClick={nextStepHandler} />

        </>
    )
}


const WhereToBeLocatedSection: React.FC<{
    nextStepHandler: () => void;
    handleAnswer: (section: string, key: string, value: unknown) => void;
    answers: Record<string, unknown>; // You can later replace 'unknown' with a stricter type
}> = ({ nextStepHandler, handleAnswer, answers }) => {
    const [search, setSearch] = useState('')
    const suggestions = [
        "400 Rideau Street, Ottawa, ON",
        "Rideau Canal, Ottawa, ON",
        "Rideau Carleton Casino, Future Hard Rock, Ottawa, ON",
        "Rideau Cottage, Sussex Drive, Ottawa, ON",
        "Rideau Falls, Ottawa, ON",
    ];

    return (
        <>
            <p className='text-2xl text-[#B3322F] font-semibold w-[60%]  md:w-[80%] text-center mx-auto'> Where would you like to be located? </p>

            <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-20 text-md px-10'>
                <PrimaryButton selected={answers.PREFERRED_LOCATION === "Surprise Me"} onClick={() => handleAnswer('PROPERTY_SECTION', 'PREFERRED_LOCATION', 'Surprise Me')} > I Don’t Know Yet - Surprise Me </PrimaryButton>
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
                    {search.length > 0 && <div className='shadow-[#D9D9D9] mb-3  md:w-[50%] pl-4 pr-8 py-2 mx-auto rounded-3xl drop-shadow-md shadow-md bg-white mt-5 gap-3 text-xs'>
                        {suggestions.map(searchString => (
                            <div className='flex gap-2 py-1.5 text-left'>
                                <img alt="" className="h-3" src="assets/img/icons/location_logo.svg" />
                                {searchString}
                            </div>
                        ))}
                    </div>}
                </div>
            }
            <NextButton disabled={answers.PREFERRED_LOCATION === null} onClick={nextStepHandler} />
        </>
    )
}


const CloseToCampusSection: React.FC<{
    nextStepHandler: () => void;
    handleAnswer: (section: string, key: string, value: unknown) => void;
    answers: Record<string, unknown>; // You can later replace 'unknown' with a stricter type
}> = ({ nextStepHandler, handleAnswer, answers }) => {
    // const [value, setValue] = useState(1200);
    const min = 1;
    const max = 20;
    const value = Number(answers?.DISTANCE_FROM_CAMPUS ?? min);

    // Calculate percentage position
    const getLeftPosition = () => {
        const percentage = ((value - min) / (max - min)) * 100;
        return `calc(${percentage}% - 24px)`; // Adjust the offset to center the label
    };

    return (
        <>
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

            <NextButton disabled={answers.DISTANCE_FROM_CAMPUS === null} onClick={nextStepHandler} />

        </>
    )
}


const BudgetSection: React.FC<{
    nextStepHandler: () => void;
    handleAnswer: (section: string, key: string, value: unknown) => void;
    answers: Record<string, unknown>; // You can later replace 'unknown' with a stricter type
}> = ({ nextStepHandler, handleAnswer, answers }) => {
    const min = 500;
    const max = 2000;

    // Use fallback if MONTHLY_BUDGET is null or undefined
    const MONTHLY_BUDGET = Number(answers.MONTHLY_BUDGET ?? min);

    // Calculate percentage position
    const getLeftPosition = () => {
        const percentage = ((MONTHLY_BUDGET - min) / (max - min)) * 100;
        return `calc(${percentage}% - 24px)`; // Center the label
    };

    return (
        <>
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

            <NextButton disabled={answers.MONTHLY_BUDGET === null} onClick={nextStepHandler} />
        </>
    );
};


const HowLongToStaySection: React.FC<{
    nextStepHandler: () => void;
    handleAnswer: (section: string, key: string, value: unknown) => void;
    answers: Record<string, unknown>; // You can later replace 'unknown' with a stricter type
}> = ({ nextStepHandler, handleAnswer, answers }) => {
    const dateInputRef = useRef<HTMLInputElement>(null);

    const handleDateWrapperClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker?.(); // preferred (modern browsers)
            dateInputRef.current.focus();        // fallback
        }
    };

    return (
        <>
            <p className='text-2xl text-[#B3322F] font-semibold w-[60%]  md:w-[80%] text-center mx-auto'> How long is your stay? </p>
            <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-20 text-md px-10'>
                <PrimaryButton selected={answers.STAY_DURATION === '4 Months'} onClick={() => handleAnswer('PROPERTY_SECTION', 'STAY_DURATION', '4 Months')}  > 4 Months </PrimaryButton>
                <PrimaryButton selected={answers.STAY_DURATION === '6 Months'} onClick={() => handleAnswer('PROPERTY_SECTION', 'STAY_DURATION', '6 Months')} > 6 Months </PrimaryButton>
                <PrimaryButton selected={answers.STAY_DURATION === '8 Months'} onClick={() => handleAnswer('PROPERTY_SECTION', 'STAY_DURATION', '8 Months')} > 8 Months </PrimaryButton>
                <PrimaryButton selected={answers.STAY_DURATION === '12 Months'} onClick={() => handleAnswer('PROPERTY_SECTION', 'STAY_DURATION', '12 Months')}> 12 Months </PrimaryButton>
            </div>
            <div className={`
                ${(
                    answers.STAY_DURATION !== '4 Months' &&
                    answers.STAY_DURATION !== '6 Months' &&
                    answers.STAY_DURATION !== '8 Months' &&
                    answers.STAY_DURATION !== '12 Months' &&
                    answers.STAY_DURATION !== null) ? "bg-[#B3322F]" : "bg-[#D9D9D9]"}
                 mt-10 rounded-full mx-10 md:w-max md:mx-auto`} onClick={handleDateWrapperClick}>
                <input onChange={(e) => handleAnswer('PROPERTY_SECTION', 'STAY_DURATION', `${e.target.value}`)} type="date" className=' input-white-calendar px-10 text-center py-2 text-white focus:outline-none   ' ref={dateInputRef} />
            </div>
            <NextButton disabled={answers.STAY_DURATION === null} onClick={nextStepHandler} />
        </>
    )
}

const WhenYouAreMovingSection: React.FC<{
    nextStepHandler: () => void;
    handleAnswer: (section: string, key: string, value: unknown) => void;
    answers: Record<string, unknown>; // You can later replace 'unknown' with a stricter type
}> = ({ nextStepHandler, handleAnswer, answers }) => {
    const dateInputRef = useRef<HTMLInputElement>(null);

    const handleDateWrapperClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker?.(); // preferred (modern browsers)
            dateInputRef.current.focus();        // fallback
        }
    };

    return (
        <>
            <p className='text-2xl text-[#B3322F] font-semibold w-[60%]  md:w-[80%] text-center mx-auto'> When are you moving in? </p>

            <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-20 text-md px-10'>
                <PrimaryButton selected={answers.MOVE_IN_DATE === 'September 1'} onClick={() => handleAnswer('PROPERTY_SECTION', 'MOVE_IN_DATE', 'September 1')}  > September 1 </PrimaryButton>
                <PrimaryButton selected={answers.MOVE_IN_DATE === 'May 1'} onClick={() => handleAnswer('PROPERTY_SECTION', 'MOVE_IN_DATE', 'May 1')} > May 1 </PrimaryButton>
            </div>

            {/* <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full mt-10'> May 1 </button> */}
            <div className={`
                ${(answers.MOVE_IN_DATE !== 'September 1' && answers.MOVE_IN_DATE !== 'May 1' && answers.MOVE_IN_DATE !== null) ? "bg-[#B3322F]" : "bg-[#D9D9D9]"}
                 mt-10 rounded-full mx-10 md:w-max md:mx-auto`} onClick={handleDateWrapperClick}>
                <input onChange={(e) => handleAnswer('PROPERTY_SECTION', 'MOVE_IN_DATE', `${e.target.value}`)} type="date" className=' input-white-calendar px-10 text-center py-2 text-white focus:outline-none   ' ref={dateInputRef} />
            </div>

            <NextButton disabled={answers.MOVE_IN_DATE === null} onClick={nextStepHandler} />

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
        const options = [
            { label: 'Lease', value: 'lease' },
            { label: 'Sublet', value: 'sublet' },
        ];

        return (
            <div className="text-center">
                <p className="text-2xl text-[#B3322F] font-semibold w-[60%] md:w-[80%] mx-auto">
                    What type of rental are you looking for?
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-20 text-md px-10">
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

                <div className="mt-12">
                    <NextButton disabled={answers.RENTAL_TYPE === null} onClick={nextStepHandler} />
                </div>
            </div>
        );
    };




