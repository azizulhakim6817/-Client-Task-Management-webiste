import React, { useEffect, useRef } from "react";
import "../../assets/css/sidebar.css";
import { GetProfile, ProfileUpdateRequest } from "../../APIRequest/APIRequest";
import { useSelector } from "react-redux";
import { getUserDetails } from "../../helper/SessionHelper";
import {
  ErrorToast,
  getBase64,
  IsEmail,
  IsEmpty,
  IsMobile,
} from "../../helper/FormHelper";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const Navigate = useNavigate();

  let userImgRef = useRef();
  let userImgViewRef = useRef();
  let emailRef = useRef();
  let firstNameRef = useRef();
  let lastNameRef = useRef();
  let mobileRef = useRef();
  let passwordRef = useRef();

  useEffect(() => {
    GetProfile();
  }, []);

  const ProfileData = useSelector((state) => state.profile?.value);

  //! base64 image to convert ........................
  const PreviewImage = () => {
    let ImageFile = userImgRef.current.files[0];
    getBase64(ImageFile).then((base64Ima) => {
      userImgViewRef.current.src = base64Ima;
    });
  };

  const UpdateMyProfileButton = () => {
    let email = emailRef.current.value;
    let firstName = firstNameRef.current.value;
    let lastName = lastNameRef.current.value;
    let mobile = mobileRef.current.value;
    let password = passwordRef.current.value;
    let photo = userImgViewRef.current.src;

    // Validation logic...............................
    if (!IsEmail(email)) {
      ErrorToast("Valid Email Address Required");
      return;
    } else if (IsEmpty(firstName)) {
      ErrorToast("First Name Required");
      return;
    } else if (IsEmpty(lastName)) {
      ErrorToast("Last Name Required");
      return;
    } else if (!IsMobile(mobile)) {
      ErrorToast("Invalid Mobile Number");
      return;
    } else if (IsEmpty(password)) {
      ErrorToast("Password is Required");
      return;
    } else {
      ProfileUpdateRequest(
        email,
        firstName,
        lastName,
        mobile,
        password,
        photo
      ).then((result) => {
        if (result === true) {
          Navigate("/");
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-sm-10 col-md-12 col-lg-11 mt-5">
          <div className="card shadow-lg">
            <div className="card-body">
              <div className="container-fluid">
                <div className="text-center mb-4">
                  <img
                    ref={userImgViewRef}
                    className="profile-image-lg"
                    src={ProfileData?.photo || getUserDetails()?.photo}
                    alt="Profile"
                  />
                  <hr />
                </div>

                <div className="row">
                  {/* Profile Picture */}
                  <div className="col-12 col-sm-6 col-md-4 p-2">
                    <label>Profile Picture:</label>
                    <input
                      type="file"
                      className="form-control animated fadeInUp"
                      ref={userImgRef}
                      onChange={PreviewImage}
                      key={Date.now()}
                    />
                  </div>

                  {/* Email Address */}
                  <div className="col-12 col-sm-6 col-md-4 p-2">
                    <label>Email Address:</label>
                    <input
                      type="email"
                      className="form-control animated fadeInUp"
                      ref={emailRef}
                      defaultValue={ProfileData?.email}
                      key={Date.now()}
                    />
                  </div>

                  {/* First Name */}
                  <div className="col-12 col-sm-6 col-md-4 p-2">
                    <label>First Name:</label>
                    <input
                      type="text"
                      className="form-control animated fadeInUp"
                      ref={firstNameRef}
                      defaultValue={ProfileData?.firstName}
                      key={Date.now()}
                    />
                  </div>

                  {/* Last Name */}
                  <div className="col-12 col-sm-6 col-md-4 p-2">
                    <label>Last Name:</label>
                    <input
                      type="text"
                      className="form-control animated fadeInUp"
                      ref={lastNameRef}
                      defaultValue={ProfileData?.lastName}
                      key={Date.now()}
                    />
                  </div>

                  {/* Mobile Number */}
                  <div className="col-12 col-sm-6 col-md-4 p-2">
                    <label>Mobile Number:</label>
                    <input
                      type="text"
                      className="form-control animated fadeInUp"
                      ref={mobileRef}
                      defaultValue={ProfileData?.mobile}
                      key={Date.now()}
                    />
                  </div>

                  {/* Password */}
                  <div className="col-12 col-sm-6 col-md-4 p-2">
                    <label>Password:</label>
                    <input
                      type="password"
                      className="form-control animated fadeInUp"
                      defaultValue={ProfileData?.password}
                      ref={passwordRef}
                      key={Date.now()}
                    />
                  </div>
                </div>

                {/* Update Profile Button */}
                <div className="d-flex justify-content-center">
                  <button
                    onClick={UpdateMyProfileButton}
                    className="btn btn-primary mt-3 w-100 animated fadeInUp"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
