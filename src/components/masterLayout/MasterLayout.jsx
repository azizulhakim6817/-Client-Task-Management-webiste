import React, { Fragment, useRef } from "react";
import {
  AiOutlineMenuUnfold,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineEdit,
  AiOutlineCheckSquare,
} from "react-icons/ai";
import { MdOutlineCancelPresentation } from "react-icons/md";

import { RiLayoutHorizontalLine, RiDashboardLine } from "react-icons/ri";
import { BsListNested, BsHourglass } from "react-icons/bs";
import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../../assets/css/sidebar.css";
import "../../assets/css/dropdownmenu.css";
import {
  getUserDetails,
  removeSessionLogout,
} from "../../helper/SessionHelper";

const MasterLayout = (props) => {
  const sideNavRef = useRef(null);
  const contentRef = useRef(null);

  const MenuBarClickHandler = (event) => {
    event.preventDefault();
    if (!sideNavRef.current || !contentRef.current) return;
    let sideNav = sideNavRef.current;
    let content = contentRef.current;
    if (sideNav.classList.contains("side-nav-open")) {
      sideNav.classList.add("side-nav-close");
      sideNav.classList.remove("side-nav-open");
      content.classList.add("content-expand");
      content.classList.remove("content");
    } else {
      sideNav.classList.remove("side-nav-close");
      sideNav.classList.add("side-nav-open");
      content.classList.remove("content-expand");
      content.classList.add("content");
    }
  };

  const OnLogout = () => {
    removeSessionLogout();
  };

  return (
    <Fragment>
      <Navbar className="fixed-top px-0 shadow-sm bg-info ">
        <Container fluid={true}>
          <Navbar.Brand className="d-flex">
            <button
              onClick={MenuBarClickHandler}
              className="icon-nav me-3 border-0 bg-transparent"
            >
              <AiOutlineMenuUnfold size={26} className="mt-1" />
            </button>
            <NavLink to="/" className="nav-logo mt-2">
              <RiLayoutHorizontalLine size={26} className="me-4 text-danger" />
            </NavLink>
            <h6 className="mt-3">Task Management</h6>
          </Navbar.Brand>

          {/* Profile dropdown menu */}
          <div className="float-right h-auto d-flex ">
            <div className="user-download">
              <img
                className="icon-nav-img icon-nav"
                src={getUserDetails()["photo"]}
                alt="Profile"
              />
              <div className="user-download-content">
                <div className=" mt-3 text-content">
                  <img
                    className="icon-nav-img size-5"
                    src={getUserDetails()["photo"]}
                    alt="Profile"
                  />
                  <div className=" d-flex gap-1 mt-2">
                    <h6> {getUserDetails()["lastName"]}</h6>
                    <h6> {getUserDetails()["lastName"]}</h6>
                  </div>
                  <hr className="p-0 user-download-divider" />
                </div>
                <NavLink to="/profile" className="side-bar-item">
                  <AiOutlineUser className="side-bar-item-icon" />
                  <span className="side-bar-item-caption">Profile</span>
                </NavLink>
                <button
                  onClick={OnLogout}
                  className="side-bar-item border-0 bg-transparent d-flex align-items-center   "
                  aria-label="Logout"
                >
                  <AiOutlineLogout className="side-bar-item-icon me-2 text-danger" />
                  <span className="side-bar-item-caption text-danger fw-bold">
                    Logout
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>

      {/* Side nav menu bar */}
      <div ref={sideNavRef} className="side-nav-open ">
        <NavLink to="/" className="side-bar-item mt-2 text-decoration-none">
          <RiDashboardLine className="side-bar-item-icon text-primary" />
          <span className="side-bar-item-caption">Dashboard</span>
        </NavLink>
        <NavLink
          to="/create"
          className="side-bar-item mt-2 text-decoration-none"
        >
          <AiOutlineEdit className="side-bar-item-icon text-primary" />
          <span className="side-bar-item-caption">Create New</span>
        </NavLink>
        <NavLink
          to="/new-task"
          className="side-bar-item mt-2 text-decoration-none"
        >
          <BsListNested className="side-bar-item-icon text-primary" />
          <span className="side-bar-item-caption">New Task</span>
        </NavLink>
        <NavLink
          to="/progress"
          className="side-bar-item mt-2 text-decoration-none"
        >
          <BsHourglass className="side-bar-item-icon text-warning" />
          <span className="side-bar-item-caption">In progress </span>
        </NavLink>
        <NavLink
          to="/completed"
          className="side-bar-item mt-2 text-decoration-none"
        >
          <AiOutlineCheckSquare className="side-bar-item-icon text-success" />
          <span className="side-bar-item-caption">Completed</span>
        </NavLink>
        <NavLink
          to="/canceled"
          className="side-bar-item mt-2 text-decoration-none"
        >
          <MdOutlineCancelPresentation className="side-bar-item-icon text-danger" />
          <span className="side-bar-item-caption">Canceled</span>
        </NavLink>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="content">
        {props.children}
      </div>
    </Fragment>
  );
};

export default MasterLayout;
