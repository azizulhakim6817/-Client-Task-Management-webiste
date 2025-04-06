import React, { Fragment, Suspense, lazy } from "react";
import MasterLayout from "./../components/masterLayout/MasterLayout";
import LazyLoader from "./../components/masterLayout/LazyLoader";
const NewTask = lazy(() => import("./../components/newTask/NewTask"));

const NewTaskPage = () => {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <NewTask />
        </Suspense>
      </MasterLayout>
    </Fragment>
  );
};

export default NewTaskPage;
