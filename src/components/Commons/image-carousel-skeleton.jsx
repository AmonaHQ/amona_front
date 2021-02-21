import React from "react";
import Skeleton from "react-loading-skeleton";

const ImageCarouselSkeleton = () => {
  return (
    <div className="image-carousel-skeleton"  style={{
        padding: 0,
      }}>
      <div
        className="image-carousel-skeleton__main"
       
      >
        <Skeleton
          style={{
            height: "45rem",
            marginTop: 0,
            display:"block"
          }}
        />
      </div>
      <div
        className="image-carousel-skeleton__thumbnails"
        style={{ display: "flex", marginTop: "1rem" }}
      >
        <Skeleton
          style={{
            height: "7rem",
            width: "8rem",
            margin: 0,
          }}
        />{" "}
        <Skeleton
          style={{
            height: "7rem",
            width: "8rem",
            margin: 0,
          }}
        />
      </div>
    </div>
  );
};

export default ImageCarouselSkeleton;
