import React from "react";

const Skeleton = () => {
  return (
    <>
      <div className="dashboard__main__quick-stat card">
        <figure className="dashboard__main__quick-stat__avatar">
          <div className="dashboard__main__quick-stat__avatar__user"></div>

          <div className="dashboard__main__quick-stat__avatar__name"></div>

          <div className="skeleton__hover"></div>
        </figure>
      </div>
      <div className="dashboard__main__profile card">
        <div className="dashboard__main__profile__heading">
          <div className="dashboard__main__profile__heading__welcome"></div>
          <div className="dashboard__main__profile__heading__date"></div>
          <div className="skeleton__hover"></div>
        </div>
        <div className="dashboard__main__profile__photo card">
          <div className="dashboard__main__profile__photo__header">
            <div className="dashboard__main__profile__photo__header__title"></div>
            <div className="skeleton__hover"></div>
          </div>
          <div className="dashboard__main__profile__photo__body">
            <figure className="dashboard__main__profile__photo__body__img dashboard__main__profile__photo__body__img--skeleton card">
              <figure className="skeleton__hover skeleton__hover--white"></figure>
            </figure>
          </div>
        </div>

        <div className="dashboard__main__profile__photo card">
          <div className="dashboard__main__profile__photo__header">
            <div className="dashboard__main__profile__photo__header__title"></div>
          </div>
          <div className="dashboard__main__profile__account__body">
            <form action="" className="form form--account">
              <div className="formGroup">
                <label
                  htmlFor=""
                  className="formGroup__label formGroup__label--skeleton"
                ></label>
                <div className="formGroup__inputs__single formGroup__inputs__single--skeleton"></div>
              </div>
              <div className="formGroup">
                <label
                  htmlFor=""
                  className="formGroup__label formGroup__label--skeleton"
                ></label>
                <div className="formGroup__inputs__single formGroup__inputs__single--skeleton"></div>
              </div>

              <div className="formGroup">
                <label
                  htmlFor=""
                  className="formGroup__label formGroup__label--skeleton"
                ></label>
                <div className="formGroup__inputs__single formGroup__inputs__single--skeleton"></div>
              </div>
              <div className="formGroup">
                <label
                  htmlFor=""
                  className="formGroup__label formGroup__label--skeleton"
                ></label>
                <div className="formGroup__inputs__single formGroup__inputs__single--skeleton"></div>
              </div> <div className="formGroup">
                <label
                  htmlFor=""
                  className="formGroup__label formGroup__label--skeleton"
                ></label>
                <div className="formGroup__inputs__single formGroup__inputs__single--skeleton"></div>
              </div>
              <div className="formGroup">
                <div className="formGroup__inputs__tripple formGroup__inputs__tripple--skeleton">
                  <i class="fas fa-phone"></i>
                  <input
                    type="text"
                    className="formGroup__input"
                    placeholder="Phone"
                  />
                  <div className="formGroup__inputs__tripple__check">
                    <input
                      className="formGroup__inputs__tripple__checkbox"
                      type="checkbox"
                    />
                    <label
                      htmlFor=""
                      className="formGroup__inputs__tripple__label"
                    >
                      Hide
                    </label>
                  </div>
                </div>
              </div>
              <figure className="skeleton__hover skeleton__hover--white"></figure>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skeleton;
