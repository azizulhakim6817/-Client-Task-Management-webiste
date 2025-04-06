import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IsEmail,
  IsMobile,
  IsEmpty,
  ErrorToast,
} from "../../helper/FormHelper";
import { RegistrationRequest } from "../../APIRequest/APIRequest";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Registration = () => {
  const navigate = useNavigate();

  // password show and hide......................................
  const [showPassword, setShowPassword] = useState(false);
  let togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const mobileRef = useRef();
  const passwordRef = useRef();

  const onRegistration = (event) => {
    event.preventDefault();

    let email = emailRef.current.value;
    let firstName = firstNameRef.current.value;
    let lastName = lastNameRef.current.value;
    let mobile = mobileRef.current.value;
    let password = passwordRef.current.value;
    let photo =
      "data:image/png;base64,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";

    // Validation logic...............................
    if (!IsEmail(email)) {
      ErrorToast("Valid Email Address Required");
    } else if (IsEmpty(firstName)) {
      ErrorToast("First Name Required");
    } else if (IsEmpty(lastName)) {
      ErrorToast("Last Name Required");
    } else if (!IsMobile(mobile)) {
      ErrorToast("Invalid Mobile Number");
    } else if (IsEmpty(password)) {
      ErrorToast("Password is Required");
    } else {
      RegistrationRequest(
        email,
        firstName,
        lastName,
        mobile,
        password,
        photo
      ).then((result) => {
        if (result === true) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="card animated fadeIn w-100 p-3 shadow-lg">
            <div className="card-body">
              <h4 className="text-center fw-bold">Sign Up</h4>
              <br />
              {/* Form element added */}
              <form onSubmit={onRegistration}>
                <input
                  type="email"
                  placeholder="User Email"
                  className="form-control animated fadeInUp w-100"
                  ref={emailRef}
                  required
                  autoComplete="email"
                />
                <br />
                <input
                  type="text"
                  placeholder="First Name"
                  className="form-control animated fadeInUp"
                  ref={firstNameRef}
                  required
                />
                <br />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="form-control animated fadeInUp"
                  ref={lastNameRef}
                  required
                />
                <br />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="form-control animated fadeInUp"
                  ref={mobileRef}
                  required
                  autoComplete="tel"
                />
                <br />
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="User Password"
                    className="form-control animated fadeInUp"
                    ref={passwordRef}
                    autoComplete="new-password"
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
                  type="submit"
                  className="btn w-100 float-end btn-primary animated fadeInUp"
                >
                  Next
                </button>
              </form>
              <br />
              <br />
              <div className="text-center w-100">
                <Link
                  className="text-center fw-semibold text-decoration-none"
                  to="/login"
                >
                  Sign In
                </Link>
                <br />
                <Link
                  className="text-center fw-semibold text-decoration-none"
                  to="/send-otp"
                >
                  Forget Password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
