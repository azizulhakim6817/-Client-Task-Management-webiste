import React, { Fragment, Suspense, lazy } from "react";
import MasterLayout from "../components/masterLayout/MasterLayout";
import LazyLoader from "./../components/masterLayout/LazyLoader";
const Create = lazy(() => import("../components/create/Create"));

const CreatePage = () => {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Create />
        </Suspense>
      </MasterLayout>
    </Fragment>
  );
};

export default CreatePage;
