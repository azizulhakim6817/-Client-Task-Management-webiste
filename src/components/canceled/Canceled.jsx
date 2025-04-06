import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { AiOutlineCalendar } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import "../../assets/css/sidebar.css";
import { TaskListByStatus } from "../../APIRequest/APIRequest";
import { useSelector } from "react-redux";
import { DeleteToDo } from "../../helper/DeleteAlert";
import { UpdateToDo } from "../../helper/UpdateAlert";

const Canceled = () => {
  useEffect(() => {
    TaskListByStatus("Canceled");
  }, []);

  const CanceledList = useSelector((state) => state.task.Canceled);

  //! delete...............................
  const DeleteTask = (id) => {
    DeleteToDo(id).then((result) => {
      if (result) {
        TaskListByStatus("Canceled");
      }
    });
  };

  //! update status..........
  const StatusChangeItem = (id, status) => {
    UpdateToDo(id, status).then((result) => {
      if (result === true) {
        TaskListByStatus("Canceled");
      }
    });
  };

  return (
    <Container fluid={true} className=" content-body">
      <div className="row p-0 m-0">
        <div className=" col-12 col-md-6 col-lg-8 px-3">
          <h5 className="mt-2">Task Canceled</h5>
        </div>
        <div className=" col-12 float-end col-md-6 col-lg-4 px-2">
          <div className=" row">
            <div className=" col-8">
              <input className=" form-control w-100" />
            </div>
            <div className="col-4">
              <button className=" btn btn-primary">Search</button>
            </div>
          </div>
        </div>
      </div>
      {/* Add your completed tasks here */}
      <div className="row p-0 m-0">
        {CanceledList.map((item, i) => (
          <div
            key={i.toString()}
            className=" col-12 col-lg-4 col-sm-6 col-md-4 p-2"
          >
            <div className=" card h-100">
              <div className="card-body shadow-lg">
                <h6 className=" animated fadeInUp">{item.title}</h6>
                <p className=" animated fadeInUp">{item.description}</p>
                <p className="m-0 p-0 animate__animated animate__fadeInUp ">
                  <AiOutlineCalendar /> {item.createDate}
                  <button
                    onClick={StatusChangeItem.bind(this, item._id, item.status)}
                    className="icon-nav text-primary mx-1 border-0 bg-transparent"
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    onClick={DeleteTask.bind(this, item._id)}
                    className="icon-nav text-danger mx-1 border-0 bg-transparent"
                  >
                    <AiOutlineDelete />
                  </button>
                  <span className="badge float-end bg-danger mt-2">
                    {item.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Canceled;
