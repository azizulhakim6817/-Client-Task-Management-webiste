import React from 'react';
import { Fragment } from 'react';
import "../../assets/css/progress.css";

const LazyLoader = () => {
    return (
       <Fragment>
            <div className="LoadingOverlay ">
              <div className="Line-Progress">
                <div className="indeterminate"></div>
              </div>
            </div>
          </Fragment>
    );
};

export default LazyLoader;