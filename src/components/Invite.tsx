import React, { useRef, useState } from 'react'
import Loader, { LoaderComponent } from './Loader';
import { useCreateInviteQuery } from '@src/redux/services/auth.service';
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { toast } from 'react-toastify';

const Invite = () => {
    const { data, isLoading, isError, error, refetch } = useCreateInviteQuery();
    console.log(data, isError, error)
    return (
        <>
            {isLoading ? <div className='mt-5'>
                <LoaderComponent />
                <p className='text-center'>Please wait creating Invite...</p>

            </div> : isError ?
                <div className='flex items-center justify-center mt-4 gap-4'>
                    <div className='font-semibold '>{"Fail to fetch data Retry."}</div>
                    <motion.div
                        onClick={refetch}
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                        <ArrowPathIcon className="w-5 h-5 text-[#B3322F] " />
                    </motion.div>
                </div > :

                <ShareSection {...data} />
            }
        </>
    )
}

export default Invite


export const ShareSection = ({ url = "", qrCodePath = "" }) => {
    const inviteRef = useRef<HTMLDivElement>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loader, setLoader] = useState(false)
    // const url = "nextroom.ca"
    // const handleShare = async () => {

    //     if (!navigator.share || !navigator.canShare) {
    //         alert("Sharing not supported on this device.");
    //         return;
    //     }

    //     if (!inviteRef.current) return;

    //     // Wait to ensure it's rendered
    //     await new Promise((resolve) => setTimeout(resolve, 100));

    //     const canvas = await html2canvas(inviteRef.current, {
    //         backgroundColor: "#ffffff",
    //         scale: 2,
    //         useCORS: true,
    //     });

    //     // Convert canvas to blob
    //     canvas.toBlob(async (blob) => {
    //         if (!blob) {
    //             console.error("Failed to create blob from canvas.");
    //             return;
    //         }

    //         const file = new File([blob], "invite.png", { type: "image/png" });

    //         // Check if the device can share this file
    //         if (navigator.canShare({ files: [file] })) {
    //             try {
    //                 await navigator.share({
    //                     title: "Join NextRoom",
    //                     text: "Check this out!",
    //                     files: [file],
    //                 });
    //             } catch (error) {
    //                 console.error("Sharing failed", error);
    //             }
    //         } else {
    //             alert("This device doesn't support sharing images.");
    //         }
    //     }, "image/png");
    // };
    const handleShare = async () => {
        console.log("hitasdasda")
        if (!navigator.share) {
            alert("Sharing not supported on this device.");
            return;
        }

        try {
            await navigator.share({
                title: "Join NextRoom",
                text: "Check this out!",
                url: url,
            });
        } catch (error) {
            console.error("Sharing failed", error);
        }
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
        <div className='text-center'>

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
                className="bg-black w-[250px] mx-auto md:w-[180px] text-center py-2 text-white rounded-full mt-8 transition-all"
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


        </div>
    )
}


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