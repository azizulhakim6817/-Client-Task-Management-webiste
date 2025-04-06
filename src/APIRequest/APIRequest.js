import { ErrorToast, SuccessToast } from "../helper/FormHelper.js";
import axios from "axios";
import store from "../redux/store/Store.js";
import { HideLoader, ShowLoader } from "../redux/state-slice/SittingsSlice";
import {
  getToken,
  setEmail,
  setOTP,
  setToken,
  setUserDetails,
} from "../helper/SessionHelper.js";
import {
  setCanceled,
  setCompletedTask,
  setNewTask,
  setProgressTask,
} from "../redux/state-slice/taskSlice.js";
import { setSummary } from "../redux/state-slice/SummarySlice.js";
import { SetProfile } from "../redux/state-slice/ProfileSlice.js";

const BaseURL = "https://tasks-management-website.vercel.app/api";
const AxiosHeader = { headers: { token: getToken() } };

//! Registration API
export function RegistrationRequest(
  email,
  firstName,
  lastName,
  mobile,
  password,
  photo
) {
  store.dispatch(ShowLoader());
  let URL = BaseURL + "/registration";
  let PostBody = { email, firstName, lastName, mobile, password, photo };

  return axios
    .post(URL, PostBody)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200) {
        if (res.data["status"] === "fail") {
          if (res.data["error"]?.includes("E11000 duplicate key error")) {
            ErrorToast("Email Already Exists");
            return false;
          } else {
            ErrorToast("Something is wrong with your registration");
            return false;
          }
        } else {
          ErrorToast("Something went wrong");
          return false;
        }
      } else {
        SuccessToast("Registration Successful");
        return true;
      }
    })
    .catch((err) => {
      store.dispatch(HideLoader());
      if (err.response?.data?.error?.includes("E11000 duplicate key error")) {
        ErrorToast("Email Already Exists");
      } else {
        ErrorToast("Something went wrong");
      }
      return false;
    });
}

//! Login Request
export function LoginRequest(email, password) {
  store.dispatch(ShowLoader());
  let URL = BaseURL + "/login";
  let PostBody = { email, password };
  return axios
    .post(URL, PostBody)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200) {
        setToken(res.data["token"]);
        setUserDetails(res.data["data"]);
        SuccessToast("Loading success");
        return true;
      } else {
        ErrorToast("Invalid Email or Password");
        return false;
      }
    })
    .catch((err) => {
      ErrorToast("Something went wrong");
      store.dispatch(HideLoader());
      return false;
    });
}

//! Create Task
export function NewTaskRequest(title, description) {
  store.dispatch(ShowLoader());
  let URL = BaseURL + "/createTask";
  let PostBody = { title, description, status: "New" };

  return axios
    .post(URL, PostBody, AxiosHeader)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200 && res.data?.status === "success") {
        store.dispatch(HideLoader());
        SuccessToast("New Task created successfully");
        return true;
      } else {
        ErrorToast("Failed to create task");
        return false;
      }
    })
    .catch((err) => {
      ErrorToast("Something went wrong");
      store.dispatch(HideLoader());
      return false;
    });
}

//! All List =>  newTask, progress, canceled, completed
export function TaskListByStatus(Status) {
  store.dispatch(ShowLoader());
  let URL = BaseURL + "/listTaskByStatus/" + Status;
  return axios
    .get(URL, AxiosHeader)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200 && res.data?.status === "success") {
        if (Status === "New") {
          store.dispatch(setNewTask(res.data["data"]));
        } else if (Status === "Completed") {
          store.dispatch(setCompletedTask(res.data["data"]));
        } else if (Status === "Progress") {
          store.dispatch(setProgressTask(res.data["data"]));
        } else if (Status === "Canceled") {
          store.dispatch(setCanceled(res.data["data"]));
        } else {
          ErrorToast("Invalid status");
        }
      }
    })
    .catch((error) => {
      ErrorToast("Something went wrong");
      store.dispatch(HideLoader());
    });
}

//! Dashboard all counts
export function SummaryRequest() {
  store.dispatch(ShowLoader());
  let URL = BaseURL + "/tasksStatusCount";
  return axios
    .get(URL, AxiosHeader)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200 && res.data?.status === "success") {
        store.dispatch(setSummary(res.data["data"]));
      } else {
        ErrorToast("Failed to get summary");
      }
    })
    .catch((err) => {
      ErrorToast("Something went wrong");
      store.dispatch(HideLoader());
    });
}

//! Delete item ..................
export function DeleteRequest(id) {
  store.dispatch(ShowLoader());
  let URL = BaseURL + "/deleteTask/" + id;
  return axios
    .get(URL, AxiosHeader)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200 && res.data?.status === "success") {
        SuccessToast("Task deleted successfully");
        return true;
      } else {
        ErrorToast("Failed to delete task");
        return false;
      }
    })
    .catch((err) => {
      ErrorToast("Something went wrong");
      store.dispatch(HideLoader());
      return false;
    });
}

//! Update item ..................
export function UpdateStatusRequest(id, status) {
  store.dispatch(ShowLoader());
  let URL = `${BaseURL}/updateTask/${id}/${status}`;

  return axios
    .get(URL, AxiosHeader)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200 && res.data?.status === "success") {
        SuccessToast("Task status updated successfully");
        return true;
      }
      ErrorToast("Failed to update task status");
      return false;
    })
    .catch(() => {
      store.dispatch(HideLoader());
      ErrorToast("Something went wrong");
      return false;
    });
}

//! Profile get all ..........................
export function GetProfile() {
  store.dispatch(ShowLoader());
  let URL = BaseURL + "/profileDetails";
  return axios
    .get(URL, AxiosHeader)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.data?.status === "success") {
        store.dispatch(SetProfile(res.data["data"]));
      } else {
        ErrorToast("Failed to get profile details");
      }
    })
    .catch((err) => {
      store.dispatch(HideLoader());
      console.error("API Error:", err.response?.data || err.message);
      ErrorToast("Something went wrong");
    });
}

//! Profile update ..............................
export function ProfileUpdateRequest(
  email,
  firstName,
  lastName,
  mobile,
  password,
  photo
) {
  store.dispatch(ShowLoader());
  let URL = BaseURL + "/profileUpdate";
  let PostBody = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
    password: password,
    photo: photo,
  };

  let UserDetails = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
    photo: photo,
  };
  return axios
    .post(URL, PostBody, AxiosHeader)
    .then((res) => {
      console.log(res.status);
      store.dispatch(HideLoader());
      if (res.status === 200) {
        SuccessToast("Profile updated successfully");
        setUserDetails(UserDetails);
        return true;
      } else {
        ErrorToast("Failed to update profile");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(HideLoader());
      ErrorToast("Something went wrong");
      return false;
    });
}

//! Recover  Verify send Email OTP password staps-1 .............
export function RecoverVerifyEmailRequest(email) {
  store.dispatch(ShowLoader());
  const URL = `${BaseURL}/recoverVerifyEmail/${email}`;

  return axios
    .get(URL)
    .then((res) => {
      store.dispatch(HideLoader());

      if (res.status === 200) {
        if (res.data.status === "failed") {
          ErrorToast("🚫 Email not found");
          return false;
        } else {
          setEmail(email);
          SuccessToast(
            "A 6-digits verify OTP has been sent to your email Address."
          );
          return true;
        }
      } else {
        ErrorToast("❌ Failed to send verification OTP");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(HideLoader());
      ErrorToast("Something went wrong while sending the OTP");
      return false;
    });
}

// Recover Verify OTP password staps-2  .............
export function RecoverVerifyOTPRequest(email, OTP) {
  store.dispatch(ShowLoader());
  let URL = BaseURL + "/RecoverVerifyOTP/" + email + "/" + OTP;
  return axios
    .get(URL)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200) {
        if (res.data.status === "fail") {
          ErrorToast("Invalid OTP code!");
          return false;
        } else {
          setOTP(OTP);
          SuccessToast("OTP Code verification successfull.");
          return true;
        }
      } else {
        ErrorToast("Invalid OTP");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(HideLoader());
      ErrorToast("Something went wrong");
      return false;
    });
}

// Recover Reset password staps-3 ....................
export function RecoverResetPassword(email, OTP, password) {
  store.dispatch(ShowLoader());
  let URL = `${BaseURL}/RecoverResetPassword`;
  let PostBody = { email, OTP, password };

  return axios
    .post(URL, PostBody)
    .then((res) => {
      console.log(res);
      store.dispatch(HideLoader());
      if (res.status === 200) {
        if (res.data.status === "fail") {
          ErrorToast("Invalid OTP code!");
          return false;
        } else {
          setOTP(OTP);
          SuccessToast("Reset Password is successfull.");
          return true;
        }
      } else {
        ErrorToast("Invalid OTP");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(HideLoader());
      ErrorToast("Something went wrong");
      return false;
    });
}
