import React, { Fragment, Suspense, lazy } from "react";
import MasterLayout from "./../components/masterLayout/MasterLayout";
import LazyLoader from "./../components/masterLayout/LazyLoader";
const Registration = lazy(() =>
  import("./../components/registration/Registration")
);

const RegistrationPage = () => {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Registration />
        </Suspense>
      </MasterLayout>
    </Fragment>
  );
};

export default RegistrationPage;
