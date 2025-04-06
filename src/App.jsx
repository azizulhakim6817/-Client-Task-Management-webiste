import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import CreatePage from "./pages/CreatePage";
import NewTaskPage from "./pages/NewTaskPage";
import ProgressPage from "./pages/ProgressPage";
import CompletedPage from "./pages/CompletedPage";
import CanceledPage from "./pages/CanceledPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import Registration from "./components/registration/Registration";
import Page404 from "./pages/Page404";
import ForgetPassPage from "./pages/ForgetPassPage";
import FullscreenLoader from "./components/masterLayout/FullscreenLoader.jsx";
import { getToken } from "./helper/SessionHelper.js";

import CreatePasswordPage from "./pages/AccoutRecover/CreatePasswordPage";
import VerifyOTPPage from "./pages/AccoutRecover/VerifyOTPPage.jsx";
import SendOTPPage from "./pages/AccoutRecover/SendOTPPage.jsx";

const App = () => {
  if (getToken()) {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/new-task" element={<NewTaskPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/completed" element={<CompletedPage />} />
            <Route path="/canceled" element={<CanceledPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
        <FullscreenLoader />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/forget-pass" element={<ForgetPassPage />} />
            <Route path="/send-otp" element={<SendOTPPage />} />
            <Route path="/verify-otp" element={<VerifyOTPPage />} />
            <Route path="/create-password" element={<CreatePasswordPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
        <FullscreenLoader />
      </Fragment>
    );
  }
};

export default App;
