import { useState } from "react";

export const CustomSelect: React.FC<{
    options: string[];
    selected: string;
    setSelected: (item: string) => void;
    placeholder?: string;
}> = ({ options, selected, setSelected, placeholder = "No selection yet" }) => {
    const [showAll, setShowAll] = useState(false);

    const displayOptions = showAll ? options : options.slice(0, 5);

    return (
        <div className="space-y-6">
            {/* Selected Item */}
            <div className="flex items-center gap-2 shadow-md shadow-[#D9D9D9] min-h-10 px-4 py-4 mx-auto rounded-4xl bg-white text-sm">
                {selected ? (


                    <div>  {selected}</div>

                ) : (
                    <span className="text-gray-400">{placeholder}</span>
                )}
            </div>

            {/* Option List */}
            <div className="flex flex-col gap-2 shadow-md shadow-[#D9D9D9] px-4 py-4 mx-auto rounded-3xl bg-white text-sm">
                {displayOptions
                    .filter((item) => item !== selected) // hide already selected item
                    .map((item) => (
                        <button
                            key={item}
                            onClick={() => setSelected(item)}
                            className="hover:bg-[#f3f3f3] py-1 px-2 rounded-md text-left text-[#333] transition-all"
                        >
                            {item}
                        </button>
                    ))}
                {options.length > 5 && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-[#B3322F] text-sm font-medium mt-2 underline hover:text-[#8a1d1b] transition cursor-pointer"
                    >
                        {showAll ? "View Less" : "View More"}
                    </button>
                )}
            </div>
        </div>
    );
};
