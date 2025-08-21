import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Button } from '@src/components/Button';
import { ProfilePhotoUploader } from '@src/components/ProfilePhotoUploader';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const options = [
    "Company Profile",
    "Integration Management",
];

const Setting = () => {

    const [selectedOption, setsSelectedOption] = useState(options[0])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    return (
        <div>
            <div className=' flex flex-col md:flex-row gap-4 my-5'>
                <div className='hidden lg:flex w-full md:w-1/4 flex-col px-4 py-4 bg-white shadow-xl rounded-2xl'>
                    {
                        options.map(option =>
                            <div
                                className={`${selectedOption === option ? "bg-[#B3322F] text-white" : "text-black"} rounded-full px-4 py-2 my-2  font-semibold`}
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
                        className="text-center flex items-center justify-center bg-[#B3322F] text-white shadow-md px-5 py-3 w-full rounded-full text-sm font-medium  relative"
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
                                        className={`text-center py-2  hover:text-[#B3322F] ${selectedOption === tab ? "text-[#B3322F] font-semibold" : ""
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
                    {selectedOption === options[0] && <CompanyProfile />}
                    {selectedOption === options[1] && <IntegrationManagement />}
                </div>
            </div>
        </div>
    )
}

export default Setting

const inputClass = `block w-full md:w-2/4 rounded-full mx-auto  drop-shadow-md shadow-lg bg-white px-3 py-2 text-base text-gray-900 outline  placeholder:text-gray-400 sm:text-sm/6`;

const CompanyProfile = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);

    return (
        <div>
            <ProfilePhotoUploader profileImage={profileImage} setProfileImage={setProfileImage} />


            <div className='flex gap-5 flex-col my-5'>
                <input
                    placeholder={`Company Name`}
                    id="email"
                    name="email"
                    type="email"
                    className={`${inputClass} outline-white`}
                />
                <input
                    placeholder={`Domain `}
                    id="email"
                    name="email"
                    type="email"
                    className={`${inputClass} outline-white`}
                />
                <input
                    placeholder={`Primary Contact Name`}
                    id="email"
                    name="email"
                    type="email"
                    className={`${inputClass} outline-white`}
                />
                <input
                    placeholder={`Email`}
                    id="email"
                    name="email"
                    type="email"
                    className={`${inputClass} outline-white`}
                />
                <input
                    placeholder={`Phone Number`}
                    id="email"
                    name="email"
                    type="email"
                    className={`${inputClass} outline-white`}
                />
                <input
                    placeholder={`Title`}
                    id="email"
                    name="email"
                    type="email"
                    className={`${inputClass} outline-white`}
                />
            </div>
            {/*  */}
            <div className="text-center mt-15 px-5">
                <img
                    alt="Warning Icon"
                    src="/assets/img/icons/warningicon.svg"
                    className="h-16 mx-auto mb-5"
                />



                <p className="mx-auto w-full md:w-[50%] xl:w-[60%] text-sm md:text-base">
                    Once your domain has been successfully verified, it will be locked.
                    Any subsequent changes will require re-verification. If re-verification is not possible,
                    please contact us at <span className='font-bold'>info@nextroom.ca</span> immediately for assistance.
                </p>
            </div>
        </div>
    )
}
const IntegrationManagement = () => {
    const companies = ["Entrata", "Yardi", "Buildium"]
    const statuses = ["Active", "Expired", "Pending"]
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    const [status, setStatus] = useState<string>(statuses[0]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [recheck, setRecheck] = useState<boolean>(true);
    const toggleAmenity = (label: string) => {
        setSelectedCompanies((prev) =>
            prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]
        );
    };

    return (
        <div>

            <div className=' flex flex-col gap-5 '>
                <div>
                    <p className='font-semibold mb-4'>Connected Services</p>
                    <div className="flex flex-wrap gap-4 md:gap-5">
                        {companies.map((company) => {
                            const selected = selectedCompanies.includes(company);
                            return (
                                <Button
                                    key={company}
                                    onClick={() => toggleAmenity(company)}
                                    className={`flex items-center gap-4 px-3 w-full md:w-1/4 justify-center py-1.5 rounded-full border shadow-sm ${selected
                                        ? 'bg-[#57AF4F] text-white border-[#57AF4F]'
                                        : 'bg-[#D9D9D9] text-white border-gray-300'
                                        }`}
                                >
                                    <span>{company}</span>
                                </Button>
                            );
                        })}
                    </div>

                </div>
                <div>
                    <p className='font-semibold mb-4'>Subdomain</p>
                    <input
                        placeholder={`blog.example.com`}
                        id="email"
                        name="email"
                        type="email"
                        className={`${inputClass} ml-0 outline-white`}
                    />
                </div>

                <div>
                    <p className='font-semibold mb-4'>  Subdomain </p>
                    <input
                        placeholder={`123e4567-e89b-12d3-a456-426614174000`}
                        id="email"
                        name="email"
                        type="email"
                        className={`${inputClass} ml-0 outline-white`}
                    />
                </div>

                <div>
                    <p className='font-semibold mb-4'>Connection</p>
                    <p className=' mb-4'>Status</p>
                    <div className="flex flex-wrap gap-4 md:gap-5">
                        {statuses.map((s) => {
                            return (
                                <Button
                                    key={s}
                                    onClick={() => setStatus(s)}
                                    className={`flex items-center gap-4 px-3 w-full md:w-1/4 justify-center py-1.5 rounded-full border shadow-sm ${s === status
                                        ? 'bg-[#57AF4F] text-white border-[#57AF4F]'
                                        : 'bg-[#D9D9D9] text-white border-gray-300'
                                        }`}
                                >
                                    <span>{s}</span>
                                </Button>
                            );
                        })}
                    </div>
                    <p className=' mb-4 mt-4'>Refresh</p>
                    <div className="">
                        <Button
                            onClick={() => setRefresh(!refresh)}
                            className={`flex items-center gap-4 px-3 w-full md:w-1/4 justify-center py-1.5 rounded-full border shadow-sm ${refresh
                                ? 'bg-[#B3322F] text-white border-[#B3322F]'
                                : 'bg-[#D9D9D9] text-white border-gray-300'
                                }`}
                        >
                            <span>Refresh Properties</span>
                        </Button>

                    </div>
                    <p className=' mb-4 mt-4'>Recheck</p>
                    <div className="">
                        <Button
                            onClick={() => setRecheck(!recheck)}
                            className={`flex items-center gap-4 px-3 w-full md:w-1/4 justify-center py-1.5 rounded-full border shadow-sm ${recheck
                                ? 'bg-[#B3322F] text-white border-[#B3322F]'
                                : 'bg-[#D9D9D9] text-white border-gray-300'
                                }`}
                        >
                            <span>Recheck Properties</span>
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    )
} 