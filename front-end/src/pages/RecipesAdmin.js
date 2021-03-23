import React, {useEffect, useState} from "react";
import ImagesCard from "../components/ImagesCard";
import ReactPaginate from "react-paginate";
import {useDispatch, useSelector} from "react-redux";
import {fetchRecipeAction} from "../redux/actions";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

const RecipesAdmin = () => {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.admin.recipe);

  useEffect(() => {
    dispatch(fetchRecipeAction());
  }, [dispatch]);

  const [perPage] = useState(10);
  const [page, setPage] = useState(0);
  const from = page * perPage;
  const to = (page + 1) * perPage;
  const {loading} = useSelector((state) => state.product);
  const [pageCount, setPageCount] = useState(recipe.length / perPage);

  useEffect(() => {
    setPageCount(recipe.length / perPage);
  }, [perPage, recipe]);

  const data = recipe.filter((val, index) => {
    return index >= from && index < to;
  });

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

  const searchBtn = () => {
    dispatch(fetchRecipeAction({sort, searchWord, sortStatus}));
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPage(selectedPage);
  };

  const renderAll = () => {
    return (
      <div style={{display: "flex", flexDirection: "row"}}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {data
            ? data.map((val) => {
                return (
                  <ImagesCard
                    modName="Prescription"
                    imageUrl={`${val.recipes_image_path}`}
                    status={`${val.recipes_status}`}
                    username={`${val.User.user_username}`}
                    recipes_id={`${val.recipes_id}`}
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
              <MenuItem value="">All</MenuItem>
              <MenuItem value="OLD">Latest</MenuItem>
              <MenuItem value="NEW">Newest</MenuItem>
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
              <MenuItem value="Pending">Status: Pending</MenuItem>
              <MenuItem value="Done">Status: Done</MenuItem>
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
        <div className="flex flex-col">
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
      </div>
    </div>
  );
};

export default RecipesAdmin;
