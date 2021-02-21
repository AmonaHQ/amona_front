import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import TimeAgo from "timeago-react";
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Header from "../Commons/header";
import Footer from "../Commons/footer";
import StarRatings from "react-star-ratings";
import ImageCarousel from "../Commons/image-carousel";
import ImageCarouselSkeleton from "../Commons/image-carousel-skeleton";
import { useGetCarByPermalink } from "../../operations/queries";
import numberWithCommas from "../../utilities/number-with-commas";
import { recommendedPosts } from "../../constants/latest-posts";
import Post from "../Commons/post";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ScrollTop from "../../utilities/scroll-top";
import "react-tabs/style/react-tabs.css";

const AdDetails = (props) => {
  const [isLoggedIn] = useState(false);
  const { permalink } = useParams();
  const cars = useGetCarByPermalink(permalink);

  return (
    <div className="ad-details">
      <Header />
      <ScrollTop />
      <div className="ad-details__navigation">
        <div className="ad-details__navigation__left">
          <i className="fa fa-home"></i>{" "}
          {!cars.loading && (
            <>
              <span>{`${cars.data.findOneCarByPermalink.category} / ${cars.data.findOneCarByPermalink.make} / ${cars.data.findOneCarByPermalink.title}`}</span>
            </>
          )}
        </div>
        <div className="ad-details__navigation__right">
          <span>{"<< Back to Results"}</span>
        </div>
      </div>
      <div className="ad-details__main">
        {cars.loading && !cars.data ? (
          <>
            <Skeleton style={{ height: "2.5rem", width: "50rem" }} />
            <hr
              style={{ marginTop: "2rem", marginBottom: 0, display: "block" }}
            ></hr>
          </>
        ) : (
          <div className="ad-details__main__title">
            <h2>{cars.data.findOneCarByPermalink.title}</h2>
            <span>Dealer / Company</span>
            <i className="fa fa-check-circle"></i>
          </div>
        )}

        <div
          className="ad-details__main__quick-info"
          style={cars.loading || !cars.data ? { paddingBottom: 0 } : {}}
        >
          {cars.loading ? (
            <Skeleton
              style={{
                height: "1rem",
                width: "30rem",
                margin: 0,
              }}
            />
          ) : (
            <>
              <span className="ad-details__main__quick-info__time">
                <i className="fa fa-clock"></i>{" "}
                <span>
                  {
                    <TimeAgo
                      datetime={cars.data.findOneCarByPermalink.created_at}
                      locale="en"
                    />
                  }{" "}
                  -{" "}
                </span>
              </span>{" "}
              <span className="ad-details__main__quick-info__category">
                {cars.data.findOneCarByPermalink.category} -
              </span>
              <span className="ad-details__main__quick-info__location">
                <i className="fa fa-map-marker"></i>{" "}
                <span>
                  {cars.data.findOneCarByPermalink.location.stateName} -{" "}
                </span>
              </span>
              <span className="ad-details__main__quick-info__views">
                <i className="fa fa-map-marker"></i> <span>3.1k views</span>
              </span>
            </>
          )}
        </div>
        <div className="ad-details__main__images">
          {cars.loading || !cars.data ? (
            <ImageCarouselSkeleton />
          ) : (
            <ImageCarousel
              pictures={cars.data.findOneCarByPermalink.pictures}
            />
          )}

          <figure>
            <StarRatings
              rating={
                cars.loading || !cars.data
                  ? 0
                  : cars.data.findOneCarByPermalink.owner.rating
              }
              starDimension="20px"
              starSpacing=".1rem"
              starRatedColor={cars.loading ? "grey" : "gold"}
            />
            {!cars.loading && (
              <span>
                {cars.loading || !cars.data
                  ? 0.0
                  : cars.data.findOneCarByPermalink.owner.rating.toFixed(
                      1
                    )}{" "}
                star
              </span>
            )}
          </figure>
        </div>

        <div className="ad-details__main__details">
          <Tabs>
            <TabList disabled={cars.loading}>
              <Tab disabled={cars.loading}>Ad Details</Tab>
              <Tab disabled={cars.loading}>Reviews (0)</Tab>
            </TabList>

            <TabPanel>
              <div
                className="ad-details__main__details__ad"
                style={
                  cars.loading ? { display: "flex", padding: "20rem 0" } : {}
                }
              >
                {cars.loading ? (
                  <Loader
                    type="Circles"
                    color="grey"
                    height={22.5}
                    width={22.5}
                    timeout={300000000} //3 secs
                    style={{
                      margin: "auto",
                      marginTop: "2rem",
                      marginBottom: "2rem",
                    }}
                  />
                ) : (
                  <>
                    <div className="ad-details__main__details__ad__heading">
                      <div className="ad-details__main__details__ad__heading__location">
                        <i className="fa fa-map-marker"></i> <h2>Location:</h2>{" "}
                        <span>
                          {
                            cars.data.findOneCarByPermalink.location
                              .formatted_address
                          }
                        </span>
                      </div>
                      <div className="ad-details__main__details__ad__heading__price">
                        <h2>Price:</h2>
                        <span>{`₦ ${numberWithCommas(
                          cars.data.findOneCarByPermalink.price
                        )}`}</span>

                        <span
                          style={{
                            padding:
                              !cars.data.findOneCarByPermalink.negotiable && 0,
                          }}
                        >
                          {cars.data.findOneCarByPermalink.negotiable &&
                            "Negotiable"}
                        </span>
                      </div>
                    </div>{" "}
                    <div className="ad-details__main__details__ad__description">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: cars.data.findOneCarByPermalink.description,
                        }}
                      ></div>
                    </div>
                    <div className="ad-details__main__details__ad__additional-details">
                      <div className="ad-details__main__details__ad__additional-details__title">
                        <i className="fa fa-bars"></i>{" "}
                        <h2 className="h2">Additional Details</h2>
                      </div>

                      <div className="ad-details__main__details__ad__additional-details__container">
                        <div className="ad-details__main__details__ad__additional-details__container__detail">
                          <span>Model</span>{" "}
                          <span>{cars.data.findOneCarByPermalink.model}</span>
                        </div>
                        <div className="ad-details__main__details__ad__additional-details__container__detail">
                          <span>Year</span>{" "}
                          <span>{cars.data.findOneCarByPermalink.year}</span>
                        </div>
                        {cars.data.findOneCarByPermalink.transmission && (
                          <div className="ad-details__main__details__ad__additional-details__container__detail">
                            <span>Transmission</span>{" "}
                            <span>
                              {cars.data.findOneCarByPermalink.transmission}
                            </span>
                          </div>
                        )}
                        {cars.data.findOneCarByPermalink.bodyType && (
                          <div className="ad-details__main__details__ad__additional-details__container__detail">
                            <span>Body Type</span>{" "}
                            <span>
                              {cars.data.findOneCarByPermalink.bodyType}
                            </span>
                          </div>
                        )}
                        {cars.data.findOneCarByPermalink.numberOfDoors && (
                          <div className="ad-details__main__details__ad__additional-details__container__detail">
                            <span>Nos. of Doors</span>{" "}
                            <span>
                              {cars.data.findOneCarByPermalink.numberOfDoors}
                            </span>
                          </div>
                        )}

                        <div className="ad-details__main__details__ad__additional-details__container__detail">
                          <span>Mileage (km)</span>{" "}
                          <span>
                            {numberWithCommas(
                              cars.data.findOneCarByPermalink.mileage
                            )}
                          </span>
                        </div>
                        <div className="ad-details__main__details__ad__additional-details__container__detail">
                          <span>Condition</span>{" "}
                          <span>
                            {cars.data.findOneCarByPermalink.condition}
                          </span>
                        </div>
                        {cars.data.findOneCarByPermalink.interiorColor && (
                          <div className="ad-details__main__details__ad__additional-details__container__detail">
                            <span>Interior Color</span>{" "}
                            <span>
                              {cars.data.findOneCarByPermalink.interiorColor}
                            </span>
                          </div>
                        )}

                        {cars.data.findOneCarByPermalink.exteriorColor && (
                          <div className="ad-details__main__details__ad__additional-details__container__detail">
                            <span>Exterior Color</span>{" "}
                            <span>
                              {cars.data.findOneCarByPermalink.exteriorColor}
                            </span>
                          </div>
                        )}
                        {cars.data.findOneCarByPermalink.fuelType && (
                          <div className="ad-details__main__details__ad__additional-details__container__detail">
                            <span>Fuel Type</span>{" "}
                            <span>
                              {cars.data.findOneCarByPermalink.fuelType}
                            </span>
                          </div>
                        )}
                        {cars.data.findOneCarByPermalink.drive && (
                          <div className="ad-details__main__details__ad__additional-details__container__detail">
                            <span>Drive</span>{" "}
                            <span>{cars.data.findOneCarByPermalink.drive}</span>
                          </div>
                        )}
                      </div>
                      <div className="ad-details__main__details__ad__features">
                        <span className="ad-details__main__details__ad__features__title">
                          Features:
                        </span>
                        <div className="ad-details__main__details__ad__features__container">
                          <div>
                            <i className="fa fa-check"></i>{" "}
                            <span>Adaptable air bags </span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i>{" "}
                            <span>Adaptable headlights </span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i> <span>Alarm</span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i>{" "}
                            <span>Alloy wheels </span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i>{" "}
                            <span>Back-up assistance </span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i>{" "}
                            <span>Bluetooth </span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i>{" "}
                            <span>Dual Climate Controls </span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i>{" "}
                            <span>Entertainment Package </span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i>{" "}
                            <span>Fabric Seats </span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i>{" "}
                            <span>Fog lights </span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i>{" "}
                            <span>Heated mirrors </span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i>{" "}
                            <span>Heated Seats </span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i>{" "}
                            <span>Memory Seats </span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i>{" "}
                            <span>Power locks </span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i>{" "}
                            <span>Power mirrors </span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i>{" "}
                            <span>Power Seat </span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i>{" "}
                            <span>Power windows </span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i>{" "}
                            <span>Security System </span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i>{" "}
                            <span>Self-parking devices </span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i>{" "}
                            <span>Self-parking devices </span>
                          </div>

                          <div>
                            <i className="fa fa-check"></i> <span>Sensors</span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i>
                            <span>Stability Control </span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i> <span>Sunroof</span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i>
                            <span>Tire pressure alert system </span>
                          </div>
                          <div>
                            <i className="fa fa-check"></i>
                            <span> Tow package </span>
                          </div>
                        </div>
                      </div>
                      <div className="ad-details__main__details__ad__tags">
                        <div className="ad-details__main__details__ad__tags__title">
                          <i className="fa fa-tag"></i>{" "}
                          <h2 className="h2">Tags:</h2>
                        </div>
                        <div className="ad-details__main__details__ad__tags__tag">
                          <button>arepo</button>
                        </div>
                      </div>
                      <div className="ad-details__main__details__ad__actions">
                        <i class="far fa-envelope"></i>
                        <i class="far fa-heart"></i>
                        <i class="fas fa-exclamation-circle"></i>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="ad-details__main__details__review">
                {isLoggedIn ? (
                  <>
                    <form className="ad-details__main__details__review__form">
                      <textarea
                        className="ad-details__main__details__review__textarea"
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                      ></textarea>
                      <div className="ad-details__main__details__review__button">
                        <StarRatings
                          rating={4.5}
                          starDimension="1.5rem"
                          starSpacing=".3rem"
                          starRatedColor="gold"
                        />
                        <button>Leave a Review</button>
                      </div>
                    </form>
                    <div className="ad-details__main__details__review__bottom-text">
                      This ad has no reviews yet. Be the first to leave a
                      review.
                    </div>
                  </>
                ) : (
                  <form className="ad-details__main__details__review__login">
                    <div className="ad-details__main__details__review__login__intro">
                      <span>Note:</span>{" "}
                      <span>You must be logged in to post a review. </span>
                    </div>
                    <div className="ad-details__main__details__review__login__inputs">
                      <input type="email" placeholder="Email or Phone" />
                      <input type="password" placeholder="password" />
                      <button>Login</button>
                    </div>

                    <div className="ad-details__main__details__review__login__captcha">
                      <ReCAPTCHA
                        sitekey="6LdEVBsaAAAAAHx5BRsT0nG5Pm5kBFXGKYxq5ULu"
                        onChange={(value) => {}}
                      />
                    </div>
                  </form>
                )}
              </div>
            </TabPanel>
          </Tabs>
        </div>
        <div className="ad-details__main__details__buttons">
          <div className="ad-details__sidebar__contact ad-details__main__contact">
            <button>
              <i className="fa fa-phone"></i> Phone Number
            </button>
            <button>
              <i class="fas fa-envelope-open-text"></i> Send a message
            </button>
          </div>
        </div>
      </div>
      <div className="ad-details__sidebar">
        <div className="ad-details__sidebar__owner">
          {cars.loading ? (
            <Loader
              type="Circles"
              color="grey"
              height={22.5}
              width={22.5}
              timeout={300000000} //3 secs
              style={{
                margin: "auto",
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
            />
          ) : (
            <>
              {" "}
              <figure className="ad-details__sidebar__owner__picture">
                <i className="fa fa-user"></i>
              </figure>
              <div className="ad-details__sidebar__owner__data">
                <span>Posted By</span>
                <h3>Anthony Jacob</h3>
                <figure className="ad-details__sidebar__owner__rating">
                  <StarRatings
                    rating={4.5}
                    starDimension="1.5rem"
                    starSpacing=".1rem"
                    starRatedColor="gold"
                  />
                  <span>4 rating</span>
                </figure>
              </div>
            </>
          )}
        </div>
        <div
          className="ad-details__sidebar__joined"
          style={cars.loading ? { display: "flex" } : {}}
        >
          {cars.loading ? (
            <Loader
              type="Circles"
              color="grey"
              height={22.5}
              width={22.5}
              timeout={300000000} //3 secs
              style={{
                display: "block",
                margin: "auto",
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
            />
          ) : (
            <>
              {" "}
              <span>
                <i className="fa fa-map-marker"></i> <span>Location</span>
              </span>
              <span className="ad-details__sidebar__joined__location">
                Yaba
              </span>
              <span>
                <i className="fa fa-user"></i> <span>Joined</span>
              </span>
              <span>1 week ago</span>
            </>
          )}
        </div>
        <div className="ad-details__sidebar__contact">
          {cars.loading ? (
            <Loader
              type="Circles"
              color="grey"
              height={22.5}
              width={22.5}
              timeout={300000000} //3 secs
              style={{
                display: "block",
                margin: "auto",
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
            />
          ) : (
            <>
              {" "}
              <button disabled={cars.loading}>
                <i className="fa fa-phone"></i> Phone Number
              </button>
              <button disabled={cars.loading}>
                <i class="fas fa-envelope-open-text"></i> Send a message
              </button>
            </>
          )}
        </div>
        <div className="ad-details__sidebar__card">
          <div className="ad-details__sidebar__card__title">
            <h3>Location's Map</h3>
          </div>
          <div className="ad-details__sidebar__card__body">
            {cars.loading ? (
              <Skeleton
                style={{
                  height: "25rem",
                  marginTop: 0,
                  display: "block",
                }}
              />
            ) : (
              <iframe
                title="google-map"
                id="googleMaps"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD4tXE0aB-04Bksr1vqAab90qt35Gy-hMw&amp;q=Yaba%2CNigeria&amp;language=en"
                width="100%"
                height="250"
                frameborder="0"
              ></iframe>
            )}
          </div>
        </div>
        <div
          className={`ad-details__sidebar__socials ${
            cars.loading && "disable-element"
          }`}
        >
          <figure className="ad-details__sidebar__socials__facebook">
            <i class="fab fa-facebook-f"></i>
          </figure>
          <figure className="ad-details__sidebar__socials__twitter">
            <i class="fab fa-twitter"></i>
          </figure>
          <figure className="ad-details__sidebar__socials__whatsapp">
            <i class="fab fa-whatsapp"></i>
          </figure>
          <figure className="ad-details__sidebar__socials__linkedin">
            <i class="fab fa-linkedin-in"></i>
          </figure>
        </div>
        <div className="ad-details__sidebar__card">
          <div className="ad-details__sidebar__card__title">
            <h3>Safety Tips for Buyers</h3>
          </div>
          <div className="ad-details__sidebar__card__body">
            <ul className="ad-details__sidebar__card__body__safety-tips">
              <li>
                <i className="fa fa-check"></i>{" "}
                <span>Meet seller at a public place</span>
              </li>
              <li>
                <i className="fa fa-check"></i>{" "}
                <span>Check the vehicle before you buy</span>
              </li>
              <li>
                <i className="fa fa-check"></i>
                <span>
                  Pay only after Physically Inspecting the vehicle/Spare Parts
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {!cars.loading && (
        <div className="ad-details__recommended">
          <div className="ad-details__recommended__title">
            <h1 className="h1">Recommended Cars For You</h1>
            <figure className="ad-details__line"></figure>
          </div>

          {/* <div className="all-ads__posts__posts__cars all-ads__posts__posts__cars--recommended">
          {recommendedPosts.map((post, index) => (
            <Post index={index} post={post} />
          ))}
        </div> */}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdDetails;
