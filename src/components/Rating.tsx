import React from 'react'

const Rating: React.FC<{
    handleChange: (value: any) => void,
    rating: number,
    className?: string
}> = ({ handleChange, rating, className = "" }) => {
    return (
        <div className={`flex justify-center gap-2 my-4 ${className}`}>
            {[1, 2, 3, 4, 5].map((i) => (
                <button
                    key={i}
                    onClick={() => handleChange(i)}
                    className="focus:outline-none"
                    aria-label={`Rate ${i} star${i > 1 ? 's' : ''}`}
                >
                    <img
                        className="h-6 cursor-pointer hover:scale-110 transition-transform"
                        src={
                            i <= rating
                                ? "/assets/img/search-property/star_fill.svg"
                                : "/assets/img/search-property/start_outline.svg"
                        }
                        alt={`Star ${i}`}
                    />
                </button>
            ))}
        </div>
    );
};

export default Rating