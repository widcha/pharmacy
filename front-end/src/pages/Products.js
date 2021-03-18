import React, { useEffect, useState } from "react";
import CardProductUser from "../components/CardProductUser";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductAction } from "../redux/actions/productAction";

const Products = () => {
  const [perPage] = useState(10);
  const [page, setPage] = useState(0);
  const from = page * perPage;
  const to = (page + 1) * perPage;
  const dispatch = useDispatch();
  const { product_list, loading } = useSelector((state) => state.product);
  const [pageCount, setPageCount] = useState(product_list.length / perPage);

  const data = product_list.filter((val, index) => {
    return index >= from && index < to;
  });

  const renderProduct = () => {
    return (
      <>
        {data
          ? data.map((val, index) => {
              return (
                <CardProductUser
                  name={val.product_name}
                  price={val.product_price}
                />
              );
            })
          : null}
      </>
    );
  };

  useEffect(() => {
    setPageCount(product_list.length / perPage);
  }, [perPage, product_list]);

  useEffect(() => {
    dispatch(fetchProductAction());
  }, [dispatch]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPage(selectedPage);
  };

  return (
    <div className="flex flex-col mx-2">
      <div className="flex flex-wrap">{loading ? null : renderProduct()}</div>
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
  );
};

export default Products;
