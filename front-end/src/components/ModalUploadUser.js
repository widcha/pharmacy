import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { uploadRecipesAction } from "../redux/actions";

const ModalUploadUser = ({ showModal, toggle }) => {
  const [pictName, setPictName] = useState("");
  const [pict, setPict] = useState();
  const dispatch = useDispatch();
  const { user_id } = useSelector((state) => state.user);

  const uploadImg = (e) => {
    if (e.target.files[0]) {
      setPictName(e.target.files[0].name);
      setPict(e.target.files[0]);
    }
  };

  const uploadBtn = async () => {
    if (pictName) {
      Swal.fire({
        icon: "success",
        title: "Prescription Uploaded",
        text:
          "Please wait until the admin input the prescription into your cart and check the notification periodically.",
      });
      await dispatch(uploadRecipesAction({ user_id, pict }));
    } else {
      Swal.fire({
        icon: "error",
        title: "You need to select a file",
      });
    }
    setPict();
    setPictName("");
    toggle();
  };
  return (
    <>
      {showModal ? (
        <div class="fixed z-10 inset-0 overflow-y-auto">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
              <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              class="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* <!-- Heroicon name: outline/exclamation --> */}
                    <svg
                      className="h-6 w-6 text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      class="text-lg leading-6 font-bold text-gray-800"
                      id="modal-headline"
                    >
                      Upload doctor's prescription
                    </h3>
                    <p className="font-semibold text-gray-700">
                      File format must be JPG / PNG / PDF
                    </p>
                  </div>
                </div>
                <div class="flex justify-center flex-col py-5">
                  <div class="flex items-center justify-center bg-grey-lighter">
                    <label class="hover:bg-blue-500 w-52 flex flex-col items-center px-4 py-4 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                      <svg
                        class="w-8 h-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                      </svg>
                      <span class="mt-2 text-base leading-normal font-semibold">
                        Select a file
                      </span>
                      <input
                        type="file"
                        accept=".jpg, .png, .pdf"
                        class="hidden"
                        onChange={uploadImg}
                      />
                    </label>
                  </div>
                  <div className="flex justify-center mt-3 font-semibold">
                    {pictName}
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={uploadBtn}
                >
                  Upload
                </button>
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={toggle}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ModalUploadUser;
