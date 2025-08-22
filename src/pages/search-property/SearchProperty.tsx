import SearchPropertyLayout from '@src/layouts/SearchProperty.Layout'
import { ROUTES } from '@src/utils/constants'
import { JSX } from 'react'
import { useParams } from 'react-router-dom'
import { ResponsiveTabSelector } from './common/ResponsiveTabSelector'
import Explore from './components/Explore'
import Matches from './components/Matches'
import MyHousing from './components/MyHousing'


const tabOptionsObject = {
    "my-housing": <div className='flex items-center justify-center gap-2 h-10'>My Housing </div>,
    "matches": <div className='flex items-center justify-center gap-2 h-10'>Matches</div>,
    "explore": <div className='flex items-center justify-center gap-2 h-10'>Explore</div>,
    "preferences": <div className='flex items-center justify-center gap-2'>
        <img
            src="/assets/img/search-property/student_profile (1).png"
            alt={'loadig'}
            className="w-10 h-10 rounded-full"
        />
        Profile & Preferences
    </div>
};

// Components corresponding to each tab
const Components: Record<keyof typeof tabOptionsObject, JSX.Element> = {
    "my-housing": <MyHousing />,
    "matches": <Matches />,
    "explore": <Explore />,
    "preferences": <></>,
};

const navigations = {
    "preferences": ROUTES.STUDENTS_DASHBOARD,

}

const SearchProperty = () => {
    const { tab = "my-housing" } = useParams(); // Default to "my-housing" if no tab is in the URL
    const tabOptions = Object.keys(tabOptionsObject);

    const isValidTab = (value: string): value is keyof typeof Components => {
        return Object.keys(Components).includes(value);
    };

    return (
        <>

            <SearchPropertyLayout>
                {/* Filters */}
                <ResponsiveTabSelector {...{ tabOptions, tab, tabOptionsObject, navigations }} />


                {/* properties */}
                {/* <div className='py-10 md:mx-15'>
                    {
                        isLoading ? <div>
                            <LoaderComponent />
                            <p className='text-center'>Please wait....</p>
                        </div> : isError ?
                            <div className='flex items-center justify-center mt-4 gap-4'>
                                <div className='font-semibold '>{"Fail to fetch data Retry."}</div>
                                <motion.div
                                    onClick={refetch}
                                    whileHover={{ scale: 1.2, rotate: 90 }}
                                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                                >
                                    <ArrowPathIcon className="w-5 h-5 text-[#B3322F] " />
                                </motion.div>
                            </div > : <>

                                {(data[0]?.floorplans || []).map((propertyDetails, index) => <HousingCard
                                    index={index}
                                    selected={selected === index}
                                    setSelected={setSelected}
                                    propertyDetails={propertyDetails}
                                    property={data[0]}
                                    {...demoDetails}
                                />)}
                            </>}
                </div> */}

                {isValidTab(tab) ? Components[tab] : <div>Invalid tab</div>}

                {/* I’ll Search On My Own Instead Button */}



                {/* AvailableUnitsModal */}
                {/* <div className='mx-10 md:mx-20'>
                    <h2 className="text-lg font-semibold text-center md:text-left text-gray-700 mb-4">Requested Tour(s)</h2>
                    <TourTimeline />
                </div> */}
            </SearchPropertyLayout>
        </>
    )
}

export default SearchProperty;


// const TourTimeline = () => {
//     const tourData = [
//         {
//             name: "You",
//             status: "Requested",
//             date: "September 15 2025",
//             image: "/assets/img/search-property/student_profile (1).png", // replace with your image path
//             color: "text-gray-600",
//         },
//         {
//             name: "uOttawa Student",
//             status: "Accepted",
//             date: "September 15 2025",
//             image: "/assets/img/search-property/student_profile (2).png",
//             color: "text-green-600",
//         },
//         {
//             name: "uOttawa Student",
//             status: "Pending",
//             date: "September 15 2025",
//             image: "/assets/img/search-property/student_profile (3).png",
//             color: "text-yellow-600",
//         },
//     ];

//     return (
//         <div className="bg-white rounded-4xl shadow-md p-4 w-full  px-8 mx-auto">


//             <div className={`flex  flex-col md:items-center md:flex-row justify-between py-10`}>
//                 {tourData.map((item, index) => (
//                     <Fragment key={index}>

//                         {index !== 0 && (
//                             <>
//                                 <div className={`hidden md:block h-1  border-t-4 border-[#B3322F] mx-2 ${[0, 1].includes(index) ? 'w-full' : 'w-80'}`}> </div>
//                                 <div className={`block md:hidden w-1  ml-15 border-l-4 border-[#B3322F] my-2 ${[0, 1].includes(index) ? 'h-30' : 'h-15'}`}></div>
//                             </>
//                         )}



//                         <div className="flex md:flex-col items-center md:text-center min-w-35 md:-mx-4.5  -my-3 overflow-hidden">
//                             <p className="hidden md:block mt-2 text-sm font-semibold   w-full mb-2">{item.name}</p>
//                             <div className="w-30 h-30 rounded-full overflow-hidden border-2 border-gray-300">
//                                 <img src={item.image} alt={item.name} className='w-full h-full' />
//                             </div>
//                             <div className='md:ml-0 ml-4'>
//                                 <p className="md:hidden block mt-2 text-sm font-semibold   w-full">{item.name}</p>

//                                 <p className={`text-md font-semibold ${item.color}`}>{item.status}</p>
//                                 <p className="text-sm  w-full">{item.date}</p>
//                             </div>
//                         </div>


//                         {index === 0 && (
//                             <>


//                                 <div className="hidden md:block h-1 w-full border-t-4 border-[#B3322F] mx-2"></div>
//                                 <div className="block md:hidden w-1 ml-15 h-30 border-l-4 border-[#B3322F] my-2"></div>


//                                 <div className={`flex md:flex-col items-center  md:-mx-4.5 -my-4.5  `}>
//                                     <p className="hidden md:block text-md font-semibold   -mt-10 md:ml-0 ml-4">Let's Go!</p>
//                                     <CheckCircleIcon className="w-30 h-30 md:w-20 md:h-20 text-[#B3322F]" />
//                                     <p className="md:hidden block text-md font-semibold    md:ml-0 ml-4">Let's Go!</p>

//                                 </div>
//                             </>
//                         )}


//                     </Fragment>
//                 ))}
//             </div>

//             <div className="my-4 border-t pt-4 md:px-4 text-sm text-gray-800 text-center md:flex gap-5 items-center">
//                 <p className='md:mt-2'><span className="font-semibold">Unit 308</span></p>
//                 <Button className="mt-2 px-4 py-1 text-sm border border-[#B3322F] rounded-full text-[#B3322F] hover:bg-red-50 transition">
//                     Withdraw Tour Request
//                 </Button>
//             </div>
//         </div>
//     );
// }
// const TourTimeline = () => {
//     const isMobile = true
//     const tourData = [
//         {
//             name: "You",
//             status: "Requested",
//             date: "September 15 2025",
//             image: "/assets/img/search-property/student_profile (1).png", // replace with your image path
//             color: "text-gray-600",
//         },
//         {
//             name: "uOttawa Student",
//             status: "Accepted",
//             date: "September 15 2025",
//             image: "/assets/img/search-property/student_profile (2).png",
//             color: "text-green-600",
//         },
//         {
//             name: "uOttawa Student",
//             status: "Pending",
//             date: "September 15 2025",
//             image: "/assets/img/search-property/student_profile (3).png",
//             color: "text-yellow-600",
//         },
//     ];

//     return (
//         <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-4xl mx-auto">
//             <h2 className="text-md font-medium text-gray-700 mb-4">Requested Tour(s)</h2>

//             <div className={`flex ${isMobile ? "flex-col items-center" : "flex-row justify-between items-center"} bg-red-100`}>
//                 {tourData.map((item, index) => (
//                     <Fragment key={index}>

//                       {index !== 0 && !isMobile && (
//                             <div className="h-1 w-full border-t-2 border-[#B3322F] mx-2 bg-green-100">asd</div>
//                         )}
//                         {index !== 0 && isMobile && (
//                             <div className="w-1 h-8 border-l-2 border-red-500 my-2"></div>
//                         )}


//                         <div className="flex flex-col items-center text-center">
//                             <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
//                                 <img src={item.image} alt={item.name} width={64} height={64} />
//                             </div>
//                             <p className="mt-2 text-sm font-semibold">{item.name}</p>
//                             <p className={`text-xs ${item.color}`}>{item.status}</p>
//                             <p className="text-xs text-gray-500">{item.date}</p>
//                         </div>


//                         {index === 0 && (
//                             <>

//                       { !isMobile && (
//                             <div className="h-1 w-full border-t-2 border-red-500 mx-2"></div>
//                         )}
//                         { isMobile && (
//                             <div className="w-1 h-8 border-l-2 border-red-500 my-2"></div>
//                         )}

//                             <div className={`flex flex-col items-center ${isMobile ? "my-2" : "mx-4"}`}>
//                                 <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-300">
//                                     <CheckCircleIcon className="w-5 h-5 text-gray-400" />
//                                 </div>
//                                 {!isMobile && (
//                                     <p className="text-xs text-gray-500 mt-1">Let's Go!</p>
//                                 )}
//                             </div>
//                             </>
//                         )}


//                     </Fragment>
//                 ))}
//             </div>

//             <div className="my-4 border-t pt-3 text-sm text-gray-800 text-center">
//                 <p><span className="font-semibold">Unit 308</span></p>
//                 <Button className="mt-2 px-4 py-1 text-sm border border-[#B3322F] rounded-full text-[#B3322F] hover:bg-red-50 transition">
//                     Withdraw Tour Request
//                 </Button>
//             </div>
//         </div>
//     );
// }
















