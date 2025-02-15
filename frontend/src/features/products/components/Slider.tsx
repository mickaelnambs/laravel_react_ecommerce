import { useEffect, useState } from "react";
import { GalleryImage, Product } from "../types";
import ImageGallery from "react-image-gallery";

interface SliderProps {
    product: Product
}

export default function Slider({product}: SliderProps) {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        handleProductImages();
    }, [product])

    const handleProductImages = () => {
        const updatedImages: GalleryImage[] = [
            {
                original: product?.thumbnail,
                thumbnail: product?.thumbnail,
                originalHeight: 500
            }
        ];

        const additionalImages = [
            product?.first_image,
            product?.second_image,
            product?.third_image
        ].filter(Boolean);
 
        additionalImages.forEach(image => {
            updatedImages.push({
                original: image,
                thumbnail: image,
                originalHeight: 500
            });
        });
 
        setImages(updatedImages);
        setLoaded(true);
    }

    return (
        <ImageGallery
            showPlayButton={loaded}
            showFullscreenButton={loaded}
            items={images}
        />
    );
}