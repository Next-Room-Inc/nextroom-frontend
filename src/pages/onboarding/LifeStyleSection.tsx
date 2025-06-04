// import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
// import { ArrowLeftIcon } from "@heroicons/react/20/solid";
// import { AnimatePresence, motion } from 'framer-motion';
// import html2canvas from 'html2canvas';
// import { useRef, useState } from 'react';
// import Confetti from 'react-confetti';
// import { toast } from "react-toastify";
// import { ICONS } from '../../utils/constants/app-info.constant';


// const transitionVariants = {
//     initial: { opacity: 0, x: 100 },
//     animate: { opacity: 1, x: 0 },
//     exit: { opacity: 0, x: -100 },
// };

// const PropertySection = ({ answers, handleAnswer }) => {
//     const name = "Paul Brooks"
//     const [formStep, setFormStep] = useState(0)
//     const [exitForm, setExitForm] = useState(false)
//     const nextStepHandler = () => setFormStep(step => step + 1)
//     const previousStepHandler = () => setFormStep(step => step > 1 ? step - 1 : step)
//     const propertySectionAnswered = Object.values(answers.PROPERTY_SECTION).reduce((acc: number, ans) => {
//         return ans !== null && ans !== undefined ? acc + 1 : acc;
//     }, 0);

//     const params = {
//         formStep, setFormStep, name, nextStepHandler, previousStepHandler, propertyValue: formStep, answers: answers.PROPERTY_SECTION, handleAnswer, propertySectionAnswered,
//         exitForm, setExitForm
//     }

//     return (
//         <div className='text-center'>
//             {exitForm ? <ExitConfirmationSection  {...params} /> :
//                 <>
//                     {formStep > 0 && <div className="text-sm font-bold flex items-center justify-end pr-10 text-[#B3322F] hover:text-[#b3312f6b]"  >
//                         <ArrowLeftIcon className="h-5 mr-2" />
//                         <span className="cursor-pointer" onClick={() => previousStepHandler()}>Previous Step</span>
//                     </div>}
//                     {formStep > 0 && <FormStepper {...params} />}
//                     {formStep === 0 && (
//                         <motion.div
//                             variants={transitionVariants}
//                             initial="initial"
//                             animate="animate"
//                             exit="exit"
//                             transition={{ duration: 0.5 }}
//                         >
//                             <WelcomeScreen {...params} />
//                         </motion.div>
//                     )}
//                     {formStep === 1 && (
//                         <motion.div
//                             variants={transitionVariants}
//                             initial="initial"
//                             animate="animate"
//                             exit="exit"
//                             transition={{ duration: 0.5 }}
//                         >
//                             <TypeOfRentalSection {...params} />
//                         </motion.div>
//                     )}
//                     {formStep === 2 && (
//                         <motion.div
//                             variants={transitionVariants}
//                             initial="initial"
//                             animate="animate"
//                             exit="exit"
//                             transition={{ duration: 0.5 }}
//                         >
//                             <WhenYouAreMovingSection {...params} />
//                         </motion.div>
//                     )}
//                     {formStep === 3 && (
//                         <motion.div
//                             variants={transitionVariants}
//                             initial="initial"
//                             animate="animate"
//                             exit="exit"
//                             transition={{ duration: 0.5 }}
//                         >
//                             <HowLongToStaySection {...params} />
//                         </motion.div>
//                     )}
//                     {formStep === 4 && (
//                         <motion.div
//                             variants={transitionVariants}
//                             initial="initial"
//                             animate="animate"
//                             exit="exit"
//                             transition={{ duration: 0.5 }}
//                         >
//                             <BudgetSection {...params} />
//                         </motion.div>
//                     )}
//                     {formStep === 5 && (
//                         <motion.div
//                             variants={transitionVariants}
//                             initial="initial"
//                             animate="animate"
//                             exit="exit"
//                             transition={{ duration: 0.5 }}
//                         >
//                             <CloseToCampusSection {...params} />
//                         </motion.div>
//                     )}
//                     {formStep === 6 && (
//                         <motion.div
//                             variants={transitionVariants}
//                             initial="initial"
//                             animate="animate"
//                             exit="exit"
//                             transition={{ duration: 0.5 }}
//                         >
//                             <WhereToBeLocatedSection {...params} />
//                         </motion.div>
//                     )}
//                     {formStep === 7 && (
//                         <motion.div
//                             variants={transitionVariants}
//                             initial="initial"
//                             animate="animate"
//                             exit="exit"
//                             transition={{ duration: 0.5 }}
//                         >
//                             <LookingForSection {...params} />
//                         </motion.div>
//                     )}
//                     {formStep === 8 && (
//                         <motion.div
//                             variants={transitionVariants}
//                             initial="initial"
//                             animate="animate"
//                             exit="exit"
//                             transition={{ duration: 0.5 }}
//                         >
//                             <RoommatesSection {...params} />
//                         </motion.div>
//                     )}


//                 </>
//             }
//         </div >
//     )
// }
// export default PropertySection

// // ------------------------


// const categories = {
//     Social: [
//         "Going Out/Clubbing",
//         "Concerts/Live Music",
//         "Campus Events",
//         "Shopping",
//         "Eating out",
//         "Sports",
//         "Group Projects",
//         "Bar Hopping",
//     ],
//     "Staying In": [
//         "Movies",
//         "Board Games",
//         "Gaming",
//         "Reading",
//         "Cooking/Baking",
//         "Online Shopping",
//         "Journaling",
//     ],
//     Causes: [
//         "Mental Health Awareness",
//         "LGBTQ+ Advocacy",
//         "Feminism",
//         "Black Lives Matter",
//         "Climate Change",
//         "Social Development",
//         "Volunteering",
//         "Politics",
//         "World Peace",
//         "Equality",
//         "Disability Rights",
//         "Campus Activism",
//         "Sustainability",
//         "Animal Rights",
//         "Human Rights",
//     ],
//     Personal: [
//         "Entrepreneur",
//         "Collector",
//         "Thrifting",
//         "Investing",
//         "Side Quests",
//         "Gym And Wellness",
//         "Meditation",
//         "Yoga",
//         "Trying New Things",
//         "Betting/Gambling",
//         "Sports",
//         "Vlogging/Content Creation",
//         "Podcast",
//         "Going On Walks",
//         "Camping",
//         "Traveling",
//         "Photography",
//         "Singing",
//         "Dancing",
//         "Learning New Languages",
//         "Art",
//         "Boating",
//         "Studying",
//     ],
// };

// const InterestSelector = () => {
//     const [selected, setSelected] = useState<string[]>([]);

//     const toggleSelection = (interest: string) => {
//         setSelected((prev) =>
//             prev.includes(interest)
//                 ? prev.filter((item) => item !== interest)
//                 : [...prev, interest]
//         );
//     };

//     const renderCategory = (title: string, items: string[]) => {
//         return (
//             <div className="w-full lg:w-1/4 px-2 mb-6">
//                 <h3 className="text-lg font-bold text-red-600 mb-2">{title}</h3>
//                 {/* selected items */}
//                 <Select options={items.map(i => ({ value: i, label: i }))} isMulti={true} className='w-full' isSearchable closeMenuOnSelect={false} />
//             </div>
//         );
//     };

//     return (
//         <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-4">
//             {/* Left - Interest selection /} */}
//             <div className="w-full">
//                 <h2 className="text-2xl font-bold text-center text-red-700 mb-6">
//                     What Do You Enjoy?
//                 </h2>
//                 <div className="flex flex-wrap">
//                     {Object.entries(categories).map(([title, items]) =>
//                         renderCategory(title, items)
//                     )}
//                 </div>
//                 {/* {/ Next button */}

//                 <h4 className="text-lg font-semibold mb-2 text-gray-800">
//                     ({selected.length}) Selected
//                 </h4>

//                 < div className="mt-6">
//                     <button
//                         disabled={selected.length === 0}
//                     // className={px - 6 py-2 rounded-lg text-white ${ selected.length > 0 ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"}}
//                     >
//                         Next
//                     </button>
//                 </div>
//             </div >
//         </div >
//     );
// };

// ------------------------

// const BedTimeSections = () => {
//     return (
//         <>
//             <p className='text-2xl text-[#B3322F]  w-full mt-10 px-10 text-center mx-auto font-semibold'>
//                 How do you feel about going out (e.g. clubbing or partying)?
//             </p>

//             <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Never </button>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Open To It </button>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Occasionally </button>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Frequently </button>
//             </div>
//             <p className='text-2xl text-[#B3322F]  w-full my-20 px-10 text-center mx-auto font-semibold'>

//                 What time do you typically go to bed?
//             </p>

//             <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-cente text-md px-10'>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Before 10PM </button>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Around 11PM </button>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Midnight </button>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> After 1AM </button>
//             </div>
//             <button className='bg-black w-[250px] md:w-[180px] text-center py-2 text-white  rounded-full mt-18'>  Next </button>

//         </>
//     )
// }
// const BackToHomeSections = () => {
//     return (
//         <>
//             <p className='text-2xl text-[#B3322F]  w-full mt-10 px-10 text-center mx-auto font-semibold'>
//                 How often do you use recreational substances (e.g. cannabis)?
//             </p>

//             <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Never </button>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Occasionally </button>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Socially On Weekends </button>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Frequently </button>
//             </div>
//             <p className='text-2xl text-[#B3322F]  w-full my-20 px-10 text-center mx-auto font-semibold'>

//                 How tidy are you at home?
//             </p>

//             <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-cente text-md px-10'>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Very Tidy </button>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Pretty Clean </button>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Average </button>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Messy </button>
//             </div>
//             <button className='bg-black w-[250px] md:w-[180px] text-center py-2 text-white  rounded-full mt-18'>  Next </button>

//         </>
//     )
// }
// const DrinkAndSmokeSection = () => {
//     return (
//         <>
//             <p className='text-2xl text-[#B3322F]  w-full mt-10 px-10 text-center mx-auto font-semibold'>
//                 How often do you drink?
//             </p>

//             <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-center mt-15 text-md px-10'>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Never </button>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> On Special Occasions </button>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Socially On Weekends </button>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Most Nights </button>
//             </div>
//             <p className='text-2xl text-[#B3322F]  w-full my-20 px-10 text-center mx-auto font-semibold'>

//                 How often do you smoke?
//             </p>

//             <div className='flex flex-col md:flex-row gap-5 md:gap-15 justify-center items-cente text-md px-10'>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Never </button>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Trying To Quit </button>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Occasionally </button>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Frequently </button>
//             </div>
//             <button className='bg-black w-[250px] md:w-[180px] text-center py-2 text-white  rounded-full mt-18'>  Next </button>

//         </>
//     )
// }
// const LetsLearnAboutLifeStyleSection = () => {
//     const name = "Paul Brooks"
//     return (
//         <div className='text-center '>
//             <p className='text-3xl text-[#B3322F]'>Let's learn about your lifestyle, <br /> <span className='font-bold'>{name}</span></p>
//             <img alt="" className="h-40 pr-1 mx-auto " src="/assets/img/icons/lifestyleicon.svg" />
//             <p className='text-md pb-10'> Knowing your habits helps us match<br /> you with the best roommates and home   </p>
//             <button className='bg-[#B3322F] w-[250px] text-center py-2 mx-auto text-white flex rounded-full justify-center'> Get Started <img alt="" className="h-3 pl-2 mt-1.5" src={ICONS.ARROW_RIGHT_WHITE} /> </button>
//         </div>
//     )
// }

// const RoomMateSection = () => {
//     return (
//         <>


//             <p className='text-2xl text-[#B3322F]  w-full mt-10 px-10 text-center mx-auto'>

//                 Would you like to bring any roommates?
//             </p>

//             <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-15 text-md px-10'>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Yes </button>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> No </button>
//             </div>
//             <p className='text-2xl text-[#B3322F]  w-full mt-10 px-10 text-center mx-auto'>

//                 Would you like us to match you with potential roommates?
//             </p>

//             <div className='flex flex-col md:flex-row gap-6 justify-center items-center mt-15 text-md px-10'>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> Yes </button>
//                 <button className='bg-[#B3322F] w-full md:w-[250px] text-center py-2 text-white  rounded-full'> No </button>
//             </div>
//             <button className='bg-black w-[250px] md:w-[180px] text-center py-2 text-white  rounded-full mt-18'>  Next </button>


//         </>
//     )
// }
