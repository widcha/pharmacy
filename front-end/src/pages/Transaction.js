import React, {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchUserTransactionDetails,
  userCancelOrderAction,
  userComplainOrderAction,
  userConfirmOrderAction,
} from "../redux/actions";
import {TransactionModal} from "../components/TransactionModal";
import {ModalPayment} from "../components/ModalPayment";
import {api_url} from "../helpers";
import capsules from "../assets/icons/pill2.png";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

export const Transaction = (props) => {
  console.log(props.location.search.split("=")[1]);
  const [perPage] = useState(5);
  const [page, setPage] = useState(0);
  const from = page * perPage;
  const to = (page + 1) * perPage;
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const dispatch = useDispatch();
  const {user_id} = useSelector((state) => state.user);
  const [invNumber, setInvNumber] = useState("");
  const [value, setValue] = useState({});
  const {transaction_list} = useSelector((state) => state.transaction);

  const [pageCount, setPageCount] = useState(transaction_list.length / perPage);

  const data = transaction_list.filter((val, index) => {
    return index >= from && index < to;
  });
  useEffect(() => {
    setPageCount(transaction_list.length / perPage);
  }, [perPage, transaction_list]);
  useEffect(() => {
    dispatch(
      fetchUserTransactionDetails(user_id, props.location.search.split("=")[1])
    );
  }, [dispatch, user_id, props.location.search]);
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPage(selectedPage);
  };
  const toggle = () => setModal(!modal);
  const toggle2 = () => setModal2(!modal2);
  const handleButton = (val) => {
    setValue(val);
    toggle();
  };

  const handleUpload = (val) => {
    setInvNumber(val);
    toggle2();
  };

  const handleCancelOrder = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(userCancelOrderAction(data, user_id));
        Swal.fire("Canceled!", "Your order has been canceled.", "success");
      }
    });
  };
  const handleConfirmOrder = (data) => {
    Swal.fire({
      title: "Confirm your order?",
      text: "Please double-check the items prior confirming your order!",
      icon: "warning",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, confirm it!",
      denyButtonText: `Complain Order`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(userConfirmOrderAction(data, user_id));
        Swal.fire("Confirmed!", "Your order has been confirmed.", "success");
      } else if (result.isDenied) {
        Swal.fire({
          title: "Submit ",
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
            dispatch(userComplainOrderAction(data, user_id, results.value));
            Swal.fire({
              icon: "info",
              title: "Submitted, we'll contact you ASAP",
              text: `${results.value}`,
            });
          }
        });
      }
    });
  };
  const renderList = () => {
    return data.map((val, i) => {
      return (
        <div className="font-semibold text-gray-700 rounded-xl shadow border p-10  space-y-2">
          <div className="flex justify-between">
            <div>
              <span>{val.transaction_date.split("T")[0]}</span>{" "}
              <span
                className={
                  val.order_status_id === 1
                    ? "bg-yellow-100 p-1 rounded-sm"
                    : "bg-blue-100 p-1 rounded-sm"
                }
              >
                {val["Order_Status.order_status_status"]
                  ? val["Order_Status.order_status_status"]
                  : null}
              </span>{" "}
              <span className="text-gray-500">
                {val.transaction_invoice_number}
              </span>
            </div>
            <div>
              {val.order_status_id === 1 || val.order_status_id === 6 ? (
                <button
                  className="bg-red-400 font-semibold text-white px-2 py-1 rounded-md focus:outline-none hover:bg-red-900"
                  onClick={() =>
                    handleCancelOrder(val.transaction_invoice_number)
                  }
                >
                  Cancel Order
                </button>
              ) : null}
              {val.order_status_id === 3 ? (
                <button
                  className="bg-green-accent-200 font-semibold text-gray-700 px-2 py-1 rounded-md focus:outline-none hover:bg-green-accent-400"
                  onClick={() =>
                    handleConfirmOrder(val.transaction_invoice_number)
                  }
                >
                  Confirm Order
                </button>
              ) : null}
            </div>
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
                    <div className="flex flex-col">
                      <label>{val.data[0].product_name}</label>
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
                        product(s)
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
                      {val.data[0].product_name}
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
                        product(s)
                      </span>
                    </div>
                  </div>
                )}
                {/* {val.data.map((normal) => {
								return (
									<div className="font-semibold text-gray-700 rounded-xl shadow border p-10 ">
										{" "}
										{normal.product_name}
									</div>
								);
							})} */}
                <div className="flex border-l-2 items-center">
                  <div className="ml-5 items-center content-center ">
                    <div className="font-normal">Total Price</div>
                    <div className="font-semibold text-lg">
                      Rp {val.transaction_payment_details}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="font-semibold text-gray-700 rounded-xl shadow border p-10 space-y-2 flex justify-between">
                {val.custom_data.length > 1 ? (
                  <div className="flex ">
                    <img src={capsules} className="w-24 h-16" />
                    {/* {val.custom_data[0].product_name} */}
                    <div className="flex flex-col">
                      <div>Custom Product</div>
                      <span>
                        {val.custom_data[0].custom_product_qty} item(s){" "}
                        <span>
                          x Rp&nbsp;
                          {val.custom_data[0].custom_product_price}
                        </span>
                      </span>
                      <span>
                        +{val.custom_data.length - 1} other custom product(s)
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex ">
                    <img src={capsules} className="w-24 h-16" />
                    {/* {val.custom_data[0].product_name} */}
                    <div className="flex flex-col">
                      <div>Custom Product</div>
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
                      Rp {val.transaction_payment_details}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => handleButton(val)}
              className="font-semibold text-xl text-blue-500 focus:outline-none"
            >
              Transaction details
            </button>
            {val.order_status_id === 1 ? (
              <button
                className="flex text-white bg-indigo-300 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-500 rounded text-md"
                onClick={() => handleUpload(val.transaction_invoice_number)}
              >
                Upload Payment Slip
              </button>
            ) : null}
          </div>
        </div>
      );
    });
  };
  return (
    <div className="flex flex-col  h-full px-56">
      <div className="m-auto mx-2 h-auto flex flex-col ">
        <div className="flex items-center w-full my-5">
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
            <path
              fill-rule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <label className="font-semibold text-gray-800 text-3xl flex w-1/2 ">
            TRANSACTION LIST
          </label>
        </div>

        <div className="border h-full w-full space-y-2 p-6 rounded-xl ">
          <div className="space-x-2">
            <Link to="/user/transaction?order_status=All">
              <button class="inline-flex text-gray-700 bg-transparent border-2 py-2 px-6 focus:bg-indigo-50 focus:outline-none hover:bg-indigo-50 rounded-xl text-md transition duration-200">
                All
              </button>
            </Link>
            <Link to="/user/transaction?order_status=1">
              <button class="inline-flex text-gray-700 bg-transparent border-2 py-2 px-6 focus:bg-indigo-50 focus:outline-none hover:bg-indigo-50 rounded-xl text-md transition duration-200">
                Payment Pending
              </button>
            </Link>
            <Link to="/user/transaction?order_status=2">
              <button class="inline-flex text-gray-700 bg-transparent border-2 py-2 px-6 focus:bg-indigo-50 focus:outline-none hover:bg-indigo-50 rounded-xl text-md transition duration-200">
                Order Confirmed
              </button>
            </Link>
            <Link to="/user/transaction?order_status=3">
              <button class="inline-flex text-gray-700 bg-transparent border-2 py-2 px-6 focus:bg-indigo-50 focus:outline-none hover:bg-indigo-50 rounded-xl text-md transition duration-200">
                Delivered
              </button>
            </Link>
            <Link to="/user/transaction?order_status=6">
              <button class="inline-flex text-gray-700 bg-transparent border-2 py-2 px-6 focus:bg-indigo-50 focus:outline-none hover:bg-indigo-50 rounded-xl text-md transition duration-200">
                Payment Slip Uploaded
              </button>
            </Link>
          </div>
          <div className="space-y-2">
            {transaction_list.length > 0 ? renderList() : null}
          </div>
        </div>
        {transaction_list.length > 0 ? (
          <div className=" flex justify-center">
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
        ) : null}

        <TransactionModal showModal={modal} toggle={toggle} data={value} />
        <ModalPayment
          showModal={modal2}
          toggle={toggle2}
          transaction_invoice_number={invNumber}
        />
      </div>
    </div>
  );
};
