/* import cogoToast from "cogo-toast";*/
import { toast } from "react-toastify";

let EmailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let phoneRegex = /^(?:\+8801|01)[3-9]\d{8}$/;

class FormHelper {
  // Check if value is empty
  IsEmpty(value) {
    return value.length === 0;
  }

  // Validate Mobile Number
  IsMobile(value) {
    return phoneRegex.test(value);
  }

  // Validate Email
  IsEmail(value) {
    return EmailRegx.test(value);
  }

  // Show Error Toast Message
  ErrorToast(msg) {
    toast.error(msg, { position: "top-center" });
  }

  // Show Success Toast Message
  SuccessToast(msg) {
    toast.success(msg, { position: "top-center" });
  }

  //How to convert image to base64 in javscript
  getBase64 = (file) =>
    new Promise(function (resolve, reject) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject("Error: ", error);
    });
}

export const {
  IsEmpty,
  IsEmail,
  IsMobile,
  ErrorToast,
  SuccessToast,
  getBase64,
} = new FormHelper();
