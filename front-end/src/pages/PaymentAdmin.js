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
  const {payment_img, loading} = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchPaymentProofAction());
    dispatch(adminFetchTransaction());
  }, [dispatch]);

  const [perPage] = useState(10);
  const [page, setPage] = useState(0);
  const from = page * perPage;
  const to = (page + 1) * perPage;
  const [pageCount, setPageCount] = useState(payment_img.length / perPage);

  const data = payment_img.filter((val, index) => {
    return index >= from && index < to;
  });
  useEffect(() => {
    setPageCount(payment_img.length / perPage);
  }, [perPage, payment_img]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPage(selectedPage);
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
    if (sort === "" && sortStatus === "" && searchWord === "") {
      history.push("/payment-proof");
      dispatch(fetchPaymentProofAction());
    }
    if (sort !== "" || sortStatus !== "" || searchWord !== "") {
      history.push(
        `/payment-proof?${sort ? `sort=${sort}` : ""}${
          searchWord ? `&search=${searchWord}` : ""
        }${sortStatus ? `&status=${sortStatus}` : ""}`
      );
      dispatch(fetchPaymentProofAction({sort, searchWord, sortStatus}));
    }
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
          {data
            ? data.map((val) => {
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
