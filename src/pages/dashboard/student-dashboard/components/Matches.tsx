import React, { useState } from 'react'
import { useGetEntrataPropertiesQuery } from '@src/redux/services/property.service';
import { LoaderComponent } from '../../../../components/Loader';
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { toast } from 'react-toastify';
import { Property, PropertyDetails } from '@src/utils/interfaces';
import { AnimatePresence, motion } from "framer-motion";
import { AvailableUnitsModal } from '../../../search-property/common/AvailableUnitsModal';
import { IMAGES } from '@src/utils/constants/app-info.constant';
import PulseHoverLayout from '@src/layouts/PulseHover.Layout';
import { Button } from '../../../../components/Button';


const demoDetails = {
    title: "Alma @ ByWard Market",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    location: "256 Rideau St, Ottawa, ON K1N 0G1",
    type: "Apartment",
    priceRange: "$1,350 - $1,999",
    matchPercent: "96",
    bgClass: "bg-gradient-to-br from-[#B3322F] to-[#4D1614]",
}

const Matches = () => {
    const [selected, setSelected] = useState<number | null>(null);
    const { data = [], isLoading, isError, refetch } = useGetEntrataPropertiesQuery();

    return (
        <div>
            <div className='py-10 md:mx-15'>
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

                            {(data[0]?.floorplans || []).map((propertyDetails, index) => <MatchingHousingCard
                                index={index}
                                selected={selected === index}
                                setSelected={setSelected}
                                propertyDetails={propertyDetails}
                                property={data[0]}
                                {...demoDetails}
                            />)}
                        </>}
            </div>

        </div>
    )
}

export default Matches



export const MatchingHousingCard: React.FC<{
    title: string;
    property: Property;
    propertyDetails: PropertyDetails;
    location: string;
    type: string;
    priceRange: string;
    matchPercent: string;
    statusText?: string;
    bgClass?: string; // Tailwind background class (e.g., bg-gradient-to-r from-red-500 to-red-800)
    setSelected: (value: number | null) => void
    selected?: boolean,
    index: number,
}> = ({
    property,
    propertyDetails,
    index,
    title,
    location,
    matchPercent,
    statusText = 'Ready To Move In',
    bgClass = 'bg-gradient-to-r from-[#B3322F] to-[#4D1614]', // default if not provided
    selected = false,
    setSelected
}) => {
        const [viewDetails, setViewDetails] = useState(false)
        const [likedProperty, setLikedProperty] = useState(false)
        const likedPropertyHandler = () => {
            const updatedState = !likedProperty;
            setLikedProperty(updatedState);
            toast.info(updatedState ? "Demo: Added to Favourites" : "Demo: Removed from Favourites");
        };

        return (
            <PulseHoverLayout>
                <div
                    onClick={() => setSelected(index)}
                    className={`z-10 md:flex ${selected ? "rounded-tr-xl rounded-tl-xl " : "rounded-xl"} shadow-md overflow-hidden relative p-6 mx-5 mt-12 text-white ${bgClass}`}
                >
                    {/* Like Icon */}
                    <motion.img
                        onClick={likedPropertyHandler}
                        src={`/assets/img/search-property/${likedProperty ? "heartinner.svg" : "heartouter.svg"}`}
                        alt="Like"
                        className="h-5 absolute md:top-4 md:right-5 right-10 top-10 z-50 "

                        // Animate on click (when state changes)
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}

                        // Hover animation
                        whileHover={{ scale: 1.1 }}
                    />
                    {/* Image section */}
                    <div className="relative w-full md:w-1/4">
                        {/* <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-48 object-cover rounded-2xl"
                        /> */}
                        <img
                            src={IMAGES.NOT_FOUND}
                            alt={title}
                            className="w-full h-48   rounded-2xl"
                        />
                        <div className="absolute bottom-2 left-4 bg-[#B3322F]/80 text-white text-xs font-semibold px-3 py-1 rounded-sm shadow">
                            {statusText}
                        </div>
                    </div>

                    {/* Content section */}
                    <div className="w-full md:w-1/2 md:pl-6 md:mt-0 mt-6 flex flex-col justify-center">
                        <div className="flex md:justify-start justify-between items-start">
                            <h2 className="md:text-2xl text-xl font-semibold">{propertyDetails.name} @{property.propertyName}</h2>
                            <div className="bg-[#57AF4F] text-white px-3 py-0.5 text-center rounded-md text-[10px] font-medium mt-3 w-[85px] ml-0 md:ml-5">
                                {matchPercent} MATCH
                            </div>
                        </div>

                        {/* Details */}
                        <div className="mt-5 space-y-2 md:text-lg text-md">
                            <p className="flex items-start">
                                <img
                                    src="/assets/img/search-property/location_icon.svg"
                                    className="h-4 w-4 mt-1.5 mr-2"
                                    alt="Location Icon"
                                />
                                {location}
                            </p>
                            <p className="flex items-start">
                                <img
                                    src="/assets/img/search-property/building_icon.svg"
                                    className="h-4 w-4 mt-1.5 mr-2"
                                    alt="Building Icon"
                                />
                                {property?.structureType}
                            </p>
                            <p className="flex items-start font-semibold">

                                ${propertyDetails.rentMin} - ${propertyDetails.rentMax}
                                <span className="ml-1 font-normal">/month</span>
                            </p>
                        </div>
                    </div>
                </div>
                {/* Buttons */}
                <AnimatePresence>
                    {selected && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="bg-[#D9D9D9]/50 md:h-30 h-35 mx-5 -mt-5 pt-5 rounded-xl flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4"
                        >
                            <Button
                                className="bg-[#B3322F] text-white w-50 py-2 rounded-full"
                                onClick={() => setViewDetails(true)}
                            >
                                View Details
                            </Button>
                            <Button className="bg-black text-white w-50 py-2 rounded-full">
                                Continue
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {selected && viewDetails && <AvailableUnitsModal
                    {...{ propertyDetails, property }}
                />}

            </PulseHoverLayout>
        );
    };
