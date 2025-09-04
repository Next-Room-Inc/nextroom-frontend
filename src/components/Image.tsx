import { IMAGES } from "@src/utils/constants/app-info.constant";
import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    alt?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className, ...rest }) => {
    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        event.currentTarget.src = IMAGES.FAILED_IMAGE;
    };

    return (
        <img
            src={src || IMAGES.NOT_FOUND}
            onError={handleImageError}
            alt={alt || "image not found"}
            className={className}
            {...rest}
        />
    );
};

export default Image;