import React from "react";

const PersonalHome = () => {
  return (
    <>
      <div className="dashboard__main__quick-stat card">
        <figure className="dashboard__main__quick-stat__avatar">
          <i className="fa fa-user"></i>

          <h2>Christian</h2>
        </figure>

        <div className="dashboard__main__quick-stat__values">
          <div className="dashboard__main__quick-stat__values__group">
            <i class="far fa-envelope"></i>
            <div>
              <span>0</span>
              <span>mail</span>
            </div>
          </div>
          <div className="dashboard__main__quick-stat__values__group">
            <i class="far fa-eye"></i>
            <div>
              <span>0</span>
              <span>visit</span>
            </div>
          </div>
          <div className="dashboard__main__quick-stat__values__group">
            <i class="fas fa-th-large"></i>
            <div>
              <span>0</span>
              <span>ad</span>
            </div>
          </div>
          <div className="dashboard__main__quick-stat__values__group">
            <i class="far fa-user"></i>
            <div>
              <div>
                <span>0</span>
                <span>favorite</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard__main__profile card">
        <div className="dashboard__main__profile__heading">
          <h2 className="">Hello Christian ! </h2>
          <p>You last logged in at: 05 January 2021 06:54 </p>
        </div>
        <div className="dashboard__main__profile__photo card">
          <div className="dashboard__main__profile__photo__header">
            Photo or Avatar
          </div>
          <div className="dashboard__main__profile__photo__body">
            <figure className="dashboard__main__profile__photo__body__img card">
              <div>
                <img
                  src="https://secure.gravatar.com/avatar/88527944e354382ff8d8d02009535165.jpg?s=150&amp;d=https%3A%2F%2Fwww.cheapcars.ng%2Fimages%2Fuser.jpg&amp;r=g"
                  alt="Profile"
                />
                <span>Click to select</span>
              </div>
            </figure>
          </div>
        </div>

        <div className="dashboard__main__profile__photo card">
          <div className="dashboard__main__profile__photo__header">
            Account Details
          </div>
          <div className="dashboard__main__profile__account__body">
            <form action="" className="form form--account">
              <div className="formGroup">
                <label htmlFor="" className="formGroup__label">
                  Name
                </label>
                <div className="formGroup__inputs__single">
                  <input type="text" className="formGroup__input" />
                </div>
              </div>
              <div className="formGroup">
                <label htmlFor="" className="formGroup__label">
                  Username
                </label>
                <div className="formGroup__inputs__double">
                  <i className="fa fa-user"></i>
                  <input
                    type="text"
                    className="formGroup__input"
                    placeholder="Name"
                  />
                </div>
              </div>

              <div className="formGroup">
                <label htmlFor="" className="formGroup__label">
                  Email
                </label>
                <div className="formGroup__inputs__double">
                  <i class="fas fa-envelope"></i>
                  <input
                    type="text"
                    className="formGroup__input"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="formGroup">
                <label htmlFor="" className="formGroup__label">
                  Phone
                </label>
                <div className="formGroup__inputs__tripple">
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
              <button className="form__browse">Update</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalHome;
