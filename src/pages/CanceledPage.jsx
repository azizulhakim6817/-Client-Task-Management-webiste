import React, { Fragment, Suspense, lazy } from "react";
import MasterLayout from "../components/masterLayout/MasterLayout";
import LazyLoader from "../components/masterLayout/LazyLoader"; 
const Canceled = lazy(() => import("../components/canceled/Canceled"));

const CanceledPage = () => {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Canceled />
        </Suspense>
      </MasterLayout>
    </Fragment>
  );
};

export default CanceledPage;
