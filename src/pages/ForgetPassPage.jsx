import React, { Fragment, Suspense, lazy } from "react";
import MasterLayout from './../components/masterLayout/MasterLayout';
import LazyLoader from './../components/masterLayout/LazyLoader';
const ForgetPass = lazy(() => import("./../components/masterLayout/LazyLoader"));

const ForgetPassPage = () => {
  return (
    <Fragment>
    <MasterLayout>
      <Suspense fallback={<LazyLoader />}>
        <ForgetPass />
      </Suspense>
    </MasterLayout>
  </Fragment>
  );
};

export default ForgetPassPage;
