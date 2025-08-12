import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface MultiSelectProps {
    options: string[];
    selected: string[];
    setSelected: (item: any) => void;
    placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
    options,
    selected,
    setSelected,
    placeholder = "No selection yet",
}) => {
    const [showAll, setShowAll] = useState(false);

    const filteredOptions = options.filter((item) => !selected.includes(item));
    const onSelect = (item: string) => setSelected((prev: any) => [...prev, item]);
    const onDeselect = (item: string) => setSelected((prev: any) => prev.filter((i: any) => i !== item));

    // Limit displayed options if showAll is false
    const displayOptions = showAll ? filteredOptions : filteredOptions.slice(0, 5);

    return (
        <div className="space-y-6">
            {/* Selected Items */}
            <div className="flex flex-wrap gap-2 shadow-md shadow-[#D9D9D9] min-h-10 px-4 py-4 mx-auto rounded-4xl bg-white">
                {selected.length === 0 && (
                    <span className="text-gray-400 text-sm">{placeholder}</span>
                )}
                <AnimatePresence>
                    {selected.map((item) => (
                        <motion.div
                            key={item}
                            className="bg-[#B3322F] text-white px-3 py-1 rounded-full text-xs flex items-center gap-2"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                        >
                            <span
                                className="font-bold text-white cursor-pointer"
                                onClick={() => onDeselect(item)}
                            >
                                ×
                            </span>
                            {item}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Option List (Single Column) */}
            <div className="flex flex-col gap-2 text-left shadow-md shadow-[#D9D9D9] px-4 py-4 mx-auto rounded-3xl bg-white text-sm">
                {displayOptions.map((item) => (
                    <button
                        key={item}
                        onClick={() => onSelect(item)}
                        className="hover:bg-[#f3f3f3] py-1 px-2 rounded-md text-left text-[#333] transition-all"
                    >
                        {item}
                    </button>
                ))}
                {filteredOptions.length > 5 && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-[#B3322F] text-sm font-medium mt-2 underline hover:text-[#8a1d1b] transition cursor-pointer"
                    >
                        {showAll ? 'View Less' : 'View More'}
                    </button>
                )}
            </div>
        </div>
    );
};
interface MultiSelectWithIdsProps {
    idToValueMapping: Record<string, string>
    options: string[];
    selected: string[];
    setSelected: (item: any) => void;
    placeholder?: string;
}

export const MultiSelectWithIds: React.FC<MultiSelectWithIdsProps> = ({
    options,
    selected,
    setSelected,
    placeholder = "No selection yet",
    idToValueMapping = {}
}) => {
    const [showAll, setShowAll] = useState(false);
    console.log("idToValueMapping===>", idToValueMapping)
    const filteredOptions = options.filter((item) => !selected.includes(item));
    const onSelect = (item: string) => setSelected((prev: any) => [...prev, item]);
    const onDeselect = (item: string) => setSelected((prev: any) => prev.filter((i: any) => i !== item));

    // Limit displayed options if showAll is false
    const displayOptions = showAll ? filteredOptions : filteredOptions.slice(0, 5);

    return (
        <div className="space-y-6">
            {/* Selected Items */}
            <div className="flex flex-wrap gap-2 shadow-md shadow-[#D9D9D9] min-h-10 px-4 py-4 mx-auto rounded-4xl bg-white">
                {selected.length === 0 && (
                    <span className="text-gray-400 text-sm">{placeholder}</span>
                )}
                <AnimatePresence>
                    {selected.map((item) => (
                        <motion.div
                            key={item}
                            className="bg-[#B3322F] text-white px-3 py-1 rounded-full text-xs flex items-center gap-2"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                        >
                            <span
                                className="font-bold text-white cursor-pointer"
                                onClick={() => onDeselect(item)}
                            >
                                ×
                            </span>
                            {idToValueMapping[item]}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Option List (Single Column) */}
            <div className="flex flex-col gap-2 text-left shadow-md shadow-[#D9D9D9] px-4 py-4 mx-auto rounded-3xl bg-white text-sm">
                {displayOptions.map((item) => (
                    <button
                        key={item}
                        onClick={() => onSelect(item)}
                        className="hover:bg-[#f3f3f3] py-1 px-2 rounded-md text-left text-[#333] transition-all"
                    >
                        {idToValueMapping[item]}
                    </button>
                ))}
                {filteredOptions.length > 5 && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-[#B3322F] text-sm font-medium mt-2 underline hover:text-[#8a1d1b] transition cursor-pointer"
                    >
                        {showAll ? 'View Less' : 'View More'}
                    </button>
                )}
            </div>
        </div>
    );
};