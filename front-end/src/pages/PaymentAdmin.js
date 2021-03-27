import React, {useEffect, useState} from "react";
import ImagesCard from "../components/ImagesCard";
import ReactPaginate from "react-paginate";
import {useDispatch, useSelector} from "react-redux";
import {adminFetchTransaction, fetchPaymentProofAction} from "../redux/actions";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import {useHistory} from "react-router";

const PaymentAdmin = () => {
  const dispatch = useDispatch();
  const {lengths, payment_img, loading} = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(adminFetchTransaction());
    dispatch(fetchPaymentProofAction(window.location.search));
  }, [dispatch]);

  const [perPage] = useState(9);
  const [pageCount, setPageCount] = useState(lengths.pay_img / perPage);

  useEffect(() => {
    setPageCount(lengths.pay_img / perPage);
  }, [perPage]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const url = `?page=${selectedPage + 1}&limit=9`;
    history.push(`/payment-proof${url}`);
    dispatch(fetchPaymentProofAction(url));
  };

  const [sort, setSort] = useState("");
  const [open, setOpen] = useState(false);
  const [searchWord, setSearch] = useState("");

  const handleSort = (e) => {
    setSort(e.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [sortStatus, setSortStatus] = useState("");
  const [openStatus, setOpenStatus] = useState(false);

  const handleSortStatus = (e) => {
    setSortStatus(e.target.value);
  };
  const handleOpenStatus = () => {
    setOpenStatus(true);
  };
  const handleCloseStatus = () => {
    setOpenStatus(false);
  };
  const history = useHistory();
  const searchBtn = () => {
    let url = `/payment-proof?page=1&limit=9`;
    if (sort !== "") {
      url += `&sort=${sort}`;
    }
    if (sortStatus !== "") {
      url += `&status=${sortStatus}`;
    }
    if (searchWord !== "") {
      url += `&search=${searchWord}`;
    }
    history.push(url);
    dispatch(fetchPaymentProofAction(url));
  };
  const renderAll = () => {
    return (
      <div style={{display: "flex", flexDirection: "row"}}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {payment_img
            ? payment_img.map((val) => {
                return (
                  <ImagesCard
                    modName="Order Confirmation"
                    imageUrl={`${val.payment_images_image_path}`}
                    transaction_invoice_number={`${val.transaction_invoice_number}`}
                    username={`${val.User.user_username}`}
                    status={`${
                      val.payment_status === 0
                        ? "Pending"
                        : val.payment_status === 1
                        ? "Confirmed"
                        : "Canceled"
                    }`}
                  />
                );
              })
            : null}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "275px",
            paddingTop: "17px",
            maxHeight: "50px",
            position: "fixed",
            left: "78%",
          }}
        >
          <FormControl style={{width: "275px"}}>
            <InputLabel id="demo-controlled-open-select-label">
              Sort By Date
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="category"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              onChange={handleSort}
            >
              <MenuItem value="ASC">Latest</MenuItem>
              <MenuItem value="DESC">Newest</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{width: "275px"}}>
            <InputLabel id="demo-controlled-open-select-label">
              Sort By Status
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="category"
              open={openStatus}
              onClose={handleCloseStatus}
              onOpen={handleOpenStatus}
              onChange={handleSortStatus}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Confirmed">Confirmed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <div>
            <TextField
              placeholder="Username"
              label="Search"
              id="search"
              value={searchWord ? searchWord : ""}
              onChange={(e) => setSearch(e.target.value)}
              style={{width: "275px", paddingBottom: "10px"}}
            />
          </div>
          <Button
            onClick={searchBtn}
            style={{backgroundColor: "#2460A7FF", color: "white", outline: 0}}
          >
            Search
          </Button>
        </div>
      </div>
    );
  };
  return (
    <div style={{marginTop: "15px", maxWidth: "750px", minWidth: "750px"}}>
      <div>
        <div className="flex flex-row justify-between">
          <h3 className="text-xl mt-4 ml-3 font-semibold">
            Customer's Payment Receipt
          </h3>
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
        <div className="flex flex-col">
          <div className="flex flex-wrap">{loading ? null : renderAll()}</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentAdmin;
