import React, {useEffect, useState} from "react";
import ImagesCard from "../components/ImagesCard";
import ReactPaginate from "react-paginate";
import {useDispatch, useSelector} from "react-redux";
import {fetchPaymentProofAction} from "../redux/actions";

const PaymentAdmin = () => {
  const dispatch = useDispatch();
  const {payment_img, loading} = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchPaymentProofAction());
  }, [dispatch]);

  const [perPage] = useState(10);
  const [page, setPage] = useState(0);
  const from = page * perPage;
  const to = (page + 1) * perPage;
  const [pageCount, setPageCount] = useState(payment_img.length / perPage);

  const data = payment_img.filter((val, index) => {
    return index >= from && index < to;
  });

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPage(selectedPage);
  };
  const renderAll = () => {};
  return (
    <div style={{marginTop: "15px"}}>
      <div>
        <ImagesCard modName="Order Confirmation" imageUrl="" status={``} />
      </div>
      <div>
        <div className="flex flex-col mx-2">
          <div className="flex flex-wrap">{loading ? null : "renderAll"}</div>
          <div className="flex-row align-baseline">
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
      </div>
    </div>
  );
};

export default PaymentAdmin;
