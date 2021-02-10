import React from "react";
import Skeleton from "react-loading-skeleton";
const PostSkeleton = ({ index, post }) => {
  return (
    <div className="latest-ads__latest-ads__latest-ad" key={index}>
      <Skeleton
        height="18rem"
        width="95%"
        style={{ margin: "auto", marginTop: "1rem" }}
      />
      <h3 className="latest-ads__latest-ads__latest-ad__title">
        <Skeleton style={{ marginTop: "1.5rem" }} />
      </h3>
      <div className="latest-ads__latest-ads__latest-ad__details">
        <span className="latest-ads__latest-ads__latest-ad__details__time">
          <Skeleton width="5rem" height=".8rem" />
        </span>
        <span
          className="latest-ads__latest-ads__latest-ad__details__model"
          style={{ textOverflow: "unset" }}
        >
          <span>
            <Skeleton height=".8rem" />
          </span>
        </span>
      </div>
      <div className="latest-ads__latest-ads__latest-ad__details">
        <span className="latest-ads__latest-ads__latest-ad__details__distance">
          <Skeleton width="5rem" height=".8rem" />
        </span>
        <span className="latest-ads__latest-ads__latest-ad__details__location">
          <Skeleton height=".8rem" />
        </span>
      </div>
      <div className="latest-ads__latest-ads__latest-ad__details">
        <span className="latest-ads__latest-ads__latest-ad__details__rating">
          <Skeleton width="5rem" height=".8rem" />
        </span>
        <span className="latest-ads__latest-ads__latest-ad__details__reviews">
          <Skeleton height=".8rem" />
        </span>
      </div>
      <div className="latest-ads__latest-ads__latest-ad__details latest-ads__latest-ads__latest-ad__details--down">
        <span className="latest-ads__latest-ads__latest-ad__details__distance">
          <Skeleton width="1.5rem" height="1.5rem" />
        </span>
        <span className="latest-ads__latest-ads__latest-ad__details__price">
          <Skeleton height=".8rem" />
        </span>
      </div>
    </div>
  );
};

export default PostSkeleton;
