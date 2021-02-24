import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import TimeAgo from "timeago-react";
import numberWithCommas from "../../utilities/number-with-commas";

const Post = ({ index, post }) => {
  console.log("post", post);
  return (
    <Link
      to={{
        pathname: `/ads/details/${post.permalink}`,
        state: {
          permalink: post.permalink,
        },
      }}
    >
      <div className="latest-ads__latest-ads__latest-ad" key={index}>
        {post.pricing && post.pricing.badge && (
          <figure
            className="latest-ads__latest-ads__latest-ad__badge"
            style={{
              backgroundColor: post.pricing.badge.backgroundColor,
              color: post.pricing.badge.color,
            }}
          >
            {post.pricing.type}
          </figure>
        )}
        <figure className="latest-ads__latest-ads__latest-ad__picture">
          <img src={post.pictures[0]} alt={post.title} />
        </figure>
        <h3 className="latest-ads__latest-ads__latest-ad__title">
          {post.title}
        </h3>
        <div className="latest-ads__latest-ads__latest-ad__details">
          <span className="latest-ads__latest-ads__latest-ad__details__time">
            <i className="fa fa-clock"></i>{" "}
            <TimeAgo datetime={post.created_at} locale="en" />
          </span>
          <span className="latest-ads__latest-ads__latest-ad__details__model">
            <i className="fa fa-car"></i> {post.make}
          </span>
        </div>
        <div className="latest-ads__latest-ads__latest-ad__details">
          <span className="latest-ads__latest-ads__latest-ad__details__distance">
            {`${post.distance} km away`}
          </span>
          <span className="latest-ads__latest-ads__latest-ad__details__location">
            <i className="fa fa-map-marker"></i> {post.location.stateName}
          </span>
        </div>
        <div className="latest-ads__latest-ads__latest-ad__details">
          <span className="latest-ads__latest-ads__latest-ad__details__rating">
            <StarRatings
              rating={post.owner.rating}
              starDimension="1.5rem"
              starSpacing=".1rem"
              starRatedColor="gold"
            />
          </span>
          <span className="latest-ads__latest-ads__latest-ad__details__reviews">
            {post.reviews} {post.reviews > 1 ? "reviews" : "review"}
          </span>
        </div>
        <div className="latest-ads__latest-ads__latest-ad__details latest-ads__latest-ads__latest-ad__details--down">
          <span className="latest-ads__latest-ads__latest-ad__details__distance">
            <div className="save">
              <i className="fa fa-heart"></i>
              <span>Save</span>
            </div>
          </span>
          <span className="latest-ads__latest-ads__latest-ad__details__price">
            {`₦${numberWithCommas(post.price)}`}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Post;
