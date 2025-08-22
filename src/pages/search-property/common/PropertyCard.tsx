import { Button } from "@src/components/Button";
import PulseHoverLayout from "@src/layouts/PulseHover.Layout";
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from "react";
import { toast } from "react-toastify";
import { AvailableUnitsModal } from "./AvailableUnitsModal";
import { PropertyImagesSlider } from "./PropertyImagesSlider";

export const PropertyCard: React.FC<{
    property: any;
    floorplan: any;
    index: any,
    statusText?: string;
    bgClass?: string; // Tailwind background class (e.g., bg-gradient-to-r from-red-500 to-red-800)
    selected?: boolean,
    setSelected: (value: number | null) => void
    section: string | null
}> = ({
    property,
    floorplan,
    index,
    statusText = 'Ready To Move In',
    bgClass = 'bg-gradient-to-r from-[#B3322F] to-[#4D1614]', // default if not provided
    selected = false,
    setSelected,
    section = null
}) => {
        const [viewDetails, setViewDetails] = useState(false)
        const [likedProperty, setLikedProperty] = useState(false)
        const likedPropertyHandler = () => {
            const updatedState = !likedProperty;
            setLikedProperty(updatedState);
            toast.info(updatedState ? "Demo: Added to Favourites" : "Demo: Removed from Favourites");
        };

        return (
            <>
                <PulseHoverLayout>
                    <div
                        style={{ cursor: 'none' }}
                        onClick={() => setSelected(index)}
                        className={`  cursor-move z-10 md:flex ${selected ? "rounded-tr-xl rounded-tl-xl " : "rounded-xl"} shadow-md cursor-none overflow-hidden relative p-6 text-white ${bgClass}`}
                    >
                        {/* Like Icon */}
                        {/* <motion.img
                            onClick={likedPropertyHandler}
                            src={`/assets/img/search-property/${likedProperty ? "heartinner.svg" : "heartouter.svg"}`}
                            alt="Like"
                            className="h-5 absolute md:top-4 md:right-5 right-10 top-10 z-50 "

                            // Animate on click (when state changes)
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}

                            // Hover animation
                            whileHover={{ scale: 1.1 }}
                        /> */}
                        {/* Image section */}
                        <div className="relative rounded-2xl bg-green-100 md:w-1/4 overflow-hidden">
                            <div className="h-48 w-full">
                                <PropertyImagesSlider images={floorplan?.photos} height="h-48" />
                            </div>

                            <div className="absolute bottom-2 left-4 bg-[#B3322F]/80 text-white text-xs font-semibold px-3 py-1 rounded-sm shadow">
                                {statusText}
                            </div>
                        </div>

                        {/* Content section */}
                        <div className="w-full md:w-1/2 md:pl-6 md:mt-0 mt-6 flex flex-col justify-center">
                            <div className="flex md:justify-start justify-between items-start">
                                <h2 className="md:text-2xl text-xl font-semibold">{property.propertyName} @{floorplan.name}</h2>
                                <div className="bg-[#57AF4F] text-white px-3 py-0.5 text-center rounded-md text-[10px] font-medium mt-3 w-[85px] ml-0 md:ml-5">
                                    {property?.matchPercentage} MATCH
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
                                    {property?.address} {property?.city} {property?.state} {property?.country}
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

                                    ${floorplan.rentMin} - ${floorplan.rentMax}
                                    <span className="ml-1 font-normal">/month</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </PulseHoverLayout>
                {/* Buttons */}
                <AnimatePresence>
                    {selected && section !== "my-housing" && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="bg-[#D9D9D9]/50 md:h-30 h-35   -mt-5 pt-5 rounded-b-xl flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4"
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
                    {...{ floorplan, property }}
                />}

            </>
        );
    };