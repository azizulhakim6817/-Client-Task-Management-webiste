import React, { Fragment } from "react";
import "../../assets/css/progress.css";
import { useSelector } from "react-redux";

const FullscreenLoader = () => {
  const loader = useSelector((state) => state.settings?.loader);

  return (
    <Fragment>
      <div className={`LoadingOverlay ${loader}`}>
        <div className="Line-Progress">
          <div className="indeterminate"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default FullscreenLoader;
