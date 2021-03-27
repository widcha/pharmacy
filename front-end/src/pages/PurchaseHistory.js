import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHistoryAction,
  repurchaseProductAction,
  repurchaseCustomAction,
} from "../redux/actions";
import { HistoryModal } from "../components/HistoryModal";
import { api_url } from "../helpers";
import capsules from "../assets/icons/pill2.png";
import Swal from "sweetalert2";
import { toast, Zoom } from "react-toastify";
import { Link } from "react-router-dom";

const PurchaseHistory = (props) => {
  const [perPage] = useState(5);
  const [page, setPage] = useState(0);
  const from = page * perPage;
  const to = (page + 1) * perPage;
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const { user_id } = useSelector((state) => state.user);
  const [value, setValue] = useState({});
  const { history_list } = useSelector((state) => state.history);

  const [pageCount, setPageCount] = useState(history_list.length / perPage);

  const data = history_list.filter((val, index) => {
    return index >= from && index < to;
  });
  useEffect(() => {
    setPageCount(history_list.length / perPage);
  }, [perPage, history_list]);
  useEffect(() => {
    dispatch(fetchHistoryAction(user_id, props.location.search.split("=")[1]));
  }, [dispatch, props.location.search, user_id]);
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPage(selectedPage);
  };
  const toggle = () => setModal(!modal);
  const handleButton = (val) => {
    setValue(val);
    toggle();
  };

  const handleRepurchase = (value) => {
    Swal.fire({
      title: "Are you sure?",
      text: "It will add product in this invoice to your cart",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Added to cart!", "", "success");
        if (value.data.length !== 0 && value.custom_data.length !== 0) {
          value.data.forEach((val) => {
            dispatch(
              repurchaseProductAction({
                user_id,
                product_id: val.product_id,
                product_qty: val.product_qty,
                product_price:
                  val.Product.product_price / val.Product.product_vol,
              })
            );
          });
          value.custom_data.forEach((val) => {
            dispatch(
              repurchaseCustomAction({
                user_id,
                transaction: val.Transactions,
                totalQty: val.custom_product_qty,
                totalPrice: val.custom_product_price,
              })
            );
          });
        } else if (value.data.length !== 0) {
          value.data.forEach((val) => {
            dispatch(
              repurchaseProductAction({
                user_id,
                product_id: val.product_id,
                product_qty: val.product_qty,
                product_price:
                  val.Product.product_price / val.Product.product_vol,
              })
            );
          });
        } else if (value.custom_data.length !== 0) {
          value.custom_data.forEach((val) => {
            dispatch(
              repurchaseCustomAction({
                user_id,
                transaction: val.Transactions,
                totalQty: val.custom_product_qty,
                totalPrice: val.custom_product_price,
              })
            );
          });
        }
        toast.info("Product Added!", {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Zoom,
        });
      }
    });
  };
  const renderList = () => {
    return data.map((val, i) => {
      return (
        <div className="font-semibold text-gray-700 rounded-xl shadow border p-5 space-y-2">
          <div className="flex space-x-4 items-center">
            <span>{val.transaction_date.split("T")[0]}</span>
            <span className="bg-blue-300 px-1 rounded text-white">
              {val["Order_Status.order_status_status"]
                ? val["Order_Status.order_status_status"]
                : null}
            </span>
            <span className="text-gray-500">
              {val.transaction_invoice_number}
            </span>
          </div>
          <div>
            {val.data.length > 0 ? (
              <div className="font-semibold text-gray-700 rounded-xl shadow border p-10 space-y-2 flex justify-between">
                {val.data.length !== 0 && val.custom_data.length !== 0 ? (
                  <div className="flex ">
                    <img
                      src={`${api_url}${val.data[0].Product.product_image_path}`}
                      alt="not found"
                      className="w-24"
                    />
                    <div className="flex flex-col ml-5">
                      <label className="font-bold">
                        {val.data[0].product_name}
                      </label>
                      <span>
                        {val.data[0].product_qty} item(s){" "}
                        <span>
                          x Rp&nbsp;
                          {Math.ceil(
                            val.data[0].Product.product_price /
                              val.data[0].Product.product_vol
                          )}
                        </span>
                      </span>

                      <span>
                        +{val.data.length + val.custom_data.length - 1} other
                        products
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex ">
                    <img
                      src={`${api_url}${val.data[0].Product.product_image_path}`}
                      alt="not found"
                      className="w-24"
                    />
                    <div className="flex flex-col">
                      <label className="font-bold">
                        {val.data[0].product_name}
                      </label>
                      <span>
                        {val.data[0].product_qty} item(s){" "}
                        <span>
                          x Rp&nbsp;
                          {Math.ceil(
                            val.data[0].Product.product_price /
                              val.data[0].Product.product_vol
                          )}
                        </span>
                      </span>
                      {val.data.length > 1 ? (
                        <span>+{val.data.length - 1} other products</span>
                      ) : null}
                    </div>
                  </div>
                )}
                <div className="flex border-l-2 items-center">
                  <div className="ml-5 items-center content-center ">
                    <div className="font-normal">Total Price</div>
                    <div className="font-semibold text-lg">
                      Rp {val.transaction_payment_details.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="font-semibold text-gray-700 rounded-xl shadow border p-10 space-y-2 flex justify-between">
                {val.custom_data.length > 1 ? (
                  <div className="flex ">
                    <img src={capsules} className="w-24 h-16" alt="not found" />
                    <div className="flex flex-col">
                      <div className="font-bold">Custom Product</div>
                      <span>
                        {val.custom_data[0].custom_product_qty} item(s){" "}
                        <span>
                          x Rp&nbsp;
                          {val.custom_data[0].custom_product_price}
                        </span>
                      </span>
                      <span>
                        +{val.custom_data.length - 1} other custom products
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex ">
                    <img src={capsules} className="w-24 h-16" alt="not found" />
                    <div className="flex flex-col">
                      <div className="font-bold">Custom Product</div>
                      <span>
                        {val.custom_data[0].custom_product_qty} item(s){" "}
                        <span>
                          x Rp&nbsp;
                          {val.custom_data[0].custom_product_price}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex border-l-2 items-center">
                  <div className="ml-5 items-center content-center">
                    <div className="font-normal">Total Price</div>
                    <div className="font-semibold text-lg">
                      Rp {val.transaction_payment_details.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-4 mr-5">
            <div className="flex">
              <button
                onClick={() => handleButton(val)}
                className="font-semibold text-blue-400 focus:outline-none mt-1 hover:text-blue-200"
              >
                Transaction details
              </button>
            </div>
            <div className="">
              <button
                className="px-4 py-1 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                onClick={() => handleRepurchase(val)}
              >
                Re-purchase
              </button>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div
      className="flex p-auto h-full my-5 mx-36"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="flex flex-row justify-between mx-3">
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8 mt-3 mr-3 text-gray-700"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <label className="font-semibold text-gray-700 text-2xl pt-3">
            Purchase History
          </label>
        </div>
      </div>
      <div className="m-auto w-full mx-2 h-full">
        <div className="flex justify-between">
          <div className="space-x-2 my-2">
            <Link to="/user/purchase-history?order_status=All">
              <button class="inline-flex text-gray-700 font-semibold bg-transparent border-2 py-2 px-6 focus:bg-blue-50 focus:outline-none hover:bg-blue-50 rounded-xl text-md transition duration-200">
                All
              </button>
            </Link>
            <Link to="/user/purchase-history?order_status=5">
              <button class="inline-flex text-gray-700 font-semibold bg-transparent border-2 py-2 px-6 focus:bg-blue-50 focus:outline-none hover:bg-blue-50 rounded-xl text-md transition duration-200">
                Arrived
              </button>
            </Link>
            <Link to="/user/purchase-history?order_status=4">
              <button class="inline-flex text-gray-700 font-semibold bg-transparent border-2 py-2 px-6 focus:bg-blue-50 focus:outline-none hover:bg-blue-50 rounded-xl text-md transition duration-200">
                Canceled
              </button>
            </Link>
          </div>
          <div className="flex-row">
            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
        <div className="h-full w-full space-y-2">{renderList()}</div>
        <HistoryModal showModal={modal} toggle={toggle} data={value} />
      </div>
    </div>
  );
};

export default PurchaseHistory;
