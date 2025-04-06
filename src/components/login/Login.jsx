import React, { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ErrorToast, IsEmail } from "../../helper/FormHelper";
import { LoginRequest } from "../../APIRequest/APIRequest";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  let emailRef = useRef(null);
  let passwordRef = useRef(null);

  const SubmitLogin = () => {
    let email = emailRef.current.value;
    let password = passwordRef.current.value;

    if (!IsEmail(email)) {
      ErrorToast("Invalid Email Address");
    } else if (!password) {
      ErrorToast("Password Required");
    } else {
      LoginRequest(email, password).then((result) => {
        if (result) {
          window.location.href = "/";
        }
      });
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Fragment>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6 center-screen">
            <div className="card w-90 p-4 shadow-lg">
              <div className="card-body">
                <h4 className=" text-center fw-bold">Sign In</h4>
                <br />
                <input
                  type="email"
                  placeholder="User Email"
                  className="form-control animated fadeUp"
                  ref={emailRef}
                />
                <br />
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
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
                <br />
                <button
                  onClick={SubmitLogin}
                  className="btn w-100 animated fadeInUp float-end btn-primary"
                >
                  Next
                </button>
                <br />
                <br />
                <div className="text-center w-100">
                  <Link
                    className="text-center fw-bold animated fadeInUp text-decoration-none"
                    to="/registration"
                  >
                    Sign Up
                  </Link>
                  <br />
                  <Link
                    className="text-center fw-bold animated fadeInUp text-decoration-none"
                    to="/send-otp"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
