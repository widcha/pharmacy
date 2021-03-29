import React from "react";
import { api_url } from "../helpers";
import capsules from "../assets/icons/pill2.png";

export const HistoryModal = ({ showModal, toggle, data }) => {
  const renderItems = () => {
    if (data) {
      return (
        <div className="space-y-2 w-full mt-3 overflow-y-auto h-96">
          <div className="grid grid-cols-2">
            <div className="space-y-2">
              <div>
                <div className="font-normal">Invoice Number</div>
                <div>{data.transaction_invoice_number}</div>
              </div>
              <div>
                <div className="font-normal">Status</div>
                <div>
                  {data["Order_Status.order_status_status"]
                    ? data["Order_Status.order_status_status"]
                    : null}
                </div>
              </div>
              <div>
                <div className="font-normal">Transaction Date</div>
                <div>{data.transaction_date.split("T")[0]}</div>
              </div>
            </div>
            <div>
              <div className="font-normal">Address</div>
              <div>{data.user_address}</div>
            </div>
          </div>
          <div className="border-b-2"></div>
          <div>
            <div className="font-semibold mb-2">Product List</div>
            {data.data.length > 0 ? (
              <div className="my-2">
                {data.data.map((subData) => {
                  return (
                    <div className="flex mt-2 items-center">
                      <div>
                        <img
                          src={`${api_url}${subData.Product.product_image_path}`}
                          alt="not found"
                          className="w-10"
                        />
                      </div>
                      <div className="mx-2">
                        <div>{subData.product_name}</div>
                        <div className="flex">
                          <div className="font-normal">
                            {subData.product_qty} item(s) x&nbsp;
                          </div>
                          <div className="font-normal">
                            Rp{" "}
                            {Math.ceil(
                              subData.Product.product_price /
                                subData.Product.product_vol
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}

            {data.custom_data.length > 0 ? (
              <div className="my-2">
                {data.custom_data.map((subVal) => {
                  return (
                    <div>
                      <div className="flex items-center">
                        <img
                          src={capsules}
                          className="w-8 h-5"
                          alt="not found"
                        />
                        <div className="mx-1">
                          <div className="ml-3">
                            <div>Custom</div>
                            <div className="flex font-normal">
                              <div>
                                {subVal.custom_product_qty} item(s) x&nbsp;
                              </div>
                              <div>Rp {subVal.custom_product_price}</div>
                            </div>
                          </div>
                        </div>
                        <div className="mx-2">
                          {subVal.Transactions.map((subTrans) => {
                            return (
                              <div className="flex font-normal">
                                <span className="w-5 h-5 p-1 mr-2 inline-flex items-center justify-center bg-blue-400 text-white rounded-full flex-shrink-0">
                                  <svg
                                    class="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
                                      clip-rule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                                <div>{subTrans.product_qty} ml of&nbsp;</div>
                                <div>{subTrans.product_name}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex">
                        <div>{subVal.notes ? "Notes:" : null}</div>
                        <div className="font-normal">&nbsp;{subVal.notes}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className="border-b-2"></div>
          <div>
            <div className="font-normal mb-1">Payment</div>
            <div className="flex justify-between">
              <div>Total Payment</div>
              <div className="mr-5">
                Rp {data.transaction_payment_details.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      );
    }
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
                <div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      class="text-lg leading-6 font-bold text-gray-800"
                      id="modal-headline"
                    >
                      Order Details
                    </h3>
                    <div className="font-semibold text-gray-700">
                      {renderItems()}
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={toggle}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
