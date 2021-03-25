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

  const {loading} = useSelector((state) => state.product);

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
      setClick(false);
      dispatch(editAddressAction({user_address, user_address_id: id, user_id}));
    }
  };

  const cancelButton = () => {
    setClick(false);
    setAddClick(false);
  };

  const addNewBtn = () => {
    if (address.length < 3) {
      setAddClick(true);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Max. address is 3",
        text: "You can edit / delete one of your address",
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
    return address.map((row, index) => (
      <TableRow key={row.user_address_id} style={{maxWidth: "700px"}}>
        <TableCell>{index + 1}</TableCell>
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
                style={{backgroundColor: "#0079bf", color: "white", outline: 0}}
              >
                Save
              </Button>
              <Button
                onClick={cancelButton}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginLeft: "20px",
                  outline: 0,
                }}
              >
                Cancel
              </Button>
            </TableCell>
          </>
        ) : (
          <>
            <TableCell
              style={{
                flexWrap: "wrap",
                maxWidth: "500px",
                wordWrap: "break-word",
              }}
            >
              {row.user_address}
            </TableCell>
            <TableCell align="center">
              <Button
                onClick={() => editButton(row.user_address_id)}
                style={{
                  backgroundColor: "#0079bf",
                  color: "whitesmoke",
                  outline: 0,
                }}
                disabled={clicked}
              >
                Edit
              </Button>
              <Button
                onClick={() => toggle(row.user_address_id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginLeft: "20px",
                  outline: 0,
                }}
                disabled={clicked || addClick}
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
            style={{backgroundColor: "#0079bf", color: "white", outline: 0}}
          >
            Save
          </Button>
          <Button
            onClick={cancelButton}
            style={{
              backgroundColor: "red",
              color: "white",
              marginLeft: "20px",
              outline: 0,
            }}
          >
            Cancel
          </Button>
        </TableCell>
      </TableRow>
    ) : null;
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
            <Button
              style={{
                backgroundColor: "#055a8c",
                color: "whitesmoke",
                marginTop: "10px",
                outline: 0,
              }}
              onClick={addNewBtn}
              disabled={clicked}
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
      style={{paddingLeft: "175px", paddingTop: "10px"}}
    >
      <div className="flex flex-wrap">{loading ? null : renderAll()}</div>
    </div>
  );
};

export default UserAddress;
