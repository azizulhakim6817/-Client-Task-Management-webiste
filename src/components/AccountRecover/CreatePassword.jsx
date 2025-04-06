import React, { Fragment, useRef, useState } from "react";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";
import { RecoverResetPassword } from "../../APIRequest/APIRequest";
import { getEmail, getOPT } from "../../helper/SessionHelper";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const CreatePassword = () => {
  let navigate = useNavigate();
  let passwordRef = useRef();
  let confirmPasswordRef = useRef();

  //password show and hide ...........................
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // Reset Password
  const ResetPassButton = () => {
    let password = passwordRef.current.value;
    let confirmPassword = confirmPasswordRef.current.value;
    if (IsEmpty(password)) {
      ErrorToast("Password is required");
    } else if (IsEmpty(confirmPassword)) {
      ErrorToast("Confirm Password is required");
    } else if (password !== confirmPassword) {
      ErrorToast("Passwords and Confirm password do not match");
    } else {
      RecoverResetPassword(getEmail(), getOPT(), password).then((result) => {
        if (result === true) {
          navigate("/login");
        }
      });
    }
  };

  //password show and hide ...........................
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const togglePassword2 = () => {
    setShowPassword2((prev) => !prev);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center mt-5 ">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-90 p-4 shadow-lg">
              <div className="card-body">
                <h4 className="text-center fw-semibold">Set New Password</h4>

                <label className="mt-2 fw-semibold">Your Email Address:</label>
                <input
                  type="email"
                  placeholder="User Email..."
                  className="form-control animated fadeInUp"
                  readOnly={true}
                  value={getEmail()}
                />

                <label className="mt-2 fw-semibold">New Password:</label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password..."
                    className="form-control animated fadeInUp"
                    ref={passwordRef}
                  />
                  <span
                    onClick={togglePassword}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "15px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#999",
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <label className="mt-2 fw-semibold">Confirm Password:</label>
                <div className="position-relative">
                  <input
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Confirm Password..."
                    className="form-control animated fadeInUp"
                    ref={confirmPasswordRef}
                  />
                  <span
                    onClick={togglePassword2}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "15px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#999",
                    }}
                  >
                    {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <br />
                <button
                  type="button"
                  className="btn btn-primary w-100 btn-block animated fadeInUp"
                  onClick={ResetPassButton}
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

export default CreatePassword;
