import React, { Fragment, Suspense, lazy } from "react";
import MasterLayout from "./../components/masterLayout/MasterLayout";
import LazyLoader from "./../components/masterLayout/LazyLoader";
const InProgress = lazy(() => import("./../components/progress/InProgress"));

const ProgressPage = () => {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <InProgress />
        </Suspense>
      </MasterLayout>
    </Fragment>
  );
};

export default ProgressPage;
