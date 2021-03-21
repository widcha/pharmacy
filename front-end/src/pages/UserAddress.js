import React, {useEffect, useState} from "react";
import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import {
  addNewAddressAction,
  deleteAddressAction,
  fetchAddressAction,
  editAddressAction,
} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

const UserAddress = () => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.user.user_address);
  const {user_id} = useSelector((state) => state.user);

  const [perPage] = useState(10);
  const [page, setPage] = useState(0);
  const from = page * perPage;
  const to = (page + 1) * perPage;
  const {loading} = useSelector((state) => state.product);
  const [pageCount, setPageCount] = useState(address.length / perPage);

  const data = address.filter((val, index) => {
    return index >= from && index < to;
  });

  useEffect(() => {
    dispatch(fetchAddressAction({user_id}));
  }, [dispatch]);

  const [user_address, setAddress] = useState("");
  const [idAddress, setIdAddress] = useState(0);
  const [clicked, setClick] = useState(false);
  const [addClick, setAddClick] = useState(false);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();
  const [searchWord, setSearch] = useState("");

  const toggle = (id) => {
    Swal.fire({
      title: `Are you sure to delete this address?`,
      text: "You won't be able to revert this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deleted!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAddressAction({id, user_id}));
        Swal.fire("Deleted!", "Your address has been deleted.", "success");
      }
    });
  };
  const editButton = (id) => {
    setClick(true);
    setIdAddress(id);
  };

  const saveButton = (id) => {
    if (user_address) {
      dispatch(editAddressAction({user_address, user_address_id: id, user_id}));
      setClick(false);
    }
  };

  const cancelButton = () => {
    setClick(false);
    setAddClick(false);
  };

  const searchBtn = () => {
    const a = `?search=${searchWord}`;
    dispatch(fetchAddressAction({a, user_id}));
  };

  const addNewBtn = () => {
    if (address.length < 15) {
      setAddClick(true);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Max. address per user is 15",
        text:
          "Please consider deleting or editing some of your address or contact admin for another solution",
      });
    }
  };

  const saveAddBtn = (user_address) => {
    if (user_address) {
      dispatch(addNewAddressAction({user_address, user_id}));
      setAddClick(false);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Can't add a blank address",
        text: "You need to fill the address!",
      });
    }
  };

  const renderRow = () => {
    return data.map((row, index) => (
      <TableRow key={row.user_address_id} style={{maxWidth: "1000px"}}>
        <TableCell>{page === 0 ? index + 1 : index + 1 + page * 10}</TableCell>
        {clicked && row.user_address_id === idAddress && addClick === false ? (
          <>
            <TableCell style={{width: "500px"}}>
              <TextField
                placeholder="Address Name"
                label="Address Name"
                id="address-name"
                defaultValue={row.user_address}
                size="small"
                style={{width: "400px"}}
                onChange={(e) => setAddress(e.target.value)}
              />
            </TableCell>
            <TableCell align="center">
              <Button
                onClick={() => saveButton(row.user_address_id)}
                style={{backgroundColor: "#4a91bb", color: "white"}}
              >
                Save
              </Button>
              <Button
                onClick={() => cancelButton()}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginLeft: "20px",
                }}
              >
                Cancel
              </Button>
            </TableCell>
          </>
        ) : (
          <>
            <TableCell style={{flexWrap: "wrap", width: "500px"}}>
              {row.user_address}
            </TableCell>
            <TableCell align="center">
              <Button
                onClick={() => editButton(row.user_address_id)}
                style={{backgroundColor: "#4a91bb", color: "whitesmoke"}}
                disabled={addClick}
              >
                Edit
              </Button>
              <Button
                onClick={() => toggle(row.user_address_id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginLeft: "20px",
                }}
                disabled={addClick}
              >
                Delete
              </Button>
            </TableCell>
          </>
        )}
      </TableRow>
    ));
  };
  const renderNewRow = () => {
    return addClick ? (
      <TableRow>
        <TableCell></TableCell>
        <TableCell>
          <TextField
            placeholder="Address Name"
            label="Address Name"
            id="address-name"
            size="small"
            onChange={(e) => setAddress(e.target.value)}
          />
        </TableCell>
        <TableCell align="center">
          <Button
            onClick={() => saveAddBtn(user_address)}
            style={{backgroundColor: "#4a91bb", color: "white"}}
          >
            Save
          </Button>
          <Button
            onClick={cancelButton}
            style={{
              backgroundColor: "red",
              color: "white",
              marginLeft: "20px",
            }}
          >
            Cancel
          </Button>
        </TableCell>
      </TableRow>
    ) : null;
  };
  useEffect(() => {
    setPageCount(address.length / perPage);
  }, [perPage, address]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPage(selectedPage);
  };

  const renderAll = () => {
    return (
      <div>
        <div style={{display: "flex", flexDirection: "row"}}>
          <div style={{display: "flex"}}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {renderRow()}
                  {renderNewRow()}
                </TableBody>
              </Table>
            </TableContainer>
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
            <div>
              <TextField
                placeholder="Search..."
                label="Search"
                id="search"
                onChange={(e) => setSearch(e.target.value)}
                style={{width: "275px", paddingBottom: "10px"}}
              />
            </div>
            <Button
              onClick={searchBtn}
              style={{backgroundColor: "#2460A7FF", color: "white"}}
            >
              Search
            </Button>
            <Button
              style={{
                backgroundColor: "#759cd8",
                color: "whitesmoke",
                marginTop: "10px",
              }}
              onClick={addNewBtn}
            >
              Add New Address
            </Button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div
      className="flex flex-col mx-2"
      style={{paddingLeft: "50px", paddingTop: "10px"}}
    >
      <div className="flex flex-wrap">{loading ? null : renderAll()}</div>
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

export default UserAddress;
