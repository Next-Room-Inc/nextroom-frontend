import { motion } from 'framer-motion';


export const PrimaryButton: React.FC<{
    selected?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    icon?: string | null;
    className?: string;
    button?: boolean;
    color?: 'red' | 'black'
    // type?: "button" | "submit" | "reset";
}
> = ({
    children = '',
    onClick = () => { },
    icon = null,
    className = '',
    color = 'red'
}) => {
        const buttonColors = {
            'red': 'bg-[#B3322F] hover:bg-black',
            'black': 'hover:bg-[#B3322F] bg-black'
        }
        const bgColor = buttonColors[color]

        return (
            <motion.button
                onClick={onClick}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={` ${className} px-10  text-center py-2 text-white rounded-full flex items-center justify-center ${bgColor} ${icon ? 'gap-2' : ''} `}
            >
                {children}
                {icon && <img src={icon} alt="" className="h-3 mt-1.5" />}
            </motion.button>
        )
    };



 export    const HousingCard: React.FC<{
        title: string;
        imageUrl: string;
        location: string;
        type: string;
        priceRange: string;
        matchPercent: string;
        statusText?: string;
        bgClass?: string; // Tailwind background class (e.g., bg-gradient-to-r from-red-500 to-red-800)
    }> = ({
        title,
        imageUrl,
        location,
        type,
        priceRange,
        matchPercent,
        statusText = 'Ready To Move In',
        bgClass = 'bg-gradient-to-r from-[#B3322F] to-[#4D1614]', // default if not provided
    }) => {
            return (
                <div
                    className={`md:flex rounded-xl shadow-md overflow-hidden relative p-6 mx-5 mt-12 text-white ${bgClass}`}
                >
                    {/* Like Icon */}
                    <img
                        src="/assets/img/search-property/heartinner.svg"
                        alt="Like"
                        className="h-5 absolute md:top-4 md:right-5 right-10 top-10 z-50"
                    />
    
                    {/* Image section */}
                    <div className="relative w-full md:w-1/4">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-48 object-cover rounded-2xl"
                        />
                        <div className="absolute bottom-2 left-4 bg-[#B3322F]/80 text-white text-xs font-semibold px-3 py-1 rounded-sm shadow">
                            {statusText}
                        </div>
                    </div>
    
                    {/* Content section */}
                    <div className="w-full md:w-1/2 md:pl-6 md:mt-0 mt-6 flex flex-col justify-center">
                        <div className="flex md:justify-start justify-between items-start">
                            <h2 className="md:text-2xl text-xl font-semibold">{title}</h2>
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
                                {type}
                            </p>
                            <p className="flex items-start font-semibold">
                                <img
                                    src="/assets/img/search-property/dollar_icon.svg"
                                    className="h-4 w-4 mt-1.5 mr-2"
                                    alt="Dollar Icon"
                                />
                                {priceRange} <span className="ml-1 font-normal">/month</span>
                            </p>
                        </div>
                    </div>
                </div>
            );
        };