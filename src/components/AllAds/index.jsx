import React, { useState, useEffect } from "react";
import categories from "../../constants/categories";
import states from "../../constants/states";
import ScrollableDropdown from "../Commons/scrollable-dropdown";
import Header from "../Commons/header";
import allPosts from "../../constants/latest-posts";
import Post from "../Commons/post";
import Footer from "../Commons/footer";
import { useGetSearchResult } from "../../operations/queries";
import ScrollTop from "../../utilities/scroll-top";

const AllAds = ({ location }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [tabs] = useState([
    { title: "All Ads", count: 149 },
    { title: "Individual Ads", count: 750 },
    { title: "Dealers", count: 124 },
  ]);

  const [getSearchResult, { data, loading }] = useGetSearchResult();

  useEffect(() => {
    const { state } = location;
    if (state) {
      const stateName = state.stateName;
      console.log("props", location);
      getSearchResult({ ...(stateName && { stateName }) });
    } else {
      getSearchResult();
    }
  }, []);

  return (
    <div className="all-ads-container">
      <Header />
      <ScrollTop />
      <div className="all-ads__search">
        <div className="search-box search-box--ads">
          <div className="search-box__box">
            <div className="search-box__box__input search-box__box__input--ads">
              <ScrollableDropdown
                list={categories}
                identifier="title"
                callBack={() => {}}
              />
            </div>
          </div>
          <div className="search-box__box">
            <i className="fa fa-folder-open-o search-box__box__icon"></i>
            <input
              type="text"
              className="search-box__box__input search-box__box__input--ads"
              placeholder="What are you looking for"
            />
          </div>
          <div className="search-box__box">
            <i className="fa fa-map-marker search-box__box__icon"></i>
            <input
              type="text"
              className="search-box__box__input search-box__box__input--ads"
              placeholder="Where ?"
            />
          </div>
          <button className="search-box__box__button">
            <i className="fa fa-search"></i>Search Now
          </button>
        </div>
      </div>

      <div className="categories-list">
        <ul className="category-list">
          {categories.slice(1, categories.length - 1).map((category, index) => (
            <li key={index} className="category__item">
              {category.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="all-ads__posts">
        <div className="all-ads__posts__container">
          <div className="all-ads__posts__options">
            <div className="all-ads__posts__option">
              <div className="all-ads__posts__option__title">
                <h2>Date Posted</h2>
                <div className="all-ads__posts__triangle all-ads__posts__triangle--big">
                  <div className="all-ads__posts__triangle"></div>
                </div>
              </div>
              <div className="all-ads__posts__option__body">
                <ul className="all-ads__posts__option__list">
                  <li className="all-ads__posts__option__item">
                    <input
                      type="radio"
                      className="all-ads__posts__option__radio"
                      id="24-hours"
                      name="time"
                    />
                    <label htmlFor="24-hours">24 hours</label>
                  </li>
                  <li className="all-ads__posts__option__item">
                    <input
                      type="radio"
                      className="all-ads__posts__option__radio"
                      id="3-days"
                      name="time"
                    />
                    <label htmlFor="3-days">3 days</label>
                  </li>
                  <li className="all-ads__posts__option__item">
                    <input
                      type="radio"
                      className="all-ads__posts__option__radio"
                      id="7days"
                      name="time"
                    />
                    <label htmlFor="7days">7 days</label>
                  </li>
                  <li className="all-ads__posts__option__item">
                    <input
                      type="radio"
                      className="all-ads__posts__option__radio"
                      id="30 days"
                      name="time"
                    />
                    <label htmlFor="30 days">30 days</label>
                  </li>
                </ul>
              </div>
            </div>
            <div className="all-ads__posts__option">
              <div className="all-ads__posts__option__title">
                <h2>All Categories </h2>
                <div className="all-ads__posts__triangle all-ads__posts__triangle--big">
                  <div className="all-ads__posts__triangle"></div>
                </div>
              </div>
              <div className="all-ads__posts__option__body">
                <ul className="all-ads__posts__option__list">
                  {categories
                    .slice(1, categories.length - 1)
                    .map((category, index) => (
                      <li
                        key={index}
                        className="all-ads__posts__option__item all-ads__posts__option__item--location"
                      >
                        <span>{category.title}</span>
                        <span className="all-ads__posts__option__item__count">
                          3
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="all-ads__posts__option">
              <div className="all-ads__posts__option__title">
                <h2>Locations</h2>
                <div className="all-ads__posts__triangle all-ads__posts__triangle--big">
                  <div className="all-ads__posts__triangle"></div>
                </div>
              </div>
              <div className="all-ads__posts__option__body">
                <ul className="all-ads__posts__option__list">
                  {states.map((state, index) => (
                    <li
                      key={index}
                      className="all-ads__posts__option__item all-ads__posts__option__item--location"
                    >
                      <span> {state}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="all-ads__posts__posts">
            <div className="all-ads__posts__posts__tabs ">
              {tabs.map((tab, index) => (
                <div
                  onClick={() => setActiveTab(index + 1)}
                  className={`all-ads__posts__posts__tab all-ads__posts__posts__tab--${
                    index + 1
                  } ${
                    activeTab === index + 1
                      ? `all-ads__posts__posts__tab--${index + 1}--active`
                      : ""
                  }`}
                >
                  {tab.title} <span>{tab.count}</span>
                </div>
              ))}
              <div className="all-ads__posts__posts__sort">
                <ScrollableDropdown
                  list={categories}
                  identifier="title"
                  callBack={() => {}}
                />
              </div>
            </div>
            <div className="all-ads__posts__posts__menu">
              <div className="all-ads__posts__posts__filtered-lists">
                <div className="all-ads__posts__posts__filtered-lists__items">
                  <span className="all-ads__posts__posts__filtered-lists__active-tab">
                    {tabs[activeTab - 1].title}
                  </span>
                  <div className="all-ads__posts__posts__filtered-lists__filter">
                    last{" "}
                    <span>
                      30 days <i className="fa fa-times"></i>
                    </span>
                  </div>
                </div>
                <div className="all-ads__posts__posts__filtered-toggle">
                  <i class="fas fa-th-list"></i>
                  <i class="fas fa-bars"></i>
                  <i class="fas fa-th-large"></i>
                </div>
              </div>
              <div className="all-ads__posts__posts__menu__mobile">
                <div className="all-ads__posts__posts__menu__option">
                  <i class="fas fa-bars"></i> <span>Filters</span>
                </div>
                <div className="all-ads__posts__posts__menu__option">
                  <div className="all-ads__posts__posts__menu__option__sort">
                    <ScrollableDropdown
                      list={categories}
                      identifier="title"
                      callBack={() => {}}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="all-ads__posts__posts__cars all-ads__posts__posts__cars--search">
              {data &&
                data.carSearchFilter.cars.map((post, index) => (
                  <Post index={index} post={post} />
                ))}
            </div>
            <div className="latest-ads__view-more all-ads__posts__posts--load-more">
              <div className="latest-ads__view-more__btn">
                <i class="fas fa-arrow-circle-right"></i>Load more
              </div>
            </div>

            <div className="all-ads__posts__posts__bottom-info">
              <h2>Do have anything to sell or rent? </h2>
              <p>
                Sell your products and services online FOR FREE. It is easier
                than you think!
              </p>
              <button>Sell Now!</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllAds;
