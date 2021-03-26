import React, {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {useDispatch, useSelector} from "react-redux";
import {adminFetchTransaction} from "../redux/actions";
import {TransactionModal} from "../components/TransactionModal";
import {api_url} from "../helpers";
import capsules from "../assets/icons/pill2.png";

const TransactionAdmin = () => {
  // const [perPage] = useState(5);
  // const [page, setPage] = useState(0);
  // const from = page * perPage;
  // const to = (page + 1) * perPage;
  // const [modal, setModal] = useState(false);

  // const dispatch = useDispatch();
  // const [value, setValue] = useState({});
  // const {transaction_list} = useSelector((state) => state.transaction);

  // const [pageCount, setPageCount] = useState(transaction_list.length / perPage);

  // const data = transaction_list.filter((val, index) => {
  //   return index >= from && index < to;
  // });
  // useEffect(() => {
  //   setPageCount(transaction_list.length / perPage);
  // }, [perPage, transaction_list]);
  // useEffect(() => {
  //   dispatch(adminFetchTransaction());
  // }, [dispatch]);
  // const handlePageClick = (e) => {
  //   const selectedPage = e.selected;
  //   setPage(selectedPage);
  // };
  // const toggle = () => setModal(!modal);
  // const handleButton = (val) => {
  //   setValue(val);
  //   toggle();
  // };
  // const renderList = () => {
  //   return data.map((val) => {
  //     return (
  //       <div className="font-semibold text-gray-700 rounded-xl shadow border p-10  space-y-2">
  //         <span>{val.transaction_date.split("T")[0]}</span>{" "}
  //         <span className="bg-blue-100 p-1 rounded-sm">
  //           {val["Order_Status.order_status_status"]
  //             ? val["Order_Status.order_status_status"]
  //             : null}
  //         </span>{" "}
  //         <span className="text-gray-500">
  //           {val.transaction_invoice_number}
  //         </span>
  //         <div>
  //           {val.data.length > 0 ? (
  //             <div className="font-semibold text-gray-700 rounded-xl shadow border p-10 space-y-2 flex justify-between">
  //               {val.data.length !== 0 && val.custom_data.length !== 0 ? (
  //                 <div className="flex ">
  //                   <img
  //                     src={`${api_url}${val.data[0].Product.product_image_path}`}
  //                     alt="not found"
  //                     className="w-24"
  //                   />
  //                   <div className="flex flex-col">
  //                     <label>{val.data[0].product_name}</label>
  //                     <span>
  //                       {val.data[0].product_qty} item(s){" "}
  //                       <span>
  //                         x Rp&nbsp;
  //                         {Math.ceil(
  //                           val.data[0].Product.product_price /
  //                             val.data[0].Product.product_vol
  //                         )}
  //                       </span>
  //                     </span>

  //                     <span>
  //                       +{val.data.length + val.custom_data.length - 1} other
  //                       products
  //                     </span>
  //                   </div>
  //                 </div>
  //               ) : (
  //                 <div className="flex ">
  //                   <img
  //                     src={`${api_url}${val.data[0].Product.product_image_path}`}
  //                     alt="not found"
  //                     className="w-24"
  //                   />
  //                   <div className="flex flex-col">
  //                     {val.data[0].product_name}
  //                     <span>
  //                       {val.data[0].product_qty} item(s){" "}
  //                       <span>
  //                         x Rp&nbsp;
  //                         {Math.ceil(
  //                           val.data[0].Product.product_price /
  //                             val.data[0].Product.product_vol
  //                         )}
  //                       </span>
  //                     </span>
  //                   </div>
  //                 </div>
  //               )}
  //               {/* {val.data.map((normal) => {
  // 							return (
  // 								<div className="font-semibold text-gray-700 rounded-xl shadow border p-10 ">
  // 									{" "}
  // 									{normal.product_name}
  // 								</div>
  // 							);
  // 						})} */}
  //               <div className="flex border-l-2 items-center">
  //                 <div className="ml-5 items-center content-center ">
  //                   <div className="font-normal">Total Price</div>
  //                   <div className="font-semibold text-lg">
  //                     Rp {val.transaction_payment_details}
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           ) : (
  //             <div className="font-semibold text-gray-700 rounded-xl shadow border p-10 space-y-2 flex justify-between">
  //               {val.custom_data.length > 1 ? (
  //                 <div className="flex ">
  //                   <img src={capsules} className="w-24 h-16" />
  //                   {/* {val.custom_data[0].product_name} */}
  //                   <div className="flex flex-col">
  //                     <div>Custom Product</div>
  //                     <span>
  //                       {val.custom_data[0].custom_product_qty} item(s){" "}
  //                       <span>
  //                         x Rp&nbsp;
  //                         {val.custom_data[0].custom_product_price}
  //                       </span>
  //                     </span>
  //                     <span>
  //                       +{val.custom_data.length - 1} other custom products
  //                     </span>
  //                   </div>
  //                 </div>
  //               ) : (
  //                 <div className="flex ">
  //                   <img src={capsules} className="w-24 h-16" />
  //                   {/* {val.custom_data[0].product_name} */}
  //                   <div className="flex flex-col">
  //                     <div>Custom Product</div>
  //                     <span>
  //                       {val.custom_data[0].custom_product_qty} item(s){" "}
  //                       <span>
  //                         x Rp&nbsp;
  //                         {val.custom_data[0].custom_product_price}
  //                       </span>
  //                     </span>
  //                   </div>
  //                 </div>
  //               )}
  //               <div className="flex border-l-2 items-center">
  //                 <div className="ml-5 items-center content-center">
  //                   <div className="font-normal">Total Price</div>
  //                   <div className="font-semibold text-lg">
  //                     Rp {val.transaction_payment_details}
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           )}
  //         </div>
  //         <button
  //           onClick={() => handleButton(val)}
  //           className="font-semibold text-xl text-blue-500 focus:outline-none"
  //         >
  //           Transaction details
  //         </button>
  //       </div>
  //     );
  //   });
  // };
  return (
    <div
      className="container flex p-auto"
      style={{display: "flex", flexDirection: "column", marginTop: "10px"}}
    >
      Transaction Page
      {/* <div className="flex-row pt-8 pr-32">
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
      <div className="m-auto w-full mx-2 h-full">
        <label className="font-semibold text-gray-800 text-xl">
          TRANSACTION LIST
        </label>
        <div className="border h-full w-full space-y-2">{renderList()}</div>
        <TransactionModal showModal={modal} toggle={toggle} data={value} />
      </div> */}
    </div>
  );
};

export default TransactionAdmin;
