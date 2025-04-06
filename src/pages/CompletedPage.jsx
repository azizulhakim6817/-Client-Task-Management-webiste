import React, { Fragment, Suspense, lazy } from "react";
import MasterLayout from "../components/masterLayout/MasterLayout";
import LazyLoader from './../components/masterLayout/LazyLoader';
const Completed = lazy(() => import("../components/completed/Completed"));

const CompletedPage = () => {
  return (
    <Fragment>
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <Completed />  
      </Suspense>
    </MasterLayout>
  </Fragment>
  );
};

export default CompletedPage;
