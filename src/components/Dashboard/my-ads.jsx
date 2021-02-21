import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCarByOwnerQuery } from "../../operations/queries";
import { useDeleteCarMutation, useDeleteAllCarMutation } from "../../operations/mutations";
import Warning from "../Commons/warning";
import { useRecoilState } from "recoil";
import { showWarningState } from "../../recoil/atoms";
import numberWithCommas from "../../utilities/number-with-commas";

const MyAds = () => {
  const [, setModalShow] = useRecoilState(showWarningState);
  const [carId, setCarId] = useState(null);
  const [checked, setChecked] = useState([]);
  const [deleteCar] = useDeleteCarMutation();
  const [deleteAllCars] = useDeleteAllCarMutation()
  const { data } = useCarByOwnerQuery();

  const handleDelete = (id) => {
    deleteCar({ _id: carId });
  };

  const handleDeleteAll = () => {
    deleteAllCars({items: checked})
    console.log("items to delete", checked)
  }

  const handleSelect = (id) => {
    let allSelected = [...checked];
    if (allSelected.includes(id)) {
      allSelected = allSelected.filter((item) => item !== id);
    } else allSelected.push(id);
    setChecked(allSelected);
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    if (data && data.carsByOwner.cars) {
      const allSelections = [];
      if (isChecked) {
        data.carsByOwner.cars.forEach((car) => allSelections.push(car._id));
        setChecked(allSelections);
      } else setChecked([]);
    }

  };
  return (
    <div className="dashboard__main__my-ads card">
      <Warning
        callback={checked.length ? handleDeleteAll : handleDelete}
        message={`${
          checked.length
            ? `You will not be able to recover ${checked.length} item(s) marked for delete`
            : "You will not be able to recover this ad"
        }`}
      />
      <div className="dashboard__main__my-ads__heading">
        <i className="far fa-image"></i> <h2 className="">My Ads </h2>
      </div>

      <div className="dashboard__main__my-ads__actions">
        <div className="dashboard__main__my-ads__actions__delete">
          <div>
            <input type="checkbox" id="select-all" onChange={handleSelectAll} />
            <label htmlFor="select-all"> Select All</label>
          </div>

          <button disabled={!checked.length} onClick={() => setModalShow(true)}>
            <i className="fa fa-trash"></i>
            <span>Delete</span>
          </button>
        </div>

        <div className="dashboard__main__my-ads__actions__search">
          <input type="text" placeholder="Search" />
          <span>
            <i class="fas fa-search"></i>
          </span>
        </div>
      </div>
      <div className="dashboard__main__my-ads__table">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Photo</th>
              <th scope="col">Ad Details</th>
              <th scope="col">Price</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.carsByOwner &&
              data.carsByOwner.cars.map((car, index) => (
                <tr>
                  <th scope="row">
                    <input
                      type="checkbox"
                      onChange={() => handleSelect(car._id)}
                      checked={checked.includes(car._id)}
                    />
                  </th>
                  <td
                    className={`dashboard__main__my-ads__table__picture ${
                      checked.includes(car._id) && "disable-element"
                    }`}
                  >
                    <div>
                      {" "}
                      <img src={car.pictures[0]} alt={car.title} />
                    </div>
                  </td>
                  <td
                    className={`${
                      checked.includes(car._id) && "disable-element"
                    }`}
                  >
                    {car.title}
                  </td>
                  <td
                    className={`${
                      checked.includes(car._id) && "disable-element"
                    }`}
                  >{`₦ ${numberWithCommas(car.price)}`}</td>
                  <td
                    className={`dashboard__main__my-ads__table__options ${
                      checked.includes(car._id) && "disable-element"
                    }`}
                  >
                    <input type="checkbox" id={index} />
                    <label htmlFor={index}>
                      <i class="fas fa-ellipsis-v"></i>
                      <ul>
                        <li>
                          <Link
                            to={{
                              pathname: "/ads/new",
                              state: {
                                _id: car._id,
                                make: car.make,
                                type: car.pricing.type,
                                planId: car.pricing._id,
                                price: car.price,
                                currency: car.pricing.currency,
                                currencySymbol: car.pricing.currencySymbol,
                              },
                            }}
                          >
                            <svg
                              data-v-9a6e255c=""
                              xmlns="http://www.w3.org/2000/svg"
                              width="14px"
                              height="14px"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="feather feather-edit"
                            >
                              <path
                                data-v-9a6e255c=""
                                d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                              ></path>
                              <path
                                data-v-9a6e255c=""
                                d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                              ></path>
                            </svg>
                            <span>Edit</span>
                          </Link>
                        </li>
                        <li>
                          <svg
                            data-v-9a6e255c=""
                            xmlns="http://www.w3.org/2000/svg"
                            width="14px"
                            height="14px"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-trash"
                          >
                            <polyline
                              data-v-9a6e255c=""
                              points="3 6 5 6 21 6"
                            ></polyline>
                            <path
                              data-v-9a6e255c=""
                              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                            ></path>
                          </svg>
                          <span
                            onClick={() => {
                              console.log("clicked");
                              setCarId(car._id);
                              setModalShow(true);
                            }}
                          >
                            Delete
                          </span>
                        </li>

                        <li>
                          <i class="far fa-eye-slash"></i>
                          <span>Hide</span>
                        </li>
                      </ul>
                    </label>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAds;
