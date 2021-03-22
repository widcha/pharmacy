import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import ModalUploadUser from "./ModalUploadUser";

// YOU NEED A DOCTOR'S PRESCRIPTION FOR THAT!
const ExtendedNavbar = () => {
  const [modal, setModal] = useState(false);
  const { user_id } = useSelector((state) => state.user);
  const history = useHistory();

  const uploadBtn = () => {
    if (user_id !== 0) {
      toggle();
    } else {
      Swal.fire({
        icon: "error",
        title: "You need to login first",
      });
    }
  };

  const routeChange = () => {
    let path = `/custom-order`;
    history.push(path);
  };

  const personalizedBtn = () => {
    if (user_id !== 0) {
      routeChange();
    } else {
      Swal.fire({
        icon: "error",
        title: "You need to login first",
      });
    }
  };

  const toggle = () => setModal(!modal);
  return (
    <div class="px-4 py-2 sm:max-w-xl md:max-w-full md:px-24 lg:px-8 shadow p-4 bg-blue-100">
      <div class="relative flex items-center justify-around">
        <div className="flex border-r border-blue-300 w-1/2 justify-center">
          <button
            className="flex font-semibold text-blue-500 focus:outline-none focus:text-blue-900 hover:text-blue-700"
            onClick={personalizedBtn}
          >
            <svg
              className="h-5 w-5 mt-1 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Create Your Own Custom Prescription
          </button>
        </div>
        <div className="flex border-l w-1/2 border-blue-300 justify-center">
          <button
            className="flex font-semibold text-blue-500 focus:outline-none focus:text-blue-900 hover:text-blue-700"
            onClick={uploadBtn}
          >
            <svg
              className="w-5 h-5 mt-1 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Upload Doctor's Prescription
          </button>
          <ModalUploadUser showModal={modal} toggle={toggle} />
        </div>
      </div>
    </div>
  );
};

export default ExtendedNavbar;
