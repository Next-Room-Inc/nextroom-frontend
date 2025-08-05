import { useState } from 'react';
import { NumberInput } from './NumberInput';

const PropertyFilters = () => {
    const [price, setPrice] = useState<number>(1250);
    const [distance, setDistance] = useState<number>(8);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [selectedBeds, setSelectedBeds] = useState<number | null>(null);
    const [selectedBaths, setSelectedBaths] = useState<number | null>(null);
    const [selectedOccupancies, setSelectedOccupancies] = useState<number | null>(null);

    const toggleAmenity = (label: string) => {
        setSelectedAmenities((prev) =>
            prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]
        );
    };

    const amenitiesList = [
        { label: 'Free Parking', icon: 'free_parking.svg' },
        { label: 'Air Conditioning', icon: 'air_conditioning.svg' },
        { label: 'Washer/Dryer', icon: 'washer.svg' },
        { label: 'Dishwasher', icon: 'dishwasher.svg' },
    ];

    // Calculate percentage position
    const getPriceLeftPosition = () => {
        const percentage = ((price - 500) / (2000 - 500)) * 100;
        return `calc(${percentage}% - 24px)`; // Center the label
    };
    const getDistanceLeftPosition = () => {
        const percentage = ((distance - 1) / (50 - 1)) * 100;
        return `calc(${percentage}% - 24px)`; // Center the label
    };

    return (
        <div className="flex lg:flex-row flex-col justify-between gap-2 p-4 space-y-6 text-sm font-medium text-gray-800 mx-auto">
            <div className='md:w-[60%] w-full flex flex-col gap-10'>
                {/* Price Slider */}
                <div className='flex flex-col md:flex-row  md:gap-8 gap-4 md:items-end'>
                    <p className=" md:text-lg text-md md:text-black text-[#B3322F] font-semibold mb-1 md:w-35 text-left">Price</p>
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
                <div className='flex flex-col md:flex-row  md:gap-8 gap-4 md:items-end'>
                    <p className=" md:text-lg text-md md:text-black text-[#B3322F] font-semibold mb-1 md:w-35 text-left">Distance <br className='md:flex hidden' />From Campus</p>
                    <div className="w-full">
                        <div className="flex justify-between text-black font-semibold mb-2">
                            <p>1</p>
                            <p>50</p>
                        </div>

                        <div className="relative w-full">
                            {/* Slider */}
                            <input
                                type="range"
                                className="custom-slider w-full"
                                min={1}
                                max={50}
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
                <div className='flex flex-col md:flex-row  md:gap-8 gap-4 md:items-end'>
                    <p className=" md:text-lg text-md md:text-black text-[#B3322F] font-semibold mb-1 md:w-35 text-left">Amenities</p>
                    <div className="flex flex-wrap gap-4 md:gap-2">
                        {amenitiesList.map((amenity) => {
                            const selected = selectedAmenities.includes(amenity.label);
                            return (
                                <button
                                    key={amenity.label}
                                    onClick={() => toggleAmenity(amenity.label)}
                                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full border shadow-sm ${selected
                                        ? 'bg-[#B3322F] text-white border-[#B3322F]'
                                        : 'bg-white text-black border-gray-300'
                                        }`}
                                >
                                    <span><img src={`/assets/img/search-property/${amenity.icon}`} className='w-4' /></span>
                                    <span>{amenity.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Unit Size */}
                <div className='flex flex-col md:flex-row  md:gap-8 gap-4 md:items-end'>
                    <p className=" md:text-lg text-md md:text-black text-[#B3322F] font-semibold mb-1 md:w-35 text-left">Unit Size</p>
                    <div className="flex flex-col md:flex-row justify-start gap-3  ">
                        <NumberInput label="Beds" value={selectedBeds || 0} onChange={setSelectedBeds} />
                        <NumberInput label="Bathrooms" value={selectedBaths || 0} onChange={setSelectedBaths} />
                        <NumberInput label="Occupancy" value={selectedOccupancies || 0} onChange={setSelectedOccupancies} />
                    </div>
                </div>

                {/* Location */}
                <div className='flex flex-col md:flex-row  md:gap-8 gap-4 md:items-end'>
                    <p className=" md:text-lg text-md md:text-black text-[#B3322F] font-semibold mb-1 md:w-35 text-left">Location</p>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="md:w-50 w-full px-4 py-2 rounded-full shadow-md outline-none"
                    />
                </div>
            </div>
            {/* Buttons */}
            <div className=" lg:w-[20%] md:w-[50%] w-full flex flex-col gap-6">
                <button className=" py-2 md:px-10 bg-[#B3322F] text-white rounded-full font-semibold shadow-md">
                    Update Roommate Preferences
                </button>
                <button className=" py-2 :px-10 bg-[#B3322F] text-white rounded-full font-semibold shadow-md">
                    Search Specific Properties
                </button>
            </div>
        </div>
    )
}

export default PropertyFilters