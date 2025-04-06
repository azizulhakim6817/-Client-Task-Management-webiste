import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { SummaryRequest } from "../../APIRequest/APIRequest";

const Dashboard = () => {
  useEffect(() => {
    SummaryRequest();
  }, []);

  const SummaryList = useSelector((state) => state.summary.value);

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          {SummaryList?.map((item, i) => (
            <div key={i} className="col-12 col-lg-3 col-sm-6 col-md-3 p-4">
              <div className="card h-100">
                <div className=" card-body text-center">
                  <h6 className="animated fadeInUp fw-semibold">
                    {item?._id} Total
                  </h6>
                  <h6 className="text-secondary animated fadeInUp">
                    {item?.sum}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
