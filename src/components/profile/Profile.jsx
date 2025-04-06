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
        <div className="col-md-11 mt-5">
          <div className="card">
            <div className="card-body">
              <div className="container-fluid">
                <img
                  ref={userImgViewRef}
                  className="icon-nav-img profile-image-lg"
                  src={ProfileData?.photo || getUserDetails()?.photo}
                  alt="Profile"
                />
                <hr />
                <div className="row">
                  <div className="col-4 p-2">
                    <label>Profile Picture:</label>
                    <input
                      type="file"
                      className="form-control animated fadeInUp"
                      ref={userImgRef}
                      onChange={PreviewImage}
                      key={Date.now()}
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Email Address:</label>
                    <input
                      type="email"
                      className="form-control animated fadeInUp"
                      ref={emailRef}
                      defaultValue={ProfileData?.email}
                      key={Date.now()}
                    />
                  </div>

                  <div className="col-4 p-2">
                    <label>First Name:</label>
                    <input
                      type="text"
                      className="form-control animated fadeInUp"
                      ref={firstNameRef}
                      defaultValue={ProfileData?.firstName}
                      key={Date.now()}
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Last Name:</label>
                    <input
                      type="text"
                      className="form-control animated fadeInUp"
                      ref={lastNameRef}
                      defaultValue={ProfileData?.lastName}
                      key={Date.now()}
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Mobile Number:</label>
                    <input
                      type="text"
                      className="form-control animated fadeInUp"
                      ref={mobileRef}
                      defaultValue={ProfileData?.mobile}
                      key={Date.now()}
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Password:</label>
                    <input
                      type="password"
                      className="form-control animated fadeInUp"
                      ref={passwordRef}
                      key={Date.now()}
                    />
                  </div>
                  <div>
                    <button
                      onClick={UpdateMyProfileButton}
                      className="w-25 mt-3 float-start btn btn-primary animated fadeInUp"
                    >
                      Update profile
                    </button>
                  </div>
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
