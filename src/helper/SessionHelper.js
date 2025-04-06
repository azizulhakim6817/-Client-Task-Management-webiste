class SessionHelper {
  setToken(token) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }

  setUserDetails(UserDetails) {
    localStorage.setItem("userDetails", JSON.stringify(UserDetails));
  }
  getUserDetails() {
    return JSON.parse(localStorage.getItem("userDetails"));
  }

  removeSessionLogout() {
    localStorage.clear();
    window.location.href = "login";
  }

  // ! set, get Eamil ..................................
  setEmail(Email) {
    localStorage.setItem("Email", Email);
  }
  getEmail() {
    return localStorage.getItem("Email");
  }

  //! set, get OTP ..........................
  setOTP(OTP) {
    localStorage.setItem("OTP", OTP);
  }
  getOPT() {
    return localStorage.getItem("OTP");
  }
}

export const {
  setToken,
  getToken,
  getUserDetails,
  setUserDetails,
  removeSessionLogout,
  setEmail,
  getEmail,
  setOTP,
  getOPT,
} = new SessionHelper();
