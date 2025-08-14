import React, { useState } from 'react'
import { Button, PrimaryButton } from '../../../../components/Button';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { AnimatePresence, motion } from 'framer-motion';
import Select from '../../../../components/Select';
import { IMAGES } from '../../../../utils/constants/app-info.constant';
import NewPropertyForm from './common/NewPropertyForm';


const demoProperties = [
    {
        title: "Cozy Apartment",
        property: {
            propertyName: "Sunset Towers",
            structureType: "Apartment",
        },
        propertyDetails: {
            name: "Unit 12B",
            rentMin: 1200,
            rentMax: 1500,
        },
        location: "Downtown, Cityville",
        type: "Rent",
        priceRange: "$1200 - $1500",
        matchPercent: "85%",
        statusText: "Ready To Move In",
        bgClass: "bg-gradient-to-r from-[#B3322F] to-[#4D1614]",
        index: 0,
    },
    {
        title: "Modern Condo",
        property: {
            propertyName: "Skyline Residences",
            structureType: "Condo",
        },
        propertyDetails: {
            name: "Unit 5A",
            rentMin: 1800,
            rentMax: 2100,
        },
        location: "Uptown, Cityville",
        type: "Rent",
        priceRange: "$1800 - $2100",
        matchPercent: "90%",
        statusText: "Available Now",
        bgClass: "bg-gradient-to-r from-blue-500 to-blue-800",
        index: 1,
    },
    {
        title: "Spacious Townhouse",
        property: {
            propertyName: "Maple Grove",
            structureType: "Townhouse",
        },
        propertyDetails: {
            name: "Unit 3",
            rentMin: 2200,
            rentMax: 2500,
        },
        location: "Suburbs, Cityville",
        type: "Rent",
        priceRange: "$2200 - $2500",
        matchPercent: "78%",
        statusText: "New Listing",
        bgClass: "bg-gradient-to-r from-green-500 to-green-700",
        index: 2,
    },
];

const ManageProperties = () => {
    const tabOptions = ["Active (5)", "Drafts (3)", "Archived (2)"];
    const [selectedTab, setSelectedTab] = useState<string | number | null>(tabOptions[0])

    return (
        <div>
            {/* Status Button */}
            <div className='hidden md:flex gap-3 mt-8'>
                {tabOptions.map((status) => (<PrimaryButton
                    color={status !== selectedTab ? "disabled" : 'red'}
                    className="w-60 py-3 text-xs"
                    onClick={() => setSelectedTab(status)}
                >
                    {status}
                </PrimaryButton>))}
            </div>

            <div className='mx-5'>
                {/* Properties Card */}

                <PropertyCard />
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4">
                    <span className="font-medium">Filter By:</span>
                    <Filters />
                </div>
            </div>
            {/* Properties */}
            <div className='pb-10'>
                {demoProperties.map((propertyData) => (
                    <PropertyUnitCard
                        key={propertyData.index}
                        title={propertyData.title}
                        property={propertyData.property}
                        propertyDetails={propertyData.propertyDetails}
                        location={propertyData.location}
                        type={propertyData.type}
                        priceRange={propertyData.priceRange}
                        matchPercent={propertyData.matchPercent}
                        statusText={propertyData.statusText}
                    />
                ))}
            </div>

            <div className='mx-5'>
                {/* Properties Card */}

                <PropertyCard />
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4">
                    <span className="font-medium">Filter By:</span>
                    <Filters />
                </div>
            </div>
            {/* Properties */}
            <div className='mb-10'>


                {demoProperties.map((propertyData) => (
                    <PropertyUnitCard
                        key={propertyData.index}
                        title={propertyData.title}
                        property={propertyData.property}
                        propertyDetails={propertyData.propertyDetails}
                        location={propertyData.location}
                        type={propertyData.type}
                        priceRange={propertyData.priceRange}
                        matchPercent={propertyData.matchPercent}
                        statusText={propertyData.statusText}
                    />
                ))}
            </div>


            {/* Add Property Button */}
            <div className='text-center mt-5 mx-5'>
                <Button className='bg-black text-white rounded-full py-2 px-6 mx-auto w-full md:w-fit'>
                    + Add New Property
                </Button>
            </div>



            {/* Toggle */}
            <div className='flex tiems-center justify-center mt-4'>
                <div className="group relative inline-flex w-60 shrink-0 rounded-full h-10 shadow-sm bg-white p-0.5 outline-offset-2 outline-[#B3322F] transition-colors duration-200 ease-in-out dark:bg-white/5">
                    {/* Toggle background */}
                    <span className="absolute top-0.5 bottom-0.5 left-0.5 w-[50%] h-10 rounded-full bg-[#B3322F] shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-[100%]" />

                    {/* Labels */}
                    <div className="relative flex w-full items-center justify-between px-3 text-sm font-medium">
                        <span className="transition-colors duration-200 ease-in-out pl-3 group-has-checked:text-black group-has-not-checked:text-white">
                            Preview ON
                        </span>
                        <span className="transition-colors duration-200 ease-in-out pr-2 group-has-not-checked:text-black group-has-checked:text-white">
                            Preview OFF
                        </span>
                    </div>

                    {/* Hidden checkbox */}
                    <input
                        name="setting"
                        type="checkbox"
                        aria-label="Use setting"
                        className="absolute inset-0 appearance-none cursor-pointer"
                    />
                </div>
            </div>


            <NewPropertyForm />
        </div>

    )
}

export default ManageProperties



type Property = {
    propertyName: string;
    structureType: string;
};

type PropertyDetails = {
    name: string;
    rentMin: number;
    rentMax: number;
};


const PropertyUnitCard: React.FC<{
    title: string;
    property: Property;
    propertyDetails: PropertyDetails;
    location: string;
    type: string;
    priceRange: string;
    bgClass?: string; // Tailwind background class (e.g., bg-gradient-to-r from-red-500 to-red-800)
    setSelected: (value: number | null) => void
}> = ({
    property,
    propertyDetails,
    title,
    location,
    bgClass = 'bg-gradient-to-r from-[#B3322F] to-[#4D1614]',
}) => {


        return (
            <div>
                <div
                    className={`z-10 md:flex rounded-xl shadow-md overflow-hidden relative p-6 mx-5 mt-12 text-white ${bgClass}`}
                >

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
                        <div className="absolute top-2 left-4 bg-[#57AF4F]/80 text-white text-xs font-semibold px-10 py-2 rounded-lg shadow">
                            Published
                        </div>
                    </div>

                    {/* Content section */}
                    <div className="w-full md:w-3/4 md:pl-6 md:mt-0 mt-6 flex flex-col md:flex-row gap-3 justify-between ">
                        <div className=' flex flex-col justify-center'>
                            <div className="flex md:justify-start justify-between items-start">
                                <h2 className="md:text-2xl text-xl font-semibold">{propertyDetails.name} @{property.propertyName}</h2>

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
                                <p className="flex items-start">
                                    <img
                                        src="/assets/img/logo/scale-ruler.svg"
                                        className="h-4 w-4 mt-1.5 mr-2"
                                        alt="Building Icon"
                                    />
                                    975 sqft
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 justify-center'>
                            <Button className='text-[#B3322F] bg-white px-8 py-2 rounded-full'>Edit</Button>
                            <Button className='text-[#B3322F] bg-white px-8 py-2 rounded-full'>Archive</Button>
                            <Button className='text-[#B3322F] bg-white px-8 py-2 rounded-full'>Delete</Button>
                            <p className='text-sm'><span className='font-semibold'>Last Synced:</span> July 3 2025 2:04 am </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }





const Filters = () => {
    const options = [
        { value: "last_synced", name: "Last Synced" },
        { value: "last_added", name: "Last Added" },
        { value: "last_edited", name: "Last Edited" },
    ];

    const [selected, setSelected] = useState(0);

    return (
        <Select
            options={options}
            selectedIndex={selected}
            onChange={setSelected}
            className="w-full md:w-auto"
        />
    );
};


const PropertyCard = () => {
    return (
        <div
            className='my-6 rounded-2xl md:rounded-xl shadow-md bg-white flex flex-col md:flex-row overflow-hidden'>
            <div className={` md:bg-[url('/assets/img/events/event_1.png')] bg-[url('/assets/img/events/event_1_mobile.png')] bg-center bg-cover h-60 md:w-[50%] `}>

            </div>
            <div className='bg-white text-[#B3322F] md:h-60 h-30 md:w-[50%] flex justify-center items-center text-center'>
                <div>
                    <div className='text-2xl md:text-3xl font-bold'>Alma Properties</div>
                    <Button
                        className="bg-[#B3322F] text-white py-3 px-20 rounded-full mt-3"
                    >
                        Edit
                    </Button>
                </div>
            </div>
        </div>
    )
}


