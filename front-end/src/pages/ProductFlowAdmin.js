import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchCategoryAction,
  fetchFilterProductAction,
  fetchProductAction,
  getStockFlowAction,
} from "../redux/actions";
import ReactPaginate from "react-paginate";
import {Link} from "react-router-dom";
import {api_url} from "../helpers";

const ProductFlowAdmin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStockFlowAction());
    dispatch(fetchProductAction());
    dispatch(fetchCategoryAction());
  }, [dispatch]);

  const product_list = useSelector((state) => state.product.product_list);
  const category = useSelector((state) => state.product.category);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();

  const [perPage] = useState(10);
  const [page, setPage] = useState(0);
  const from = page * perPage;
  const to = (page + 1) * perPage;
  const {material_flow, loading} = useSelector((state) => state.admin);
  const [pageCount, setPageCount] = useState(material_flow.length / perPage);

  const [selectProduct, setSelectProduct] = useState(false);

  const data = material_flow.filter((val, index) => {
    return index >= from && index < to;
  });

  const secondData = product_list.filter((val, index) => {
    return index >= from && index < to;
  });

  const [sort, setSort] = useState("");
  const [open, setOpen] = useState(false);

  const handleSort = (e) => {
    setSort(e.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openn, setOpenn] = useState(false);

  const [searchWord, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const handleOpenn = () => {
    setOpenn(true);
  };
  const handleClosee = () => {
    setOpenn(false);
  };
  const handleFilterCategory = (e) => {
    setFilterCategory(e.target.value);
  };
  const searchBtn = () => {
    dispatch(fetchFilterProductAction({searchWord}));
  };
  const searchSecBtn = () => {
    dispatch(getStockFlowAction({sort}));
  };

  useEffect(() => {
    if (selectProduct) {
      setPageCount(product_list.length / perPage);
    } else {
      setPageCount(material_flow.length / perPage);
    }
  }, [perPage, material_flow, selectProduct]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPage(selectedPage);
  };
  const renderProduct = () => {
    if (secondData) {
      if (filterCategory) {
        return secondData
          .filter((val) => val.product_category_id === filterCategory)
          .map((row, index) => {
            return (
              <TableRow key={row.product_id}>
                <TableCell>
                  {page === 0 ? index + 1 : index + 1 + page * 10}
                </TableCell>
                <TableCell>{row.product_name}</TableCell>
                <TableCell align="center">
                  <img
                    src={`${api_url}${row.product_image_path}`}
                    alt={`${row.product_name}`}
                    style={{height: "150px"}}
                  />
                </TableCell>
                <TableCell align="center">
                  {row.Product_Category.product_category}
                </TableCell>
                <TableCell align="center">{row.product_stock}</TableCell>
                <TableCell align="center">
                  <Link to={`/product-flow-detail?id=${row.product_id}`}>
                    <Button
                      style={{
                        backgroundColor: "#2832C2",
                        outline: 0,
                        color: "whitesmoke",
                      }}
                    >
                      Info
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          });
      } else {
        return secondData.map((row, index) => {
          return (
            <TableRow key={row.product_id}>
              <TableCell>
                {page === 0 ? index + 1 : index + 1 + page * 10}
              </TableCell>
              <TableCell>{row.product_name}</TableCell>
              <TableCell align="center">
                <img
                  src={`${api_url}${row.product_image_path}`}
                  alt={`${row.product_name}`}
                  style={{height: "150px"}}
                />
              </TableCell>
              <TableCell align="center">
                {row.Product_Category.product_category}
              </TableCell>
              <TableCell align="center">{row.product_stock}</TableCell>
              <TableCell align="center">
                <Link to={`/product-flow-detail?id=${row.product_id}`}>
                  <Button
                    style={{
                      backgroundColor: "#2832C2",
                      outline: 0,
                      color: "whitesmoke",
                    }}
                  >
                    Info
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          );
        });
      }
    }
  };
  const renderRow = () => {
    if (data) {
      return data.map((row, index) => {
        return (
          <TableRow key={row.material_flow_id}>
            <TableCell>
              {page === 0 ? index + 1 : index + 1 + page * 10}
            </TableCell>
            <TableCell>{row.Product.product_name}</TableCell>
            <TableCell align="center">
              {row.stock - row.material_flow_stock}
            </TableCell>
            <TableCell align="center">{row.material_flow_stock}</TableCell>
            <TableCell align="center">{row.stock}</TableCell>
            <TableCell align="center">{row.createdAt.split("T")[0]}</TableCell>
            <TableCell align="center">
              {row.createdAt.split("T")[1].split(".")[0]}
            </TableCell>
            <TableCell>{row.material_flow_info}</TableCell>
          </TableRow>
        );
      });
    }
  };
  const renderSpc = () => {
    return (
      <div>
        <div style={{display: "flex", flexDirection: "row"}}>
          <div style={{display: "flex", marginTop: "23px"}}>
            <TableContainer
              component={Paper}
              style={{backgroundColor: "#D5F5EE"}}
            >
              <Table className={classes.table} aria-label="simple table">
                <TableHead style={{backgroundColor: "#65ccb8"}}>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="center">Images</TableCell>
                    <TableCell align="center">Product Category</TableCell>
                    <TableCell align="center">Stock</TableCell>
                    <TableCell align="center">Detail</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{renderProduct()}</TableBody>
              </Table>
            </TableContainer>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "275px",
              paddingTop: "7px",
              maxHeight: "50px",
              position: "fixed",
              left: "78%",
            }}
          >
            {/* CATEGORY FILTER */}
            <FormControl style={{width: "275px"}}>
              <InputLabel id="demo-controlled-open-select-label">
                Filter By Category
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="category"
                open={openn}
                onClose={handleClosee}
                onOpen={handleOpenn}
                onChange={handleFilterCategory}
              >
                <MenuItem value="">All</MenuItem>
                {category.map((val) => (
                  <MenuItem value={val.product_category_id}>
                    {val.product_category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div>
              <TextField
                placeholder="Search..."
                label="Search"
                id="search"
                onChange={(e) => setSearch(e.target.value)}
                style={{width: "275px"}}
              />
            </div>

            <Button
              onClick={searchBtn}
              style={{
                backgroundColor: "#2460A7FF",
                color: "white",
                marginTop: "10px",
                outline: 0,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => dispatch(fetchProductAction())}
              style={{
                backgroundColor: "#759cd8",
                marginTop: "10px",
                outline: 0,
              }}
            >
              All Products
            </Button>
          </div>
        </div>
      </div>
    );
  };
  const renderAll = () => {
    return (
      <div>
        <div style={{display: "flex", marginTop: "23px"}}>
          <TableContainer
            component={Paper}
            style={{backgroundColor: "#D5F5EE"}}
          >
            <Table className={classes.table} aria-label="simple table">
              <TableHead style={{backgroundColor: "#65ccb8"}}>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Initial Stock</TableCell>
                  <TableCell>Stock Changes</TableCell>
                  <TableCell>Final Stock</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Time</TableCell>
                  <TableCell>Stock Info</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderRow()}</TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  };
  const backToAll = () => {
    setPage(0);
    setSelectProduct(false);
  };

  const header = () => {
    return (
      <div
        style={{
          marginTop: "25px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Button
            onClick={backToAll}
            style={{
              backgroundColor: "#2460A7FF",
              color: "whitesmoke",
              outline: 0,
            }}
          >
            All
          </Button>
          <Button
            onClick={() => setSelectProduct(true)}
            style={{
              marginLeft: "15px",
              backgroundColor: "#0492C2",
              color: "white",
              outline: 0,
            }}
          >
            Select By Product
          </Button>
        </div>
        {selectProduct ? null : (
          <div>
            <FormControl style={{width: "175px"}}>
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
                <MenuItem value="">All</MenuItem>
                <MenuItem value="OLD">Date (old to new)</MenuItem>
                <MenuItem value="NEW">Date (new to old)</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={searchSecBtn}
              style={{
                backgroundColor: "#2460A7FF",
                color: "white",
                marginTop: "10px",
                outline: 0,
              }}
            >
              Search
            </Button>
          </div>
        )}
      </div>
    );
  };
  return (
    <div style={{marginTop: "15px"}}>
      {header()}
      <div className="flex flex-col mx-2">
        <div className="flex flex-wrap">
          {loading ? null : selectProduct ? renderSpc() : renderAll()}
        </div>
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
  );
};

export default ProductFlowAdmin;
