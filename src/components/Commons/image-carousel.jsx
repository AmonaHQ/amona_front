import React from "react";
import ImageGallery from "react-image-gallery";
import { images } from "../../constants/latest-posts";
import "react-image-gallery/styles/css/image-gallery.css";

const ImageCarousel = ({ pictures }) => {
  const transformPictures = () => {
    const transformed = [];
    pictures.forEach((picture) =>
      transformed.push({
        original: picture,
        thumbnail: picture,
      })
    );
    return transformed;
  };
  return (
    <div className="image-carousel">
      <ImageGallery items={transformPictures()} sizes="object-fit">
        <figure className="image-carousel__price">iuhiubihbjhk</figure>
      </ImageGallery>
    </div>
  );
};

export default ImageCarousel;
