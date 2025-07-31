import React from 'react';
import { IMAGES } from '../../../utils/constants/app-info.constant';
import { BuildingOfficeIcon, MapPinIcon } from '@heroicons/react/20/solid';

const housingDetails = [
    {
        name: 'Alma',
        propertyName: 'ByWard Market',
        imageUrl:
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        location: '256 Rideau St, Ottawa, ON K1N 0G1',
        type: 'Apartment',
        rentMin: 1350,
        rentMax: 1350,
        matchPercent: '96',
    },
    {
        name: 'Alma',
        propertyName: 'ByWard Market',
        imageUrl:
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        location: '256 Rideau St, Ottawa, ON K1N 0G1',
        type: 'Apartment',
        rentMin: 1350,
        rentMax: 1350,
        matchPercent: '96',
    },
    {
        name: 'Alma',
        propertyName: 'ByWard Market',
        imageUrl:
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        location: '256 Rideau St, Ottawa, ON K1N 0G1',
        type: 'Apartment',
        rentMin: 1350,
        rentMax: 1350,
        matchPercent: '96',
    },
    {
        name: 'Alma',
        propertyName: 'ByWard Market',
        imageUrl:
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        location: '256 Rideau St, Ottawa, ON K1N 0G1',
        type: 'Apartment',
        rentMin: 1350,
        rentMax: 1350,
        matchPercent: '96',
    },
]

const Explore = () => {
    return (
        <div className="py-6">
            <h1 className="text-black text-2xl mb-6 mx-4 font-semibold">Results</h1>
            {housingDetails.map((details, idx) => (
                <ExploreHousingCard key={idx} {...details} />
            ))}
        </div>
    )
}

export default Explore

interface ExploreHousingCardProps {
    name: string
    propertyName: string
    imageUrl: string
    location: string
    type: string
    rentMin: number
    rentMax: number
    bgClass?: string
    statusText?: string
    selected?: boolean
}

export const ExploreHousingCard: React.FC<ExploreHousingCardProps> = ({
    name,
    propertyName,
    imageUrl,
    location,
    type,
    rentMin,
    rentMax,
    statusText = 'Pending Full Occupancy',
    bgClass = 'bg-white ',
    selected = false,
}) => {
    return (
        <div
            className={`z-10 md:flex ${selected ? 'rounded-tr-xl rounded-tl-xl' : 'rounded-xl'} shadow-md overflow-hidden relative p-6 mx-4 mt-6 text-black ${bgClass}`}
        >
            {/* Image */}
            < div className="relative w-full md:w-1/4" >
                <img
                    src={imageUrl || IMAGES.NOT_FOUND}
                    alt={`${name} @${propertyName}`}
                    className="w-full h-48 object-cover rounded-2xl"
                />
                <div className="absolute bottom-2 left-4 bg-[#B3322F]/80 text-white text-xs font-semibold px-3 py-1 rounded-sm shadow">
                    {statusText}
                </div>
            </div >


            {/* Details */}
            < div className="w-full md:w-1/2 md:pl-6 mt-6 md:mt-0 flex flex-col justify-center" >
                <div className="flex justify-between items-start">
                    <h2 className="md:text-2xl text-xl font-semibold">
                        {name} @ {propertyName}
                    </h2>
                </div>

                <div className="mt-5 space-y-2 md:text-lg text-md">
                    <p className="flex items-start">
                        {/* <img
                            src="/assets/img/search-property/location_icon.svg"
                            alt="Location Icon"
                            className="h-4 w-4 mt-1.5 mr-2"
                        /> */}
                        <MapPinIcon className="h-5 mt-0.5 mr-2" />
                        {location}
                    </p>
                    <p className="flex items-start">
                        {/* <img
                            src="/assets/img/search-property/building_icon.svg"
                            alt="Building Icon"
                            className="h-4 w-4 mt-1.5 mr-2"
                        /> */}
                        <BuildingOfficeIcon className="h-5 mt-1 mr-2" />
                        {type}
                    </p>
                    <p className="flex items-start font-semibold">
                        ${rentMin} - ${rentMax}
                        <span className="ml-1 font-normal">/month</span>
                    </p>
                </div>
            </div >
        </div >
    )
}