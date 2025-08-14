import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Button } from "./Button";


export const CreditCard: React.FC<{
    cardNumber: string;
    name: string;
    expiryDate: string;
}> = ({ cardNumber, name, expiryDate }) => {
    return (
        <div className="bg-gradient-to-b from-[#B3322F] to-[#4D1614] p-6 rounded-2xl text-white w-full max-w-sm">
            <img
                alt="Visa Logo"
                src="/assets/img/logo/visalogo.svg"
                className="h-7 mb-8"
            />
            <h1 className="text-xs">Card Number</h1>
            <h1 className="text-md flex mt-2">
                {cardNumber
                    .replace(/\s+/g, "")
                    .replace(/\d(?=\d{4})/g, "*")
                    .match(/.{1,4}/g)
                    ?.map((group, i) => (
                        <span key={i} className="pr-4">
                            {group}
                        </span>
                    ))}
            </h1>
            <div className="flex justify-between text-xs mt-8 mr-5">
                <div>{name}</div>
                <div>
                    <h1>Expiry Date</h1>
                    <h1>{expiryDate}</h1>
                </div>
            </div>
        </div>
    );
};



export const CreditCardForm: React.FC<{
    cardNumber: string;
    setCardNumber: (val: string) => void;
    name: string;
    setName: (val: string) => void;
    expiryDate: string;
    setExpiryDate: (val: string) => void;
    securityCode: string;
    setSecurityCode: (val: string) => void;
    onSubmit: () => void;
}> = ({
    cardNumber,
    setCardNumber,
    name,
    setName,
    expiryDate,
    setExpiryDate,
    securityCode,
    setSecurityCode,
    onSubmit
}) => {
        const formatCardNumber = (value: string) => {
            const digits = value.replace(/\D/g, "").slice(0, 16);
            return digits.replace(/(.{4})/g, "$1 ").trim();
        };

        const handleExpiryDateChange = (value: string) => {
            let cleaned = value.replace(/[^\d/]/g, "");
            if (cleaned.length === 2 && !cleaned.includes("/")) {
                cleaned += "/";
            }
            if (cleaned.length > 5) cleaned = cleaned.slice(0, 5);
            setExpiryDate(cleaned);
        };

        const handleSecurityCodeChange = (value: string) => {
            const digits = value.replace(/\D/g, "").slice(0, 3);
            setSecurityCode(digits);
        };

        return (
            <form className="mt-8 max-w-sm" onSubmit={(e) => e.preventDefault()}>
                {/* Card Number */}
                <label className="block text-sm text-gray-500 dark:text-white mt-2">
                    Card Number
                </label>
                <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="peer block w-full px-3 py-1.5 text-gray-900 placeholder:text-gray-500 focus:outline-none sm:text-sm dark:bg-white/5 dark:text-white"
                />
                <div aria-hidden="true" className="border-b border-gray-300 peer-focus:border-b-2 dark:border-white/20" />

                {/* Name on Card */}
                <label className="block text-sm text-gray-500 dark:text-white mt-4">
                    Name On Card
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Smith"
                    className="peer block w-full px-3 py-1.5 text-gray-900 placeholder:text-gray-500 focus:outline-none sm:text-sm dark:bg-white/5 dark:text-white"
                />
                <div aria-hidden="true" className="border-b border-gray-300 peer-focus:border-b-2 dark:border-white/20" />

                <div className="flex gap-4 mt-4">
                    {/* Expiry Date */}
                    <div className="flex-1">
                        <label className="block text-sm text-gray-500 dark:text-white">
                            Expiry Date (MM/YY)
                        </label>
                        <input
                            type="text"
                            value={expiryDate}
                            onChange={(e) => handleExpiryDateChange(e.target.value)}
                            placeholder="07/28"
                            maxLength={5}
                            className="peer block w-full px-3 py-1.5 text-gray-900 placeholder:text-gray-500 focus:outline-none sm:text-sm dark:bg-white/5 dark:text-white"
                        />
                        <div aria-hidden="true" className="border-b border-gray-300 peer-focus:border-b-2 dark:border-white/20" />
                    </div>

                    {/* Security Code */}
                    <div className="flex-1">
                        <label className="flex items-center gap-1 text-sm text-gray-500 dark:text-white">
                            Security Code
                            <QuestionMarkCircleIcon className="w-4 text-gray-500" />
                        </label>
                        <input
                            type="text"
                            value={securityCode}
                            onChange={(e) => handleSecurityCodeChange(e.target.value)}
                            placeholder="123"
                            maxLength={3}
                            className="peer block w-full px-3 py-1.5 text-gray-900 placeholder:text-gray-500 focus:outline-none sm:text-sm dark:bg-white/5 dark:text-white"
                        />
                        <div aria-hidden="true" className="border-b border-gray-300 peer-focus:border-b-2 dark:border-white/20" />
                    </div>
                </div>

                <div className="text-center mt-10">
                    <Button
                        className="bg-[#B3322F] text-white px-25 py-3 rounded-full mx-auto"
                        onClick={onSubmit}
                    >
                        Save
                    </Button>
                </div>
            </form>
        );
    };

