import React from "react";
import {api_url} from "../helpers";
import capsules from "../assets/icons/pill2.png";

export const Transactions = ({showModal, toggle, data}) => {
  // console.log(data);
  const renderItems = () => {
    if (data) {
      return (
        <div className="">
          {data.data.length > 0 ? (
            <div className="w-auto">
              <div className="space-y-2 w-full">
                {data.data.map((subData) => {
                  let pricePerGram = Math.ceil(
                    subData.Product.product_price / subData.Product.product_vol
                  );
                  return (
                    <div className="flex border-b-2 py-2 space-y-1 justify-between items-center">
                      <div className="flex w-1/2">
                        <img
                          src={`${api_url}${subData.Product.product_image_path}`}
                          alt="not found"
                          className="w-12"
                        />
                        <div className="flex flex-col text-sm">
                          <label>{subData.product_name}</label>
                          <span>
                            {subData.product_qty} item(s){" "}
                            <span>
                              x Rp&nbsp;
                              {pricePerGram}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="border-l-2 w-1/2 flex justify-end">
                        <label>
                          Total: Rp{" "}
                          {(
                            pricePerGram * subData.product_qty
                          ).toLocaleString()}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {data.custom_data.length > 0 ? (
            <div className="w-full">
              <div className="flex flex items-center space-x-1  w-full">
                <div className="text-sm w-full">
                  {data.custom_data.map((subVal) => {
                    return (
                      <div className="flex justify-between border-b-2 space-y-2 items-center">
                        <img src={capsules} className="w-14 h-8" />
                        <div className="flex flex-col">
                          <label className="font-bold">Custom Products</label>
                          {subVal.Transactions.map((subTrans) => {
                            return (
                              <>
                                <div className="text-xs flex  flex-wrap ">
                                  {" "}
                                  {subTrans.product_qty}x&nbsp;
                                  <span> {subTrans.product_name} &nbsp;</span>
                                </div>
                              </>
                            );
                          })}
                          <label className="font-semibold text-blue-900">
                            {subVal.notes ? `Notes:${subVal.notes}` : null}
                          </label>
                        </div>
                        <div className="border-l-2 pl-24">
                          <div>
                            Total Price: Rp.{" "}
                            {subVal.custom_product_price.toLocaleString()}
                          </div>
                          <div>Total Quantity: {subVal.custom_product_qty}</div>
                        </div>
                      </div>
                    );
                  })}{" "}
                  <div></div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="flex justify-end flex-col">
            <div className="border-b-2 pt-2 pb-3">
              Shipment details:
              <p>To:{data.user_address}</p>
            </div>
            <div className="pt-3 font-bold text-xl ">
              Grand Total: Rp{" "}
              {data.transaction_payment_details.toLocaleString()}
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <>
      {showModal ? (
        <div class="pt-6 fixed z-10 inset-0 overflow-y-auto">
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
                <div class="flex">
                  <div class="mt-3 w-full">
                    <div className="mb-2">
                      <h3
                        class="text-lg leading-6 font-bold text-gray-800"
                        id="modal-headline"
                      >
                        Order Details
                      </h3>
                    </div>
                    <div className="flex">
                      <div className="flex">
                        <div className="space-y-2">
                          <div>
                            Invoice Number
                            <p className="font-semibold">
                              {data.transaction_invoice_number}
                            </p>
                          </div>
                          <div>
                            Status
                            <p className="font-semibold">
                              {data["Order_Status.order_status_status"]
                                ? data["Order_Status.order_status_status"]
                                : null}
                            </p>
                          </div>
                          <div>
                            Purchase Date
                            <p className="font-semibold">
                              {data.transaction_date.split("T")[0]}
                              {", "}
                              {
                                data.transaction_date
                                  .split("T")[1]
                                  .split(".")[0]
                              }{" "}
                              WIB
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col pl-36">
                        <p>Username:</p>
                        <p className="font-semibold">
                          {data["User.user_username"]
                            ? data["User.user_username"]
                            : null}
                        </p>
                        <p>User Status:</p>
                        <p>
                          {data["User.is_banned"] === 0 ? (
                            <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                              &nbsp;Active&nbsp;
                            </span>
                          ) : (
                            <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
                              Banned
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="py-2 border-b-2"></div>

                    <div className="overflow-auto h-44 p-4">
                      <p className="font-semibold text-gray-700">
                        {renderItems()}
                      </p>
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
