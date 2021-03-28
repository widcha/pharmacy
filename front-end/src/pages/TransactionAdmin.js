import React, {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {useDispatch, useSelector} from "react-redux";
import {
  adminFetchTransaction,
  changeOrderStatusAction,
  getItemLength,
} from "../redux/actions";
import {Transactions} from "../components/Transactions";
import {api_url} from "../helpers";
import capsules from "../assets/icons/pill2.png";
import {Link, useHistory} from "react-router-dom";
import Swal from "sweetalert2";

export const TransactionAdmin = (props) => {
  const history = useHistory();

  //Pagination
  const [perPage] = useState(5);
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const [value, setValue] = useState({});
  const {transaction_list} = useSelector((state) => state.transaction);
  const {lengths} = useSelector((state) => state.admin);

  const [pageCount, setPageCount] = useState(
    Math.ceil(lengths.transactions / perPage)
  );
  useEffect(() => {
    dispatch(getItemLength());
    dispatch(adminFetchTransaction(props.location.search));
  }, [dispatch, props.location.search]);

  const data = transaction_list;
  useEffect(() => {
    setPageCount(lengths.transactions / perPage);
  }, [perPage, transaction_list]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const addLink = props.location.search.split("=")[3];
    history.push(
      `/transaction?page=${selectedPage + 1}&limit=5&order_status=${addLink}`
    );
  };
  const toggle = () => setModal(!modal);
  const handleButton = (val) => {
    setValue(val);
    toggle();
  };

  const handleSentOrder = (invoice) => {
    if (invoice) {
      Swal.fire({
        title: "Sent this order?",
        text: "You won't be able to revert this",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            changeOrderStatusAction({
              id: invoice,
              order_status_id: 3,
              reason: `Transaction ${invoice} sent by Admin`,
            })
          );
          history.push(`/transactions${props.location.search}`);
          Swal.fire("Order Sent!", "", "success");
        }
      });
    }
  };
  const renderList = () => {
    return data.map((val, i) => {
      return (
        <div className="font-semibold text-gray-700 rounded-xl shadow border p-10  space-y-2">
          <div>
            <div>
              <span>{val.transaction_date.split("T")[0]}</span>{" "}
              <span className="bg-blue-100 p-1 rounded-sm">
                {val["Order_Status.order_status_status"]
                  ? val["Order_Status.order_status_status"]
                  : null}
              </span>{" "}
              <span className="text-gray-500">
                {val.transaction_invoice_number}
              </span>
            </div>
            <div></div>
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
                          ).toLocaleString()}
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
                      {val.data[0].product_name}
                      <span>
                        {val.data[0].product_qty} item(s){" "}
                        <span>
                          x Rp&nbsp;
                          {Math.ceil(
                            val.data[0].Product.product_price /
                              val.data[0].Product.product_vol
                          ).toLocaleString()}
                        </span>
                      </span>
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
                    <img src={capsules} className="w-24 h-16" alt="" />
                    <div className="flex flex-col">
                      <div>Custom Product</div>
                      <span>
                        {val.custom_data[0].custom_product_qty} item(s){" "}
                        <span>
                          x Rp&nbsp;
                          {val.custom_data[0].custom_product_price.toLocaleString()}
                        </span>
                      </span>
                      <span>
                        +{val.custom_data.length - 1} other custom products
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex ">
                    <img src={capsules} className="w-24 h-16" alt="" />
                    <div className="flex flex-col">
                      <div>Custom Product</div>
                      <span>
                        {val.custom_data[0].custom_product_qty} item(s){" "}
                        <span>
                          x Rp&nbsp;
                          {val.custom_data[0].custom_product_price.toLocaleString()}
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
          <div className="flex justify-between">
            <button
              onClick={() => handleButton(val)}
              className="font-semibold text-xl text-blue-500 focus:outline-none"
            >
              Transaction details
            </button>
            {val.order_status_id === 2 ? (
              <button
                className="flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-md"
                onClick={() => handleSentOrder(val.transaction_invoice_number)}
              >
                Send
              </button>
            ) : null}
          </div>
        </div>
      );
    });
  };
  return (
    <div className="flex flex-col h-full px-50 pt-5">
      <div className="m-auto mx-2 h-auto flex flex-col ">
        <div className="flex items-center w-full">
          <label className="font-semibold text-gray-800 text-xl flex w-1/2 ">
            TRANSACTION LIST
          </label>
        </div>

        <div className="border h-full w-full space-y-2 p-2 rounded-lg">
          <div className="space-x-2">
            <Link to="/transaction?page=1&limit=5&order_status=All">
              <button class="inline-flex text-gray-700 bg-transparent border-2 py-2 px-6 focus:bg-indigo-50 focus:outline-none hover:bg-indigo-50 rounded-xl text-md transition duration-200">
                All
              </button>
            </Link>
            <Link to="/transaction?page=1&limit=5&order_status=1">
              <button class="inline-flex text-gray-700 bg-transparent border-2 py-2 px-6 focus:bg-indigo-50 focus:outline-none hover:bg-indigo-50 rounded-xl text-md transition duration-200">
                Payment Pending
              </button>
            </Link>
            <Link to="/transaction?page=1&limit=5&order_status=2">
              <button class="inline-flex text-gray-700 bg-transparent border-2 py-2 px-6 focus:bg-indigo-50 focus:outline-none hover:bg-indigo-50 rounded-xl text-md transition duration-200">
                Order Confirmed
              </button>
            </Link>
            <Link to="/transaction?page=1&limit=5&order_status=3">
              <button class="inline-flex text-gray-700 bg-transparent border-2 py-2 px-6 focus:bg-indigo-50 focus:outline-none hover:bg-indigo-50 rounded-xl text-md transition duration-200">
                Delivered
              </button>
            </Link>
            <Link to="/transaction?page=1&limit=5&order_status=4">
              <button class="inline-flex text-gray-700 bg-transparent border-2 py-2 px-6 focus:bg-indigo-50 focus:outline-none hover:bg-indigo-50 rounded-xl text-md transition duration-200">
                Cancelled
              </button>
            </Link>
            <Link to="/transaction?page=1&limit=5&order_status=5">
              <button class="inline-flex text-gray-700 bg-transparent border-2 py-2 px-6 focus:bg-indigo-50 focus:outline-none hover:bg-indigo-50 rounded-xl text-md transition duration-200">
                Arrived
              </button>
            </Link>
          </div>
          <div className="space-y-2">
            {transaction_list.length > 0 ? renderList() : null}
          </div>
        </div>
        {transaction_list.length > 0 ? (
          <div className=" flex justify-center fixed right-10">
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

        <Transactions showModal={modal} toggle={toggle} data={value} />
      </div>
    </div>
  );
};
