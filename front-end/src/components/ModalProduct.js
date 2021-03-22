import React, {useEffect, useState} from "react";
import {
  Button,
  makeStyles,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  TextField,
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import Swal from "sweetalert2";
import {
  addProductAction,
  editProductAction,
  fetchProductAction,
} from "../redux/actions";

const ModalProduct = ({toggle, showModal, modalName, idProd, data}) => {
  const dispatch = useDispatch();

  const [showModall, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(showModal);
  }, [showModal]);

  const categoryList = useSelector((state) => state.product.category);
  const useStyles = makeStyles({
    root: {
      minWidth: 700,
      backgroundColor: "grey",
    },
    media: {
      height: 250,
      maxwidth: 350,
      width: 250,
      marginLeft: 25,
      float: "left",
    },
    main: {
      paddingLeft: 25,
    },
    content: {
      float: "right",
    },
  });
  const classes = useStyles();

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newVol, setNewVol] = useState(0);
  const [newStock, setNewStock] = useState(1);
  const [newDesc, setNewDesc] = useState("");
  const [pict, setPict] = useState();
  const [pictName, setPictName] = useState("");
  const [selectedCategory, setCategory] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const uploadImg = (e) => {
    if (e.target.files[0]) {
      setPictName(e.target.files[0].name);
      setPict(e.target.files[0]);
    }
  };
  const incStock = () => {
    setNewStock(newStock + 1);
  };
  const decStock = () => {
    setNewStock(newStock - 1);
  };

  const [oldStock, setOldStock] = useState(data !== undefined ? data.stock : 0);
  const incOldStock = () => {
    setOldStock(oldStock + 1);
  };
  const decOldStock = () => {
    setOldStock(oldStock - 1);
  };

  useEffect(() => {
    if (data) {
      setNewName(data.name);
      setNewPrice(data.price);
      setNewVol(data.vol);
      setNewDesc(data.desc);
    }
  }, [data]);
  const saveChange = (idProd) => {
    if (newName && newPrice && newVol && newDesc && selectedCategory) {
      if (idProd && oldStock) {
        dispatch(
          editProductAction({
            idProd,
            newName,
            newPrice,
            newVol,
            oldStock,
            newDesc,
            selectedCategory,
            pict,
          })
        );
      } else if (pict && newStock) {
        dispatch(
          addProductAction({
            newName,
            newPrice,
            newVol,
            newStock,
            newDesc,
            selectedCategory,
            pict,
          })
        );
      }
    } else {
      Swal.fire({
        icon: "warning",
        text: "You need to fill everything",
      });
    }

    dispatch(fetchProductAction());
    setPict();
    setPictName("");
    setCategory("");
    toggle();
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <>
      {showModall ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            style={{paddingTop: "35px"}}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div style={{display: "flex", flexDirection: "row"}}>
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                    <h3 className="text-3xl font-semibold">{modalName}</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={toggle}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div
                    className="relative p-6 flex-auto"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "500px",
                    }}
                  >
                    <TextField
                      // placeholder="Name"
                      value={newName}
                      label={"Name"}
                      id="name"
                      size="large"
                      onChange={handleNameChange}
                    />
                    <TextField
                      // placeholder="Price"
                      value={newPrice}
                      label={"Price"}
                      id="price"
                      size="large"
                      onChange={(e) => setNewPrice(e.target.value)}
                    />
                    <div>
                      Stock (per bottle):
                      {idProd ? (
                        <>
                          <Button
                            disabled={oldStock === 1}
                            onClick={decOldStock}
                          >
                            -
                          </Button>
                          {oldStock}
                          <Button onClick={incOldStock}>+</Button>
                        </>
                      ) : (
                        <>
                          <Button disabled={newStock === 1} onClick={decStock}>
                            -
                          </Button>
                          {newStock}
                          <Button onClick={incStock}>+</Button>
                        </>
                      )}
                    </div>

                    <TextField
                      // placeholder="Volume"
                      value={newVol}
                      label={"Volume"}
                      id="volume"
                      size="large"
                      onChange={(e) => setNewVol(e.target.value)}
                    />
                    <TextField
                      // placeholder="Description"
                      value={newDesc}
                      label={"Description"}
                      id="description"
                      size="large"
                      onChange={(e) => setNewDesc(e.target.value)}
                    />
                    <FormControl>
                      <InputLabel id="demo-controlled-open-select-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        id="category"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        onChange={handleChange}
                      >
                        {categoryList.map((val) => (
                          <MenuItem value={val.product_category_id}>
                            {val.product_category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <input
                      accept="image/*"
                      className={classes.input}
                      style={{display: "none"}}
                      id="raised-button-file"
                      onChange={uploadImg}
                      multiple
                      type="file"
                    />
                    <label htmlFor="raised-button-file">
                      <Button
                        variant="raised"
                        component="span"
                        className={classes.button}
                        style={{
                          backgroundColor: "#00a6c3",
                          color: "whitesmoke",
                          marginTop: "5px",
                        }}
                        onClick={() => console.log("Ok")}
                      >
                        Upload
                      </Button>
                      {pictName}
                    </label>
                  </div>
                  {/*footer*/}
                  <div
                    style={{height: "55px"}}
                    className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b"
                  >
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{transition: "all .15s ease"}}
                      onClick={toggle}
                    >
                      Close
                    </button>
                    <button
                      className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{
                        transition: "all .15s ease",
                        backgroundColor: "#00aeef",
                      }}
                      onClick={
                        idProd ? () => saveChange(idProd) : () => saveChange()
                      }
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
              {/* penutup */}
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ModalProduct;
