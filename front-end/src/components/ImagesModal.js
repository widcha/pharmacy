import React, {useEffect, useState} from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";
import {api_url} from "../helpers";
import {changeOrderStatusAction} from "../redux/actions/adminAction";
import {Link} from "react-router-dom";

const ImagesModal = ({
  showmodal,
  toggle,
  invoice,
  name,
  modalName,
  imageUrl,
  status,
  recipes_id,
  user_id,
}) => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    setShowModal(showmodal);
  }, [showmodal]);

  const confirmBtn = () => {
    Swal.fire({
      title: "Confirm this order?",
      text: "You won't be able to revert this",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm this order",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Order Confirmed!", "", "success");
        // dispatch(changeOrderStatusAction({id: invoice, order_status_id: 2, reason: `Transaction ${invoice} confirmed by Admin`}))
        toggle();
      }
    });
  };

  const cancelBtn = () => {
    if (modalName === "Order Confirmation") {
      Swal.fire({
        title: "Cancel this order?",
        text: "You won't be able to revert this",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel this order",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Submit the reason of cancellation",
            input: "text",
            inputAttributes: {
              autocapitalize: "off",
            },
            inputValidator: (value) => {
              return !value && "You need to write something!";
            },
            showCancelButton: true,
            confirmButtonText: "Submit",
            showLoaderOnConfirm: true,
          }).then((results) => {
            if (results.isConfirmed) {
              Swal.fire({
                icon: "info",
                title: "Order Cancelled",
                text: `${results.value}`,
              });
              // dispatch(changeOrderStatusAction({id: invoice, order_status_id: 1, reason: `${results.value}`}));
            }
          });
        }
      });
    }
    toggle();
  };
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div
              className="relative w-auto my-6 mx-auto max-w-3xl"
              style={{paddingTop: "35px"}}
            >
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">{modalName}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={toggle}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div style={{display: "flex", height: "270px"}}>
                    <div>
                      <Zoom>
                        <img
                          src={
                            imageUrl
                              ? `${api_url}${imageUrl}`
                              : "data:image/png;base64,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"
                          }
                          alt={invoice}
                          style={{height: "270px", width: "255px"}}
                        />
                      </Zoom>
                    </div>
                    <div style={{paddingLeft: "10px"}}>
                      {invoice ? (
                        <div style={{paddingBottom: "50px"}}>
                          Invoice Number:
                          <div style={{fontWeight: "bold"}}>{invoice}</div>
                        </div>
                      ) : null}
                      <div>
                        User:
                        <div style={{fontWeight: "bold"}}>{name}</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{transition: "all .15s ease"}}
                    onClick={cancelBtn}
                  >
                    {modalName === "Prescription" ? "Cancel" : "Cancel Order"}
                  </button>
                  {modalName === "Prescription" ? (
                    <Link
                      to={`/custom-order?recipes=${recipes_id}&userid=${user_id}`}
                      disabled={status === "Done"}
                    >
                      <button
                        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{transition: "all .15s ease"}}
                        onClick={() => toggle()}
                        disabled={status === "Done"}
                      >
                        Create Custom Order
                      </button>
                    </Link>
                  ) : (
                    <button
                      className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{transition: "all .15s ease"}}
                      onClick={confirmBtn}
                      // disabled={}
                    >
                      "Confirm Order"
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ImagesModal;
