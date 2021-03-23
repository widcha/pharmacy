import React, {useEffect, useState} from "react";
import queryString from "querystring";
import {useDispatch, useSelector} from "react-redux";
import {fetchStockFlowByIdAction} from "../redux/actions";
import ReactPaginate from "react-paginate";
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
  Typography,
} from "@material-ui/core";
import {Link} from "react-router-dom";
import {api_url} from "../helpers";

const ProductFlowDetail = () => {
  const dispatch = useDispatch();
  const [productID, setProductID] = useState(0);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();

  useEffect(() => {
    const que = queryString.parse(window.location.search)["?id"];
    setProductID(que);
  }, []);

  useEffect(() => {
    dispatch(fetchStockFlowByIdAction(productID));
  }, [dispatch, productID]);
  const {material_flow, loading} = useSelector((state) => state.admin);

  const [perPage] = useState(10);
  const [page, setPage] = useState(0);
  const from = page * perPage;
  const to = (page + 1) * perPage;
  const [pageCount, setPageCount] = useState(material_flow.length / perPage);

  useEffect(() => {
    setPageCount(material_flow.length / perPage);
  }, [perPage, material_flow]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPage(selectedPage);
  };

  const data = material_flow.filter((val, index) => {
    return index >= from && index < to;
  });

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
  return (
    <div style={{marginTop: "30px"}}>
      <div style={{marginTop: "15px"}}>
        <Link to="/product-flow">
          <Button
            style={{
              outline: 0,
              backgroundColor: "#0492C2",
              color: "whitesmoke",
            }}
          >
            Back
          </Button>
        </Link>
        <div className="flex flex-col mx-2">
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

export default ProductFlowDetail;
