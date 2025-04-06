import React, { Fragment, useState } from "react";
import ReactCodeInput from "react-code-input";
import { ErrorToast } from "../../helper/FormHelper";
import { RecoverVerifyOTPRequest } from "../../APIRequest/APIRequest";
import { getEmail } from "../../helper/SessionHelper";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [OTP, SetOtp] = useState("");

  const handleVerifyOTP = () => {
    if (OTP.length === 6) {
      RecoverVerifyOTPRequest(getEmail(), OTP).then((result) => {
        if (result === true) {
          navigate("/create-password");
        }
      });
    } else {
      ErrorToast("Enter your code musb be 6 digits");
    }
  };

  const defaultInputStyle = {
    fontFamily: "monospace",
    margin: "4px",
    MozAppearance: "textfield",
    width: "40px",
    borderRadius: "4px",
    fontSize: "24px",
    height: "40px",
    paddingLeft: "7px",
    backgroundColor: "white",
    color: "black",
    border: "1px solid lightgrey",
  };

  return (
    <Fragment>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row col-md-7 col-lg-6">
          <div className="card w-100 p-4 shadow">
            <div className="card-body text-center">
              <h4 className="mb-4 fw-bold">A 6-digits Varify OTP Code! 👁</h4>
              <ReactCodeInput
                fields={6}
                inputStyle={defaultInputStyle}
                onChange={(value) => SetOtp(value)}
              />
              <br />
              <br />
              <button
                className="btn btn-primary w-50"
                onClick={handleVerifyOTP}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VerifyOTP;
