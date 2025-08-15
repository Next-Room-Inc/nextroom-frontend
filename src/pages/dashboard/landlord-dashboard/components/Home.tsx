import { ChartBarIcon, CurrencyDollarIcon, HomeIcon, UsersIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { motion } from "framer-motion";
import { useState } from 'react';
import { CreditCard, CreditCardForm } from '../../../../components/Card';

const cardIconClass = "  className w-15 md:w-20"
const cards = [
    {
        title: "Property Management",
        icon: <HomeIcon className={cardIconClass} />,
        items: ["Manage Properties", "Add Properties", "Renters", "Service Requests"],
        creditCardOption: false,
    },
    {
        title: "Analytics",
        icon: <ChartBarIcon className={cardIconClass} />,
        items: ["Property Matches", "Tours Booked", "Inquiries"],
        creditCardOption: false,
    },
    {
        title: "Billing",
        icon: <CurrencyDollarIcon className={cardIconClass} />,
        items: ["Lead Spending", "Amount Due"],
        creditCardOption: true,
    },
    {
        title: "User Info & Support",
        icon: <UsersIcon className={cardIconClass} />,
        items: ["Last Login", "Feature Updates", "Support Requests"],
        creditCardOption: false,
    },
];


const Home = () => {
    const [paymentModal, setPaymentModal] = useState(false)


    return (
        <div>
            {/* Payment tabs */}
            <div className="flex flex-col md:flex-row   gap-5">
                {[
                    { label: "Last Payment", value: "April 25, 2025" },
                    { label: "Amount Due", value: "$1,235.98" },
                    { label: "Next Payment", value: "May 25, 2025" },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="flex gap-4 items-center justify-center py-8 px-6 rounded-lg shadow-md bg-white 
                 w-full lg:w-1/3 font-semibold text-center"
                    >
                        <span className="text-[#B3322F]">{item.label}:</span>
                        <span>{item.value}</span>
                    </div>
                ))}
            </div>

            {/* cards*/}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6  ">
                {cards.map((card, i) => (
                    <div key={i}  >
                        {/* Title */}
                        <h2 className="text-[#B3322F] font-semibold mb-4 text-lg text-center md:text-left">{card.title}</h2>

                        {/* Card */}
                        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden p-5">
                            {/* Icon */}
                            <div className="flex items-center justify-center bg-[#B3322F] text-white text-4xl w-full py-5 md:w-2/4   rounded-xl">
                                {card.icon}
                            </div>

                            {/* Content */}
                            <div className="flex flex-col justify-between md:min-h-40 text-center md:text-left py-4 md:py-0 md:px-5 ">
                                <div className="flex flex-col  gap-2 md:gap-5  text-sm md:text-base ">
                                    {card.items.map((item, index) => (
                                        <motion.span
                                            key={index}
                                            className="font-semibold text-gray-900 cursor-pointer" // default text color, adjust as needed
                                            whileHover={{ color: "#B3322F", zoom: 1.05 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            {item}
                                        </motion.span>
                                    ))}
                                </div>
                                {card?.creditCardOption && <div className=''>
                                    <motion.div
                                        whileHover={{ color: "#B3322F", zoom: 1.05 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className='text-[#B3322F] underline text-sm mt-2 cursor-pointer'
                                        onClick={() => setPaymentModal(true)}>

                                        Add/Update Credit Card Info
                                    </motion.div >

                                    {/* Payment Card Modal*/}
                                    {paymentModal && <motion.div
                                        key="dropdown"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute left-0 right-0 z-100"
                                    ><PaymentDetailsForm  {...{ paymentModal, setPaymentModal }} /></motion.div>}
                                </div >}

                            </div>


                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default Home



const PaymentDetailsForm: React.FC<{
    paymentModal: boolean;
    setPaymentModal: (value: boolean) => void;
}> = ({ setPaymentModal }) => {
    const [cardNumber, setCardNumber] = useState("1234 5678 7890 2077");
    const [name, setName] = useState("John Smith");
    const [expiryDate, setExpiryDate] = useState("07/28");
    const [securityCode, setSecurityCode] = useState("123");

    const handleSubmit = () => {
        setPaymentModal(false);
    };

    return (
        <div className="relative w-fit bg-white p-10 shadow-2xl rounded-2xl">
            <XMarkIcon
                className="w-5 absolute right-5 top-5 cursor-pointer"
                onClick={() => setPaymentModal(false)}
            />
            <h1 className="text-center font-semibold text-xl mb-5">Payment Details</h1>

            {/* Card Display */}
            <CreditCard
                cardNumber={cardNumber}
                name={name}
                expiryDate={expiryDate}
            />

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
    );
};

