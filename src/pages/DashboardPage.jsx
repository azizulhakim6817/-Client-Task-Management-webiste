import React from "react";
import MasterLayout from "./../components/masterLayout/MasterLayout";
import { Fragment, Suspense, lazy } from "react";
import LazyLoader from "./../components/masterLayout/LazyLoader";
const Dashboard = lazy(() => import("../components/dashboard/Dashboard"));

const DashboardPage = () => {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Dashboard />
        </Suspense>
      </MasterLayout>
    </Fragment>
  );
};

export default DashboardPage;
