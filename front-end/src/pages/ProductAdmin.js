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
  fetchFilterProductAction,
} from "../redux/actions";
import ModalProduct from "../components/ModalProduct";

const ProductAdmin = () => {
  const dispatch = useDispatch();

  const [perPage] = useState(10);
  const [page, setPage] = useState(0);
  const from = page * perPage;
  const to = (page + 1) * perPage;
  const {product_list, loading} = useSelector((state) => state.product);
  const [pageCount, setPageCount] = useState(product_list.length / perPage);

  let category = useSelector((state) => state.product.category);

  const data = product_list.filter((val, index) => {
    return index >= from && index < to;
  });

  const [showModal, setShowModal] = useState(false);
  const toggle = () => {
    setShowModal(!showModal);
  };

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

  const [openSort, setOpenSort] = useState(false);
  const [sortChosen, setSortChosen] = useState("");

  const handleOpenSort = () => {
    setOpenSort(true);
  };
  const handleCloseSort = () => {
    setOpenSort(false);
  };
  const handleSort = async (e) => {
    setSortChosen(e.target.value);
  };

  const [searchWord, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);

  useEffect(() => {
    dispatch(fetchProductAction());
    dispatch(fetchCategoryAction());
  }, [dispatch]);

  const searchBtn = () => {
    dispatch(
      fetchFilterProductAction({
        minPrice,
        maxPrice,
        searchWord,
        sortChosen,
      })
    );
  };

  const renderProduct = () => {
    if (data) {
      if (filterCategory) {
        return data
          .filter((val) => val.product_category_id === filterCategory)
          .map((val) => {
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
                  cat={val.product_category_id}
                  image={val.product_image_path}
                />
              </div>
            );
          });
      } else {
        return data.map((val) => {
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
                catt={val.Product_Category.product_category}
                image={val.product_image_path}
              />
            </div>
          );
        });
      }
    }
  };

  const refreshBtn = () => {
    setSearch("");
    setSortChosen("");
    setMaxPrice(0);
    setMinPrice(0);
    dispatch(fetchProductAction());
  };
  useEffect(() => {
    setPageCount(product_list.length / perPage);
  }, [perPage, product_list]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPage(selectedPage);
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
                  open={openSort}
                  onClose={handleCloseSort}
                  onOpen={handleOpenSort}
                  onChange={handleSort}
                >
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value="DateOld">Date (Old to New)</MenuItem>
                  <MenuItem value="DateNew">Date (New to Old)</MenuItem>
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
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                &nbsp;&nbsp;
                <div style={{paddingTop: "20px"}}>-</div>
                &nbsp;&nbsp;
                <TextField
                  placeholder="Max. Price"
                  label="Max. Price"
                  id="maxprice"
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              <Button
                onClick={searchBtn}
                style={{backgroundColor: "#2460A7FF", color: "white"}}
              >
                Search
              </Button>
              <Button
                onClick={refreshBtn}
                style={{backgroundColor: "#759cd8", marginTop: "10px"}}
              >
                All Products
              </Button>
              <Button
                style={{
                  backgroundColor: "#0098b3",
                  color: "white",
                  marginTop: "20px",
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
      <div className="flex flex-col mx-2" style={{marginTop: "5px"}}>
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
    </>
  );
};

export default ProductAdmin;
