import React, { useRef, useState } from "react";
import { ResponsiveTab } from "./ResponsiveTab";
import { DropDownSelector } from "../../../../../components/DropDownSelector";
import { NumberInput } from "../../../../../components/NumberInput";
import { comunityAmenities, unitAmenities } from "../../../../../static-data";
import { AnimatePresence, motion } from 'framer-motion';
import { PrimaryButton } from "../../../../../components/Button";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/20/solid";

// Constants
const tabOptions = ["Basic Information", "Building"];
const yearBuiltOptions = Array.from(
    { length: 2010 - 1990 + 1 },
    (_, i) => 1990 + i
);

const NewPropertyForm = () => {
    const [tab, setTab] = useState(tabOptions[0]); // store single string, not array

    return (
        <div className="bg-white px-5 shadow-md pb-10 mt-5 rounded-2xl">
            {/* Tab Selector */}
            <ResponsiveTab {...{ tabOptions, tab, setTab }} />

            {tab === tabOptions[0] && <BasicInformationForm />}
            {tab === tabOptions[1] && <BuildingForm />}
        </div>
    );
};

export default NewPropertyForm;

const BasicInformationForm = () => {
    const [yearBuilt, setYearBuilt] = useState(yearBuiltOptions[0]);

    return (
        <div className="flex flex-col gap-4 text-[#B3322F] font-semibold mb-4">
            {/* Year Built Dropdown */}
            <div className="flex flex-col w-fit gap-3 mb-6">
                <label htmlFor="yearBuilt">Year Built</label>
                <DropDownSelector
                    options={yearBuiltOptions}
                    selected={yearBuilt}
                    onSelect={setYearBuilt}
                    className="py-2 px-6 w-60 bg-white text-[#B3322F] flex justify-between items-center"
                />
            </div>

            {/* Description */}
            <label>Description</label>
            <textarea
                className="mb-3 bg-gray-100 text-sm text-gray-700 px-4 py-3 rounded-md shadow-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Start Typing..."
                rows={1}
            />

            {/* House Rules */}
            <label>House Rules</label>
            <textarea
                className="bg-gray-100 text-sm text-gray-700 px-4 py-3 rounded-md shadow-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Start Typing..."
                rows={10}
            />

            {/* Submit Button */}
            <PrimaryButton
                color="red"
                className="w-60 py-3 text-xs mt-4 mx-auto"
                onClick={() => console.log("Submitted")} // Replace with real handler
            >
                Save
            </PrimaryButton>
        </div>
    );
};

const BuildingForm = () => {

    const [price, setPrice] = useState<number>(1250);
    const [distance, setDistance] = useState<number>(8);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [selectedBeds, setSelectedBeds] = useState<number | null>(null);
    const [selectedBaths, setSelectedBaths] = useState<number | null>(null);
    const [selectedOccupancies, setSelectedOccupancies] = useState<number | null>(null);
    const [type, setType] = useState<string | null>(null);
    const [badge, setBadge] = useState<string | null>(null);
    const [furnished, setFurnished] = useState<string | null>(null);
    const [selectedUnitAmenities, setSelectedUnitAmenities] = useState<string[]>([])
    const [selectedComunityAmenities, setSelectedComunityAmenities] = useState<string[]>([])

    console.log("-==--??", selectedUnitAmenities, selectedComunityAmenities)
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



    // Calculate percentage position
    const getPriceLeftPosition = () => {
        const percentage = ((price - 500) / (2000 - 500)) * 100;
        return `calc(${percentage}% - 24px)`; // Center the label
    };
    const getDistanceLeftPosition = () => {
        const percentage = ((distance - 1) / (2000 - 0)) * 100;
        return `calc(${percentage}% - 24px)`; // Center the label
    };

    return <div className="text-[#B3322F]">
        <div className="flex lg:flex-row flex-col justify-between gap-6 p-4 space-y-6 text-sm font-medium text-gray-800 mx-auto">
            <div className='md:w-1/2 w-full flex flex-col gap-10'>
                {/* Price Slider */}
                <div className='flex flex-col  gap-4  '>
                    <p className=" md:text-lg text-md   text-[#B3322F]  font-semibold mb-1 md:w-35 text-left">Price (Monthly)</p>
                    <div className=" w-full">
                        <div className="flex justify-between text-black font-semibold mb-2">
                            <p>$500</p>
                            <p>$2000</p>
                        </div>

                        <div className="relative w-full">
                            {/* Slider */}
                            <input
                                type="range"
                                className="custom-slider w-full"
                                min={500}
                                max={2000}
                                value={price}
                                onChange={(e) => setPrice(+e.target.value)}
                            />

                            {/* Moving label */}
                            <div
                                className="absolute top-8 font-bold text-sm"
                                style={{ left: getPriceLeftPosition() }}
                            >
                                ${price}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Distance Slider */}
                <div className='flex flex-col    gap-4  '>
                    <p className=" md:text-lg text-md text-[#B3322F]  font-semibold mb-1  text-left">Size (sqft)</p>
                    <div className="w-full">
                        <div className="flex justify-between text-black font-semibold mb-2">
                            <p>1</p>
                            <p>2000</p>
                        </div>

                        <div className="relative w-full">
                            {/* Slider */}
                            <input
                                type="range"
                                className="custom-slider w-full"
                                min={1}
                                max={2000}
                                value={distance}
                                onChange={(e) => setDistance(+e.target.value)}
                            />

                            {/* Moving label */}
                            <div
                                className="absolute top-8 font-bold text-sm"
                                style={{ left: getDistanceLeftPosition() }}
                            >
                                {distance}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Amenities */}
                <>
                    <div id="unitAmenities" className={`mt-10 rounded-2xl mx-1  `}>
                        <p className=" md:text-lg text-md text-[#B3322F]  font-semibold mb-1  text-left">Unit Amenities</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6  mx-auto w-full">
                            {comunityAmenities.map((amenity, index) => (
                                <AmenitiesButton key={index} selected={selectedComunityAmenities.includes(amenity.name)} onClick={() => handleCommunityAmenityToggle(amenity.name)}>
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
                                </AmenitiesButton>
                            ))}
                            <div className="text-s underline md:ml-2 -mt-2">Add More</div>
                        </div>
                    </div>
                    <div id="communityAmenities" className={`rounded-2xl mx-1  `}>
                        <p className=" md:text-lg text-md text-[#B3322F]  font-semibold mb-1  text-left">Community Amenities</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6  mx-auto w-full">
                            {comunityAmenities.map((amenity, index) => (
                                <AmenitiesButton key={index} selected={selectedComunityAmenities.includes(amenity.name)} onClick={() => handleCommunityAmenityToggle(amenity.name)}>
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
                                </AmenitiesButton>
                            ))}
                            <div className="text-s underline md:ml-2 -mt-2">Add More</div>
                        </div>
                    </div>


                </>

                {/* Unit Size */}
                <div className='flex flex-col   md:gap-8 gap-4 '>
                    <p className=" md:text-lg text-md  text-[#B3322F] font-semibold mb-1 md:w-35 text-left">Unit Size</p>
                    <div className="flex flex-col md:flex-row justify-start gap-3  ">
                        <NumberInput label="Beds" value={selectedBeds || 0} onChange={setSelectedBeds} />
                        <NumberInput label="Bathrooms" value={selectedBaths || 0} onChange={setSelectedBaths} />
                        <NumberInput label="Occupancy" value={selectedOccupancies || 0} onChange={setSelectedOccupancies} />
                    </div>
                </div>


                <div className='flex flex-col    gap-4  '>
                    <p className=" md:text-lg text-md text-[#B3322F] font-semibold mb-1 md:w-35 text-left">Badge</p>
                    <div className="flex flex-col md:flex-row gap-8 md:gap-0">
                        {[
                            { title: 'Furnished' },
                            { title: 'Unfurnished' },
                        ].map((propertyType, index) => (
                            <div key={index} className="flex  items-center w-full md:w-1/3" onClick={() => setFurnished(propertyType.title)}>
                                <p className={`${propertyType.title === furnished ? "bg-[#B3322F]" : "bg-gray-100 border-1 border-[#CCCCCC]"} w-4 h-4 rounded-full`} ></p>
                                <div
                                    className="ml-3 flex gap-2 text-sm/6 font-medium text-gray-900 dark:text-white"
                                >
                                    {propertyType.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Buttons */}
            <div className="   w-full md:w-1/2 flex flex-col    gap-4 ">
                <div className='flex flex-col    gap-4  '>
                    <p className=" md:text-lg text-md text-[#B3322F] font-semibold mb-1 md:w-35 text-left">Location</p>
                    <input
                        type="text"
                        placeholder="256 Rideau St, Ottawa, ON K1N 0G1"
                        className="  w-full px-4 py-2 rounded-full shadow-md outline-none"
                    />
                </div>
                <div className='flex flex-col    gap-4  '>
                    <p className=" md:text-lg text-md text-[#B3322F] font-semibold mb-1 md:w-35 text-left">Unit Number</p>
                    <input
                        type="text"
                        placeholder="305"
                        className="  w-full px-4 py-2 rounded-full shadow-md outline-none"
                    />
                </div>
                <div className='flex flex-col    gap-4  '>
                    <p className=" md:text-lg text-md text-[#B3322F] font-semibold mb-1 md:w-35 text-left">Property Type</p>
                    <div className="flex flex-col md:flex-row gap-8 md:gap-0">
                        {[
                            { title: 'House', icon: "house_red", },
                            { title: 'Apartment', icon: "apartment_red", },
                            { title: 'Student Accommodation', icon: "building_red", },
                        ].map((propertyType, index) => (
                            <div key={index} className="flex  items-center w-full md:w-1/3" onClick={() => setType(propertyType.title)}>
                                <p className={`${propertyType.title === type ? "bg-[#B3322F]" : "bg-gray-100 border-1 border-[#CCCCCC]"} w-4 h-4 rounded-full`} ></p>
                                <div
                                    className="ml-3 flex gap-2 text-sm/6 font-medium text-gray-900 dark:text-white"
                                >
                                    <img alt="" className="h-5 " src={`/assets/img/icons/${propertyType.icon}.svg`} />
                                    {propertyType.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Floor plan & Unit Images Accomodation */}
                <div className='flex flex-col md:flex-row justify-between    gap-4  '>
                    <div><FloorPlanComponent /></div>
                    <div><UnitImagesComponent /></div>
                </div>
                <div className='flex flex-col    gap-4  '>
                    <p className=" md:text-lg text-md text-[#B3322F] font-semibold mb-1 md:w-35 text-left">Badge</p>
                    <div className="flex flex-col md:flex-row gap-8 md:gap-0">
                        {[
                            { title: 'Ready To Move In' },
                            { title: 'Pending Full Occupancy' },
                        ].map((propertyType, index) => (
                            <div key={index} className="flex  items-center w-full md:w-1/3" onClick={() => setBadge(propertyType.title)}>
                                <p className={`${propertyType.title === badge ? "bg-[#B3322F]" : "bg-gray-100 border-1 border-[#CCCCCC]"} w-4 h-4 rounded-full`} ></p>
                                <div
                                    className="ml-3 flex gap-2 text-sm/6 font-medium text-gray-900 dark:text-white"
                                >
                                    {propertyType.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <TenantPreferencesComponent />
            </div>
        </div>


        {/* Additional Comments */}
        <label className=" font-semibold">Additional Comments</label>
        <textarea
            className="bg-gray-100 text-sm text-gray-700 px-4 py-3 rounded-md shadow-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="Start Typing..."
            rows={10}
        />

        {/* Submit Button */}
        <PrimaryButton
            color="red"
            className="w-60 py-3 text-xs mt-4 mx-auto"
            onClick={() => console.log("Submitted")} // Replace with real handler
        >
            Save Changes
        </PrimaryButton>
    </div>;
};


export const AmenitiesButton: React.FC<{
    selected?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    icon?: string | null;
    className?: string;
    button?: boolean;
    // type?: "button" | "submit" | "reset";
}
> = ({
    selected = false,
    children = '',
    onClick = () => { },
    icon = null,
    className = '',
    button = false,
    // type = "button",
}) => {
        // const bgColor = button
        //     ? 'bg-[#B3322F] hover:bg-black'
        //     : selected
        //         ? 'bg-[#B3322F] hover:bg-[#b3312fa2]'
        //         : 'bg-[#D9D9D9] hover:bg-[#d9d9d9a4]';
        const bgColor = button
            ? 'bg-[#B3322F] hover:bg-black'
            : selected
                ? 'bg-[#B3322F]  '
                : 'bg-[#D9D9D9] border-1 border-white ';

        return (
            <motion.button
                onClick={onClick}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`text-center py-2 text-white rounded-full flex items-center justify-center ${bgColor} ${icon ? 'gap-2' : ''} ${className}`}
            >
                {children}
                {icon && <img src={icon} alt="" className="h-3 mt-1.5" />}
            </motion.button>
        )
    };


const FloorPlanComponent = () => {
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(URL.createObjectURL(file)); // create preview URL
        }
    };

    const handleDelete = () => {
        setImage(null); // remove image
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // reset file input
        }
    };

    return (
        <div>
            {/* Label */}
            <p className="md:text-lg text-md text-[#B3322F] font-semibold mb-1 md:w-35 text-left">
                Floor Plan
            </p>

            <div className="flex flex-col items-center gap-3">
                {/* Image preview or placeholder */}
                <div
                    className="relative w-60 h-43 border border-gray-300 bg-gray-50 rounded-xl overflow-hidden bg-center bg-no-repeat flex items-center justify-center"
                    style={image ? { backgroundImage: `url(${image})`, backgroundSize: "contain" } : {}}
                >
                    {!image && <span className="text-gray-400 text-sm">No Image</span>}

                    {image && (
                        <button
                            onClick={handleDelete}
                            className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70"
                        >
                            <XMarkIcon className="h-4 w-4 text-white" />
                        </button>
                    )}
                </div>

                {/* Hidden file input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                />

                {/* Upload button */}
                <div
                    onClick={handleFileClick}
                    className="shadow-md bg-white border text-[#B3322F] border-transparent w-full md:w-60 flex justify-center cursor-pointer rounded-full py-2 px-5 ml-4 items-center gap-2 hover:shadow-lg transition duration-150"
                >
                    <ArrowUpTrayIcon className="h-5" />
                    <span>{image ? "Update" : "Upload"}</span>
                </div>
            </div>
        </div>
    );
};


const UnitImagesComponent = () => {
    const [images, setImages] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);

            // Convert each file to preview URL
            const newImages = filesArray.map((file) => URL.createObjectURL(file));

            // Limit to 4 total images
            setImages((prev) => [...prev, ...newImages].slice(0, 4));
        }
    };

    const handleDeleteImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div>
            {/* Label */}
            <p className="md:text-lg text-md text-[#B3322F] font-semibold mb-1 md:w-35 text-left">
                Unit Images
            </p>

            <div className="flex flex-col items-center gap-3">
                {/* Images preview */}
                <div className="grid grid-cols-2 gap-3 w-full md:w-60">
                    {[...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            className="relative w-full h-20 border border-gray-300 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center bg-center bg-no-repeat"
                            style={
                                images[index]
                                    ? { backgroundImage: `url(${images[index]})`, backgroundSize: "contain" }
                                    : {}
                            }
                        >
                            {images[index] ? (
                                <button
                                    onClick={() => handleDeleteImage(index)}
                                    className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70"
                                >
                                    <XMarkIcon className="h-4 w-4 text-white" />
                                </button>
                            ) : (
                                <span className="text-gray-400 text-xs">No Image</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Hidden file input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                    multiple
                />

                {/* Upload button */}
                {images.length < 4 && (
                    <div
                        onClick={handleFileClick}
                        className="shadow-md bg-white border text-[#B3322F] border-transparent w-full md:w-60 flex justify-center cursor-pointer rounded-full py-2 px-5 ml-4 items-center gap-2 hover:shadow-lg transition duration-150"
                    >
                        <ArrowUpTrayIcon className="h-5" />
                        <span>Upload</span>
                    </div>
                )}
            </div>
        </div>
    );
}



const TenantPreferencesComponent = () => {

    const [partierLevel, setPartierLevel] = useState("")
    const [studyFocusLevel, setStudyFocusLevel] = useState("")
    const [cleanlinessAndResponsibility, setCleanlinessAndResponsibility] = useState("")
    const [privacyAndIndependence, setPrivacyAndIndependence] = useState("")
    const [valuesAndBoundaries, setValuesAndBoundaries] = useState("")

    return (
        <div>
            {/* Label */}
            <p className="md:text-lg text-md text-[#B3322F] font-semibold mb-1 md:w-35 text-left">
                Tenant Preferences
            </p>

            <div className="flex flex-col w-full  gap-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between  mb-6  w-full">
                    <p className="w-full md:w-1/4">Partier Level</p>
                    <div className="w-full md:w-3/4">
                        <DropDownSelector
                            options={["Party Pro"]}
                            selected={partierLevel}
                            onSelect={setPartierLevel}
                            className="py-2 px-6  bg-white text-[#B3322F] flex justify-between items-center"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full  gap-3">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between  mb-6  w-full">
                    <p className="w-full md:w-1/4">Study Focus Level</p>
                    <div className="w-full md:w-3/4">

                        <DropDownSelector
                            options={["Academic Warrior"]}
                            selected={studyFocusLevel}
                            onSelect={setStudyFocusLevel}
                            className="py-2 px-6  bg-white text-[#B3322F] flex justify-between items-center"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full  gap-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between  mb-6  w-full">
                    <p className="w-full md:w-1/4">Cleanliness & Responsibility</p>
                    <div className="w-full md:w-3/4">
                        <DropDownSelector
                            options={["Neat Freak"]}
                            selected={cleanlinessAndResponsibility}
                            onSelect={setCleanlinessAndResponsibility}
                            className="py-2 px-6  bg-white text-[#B3322F] flex justify-between items-center"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full  gap-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between  mb-6  w-full">
                    <p className="w-full md:w-1/4">Privacy & Independence</p>
                    <div className="w-full md:w-3/4">
                        <DropDownSelector
                            options={["Independent Spirit"]}
                            selected={privacyAndIndependence}
                            onSelect={setPrivacyAndIndependence}
                            className="py-2 px-6  bg-white text-[#B3322F] flex justify-between items-center"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full  gap-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between  mb-6  w-full">
                    <p className="w-full md:w-1/4">Values & Boundaries</p>
                    <div className="w-full md:w-3/4">
                        <DropDownSelector
                            options={["Strong Values"]}
                            selected={valuesAndBoundaries}
                            onSelect={setValuesAndBoundaries}
                            className="py-2 px-6  bg-white text-[#B3322F] flex justify-between items-center"
                        />
                    </div>
                </div>
            </div>


        </div>
    );
};
