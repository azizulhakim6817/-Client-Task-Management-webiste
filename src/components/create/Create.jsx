import React, { useRef } from "react";
import { Container, Row } from "react-bootstrap";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";
import { useNavigate } from "react-router-dom";
import { NewTaskRequest } from "../../APIRequest/APIRequest";

const Create = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const CreateNewSubmit = () => {
    const title = titleRef.current?.value.trim();
    const description = descriptionRef.current?.value.trim();

    if (IsEmpty(title)) {
      ErrorToast("Title is Required");
      return;
    }
    if (IsEmpty(description)) {
      ErrorToast("Description is Required");
      return;
    }

    NewTaskRequest(title, description).then((res) => {
      if (res) {
        navigate("/new-task");
      }
    });
  };

  return (
    <Container fluid className="content-body">
      <Row className="d-flex justify-content-center">
        <div className="col-12 col-lg-8 col-sm-12 col-md-8 p-2 mt-3">
          <div className="card">
            <div className="card-body shadow-lg">
              <h4>Create New Task</h4>
              <br />
              <input
                type="text"
                placeholder="Task Name"
                className="form-control animated fadeInUp"
                ref={titleRef}
              />
              <br />
              <textarea
                rows={5}
                placeholder="Task Description"
                className="form-control animated fadeInUp"
                ref={descriptionRef}
              ></textarea>
              <br />
              <button
                onClick={CreateNewSubmit}
                className="btn float-end btn-primary"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Create;
