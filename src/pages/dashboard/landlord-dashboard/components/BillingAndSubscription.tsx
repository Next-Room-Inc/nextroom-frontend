import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '../../../../components/Button';
import { CreditCard, CreditCardForm } from '../../../../components/Card';

const options = [
    "Billing",
    "Update Payment Details",
    "My Subscription",
];



const BillingAndSubscription = () => {


    const [selectedOption, setsSelectedOption] = useState(options[0])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)


    return (
        <div>
            <div className=' flex flex-col md:flex-row gap-4 my-5'>
                <div className='hidden lg:flex w-full md:w-1/4 flex-col px-4 py-4 bg-white shadow-xl rounded-2xl'>
                    {
                        options.map(option =>
                            <div
                                className={`${selectedOption === option ? "bg-[#B3322F] text-white" : "text-black"} rounded-full px-4 py-2 my-2 cursor-pointer font-semibold`}
                                onClick={() => setsSelectedOption(option)}
                            >
                                {option}</div>
                        )
                    }
                </div>

                <div className="flex lg:hidden -mt-5 relative w-full ">
                    {/* Toggle Button */}
                    <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="text-center flex items-center justify-center bg-[#B3322F] text-white shadow-md px-5 py-3 w-full rounded-full text-sm font-medium cursor-pointer relative"
                    >
                        {selectedOption} <ChevronDownIcon className='h-7 ml-2 mt-1 text-white' />
                    </div>

                    {/* Dropdown */}
                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                key="dropdown"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute left-0 right-0 top-8 mt-2 mx-6 bg-white shadow-xl rounded-2xl px-5 py-4 text-sm z-40"
                            >
                                {options.map((tab) => (
                                    <div
                                        key={tab}
                                        className={`text-center py-2 cursor-pointer hover:text-[#B3322F] ${selectedOption === tab ? "text-[#B3322F] font-semibold" : ""
                                            }`}
                                        onClick={() => {
                                            setsSelectedOption(tab);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        {tab}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>



                </div>
                <div className='w-full md:w-3/4 bg-white shadow-xl rounded-2xl min-h-[60vh] p-8'>
                    {selectedOption === options[0] && <BillingComponent />}
                    {selectedOption === options[1] && <UpdatePaymentDetailsComponent />}
                    {selectedOption === options[2] && <MySubscriptionComponent />}
                </div>
            </div>
        </div>
    )
}

export default BillingAndSubscription


const BillingComponent = () => {
    const subscriptions = [
        { name: "Amount Due:", price: 1342.98, activated: true, viewDetails: false, payBills: false },
        { name: "Due Date:", date: "May 25,2025", activated: false, viewDetails: false, payBills: true },
        { name: "Lead Spends to Date", price: 3450, activated: false, viewDetails: true, payBills: false }
    ];

    const ActionButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void; }) => (
        <button onClick={onClick} className="bg-[#B3322F] text-white py-2 px-4 rounded-full hover:bg-[#992824] transition w-full max-w-[200px]"  >
            {children}
        </button>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptions.map((subscription, idx) => (
                <div
                    key={idx}
                    className="p-6 text-center shadow-sm rounded-2xl flex flex-col items-center"
                >
                    <h1 className="text-[#B3322F] text-xl">{subscription.name}</h1>
                    {subscription.price && <h1 className="text-[#B3322F] my-5">
                        {subscription.price}
                    </h1>}
                    {subscription.date && <h1 className="text-[#B3322F] my-5">
                        {subscription.date}
                    </h1>}

                    <div className="flex flex-col gap-3 mt-6 w-full items-center">
                        {subscription.activated && (
                            <>
                                <ActionButton>View Current Bill</ActionButton>
                                <ActionButton>View Past Bills</ActionButton>
                            </>
                        )}

                        {subscription.payBills && <ActionButton>Pay Bills</ActionButton>}

                        {subscription.viewDetails && <ActionButton>View Details</ActionButton>}
                    </div>

                </div>
            ))}
        </div>
    );
}

const UpdatePaymentDetailsComponent = () => {
    const [cardNumber, setCardNumber] = useState("1234 5678 7890 2077");
    const [name, setName] = useState("John Smith");
    const [expiryDate, setExpiryDate] = useState("07/28");
    const [securityCode, setSecurityCode] = useState("123");

    const handleSubmit = () => { }
    return (
        <div className=" ">
            <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-1/2 md:border-r-1 border-gray-300  flex  items-center justify-center'>
                    {/* Card Display */}
                    <div className='w-full md:w-[80%]  '>
                        <CreditCard
                            cardNumber={cardNumber}
                            name={name}
                            expiryDate={expiryDate}
                        />
                        <p className='text-[#B3322F] text-md text-left w-full mt-3 cursor-pointer underline'>+ Add New Card</p>
                    </div>
                </div>
                <div className='w-full md:w-1/2 md:px-5'>
                    {/* Form */}
                    <CreditCardForm
                        cardNumber={cardNumber}
                        setCardNumber={setCardNumber}
                        name={name}
                        setName={setName}
                        expiryDate={expiryDate}
                        setExpiryDate={setExpiryDate}
                        securityCode={securityCode}
                        setSecurityCode={setSecurityCode}
                        onSubmit={handleSubmit}
                    />

                </div>
            </div>



        </div>
    );
};

const MySubscriptionComponent = () => {
    const subscriptions = [
        { name: "Subscription Tier", price: null, activated: true },
        { name: "Monthly Payment", price: 25.99, activated: false },
        { name: "Amount Owing", price: 0, activated: false }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptions.map((subscription, idx) => (
                <div
                    key={idx}
                    className="p-6 text-center shadow-sm rounded-2xl flex flex-col items-center"
                >
                    <h1 className="text-[#B3322F] text-xl">{subscription.name}</h1>
                    <h1 className="text-[#B3322F] my-5">
                        {subscription.price ? `$${subscription.price}` : "Standard"}
                    </h1>

                    {subscription.activated ? (
                        <div className="flex flex-col gap-4 w-full max-w-[200px]">
                            <Button className="bg-[#B3322F] text-white py-2 rounded-full">
                                Upgrade
                            </Button>
                            <Button className="bg-[#B3322F] text-white py-2 rounded-full">
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <Button className="bg-[#B3322F] text-white py-2 rounded-full w-full max-w-[200px]">
                            View Bill
                        </Button>
                    )}
                </div>
            ))}
        </div>
    );
};

