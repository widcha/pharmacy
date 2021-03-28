import React, {useEffect, useState} from "react";
import {api_url} from "../helpers";

const DashboardModal = ({toggle, openmodal, data}) => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(openmodal);
  }, [openmodal]);

  return (
    <>
      {showModal ? (
        <>
          <div className="mt-10 h-24 justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none">
            <div className=" overflow-y-auto relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl font-bold">
                    Top 3 Best Seller Products
                  </h3>
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
                  <table class="w-full whitespace-no-wrap">
                    <thead>
                      <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th class="px-4 py-3">Name</th>
                        <th class="px-4 py-3">Images</th>
                        <th class="px-4 py-3">Price</th>
                        <th class="px-4 py-3">Stock</th>
                        <th class="px-4 py-3">Sold</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                      {data
                        ? data.map((val) => {
                            return (
                              <tr class="text-gray-700 dark:text-gray-400">
                                <td class="px-4 py-3">
                                  <div class="flex items-center text-sm">
                                    <div>
                                      <p class="font-semibold">
                                        {val.Product.product_name}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td class="py-3 text-xs">
                                  {/* <td class="px-4 py-3"> */}
                                  <div class="flex items-center text-sm">
                                    <div>
                                      <p class="font-semibold">
                                        <img
                                          src={`${api_url}${val.Product.product_image_path}`}
                                          alt=""
                                          width="80px"
                                        />
                                      </p>
                                    </div>
                                  </div>
                                  {/* </td> */}
                                </td>
                                <td class="py-3 text-xs">
                                  <td class="px-1 py-3">
                                    <div class="flex items-center text-sm">
                                      <div className="font-semibold">
                                        Rp{" "}
                                        {val.Product.product_price.toLocaleString()}
                                      </div>
                                    </div>
                                  </td>
                                </td>
                                <td class="pl-3 py-3 text-xs">
                                  <td class="px-4 py-3">
                                    <div class="flex items-center text-sm">
                                      <div className="font-semibold">
                                        {val.Product.product_stock}
                                      </div>
                                    </div>
                                  </td>
                                </td>
                                <td class="pl-3 py-3 text-xs">
                                  <td class="px-4 py-3">
                                    <div class="flex items-center text-sm">
                                      <div className="font-semibold">
                                        {val.sold}
                                      </div>
                                    </div>
                                  </td>
                                </td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={toggle}
                  >
                    Close
                  </button>
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

export default DashboardModal;
