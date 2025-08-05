import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
// import QRCode from "react-qr-code";
import { motion } from 'framer-motion';
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";
import Loader, { LoaderComponent } from "../../../components/Loader";
import { useCreateInviteQuery } from "../../../redux/services/auth.service";

export const NextButton: React.FC<{
    disabled?: boolean;
    onClick?: () => void;
    previousStepHandler?: () => void;
    className?: string;
}> = ({ onClick = () => { }, className = '', disabled = false, previousStepHandler = () => { } }) => {
    return (
        <>
            <div className="  sticky bottom-4 z-30">
                <motion.button
                    disabled={disabled}
                    onClick={onClick}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.03 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={`${disabled ? 'bg-[#D9D9D9] ' : 'bg-black hover:bg-[#B3322F]'}  w-[250px] md:w-[180px] text-center py-2 text-white rounded-full mt-10  ${className}`}
                >

                    Next
                </motion.button>

            </div>
            <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className='bg-[#B3322F] hover:bg-black text-white w-25 text-sm flex gap-2 p-1 mx-auto rounded-full justify-center items-center mt-3 py-1'
                onClick={previousStepHandler}>
                <ArrowLeftIcon className='w-4.5 h-4.5 border-white border-2 rounded-full p-0.5 ' />
                Back
            </motion.button>
        </>
    );
};


export const PrimaryButton: React.FC<{
    selected?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    icon?: string | null;
    className?: string;
    button?: boolean;
    // type?: "button" | "submit" | "reset";
}
> = ({
    selected = false,
    children = '',
    onClick = () => { },
    icon = null,
    className = '',
    button = false,
    // type = "button",
}) => {
        // const bgColor = button
        //     ? 'bg-[#B3322F] hover:bg-black'
        //     : selected
        //         ? 'bg-[#B3322F] hover:bg-[#b3312fa2]'
        //         : 'bg-[#D9D9D9] hover:bg-[#d9d9d9a4]';
        const bgColor = button
            ? 'bg-[#B3322F] hover:bg-black'
            : selected
                ? 'bg-[#B3322F]  '
                : 'bg-[#D9D9D9] border-1 border-white ';

        return (
            <motion.button
                onClick={onClick}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`w-[250px]  text-center py-2 text-white rounded-full flex items-center justify-center ${bgColor} ${icon ? 'gap-2' : ''} ${className}`}
            >
                {children}
                {icon && <img src={icon} alt="" className="h-3 mt-1.5" />}
            </motion.button>
        )
    };


export const ExitConfirmationSection: React.FC<{
    setExitForm: (value: boolean) => void;
}
> = ({ setExitForm }) => {

    const navigate = useNavigate()
    return (
        <div className="text-center">
            <img
                alt="Exit Confirmation"
                className="h-35 mx-auto"
                src="/assets/img/icons/owl_icon_red.svg"
            />

            <p className="text-2xl text-[#B3322F] font-semibold w-full px-10 mx-auto">
                Are You Sure?
            </p>

            <p className="text-2xl text-[#B3322F] mt-5 w-full px-10 mx-auto">
                The more questions you answer, the better we can match you with your perfect home.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-15 text-md px-10">
                <PrimaryButton button={true} onClick={() => setExitForm(false)}>
                    Resume
                </PrimaryButton>

                <PrimaryButton button={true} onClick={() => navigate(ROUTES.SEARCH_PROPERTY)}>
                    Yes
                </PrimaryButton>
            </div>
        </div>
    );
};


export const transitionVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
};


export const QuestionTitle = ({ children }: { children: React.ReactNode }) => (
    <p className='text-2xl text-[#B3322F] w-full  px-10 text-center mx-auto font-semibold'>
        {children}
    </p>
);


export const ShareSection = ({ url = "", qrCodePath = "" }) => {
    const inviteRef = useRef<HTMLDivElement>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loader, setLoader] = useState(false)
    // const url = "nextroom.ca"
    const handleShare = async () => {

        if (!navigator.share || !navigator.canShare) {
            alert("Sharing not supported on this device.");
            return;
        }

        if (!inviteRef.current) return;

        // Wait to ensure it's rendered
        await new Promise((resolve) => setTimeout(resolve, 100));

        const canvas = await html2canvas(inviteRef.current, {
            backgroundColor: "#ffffff",
            scale: 2,
            useCORS: true,
        });

        // Convert canvas to blob
        canvas.toBlob(async (blob) => {
            if (!blob) {
                console.error("Failed to create blob from canvas.");
                return;
            }

            const file = new File([blob], "invite.png", { type: "image/png" });

            // Check if the device can share this file
            if (navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        title: "Join NextRoom",
                        text: "Check this out!",
                        files: [file],
                    });
                } catch (error) {
                    console.error("Sharing failed", error);
                }
            } else {
                alert("This device doesn't support sharing images.");
            }
        }, "image/png");
    };

    const handleCopy = () => {
        // const url = "www.nextroom.ca"
        navigator.clipboard.writeText(url)
            .then(() => toast.success("Link copied to clipboard"))
            .catch(() => toast.success("Failed to copy link"));
    };


    const handlePrint = async () => {
        setLoader(true)
        console.log("print")
        if (!inviteRef.current) return;

        // Wait a tick to make sure it's fully rendered
        await new Promise((resolve) => setTimeout(resolve, 100));

        const canvas = await html2canvas(inviteRef.current, {
            backgroundColor: '#ffffff', // or null if transparent background is needed
            scale: 2,
            useCORS: true, // in case images are hosted remotely

        });

        const link = document.createElement('a');
        link.download = 'invite.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        setLoader(false)
    };


    const buttons = [
        { name: "Share", icon: "share_icon.svg", onClick: () => handleShare() },
        { name: "Copy", icon: "copy_icon.svg", onClick: () => handleCopy() },
        { name: "Print Invite", icon: "print_icon.svg", onClick: () => handlePrint() },
    ]


    return (
        <>
            {loader && <Loader />}

            {/* Hidden container to capture */}
            <div ref={inviteRef} className="py-30 absolute left-[-9999px] top-0"  >
                <LetsBecomeRoomMateSection {...{ url, qrCodePath }} />
            </div>

            <img alt="" className="h-50 mx-auto  " src={qrCodePath || ""} />



            <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-black w-[250px] md:w-[180px] text-center py-2 text-white rounded-full mt-8 transition-all"
            >
                Share To Invite
            </motion.button>


            {showDropdown && (
                <motion.div
                    className="mx-10"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-5 text-md px-10 bg-white py-8 rounded-xl shadow-[#D9D9D9] drop-shadow-xl shadow-md w-full md:w-max mx-auto">
                        {buttons.map((button) => (
                            <motion.button
                                onClick={button.onClick}
                                key={button.name}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-[#B3322F] text-white rounded-full flex w-full md:w-[200px] items-center justify-center py-2 text-center gap-2 transition-all"
                            >
                                <p>{button.name}</p>
                                <img
                                    alt=""
                                    className="h-4"
                                    src={`/assets/img/icons/${button.icon}`}
                                />
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}


        </>
    )
}



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


const LetsBecomeRoomMateSection: React.FC<{
    qrCodePath: string
}> = ({ qrCodePath }) => {

    return (
        <>
            <img alt="" className="h-25 mx-auto" src={`/assets/img/logo/primary_logo.png`} />

            <p className='text-2xl text-[#B3322F]  w-full  px-10 text-center mx-auto'>
                Let’s Become Roommates!
            </p>

            <img alt="" className="h-60 mx-auto -mt-5" src={`/assets/img/icons/roommates.svg`} />

            <p className='text-lg text-[#B3322F]  w-full  px-10 text-center mx-auto'>
                Join by scanning the <br />
                QR Code or follow the link below:
            </p>

            {/* <p className='text-center px-10'>http://sample.info/?insect=fireman&porter=attraction#cave</p> */}
            {/* <img alt="" className="h-35 mx-auto mt-8" src={`/assets/img/icons/qr_code.svg`} /> */}
            <img alt="" className="h-60 mx-auto mt-10" src={qrCodePath} />
            {/* <QRCode value={url} className="h-35 mx-auto mt-10" /> */}

            <p className='text-lg text-[#B3322F] mt-10 w-full  px-10 text-center mx-auto font-semibold'>What is Next Room?</p>

            <p className='w-[80%] md:[70%] lg:w-[60%] xl:w-[50%] text-center mx-auto mt-3'>
                Next Room is the future of student housing—built to make finding a place (and people to live with) actually simple. From verified listings to smart roommate matching and easy sublets, it’s everything you wish existed when the group chat said “who’s signing the lease?”
                <br />
                <br />
                You’ve been invited to join your roommate’s housing search. Next Room helps you find a home together—without the scams, stress, or endless scrolling.
            </p>

            <p className='w-[80%] md:[70%] lg:w-[60%] xl:w-[50%] text-center mx-auto mt-3 font-bold'>
                Fast. Verified. Student-focused. Join your friend on Next Room today!<br />
                Your future home is waiting—together.
            </p>
        </>
    )
}


export const SkipNextQuestionSection = () => {
    const { data, isLoading, isError, error, refetch } = useCreateInviteQuery();
    console.log(data, isError, error)
    return (
        <>
            {isLoading ? <div className='mt-5'>
                <LoaderComponent />
                <p>Please wait creating Invite...</p>

            </div> : isError ?
                <div className='flex items-center justify-center mt-4 gap-4'>
                    <div className='font-semibold '>{"Fail to fetch data Retry."}</div>
                    <motion.div
                        onClick={refetch}
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                        <ArrowPathIcon className="w-5 h-5 text-[#B3322F] cursor-pointer" />
                    </motion.div>
                </div > :

                <ShareSection {...data} />
            }
        </>
    )
}