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
  addNewCategoryAction,
  deleteCategoryAction,
  editCategoryAction,
  fetchCategoryAction,
  fetchProductAction,
} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import {useHistory} from "react-router";

const CategoriesAdmin = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.product.category);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchCategoryAction(window.location.search));
  }, [dispatch]);

  const [perPage] = useState(10);
  const [page, setPage] = useState(0);

  const {product_list, loading} = useSelector((state) => state.product);
  const {lengths} = useSelector((state) => state.admin);
  const [pageCount, setPageCount] = useState(lengths.categories / perPage);

  useEffect(() => {
    dispatch(fetchProductAction());
  }, [dispatch]);

  const [product_category, setCategory] = useState("");
  const [idCat, setIdCat] = useState(0);
  const [clicked, setClick] = useState(false);
  const [addClick, setAddClick] = useState(false);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();

  const toggle = (id) => {
    let catCheck = product_list.find((val) => val.product_category_id === id);
    if (catCheck) {
      Swal.fire({
        icon: "warning",
        title: "You can't delete this category!",
        text: "There's still some products in this category",
      });
    } else {
      Swal.fire({
        title: `Are you sure to delete this category?`,
        text: "You won't be able to revert this",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "teal",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, deleted!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteCategoryAction(id));
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    }
  };
  const editButton = (id) => {
    setClick(true);
    setIdCat(id);
    console.log(idCat);
    console.log(clicked);
  };
  const saveButton = (id) => {
    if (product_category) {
      dispatch(editCategoryAction({id, product_category}));
      setClick(false);
    }
  };
  const cancelButton = () => {
    setClick(false);
    setAddClick(false);
  };

  const [searchWord, setSearch] = useState("");
  const searchBtn = () => {
    const a = `?page=1&limit=10&search=${searchWord}`;
    dispatch(fetchCategoryAction(a));
  };

  const saveAddBtn = (product_category) => {
    if (product_category) {
      dispatch(addNewCategoryAction(product_category));
      setAddClick(false);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Can't add a blank category",
        text: "You need to fill category name!",
      });
    }
  };

  const renderRow = () => {
    if (category) {
      return category.map((row, index) => (
        <TableRow key={row.product_category_id}>
          <TableCell>
            {page === 0 ? index + 1 : index + 1 + page * 10}
          </TableCell>
          {clicked &&
          row.product_category_id === idCat &&
          addClick === false ? (
            <>
              <TableCell>
                <TextField
                  placeholder="Category Name"
                  label="Category Name"
                  id="category-name"
                  defaultValue={row.product_category}
                  size="small"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => saveButton(row.product_category_id)}
                  style={{backgroundColor: "#4886af", color: "white"}}
                >
                  Save
                </Button>
                <Button
                  onClick={() => cancelButton()}
                  style={{
                    backgroundColor: "#E8282C",
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
              <TableCell>{row.product_category}</TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => editButton(row.product_category_id)}
                  style={{
                    backgroundColor: "#4a91bb",
                    color: "white",
                    outline: 0,
                  }}
                  disabled={addClick}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => toggle(row.product_category_id)}
                  style={{
                    backgroundColor: "#E8282C",
                    color: "white",
                    marginLeft: "20px",
                    outline: 0,
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
    }
  };
  const renderNewRow = () => {
    return addClick ? (
      <TableRow>
        <TableCell></TableCell>
        <TableCell>
          <TextField
            placeholder="Category Name"
            label="Category Name"
            id="category-name"
            size="small"
            onChange={(e) => setCategory(e.target.value)}
          />
        </TableCell>
        <TableCell align="center">
          <Button
            onClick={() => saveAddBtn(product_category)}
            style={{backgroundColor: "#4886af", color: "white"}}
          >
            Save
          </Button>
          <Button
            onClick={cancelButton}
            style={{
              backgroundColor: "#E8282C",
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
    setPageCount(lengths.categories / perPage);
  }, [perPage]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPage(selectedPage);
    const url = `?page=${selectedPage + 1}&limit=10`;
    dispatch(fetchCategoryAction(url));
    history.push(`/category${url}`);
  };

  const renderAll = () => {
    return (
      <div>
        <div style={{display: "flex", flexDirection: "row"}}>
          <div>
            <TableContainer
              component={Paper}
              style={{backgroundColor: "#D5F5EE"}}
            >
              <Table className={classes.table} aria-label="simple table">
                <TableHead style={{backgroundColor: "#65ccb8"}}>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Category</TableCell>
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
              style={{backgroundColor: "#2460A7FF", color: "white", outline: 0}}
            >
              Search
            </Button>

            <Button
              style={{
                backgroundColor: "#0098b3",
                color: "white",
                marginTop: "20px",
                outline: 0,
              }}
              onClick={() => setAddClick(true)}
            >
              Add New Category
            </Button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col mx-2">
      <div className="flex-row align-baseline mt-4">
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
      <div className="flex flex-wrap">{loading ? null : renderAll()}</div>
    </div>
  );
};

export default CategoriesAdmin;
