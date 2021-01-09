import React from "react";

const MyAds = () => {
  return (
    <div className="dashboard__main__my-ads card">
      <div className="dashboard__main__my-ads__heading">
        <i className="far fa-image"></i> <h2 className="">My Ads </h2>
      </div>

      <div className="dashboard__main__my-ads__actions">
        <div className="dashboard__main__my-ads__actions__delete">
          <div>
            <input type="checkbox" id="select-all" />{" "}
            <label htmlFor="select-all"> Select All</label>
          </div>

          <button>
            <i className="fa fa-trash"></i>
            <span>Delete</span>
          </button>
        </div>

        <div className="dashboard__main__my-ads__actions__search">
          <input type="text" placeholder="Search" />{" "}
          <span>
            <i class="fas fa-search"></i>
          </span>
        </div>

        
      </div><div className="dashboard__main__my-ads__table">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Photo</th>
                <th scope="col">Ad Details</th>
                <th scope="col">--</th>
                <th scope="col">Option</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default MyAds;
