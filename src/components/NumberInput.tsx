import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

type NumberInputProps = {
    label: string;
    value: number;
    onChange: (val: number) => void;
};

export function NumberInput({ label, value = 0, onChange }: NumberInputProps) {
    const handleIncrement = () => onChange(value + 1);
    const handleDecrement = () => onChange(Math.max(0, value - 1));

    return (
        <div className=" flex items-start justify-center gap-2">
            <div className="text-md text-gray-500   h-full flex items-center w-full">{label}</div>
            <div className="flex items-center rounded-md px-2 py-1  bg-white">
                <button
                    type="button"
                    onClick={handleDecrement}
                    className="p-1 disabled:opacity-30"
                    disabled={value <= 0}
                >
                    <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                </button>
                <span className='w-6 text-center'>{value || "Any"} </span>
                <button type="button" onClick={handleIncrement} className="p-1">
                    <ChevronUpIcon className="w-4 h-4 text-gray-600" />
                </button>
            </div>
        </div>
    );
}
