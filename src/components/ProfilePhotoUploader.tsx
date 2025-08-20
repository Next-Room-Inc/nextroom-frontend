import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";
import { APP_INFO } from "@src/utils/constants";
import { useRef, useState } from "react";
import { CircleStencil, Cropper, CropperRef } from 'react-advanced-cropper';
import { Button } from "./Button";


export const ProfilePhotoUploader: React.FC<{
    profileImage: string | null;
    setProfileImage: (value: string | null) => void;
}> = ({ profileImage, setProfileImage }) => {
    return (
        <>
            {profileImage === null ? (
                <UploadHandler setProfileImage={setProfileImage} />
            ) : (
                <CropHandler profileImage={profileImage} setProfileImage={setProfileImage} />
            )}
        </>
    );
};

export const UploadHandler: React.FC<{
    setProfileImage: (param: string) => void;
}> = ({ setProfileImage }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64DataUrl = reader.result as string;
                setProfileImage(base64DataUrl);
            };

            reader.readAsDataURL(file); // Converts file to base64
        }
    }

    return (
        <div className="pb-5 relative">
            <img
                src={`${APP_INFO.IMG_BASE_URL}icons/owl_icon.svg`}
                className={`h-60 w-60 bg-[#CCCCCC] rounded-full p-5 mx-auto`}
            />
            <Button onClick={handleButtonClick} className="text-[#B3322F]  hover:bg-gray-200   flex justify-center items-center shadow bg-white px-4 py-2 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[210px]">
                <ArrowUpTrayIcon className="w-4 mr-2 text-[#B3322F]  " />
                Upload Profile Photo
            </Button>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
            />
        </div>
    );
};

export const CropHandler: React.FC<{
    profileImage: string | null;
    setProfileImage: (image: string) => void;
}> = ({ profileImage, setProfileImage }) => {
    const cropperRef = useRef<CropperRef | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(true); // controls cropper or preview

    const handleCropSubmit = () => {
        const cropper = cropperRef.current;
        const canvas = cropper?.getCanvas();
        const imageDataUrl = canvas?.toDataURL();

        if (imageDataUrl) {
            setCroppedImage(imageDataUrl);
            setIsEditing(false); // move to preview mode
        }
    };

    const handleConfirm = () => {
        if (croppedImage) {
            setProfileImage(croppedImage);
            // Optionally, close modal or go to next step here
        }
    };

    const handleEditAgain = () => {
        setIsEditing(true);
    };

    console.log(handleConfirm)

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Cropper or Preview */}
            {isEditing ? (
                <div className="relative h-60 flex justify-center items-center">
                    <Cropper
                        ref={cropperRef}
                        src={profileImage || ""}
                        stencilComponent={CircleStencil}
                        className="rounded-md shadow"
                    />
                </div>
            ) : (
                <div className="flex justify-center items-center py-4">
                    <img
                        src={croppedImage || ""}
                        alt="Cropped Preview"
                        className="w-40 h-40 rounded-full object-cover border-2 border-gray-300 shadow"
                    />
                </div>
            )}

            {/* Buttons */}
            <div className="flex justify-center gap-3 py-4">
                {isEditing ? (
                    <Button
                        className="px-4 py-1 rounded-full bg-white border shadow-md hover:bg-gray-100 transition"
                        onClick={handleCropSubmit}
                    >
                        Crop
                    </Button>
                ) : (
                    <>
                        <Button
                            className="px-4 py-1 rounded-full bg-white border shadow hover:bg-gray-100"
                            onClick={handleEditAgain}
                        >
                            Edit
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};