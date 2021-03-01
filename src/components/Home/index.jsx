import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import Map from "../Commons/map";
import states from "../../constants/states";
import posts from "../../constants/sponsored-post";
import latestPost from "../../constants/latest-posts";
import Header from "../Commons/header";
import Footer from "../Commons/footer";
import Post from "../Commons/post";
import PostSkeleton from "../Commons/post-skeleton";
import "pure-react-carousel/dist/react-carousel.es.css";
import categories from "../../constants/categories";
import ScrollTop from "../../utilities/scroll-top";
import { useCarQuery, useStatesQuery } from "../../operations/queries";

const Home = (props) => {
  const [sponsoredPosts] = useState(posts);
  const [isPlaying, setIsPlaying] = useState(true);

  const { loading, data } = useCarQuery();
  const statesResult = useStatesQuery();

  if (data) {
    const {
      cars: { cars },
    } = data;
    console.log("this is car", cars);
  }

  return (
    <div className="home-container">
      <Header />
      {props.location.state && props.location.state.payment && <ScrollTop />}
      <section className="wide-intro">
        <h1 className="wide-intro__title">BUY, SELL, RENT & CONNECT ONLINE </h1>
        <h3 className="wide-intro__sub-title">
          Find Car Dealers , Private Sellers & Service Providers Online - Great
          Offers, Fast Deals{" "}
        </h3>
        <div className="search-box">
          <div className="search-box__box">
            <i className="fa fa-folder-open-o search-box__box__icon"></i>
            <input
              type="text"
              className="search-box__box__input"
              placeholder="What are you looking for"
            />
          </div>
          <div className="search-box__box">
            <i className="fa fa-map-marker search-box__box__icon"></i>
            <input
              type="text"
              className="search-box__box__input"
              placeholder="Where ?"
            />
          </div>
          <button className="search-box__box__button">
            <i className="fa fa-search"></i>Search Now
          </button>
        </div>
      </section>
      <section className="region">
        <div className="region__container">
          <div className="region__city">
            <h2 className="region__city__title">
              <i className="fa fa-map-marker region__city__map-icon"></i>
              Choose a city or region
            </h2>
            <ul className="region__city__list">
              {statesResult.data && statesResult.data.states.states.map((state) => (
                <li className="region__city__item" key={state.stateName}>
                  <Link
                    to={{
                      pathname: "/ads",
                      state: {
                        stateName: state.stateName,
                      },
                    }}
                    className="region__city__link"
                  >
                    {" "}
                    {state.stateName} {` (${state.count})`}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="region__city__button">
              <Link to={{ pathname: "/ads/new" }}>
                <button className="post-ad">
                  <i className="post-ad__icon fa fa-plus-circle"></i> Post Ad
                  FREE
                </button>
              </Link>
            </div>
          </div>
          <div className="region__map">
            <Map />
          </div>
        </div>
      </section>
      <section className="sponsored">
        <div className="sponsored__container">
          <div className="sponsored__title">
            <span className="sponsored__title__text">
              <span className="sponsored__title__text--light">Sponsored</span>
              <span className="sponsored__title__text--dark">Ads</span>
            </span>
            <div className="sponsored__title__view-more">
              <span className="sponsored__title__view-more__text">
                View more
              </span>
              <i className="fa fa-bars sponsored__title__view-more__icon"></i>
            </div>
          </div>

          <CarouselProvider
            totalSlides={posts.length}
            naturalSlideWidth={100}
            naturalSlideHeight={123}
            visibleSlides={5}
            infinite={true}
            isPlaying={isPlaying}
            interval={1000}
            orientation="horizontal"
          >
            <Slider className="sponsored__posts">
              {sponsoredPosts.map((post, index) => (
                <Slide
                  index={index}
                  className="sponsored__post"
                  onMouseOver={() => setIsPlaying(false)}
                  onMouseLeave={() => setIsPlaying(true)}
                >
                  <figure className="sponsored__post__picture">
                    <img src={post.picture} alt="" />
                  </figure>
                  <p className="sponsored__post__title">{post.title}</p>
                  <div className="sponsored__post__review">
                    <StarRatings
                      rating={post.rating}
                      starDimension="1.5rem"
                      starSpacing=".1rem"
                      starRatedColor="gold"
                    />
                    <span className="sponsored__post__review__text">
                      <span className="sponsored__post__review__text__count">
                        {post.reviews}{" "}
                        <span>{post.reviews > 1 ? "reviews" : "review"}</span>
                      </span>
                    </span>
                  </div>
                  <div className="sponsored__post__details">
                    <span className="sponsored__post__details__distance">
                      {`${post.distance} km`} <span>away</span>
                    </span>
                    <span className="sponsored__post__details__location">
                      <i className="fa fa-map-marker"></i> {post.location}
                    </span>
                  </div>{" "}
                  <div className="sponsored__post__details">
                    <span className="sponsored__post__details__price">
                      {`₦${post.price}`}
                    </span>
                  </div>
                </Slide>
              ))}
            </Slider>
          </CarouselProvider>
        </div>
      </section>
      <section className="categories">
        <div className="categories__container">
          <div className="categories__title">
            <span className="categories__title__text">
              <span className="categories__title__text--light">Browse by</span>
              <span className="categories__title__text--dark">Category</span>
            </span>
            <div className="categories__title__view-more">
              <span className="categories__title__view-more__text">
                View more
              </span>
              <i className="fa fa-bars categories__title__view-more__icon"></i>
            </div>
          </div>
          <div className="categories__categories">
            {categories.map((category, index) => (
              <div className="categories__categories__category" key={index}>
                <figure className="categories__categories__category__picture">
                  <img src={category.picture} alt={category.title} />
                </figure>
                <h3 className="categories__categories__category__title">
                  {category.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="latest-ads">
        <div className="latest-ads__container">
          <div className="latest-ads__title">
            <span className="latest-ads__title__text">
              <span className="latest-ads__title__text--light">Latest</span>
              <span className="latest-ads__title__text--dark">Ads</span>
            </span>
            <div className="latest-ads__title__view-more">
              <span className="latest-ads__title__view-more__text">
                View more
              </span>
              <i className="fa fa-bars latest-ads__title__view-more__icon"></i>
            </div>
          </div>
          <div className="latest-ads__latest-ads">
            {loading
              ? latestPost.map((post, index) => (
                  <PostSkeleton index={index} post={post} />
                ))
              : data.cars.cars.map((post, index) => (
                  <Post index={index} post={post} />
                ))}
          </div>
          <div className="latest-ads__view-more">
            <div className="latest-ads__view-more__btn">
              <i class="fas fa-arrow-circle-right"></i>View More
            </div>
          </div>
        </div>
      </section>
      <section className="bottom-stats">
        <div className="bottom-stats__container">
          <div className="bottom-stats__stats">
            <i class="fas fa-images"></i>
            <div className="bottom-stats__stats__figure">
              <h1 className="bottom-stats__stats__number">6086</h1>
              <p className="bottom-stats__stats__title">Free ads</p>
            </div>
          </div>
          <div className="bottom-stats__stats">
            <i className="fa fa-users"></i>{" "}
            <div className="bottom-stats__stats__figure">
              <h1 className="bottom-stats__stats__number">1896</h1>
              <p className="bottom-stats__stats__title">Trusted Sellers</p>
            </div>
          </div>
          <div className="bottom-stats__stats">
            <i class="far fa-map"></i>
            <div className="bottom-stats__stats__figure">
              <h1 className="bottom-stats__stats__number">471</h1>
              <p className="bottom-stats__stats__title">Locations</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
