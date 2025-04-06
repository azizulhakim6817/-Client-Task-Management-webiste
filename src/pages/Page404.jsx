import React, { Fragment, Suspense, lazy } from "react";
import LazyLoader from "./../components/masterLayout/LazyLoader";
const NotFound = lazy(() => import("./../components/notFound/NotFound"));

const Page404 = () => {
  return (
    <Fragment>
      <Suspense fallback={<LazyLoader />}>
        <NotFound />
      </Suspense>
    </Fragment>
  );
};

export default Page404;
