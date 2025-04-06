import Swal from "sweetalert2";
import { UpdateStatusRequest } from "../APIRequest/APIRequest";

export function UpdateToDo(id, status) {
  return Swal.fire({
    title: "Change Status",
    input: "select",
    inputOptions: {
      New: "New",
      Completed: "Completed",
      Progress: "Progress",
      Canceled: "Canceled",
    },
    inputValue: status,
    showCancelButton: true,
    confirmButtonText: "Update",
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      return UpdateStatusRequest(id, result.value); 
    }
    return Promise.resolve(false); 
  });
}
