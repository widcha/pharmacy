import React, {useEffect, useState} from "react";
import {
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  TextField,
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import ReactPaginate from "react-paginate";
import CardProduct from "../components/CardProduct";
import {
  fetchProductAction,
  fetchCategoryAction,
  getItemLength,
} from "../redux/actions";
import {useHistory} from "react-router-dom";
import ModalProduct from "../components/ModalProduct";
import {filter} from "lodash";

const ProductAdmin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  //Pagination
  const [perPage] = useState(5);
  const {lengths} = useSelector((state) => state.admin);
  const {product_list, loading} = useSelector((state) => state.product);
  const [pageCount, setPageCount] = useState(lengths.products / perPage);

  //Data
  useEffect(() => {
    dispatch(fetchProductAction(window.location.search));
    dispatch(fetchCategoryAction());
    dispatch(getItemLength());
  }, [dispatch]);
  let category = useSelector((state) => state.product.category);

  const [showModal, setShowModal] = useState(false);
  const toggle = () => {
    setShowModal(!showModal);
  };

  // dropdown category
  const [openn, setOpenn] = useState(false);
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

  //dropdown date
  const [openSort, setOpenSort] = useState(false);
  const [sortChosen, setSortChosen] = useState("");

  const handleOpenSort = () => {
    setOpenSort(true);
  };
  const handleCloseSort = () => {
    setOpenSort(false);
  };
  const handleSort = (e) => {
    setSortChosen(e.target.value);
  };

  const [searchWord, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);

  const searchBtn = () => {
    let url = `?page=1&limit=5`;
    if (minPrice || minPrice > 0) {
      url += `&minPrice=${minPrice}`;
    }
    if (maxPrice > 0) {
      url += `&maxPrice=${maxPrice}`;
    }
    if (searchWord !== "") {
      url += `&search=${searchWord}`;
    }
    if (sortChosen !== "None" && sortChosen !== "") {
      url += `&sortChosen=${sortChosen}`;
    }
    if (filterCategory || filterCategory > 0) {
      url += `&category=${filterCategory}`;
    }
    history.push(`/product${url}`);
    dispatch(fetchProductAction(url));
  };

  const renderProduct = () => {
    if (product_list) {
      return product_list.map((val) => {
        return (
          <div className="mt-3">
            <CardProduct
              idProd={val.product_id}
              name={val.product_name}
              price={val.product_price}
              stock={val.product_stock}
              vol={val.product_vol}
              stock_total={val.product_stock_total}
              desc={val.product_desc}
              catt={val.product_category_id}
              image={val.product_image_path}
            />
          </div>
        );
      });
    }
  };

  useEffect(() => {
    setPageCount(lengths.products / perPage);
  }, [perPage]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    let newUrl = window.location.search.split("limit=5")[1];
    if (newUrl) {
      const url = `?page=${selectedPage + 1}&limit=5`;
      history.push(`/product${url}${newUrl}`);
      dispatch(fetchProductAction(url + (newUrl ? newUrl : "")));
    } else {
      const url = `?page=${selectedPage + 1}&limit=5`;
      history.push(`/product${url}`);
      dispatch(fetchProductAction(url));
    }
  };

  const renderAll = () => {
    return (
      <>
        <ModalProduct
          categoryList={category}
          toggle={toggle}
          showModal={showModal}
          modalName="Add New Product"
        />
        <div>
          <div style={{display: "flex", flexDirection: "row"}}>
            <div className="mt-2 mx-3">
              <div style={{marginLeft: "25px"}}>{renderProduct()}</div>
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
              {/* SORT */}
              <FormControl style={{width: "275px"}}>
                <InputLabel id="demo-controlled-open-select-label">
                  Sort By{" "}
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="sort"
                  value={sortChosen ? sortChosen : ""}
                  open={openSort}
                  onClose={handleCloseSort}
                  onOpen={handleOpenSort}
                  onChange={handleSort}
                >
                  <MenuItem value="None"></MenuItem>
                  <MenuItem value="ASC">Latest</MenuItem>
                  <MenuItem value="DESC">Newest</MenuItem>
                </Select>
              </FormControl>
              {/* CATEGORY FILTER */}
              <FormControl style={{width: "275px"}}>
                <InputLabel id="demo-controlled-open-select-label">
                  Filter By Category
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="category"
                  value={filterCategory ? filterCategory : ""}
                  open={openn}
                  onClose={handleClosee}
                  onOpen={handleOpenn}
                  onChange={handleFilterCategory}
                >
                  <MenuItem value="">None</MenuItem>
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
                  value={searchWord ? searchWord : ""}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{width: "275px"}}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingBottom: "10px",
                }}
              >
                <TextField
                  placeholder="Min. Price"
                  label="Min. Price"
                  id="minprice"
                  value={minPrice ? minPrice : ""}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                &nbsp;&nbsp;
                <div style={{paddingTop: "20px"}}>-</div>
                &nbsp;&nbsp;
                <TextField
                  placeholder="Max. Price"
                  label="Max. Price"
                  id="maxprice"
                  value={maxPrice ? maxPrice : ""}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              <Button
                onClick={searchBtn}
                style={{
                  backgroundColor: "#2460A7FF",
                  color: "white",
                  outline: 0,
                }}
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
                onClick={toggle}
              >
                Add New Product
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="flex flex-col mx-2" style={{marginTop: "15px"}}>
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
        <div className="flex flex-wrap">{loading ? null : renderAll()}</div>
      </div>
    </>
  );
};

export default ProductAdmin;
