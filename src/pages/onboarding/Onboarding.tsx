import React, { useRef, useState } from 'react'
import OnboardingLayout from '../../layouts/Onboarding.Layout'
import { ICONS } from '../../utils/constants/app-info.constant'
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

const Onboarding = () => {
    return (
        <>
            <OnboardingLayout>

                <OnboardingForm />

            </OnboardingLayout>
        </>
    )
}

export default Onboarding


const WelcomeScreen = () => {
    const name = "Paul Brooks"
    return (
        <div className='text-center '>
            <p className='text-3xl text-[#B3322F]'>Welcome To Next Room <br /> <span className='font-bold'>{name}</span></p>

            <img alt="" className="h-40 pr-1 mx-auto -my-4" src="/assets/img/icons/survey_icon.svg" />

            <p className='text-md'> Let's Find Your Perfect Home. <br /> We'll Ask A Few Questions To Get Started </p>

            <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-12 text-md'>
                <button className='bg-[#B3322F] w-[250px] text-center py-2 text-white flex rounded-full justify-center'> Get Started <img alt="" className="h-3 pl-2 mt-1.5" src={ICONS.ARROW_RIGHT_WHITE} /> </button>
                <button className='bg-[#B3322F] w-[250px] text-center py-2 text-white  rounded-full'> I’ll Search On My Own </button>
            </div>
        </div>
    )
}

const OnboardingForm = () => {
    return (
        <div className='text-center'>

            {/* <FormStepper /> */}
            {/* <TypeOfRentalSection/> */}
            {/* <WhenYouAreMovingSection/> */}
            {/* <HowLongToStaySection /> */}
            {/* <BudgetSection /> */}
            {/* <CloseToCampusSection /> */}
            {/* <WhereToBeLocatedSection /> */}
            {/* <LookingForSection /> */}
            {/* <RoommatesSection /> */}
            {/* <SkipNextQuestionSection /> */}
            {/* <LetsBecomeRoomMateSection /> */}
            {/* <RoomMateSection /> */}
            {/* <ExitConfirmationSection /> */}

        </div>
    )
}

const LetsBecomeRoomMateSection = () => {
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
            <img alt="" className="h-35 mx-auto mt-8" src={`/assets/img/icons/qr_code.svg`} />


            <p className='text-lg text-[#B3322F] mt-15 w-full  px-10 text-center mx-auto font-semibold'>What is Next Room?</p>


            <p className='w-[80%] md:[70%] lg:w-[60%] xl:w-[50%] text-center mx-auto mt-3'>

                Next Room is the future of student housing—built to make finding a place (and people to live with) actually simple. From verified listings to smart roommate matching and easy sublets, it’s everything you wish existed when the group chat said “who’s signing the lease?”
                <br />
                <br />
                You’ve been invited to join your roommate’s housing search. Next Room helps you find a home together—without the scams, stress, or endless scrolling.
            </p>

            <p className='w-[80%] md:[70%] lg:w-[60%] xl:w-[50%] text-center mx-auto mt-3 font-bold'>
                Fast. Verified. Student-focused. Join your friend on Next Room today!<br />
                Your future home is waiting—together.
            </p>
        </>
    )
}
const RoomMateSection = () => {
    return (
        <>


            <p className='text-2xl text-[#B3322F]  w-full mt-10 px-10 text-center mx-auto'>

                Would you like to bring any roommates?
            </p>

            <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-15 text-md px-10'>
                <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Yes </button>
                <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> No </button>
            </div>
            <p className='text-2xl text-[#B3322F]  w-full mt-10 px-10 text-center mx-auto'>

                Would you like us to match you with potential roommates?
            </p>

            <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-15 text-md px-10'>
                <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Yes </button>
                <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> No </button>
            </div>
            <button className='bg-black w-[250px] md:w-[180px] text-center py-2 text-white  rounded-full mt-18'>  Next </button>


        </>
    )
}

const ExitConfirmationSection = () => {
    return (
        <>
            <img alt="" className="h-35 mx-auto" src={`/assets/img/icons/owl_icon_red.svg`} />
            <p className='text-2xl text-[#B3322F]  font-semibold w-full  px-10 text-center mx-auto'> Are You Sure? </p>
            <p className='text-2xl text-[#B3322F] mt-5 w-full  px-10 text-center mx-auto'>

                The more questions you answer, the better we can match you with your perfect home.
            </p>

            <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-15 text-md px-10'>
                <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Resume </button>
                <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Yes </button>
            </div>





        </>
    )
}

const SkipNextQuestionSection = () => {
    const buttons = [
        { name: "Share", icon: "share_icon.svg" },
        { name: "Copy", icon: "copy_icon.svg" },
        { name: "Print Invite", icon: "print_icon.svg" },
    ]

    return (
        <>
            <p className='text-2xl text-[#B3322F] mt-10 font-semibold w-full  px-10 text-center mx-auto'> Skip the next questions, invite your friends now! </p>


            <img alt="" className="h-35 mx-auto mt-8" src={`/assets/img/icons/qr_code.svg`} />

            <button className='bg-black w-[250px] md:w-[180px] text-center py-2 text-white  rounded-full mt-8'>  Share To Invite </button>

            <div className='mx-10'>
                <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-15 text-md px-10 bg-white py-8 rounded-xl shadow-[#D9D9D9] drop-shadow-xl shadow-md w-full md:w-max mx-auto'>
                    {
                        buttons.map(button => (
                            <button className='bg-[#B3322F] text-white  rounded-full flex w-full md:w-[200px]  items-center justify-center py-2 text-center gap-2'>
                                <p>{button.name}</p>
                                <img alt="" className="h-4 " src={`/assets/img/icons/${button.icon}`} />
                            </button>
                        ))
                    }

                </div>
            </div>

        </>
    )
}
const RoommatesSection = () => {
    const [count, setcount] = useState(0)

    const increment = () => { setcount(count + 1) }
    const decrement = () => { if (count > 0) setcount(count - 1) }

    return (
        <>
            <p className='text-2xl text-[#B3322F] mt-10 font-semibold w-full  px-10 text-center mx-auto'> Would you like to bring any roommates? </p>

            <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-15 text-md px-10'>
                <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Yes </button>
                <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> No </button>
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
                <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Yes </button>
                <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> No </button>
            </div>


            <button className='bg-black w-[250px] md:w-[180px] text-center py-2 text-white  rounded-full mt-18'>  Next </button>
        </>
    )
}

const LookingForSection = () => {
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
            <p className='text-2xl text-[#B3322F] mt-12 font-semibold w-[60%]  md:w-[80%] text-center mx-auto'> Where would you like to be located? </p>

            <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-20 text-md px-10'>
                {rentalTypes.map(rentalType => (
                    <div className='w-full  md:w-auto'>
                        <p className='max-w-[200px] text-[8px] mx-auto shadow-[#D9D9D9] drop-shadow-xl shadow-md bg-white px-2  mb-3 py-2 hidden md:flex'>{rentalType.details}</p>
                        <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-3 text-white  rounded-full flex justify-center items-center gap-2'>
                            <img alt="" className="h-5" src={`/assets/img/icons/${rentalType.icon}`} />
                            {rentalType.name}
                            {/* <img alt="" className="h-5 relative right-1" src={`/assets/img/icons/question_circle_icon.svg`} /> */}
                        </button>

                    </div>
                ))}
            </div>

            <button className='bg-black w-[250px] md:w-[180px] text-center py-2 text-white  rounded-full mt-18'>  Next </button>
        </>
    )
}


const WhereToBeLocatedSection = () => {
    const search = [
        "400 Rideau Street, Ottawa, ON",
        "Rideau Canal, Ottawa, ON",
        "Rideau Carleton Casino, Future Hard Rock, Ottawa, ON",
        "Rideau Cottage, Sussex Drive, Ottawa, ON",
        "Rideau Falls, Ottawa, ON",
    ];


    return (
        <>
            <p className='text-2xl text-[#B3322F] mt-12 font-semibold w-[60%]  md:w-[80%] text-center mx-auto'> Where would you like to be located? </p>

            <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-20 text-md px-10'>
                <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white flex rounded-full justify-center'> I Don’t Know Yet - Surprise Me </button>
                <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> I Have A Preferred Area </button>
            </div>

            <div className='px-10 md:px-0 mt-12'>
                {/* Google Search */}
                <div className='shadow-[#D9D9D9] mb-3  md:w-[50%] pl-4 pr-8 py-2 mx-auto rounded-full drop-shadow-md shadow-md bg-white mt-5 flex items-center  justify-center gap-3'>
                    <input
                        placeholder='Start searching for your preferred area or address (e.g. The Glebe or Rideau Centre)'
                        className=' focus:outline-none  w-full px-2 py-2'
                    />
                    <img alt="" className="h-8 mt-1" src="assets/img/icons/google_logo.svg" />
                </div>
                {/* Google Suggestion */}

                <div className='shadow-[#D9D9D9] mb-3  md:w-[50%] pl-4 pr-8 py-2 mx-auto rounded-3xl drop-shadow-md shadow-md bg-white mt-5 gap-3 text-xs'>
                    {search.map(searchString => (
                        <div className='flex gap-2 py-1.5 text-left'>
                            <img alt="" className="h-3" src="assets/img/icons/location_logo.svg" />
                            {searchString}
                        </div>
                    ))}
                </div>


            </div>

            <button className='bg-black w-[250px] md:w-[180px] text-center py-2 text-white  rounded-full mt-18'>  Next </button>
        </>
    )
}


const CloseToCampusSection = () => {
    const [value, setValue] = useState(1200);
    const min = 1;
    const max = 20;

    // Calculate percentage position
    const getLeftPosition = () => {
        const percentage = ((value - min) / (max - min)) * 100;
        return `calc(${percentage}% - 24px)`; // Adjust the offset to center the label
    };

    return (
        <>
            <p className='text-2xl text-[#B3322F] mt-15 font-semibold w-[60%]  md:w-[80%] text-center mx-auto'> How close to campus is your preferred rental? </p>

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
                        onChange={(e) => setValue(Number(e.target.value))}
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

            <button className='bg-black w-[250px] md:w-[180px] text-center py-2 text-white  rounded-full mt-18'>  Next </button>
        </>
    )
}


const BudgetSection = () => {
    const [value, setValue] = useState(1200);
    const min = 500;
    const max = 2000;

    // Calculate percentage position
    const getLeftPosition = () => {
        const percentage = ((value - min) / (max - min)) * 100;
        return `calc(${percentage}% - 24px)`; // Adjust the offset to center the label
    };

    return (
        <>
            <p className='text-2xl text-[#B3322F] mt-15 font-semibold w-[60%]  md:w-[80%] text-center mx-auto'> What is your budget? </p>

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
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                    />

                    {/* Moving label */}
                    <div
                        className="absolute top-8  font-bold text-sm"
                        style={{ left: getLeftPosition() }}
                    >
                        ${value}
                    </div>
                </div>
            </div>

            <button className='bg-black w-[250px] md:w-[180px] text-center py-2 text-white  rounded-full mt-18'>  Next </button>
        </>
    )
}

const HowLongToStaySection = () => {
    const dateInputRef = useRef(null);

    const handleDateWrapperClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker?.(); // preferred (modern browsers)
            dateInputRef.current.focus();        // fallback
        }
    };

    return (
        <>
            <p className='text-2xl text-[#B3322F] mt-12 font-semibold w-[60%]  md:w-[80%] text-center mx-auto'> How long is your stay? </p>

            <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-20 text-md px-10'>
                <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white flex rounded-full justify-center'> 4 Months </button>
                <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> 6 Months </button>
                <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> 8 Months </button>
                <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> 12 Months </button>
            </div>

            {/* <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full mt-10'> May 1 </button> */}
            <div className='bg-[#B3322F]  mt-10 rounded-full mx-10 md:w-max md:mx-auto' onClick={handleDateWrapperClick}>
                <input type="date" className=' input-white-calendar px-10 text-center py-2 text-white focus:outline-none   ' ref={dateInputRef} />
            </div>

            <button className='bg-black w-[250px] md:w-[180px] text-center py-2 text-white  rounded-full mt-18'>  Next </button>
        </>
    )
}

const WhenYouAreMovingSection = () => {
    const dateInputRef = useRef(null);

    const handleDateWrapperClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker?.(); // preferred (modern browsers)
            dateInputRef.current.focus();        // fallback
        }
    };

    return (
        <>
            <p className='text-2xl text-[#B3322F] mt-12 font-semibold w-[60%]  md:w-[80%] text-center mx-auto'> When are you moving in? </p>

            <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-20 text-md px-10'>
                <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white flex rounded-full justify-center'> September 1 </button>
                <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> May 1 </button>
            </div>

            {/* <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full mt-10'> May 1 </button> */}
            <div className='bg-[#B3322F]  mt-10 rounded-full mx-10 md:w-max md:mx-auto' onClick={handleDateWrapperClick}>
                <input type="date" className=' input-white-calendar px-10 text-center py-2 text-white focus:outline-none   ' ref={dateInputRef} />
            </div>

            <button className='bg-black w-[250px] md:w-[180px] text-center py-2 text-white  rounded-full mt-18'>  Next </button>
        </>
    )
}

const TypeOfRentalSection = () => {
    return (
        <>
            <p className='text-2xl text-[#B3322F] mt-12 font-semibold w-[60%]  md:w-[80%] text-center mx-auto'> What type of rental are you looking for? </p>

            <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-20 text-md px-10'>
                <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white flex rounded-full justify-center'> Lease </button>
                <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Sublet </button>
            </div>

            <button className='bg-black w-[250px] md:w-[180px] text-center py-2 text-white  rounded-full mt-18'>  Next </button>
        </>
    )
}






const FormStepper = () => {
    const steps = ['Property', 'Lifestyle', 'Roommates', 'Situation-Based',]

    return (
        <div className='text-center flex  items-end gap-3 md:px-30  px-10'>
            {steps.map((step) => (
                <div className='w-[25%]'>
                    <div className='text-black hidden md:block py-1 shadow-[#D9D9D9] mb-3 w-max px-6 mx-auto rounded-xl drop-shadow-md shadow-md bg-white'> {step} </div>
                    <div className='w-full bg-[#D9D9D9] rounded-full h-8'>
                        <div className='w-[20%] bg-[#B3322F] rounded-full h-8'>
                        </div>
                    </div>
                </div>
            ))}
            <Popover className="relative">
                <PopoverButton className="focus:outline-none  items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
                    <div className='bg-white pt-3 pb-2 px-4 drop-shadow-md shadow-md rounded-full'>
                        <img alt="" className="h-3" src={ICONS.ARROW_DOWN_RED} />
                    </div>
                </PopoverButton>
                <PopoverPanel transition
                    className="absolute -left-18  md:-left-15 z-10  mt-1 flex w-screen max-w-min -translate-x-1/2 px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                >
                    <div className=" w-max px-3 shrink rounded-xl bg-white py-2 md:py-4  text-[14px] font-semibold text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                        <div className='flex text-xs font-normal items-center justify-center text-[#808080]'>
                            <img alt="" className="h-7" src={ICONS.SAVE_ICON} />
                            All Answers Saved
                        </div>
                        <button className='bg-[#B3322F] px-6 py-2 rounded-full text-white font-normal text-sm mt-2 mb-2'>Start Housing Search Now</button>
                    </div>
                </PopoverPanel>
            </Popover>
        </div>
    )
}