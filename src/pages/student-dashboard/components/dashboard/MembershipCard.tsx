import { Button } from "@headlessui/react";
import Loader, { LoaderComponent } from "@src/components/Loader";
import useAuth from "@src/custom-hooks/useAuth";
import { useGetMembershipCardQuery } from "@src/redux/services/auth.service";
import html2canvas from "html2canvas";
import React, { useRef, useState } from "react";

export const MembershipCard: React.FC<{
    onImageHandler: () => void
}> = ({ onImageHandler }) => {
    const { user } = useAuth()
    const { data: membershipCard, isLoading } = useGetMembershipCardQuery(user?.userId ?? null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);



    const handleDownload = async () => {
        setLoading(true)

        if (!cardRef.current) return;

        // Wait a tick to make sure it's fully rendered
        await new Promise((resolve) => setTimeout(resolve, 100));

        const canvas = await html2canvas(cardRef.current, {
            backgroundColor: '#4D1614', // or null if transparent background is needed
            // scale: 2,
            useCORS: true, // in case images are hosted remotely

        });

        const link = document.createElement('a');
        link.download = 'invite.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        setLoading(false)
    };


    // Download as PDF
    // const handleDownload = async () => {
    //   if (!cardRef.current) return;

    //   // Wait to make sure it's fully rendered
    //   await new Promise((resolve) => setTimeout(resolve, 100));

    //   const canvas = await html2canvas(cardRef.current, {
    //     backgroundColor: "#ffffff",
    //     scale: 2,
    //     useCORS: true,
    //   });

    //   const imgData = canvas.toDataURL("image/png");

    //   // Create PDF (portrait, A4 by default)
    //   const pdf = new jsPDF({
    //     orientation: "portrait",
    //     unit: "pt", // points
    //     format: "a4",
    //   });

    //   // Calculate width/height to fit nicely on A4
    //   const pdfWidth = pdf.internal.pageSize.getWidth();
    //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    //   pdf.addImage(imgData, "PNG", 0, 20, pdfWidth, pdfHeight);

    //   pdf.save("membership-card.pdf");
    // };

    const isPorfileImageUploaded = membershipCard?.profilePhotoUrl

    return (<>
        <div className="py-10 px-2">
            {loading && <Loader />}
            {isLoading ? <div className="h-40 md:h-50 flex justify-center items-center" >
                <LoaderComponent />
            </div> : !isPorfileImageUploaded ? <div>
                <div className="flex flex-col   items-center justify-center gap-4 py-10  mx-10">
                    <p>Upload an image to view and download your membership card</p>
                    <Button onClick={onImageHandler} className="bg-[#B3322F] text-white w-full md:w-50 py-2 rounded-full">Upload Profile</Button>
                </div >
            </div> : <div ref={cardRef} className="w-fit mx-auto ">
                <MembershipCardComponent
                    name={`${membershipCard?.firstName} ${membershipCard?.lastName}`}
                    email={membershipCard?.email}
                    image={membershipCard?.profilePhotoUrl}
                    registrationId={membershipCard?.registration}
                    expiryDate={membershipCard?.registration}
                />
            </div>}


            {/*  Buttons */}
            {isPorfileImageUploaded && <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-10  mx-10">
                {/* <Button className="bg-[#B3322F] text-white w-full md:w-50 py-2 rounded-full">Print</Button> */}
                <Button onClick={handleDownload} className="bg-[#B3322F] text-white w-full md:w-50 py-2 rounded-full">Download</Button>
            </div >}
        </div>

    </>)
}


// MembershipCard.tsx


export const MembershipCardComponent: React.FC<{
    name: string;
    email: string;
    registrationId: string;
    expiryDate: string;
    profileImg?: string;
    logo?: string;
    image?: string;
}> = ({
    name,
    email,
    // registrationId,
    expiryDate,
    image = "/assets/images/student_boy_square_img.svg",
    logo = "/assets/logo/nextroom_white_logo.svg",
}) => {
        return (
            // <div className="bg-gradient-to-b from-[#B3322F] to-[#4D1614] md:py-4 md:px-4 py-2 rounded-xl md:rounded-2xl text-white w-full max-w-md mx-auto shadow-lg">
            <div style={{
                background: "linear-gradient(to bottom, #B3322F, #4D1614)",
                color: 'white'
            }} className=" md:py-4 px-2 md:px-4 py-2 rounded-xl md:rounded-2xl not-first:w-full max-w-md mx-auto shadow-lg">
                <div className="flex gap-2 md:gap-4 items-center ">
                    {/* Profile Image */}
                    <img

                        alt={`profile`}
                        src={image}
                        className="h-40 md:h-50 md:w-50 w-30   rounded-2xl"
                    />

                    {/* User Info */}
                    <div className="flex flex-col justify-between flex-1 pr-4 h-40 md:h-50 overflow-hidden text-wrap break-words">
                        <div className="h-1/2 ">
                            <img
                                alt="Logo"
                                src={logo}
                                className="h-12 -ml-3"
                            />
                            <p className="font-semibold text-sm">{name}</p>
                            <p style={{
                                color: 'white'
                            }}
                                className="text-sm  ">{email}</p>
                        </div>

                        {/* Registration + Expiry */}
                        <div className="flex justify-between text-[10px] md:text-sm mb-2 ">
                            {/* <div>
                                <p className="opacity-70">Registration</p>
                                <p className="font-medium">{registrationId}</p>
                            </div> */}
                            <div>
                                <p className="opacity-70">Registration</p>
                                <p className="font-medium">{expiryDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
