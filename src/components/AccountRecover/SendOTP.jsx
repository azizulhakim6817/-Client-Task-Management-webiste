import React, { Fragment, useRef } from "react";
import { ErrorToast, IsEmail } from "../../helper/FormHelper.js";
import { RecoverVerifyEmailRequest } from "../../APIRequest/APIRequest";
import { useNavigate } from "react-router-dom";

const SendOTP = () => {
  const navigate = useNavigate();
  const emailRef = useRef();

  const VerifyOTPButton = () => {
    const email = emailRef.current.value;
    if (!IsEmail(email)) {
      ErrorToast("Valid email address required!");
      return;
    }
    RecoverVerifyEmailRequest(email).then((result) => {
      if (result === true) {
        navigate("/verify-otp");
      }
    });
  };

  return (
    <Fragment>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-90 p-4">
              <div className="card-body">
                <h4 className="fw-bold">Email Address:</h4>
                <br />
                <input
                  type="email"
                  className="form-control animated fadeInUp"
                  placeholder="User Email Address"
                  ref={emailRef}
                />
                <br />
                <button
                  onClick={VerifyOTPButton}
                  className="btn w-100 animated fadeInUp float-end btn-primary"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SendOTP;
