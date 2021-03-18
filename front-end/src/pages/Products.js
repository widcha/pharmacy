import React, { useEffect, useState } from "react";
import CardProductUser from "../components/CardProductUser";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchProductAction,
	sortProductAction,
} from "../redux/actions/productAction";
import {
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
} from "@material-ui/core";

const Products = () => {
	const useStyles = makeStyles((theme) => ({
		formControl: {
			// margin: theme.spacing(1),
			color: "red",
			minWidth: 120,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
	}));
	const classes = useStyles();
	const [age, setAge] = useState("");

	const [perPage] = useState(10);
	const [page, setPage] = useState(0);
	const from = page * perPage;
	const to = (page + 1) * perPage;
	const dispatch = useDispatch();
	const { product_list, loading } = useSelector((state) => state.product);
	const [pageCount, setPageCount] = useState(product_list.length / perPage);

	const data = product_list.filter((val, index) => {
		return index >= from && index < to;
	});

	const renderProduct = () => {
		return (
			<>
				{data
					? data.map((val, index) => {
							return (
								<CardProductUser
									name={val.product_name}
									price={val.product_price}
								/>
							);
					  })
					: null}
			</>
		);
	};

	useEffect(() => {
		setPageCount(product_list.length / perPage);
	}, [perPage, product_list]);

	useEffect(() => {
		dispatch(fetchProductAction());
	}, [dispatch]);

	const handlePageClick = (e) => {
		const selectedPage = e.selected;
		setPage(selectedPage);
	};

	const handleChange = (event) => {
		setAge(event.target.value);
		console.log(event.target.value);
		dispatch(sortProductAction(event.target.value));
	};
	return (
		<div className="flex flex-row">
			<div>
				Categories
				<div>All Products</div>
				<div>a</div>
				<div>a</div>
				<div>a</div>
				<div>a</div>
			</div>
			<div className="flex flex-col mx-2 justify-center justify-items-center items-start">
				<div className="ml-6 flex justify-center justify-items-center items-center mt-5">
					<FormControl className={classes.formControl}>
						<InputLabel style={{ color: "black" }}>SORT BY</InputLabel>
						<Select value={age} onChange={handleChange}>
							<MenuItem value={"DESC"}>Newest</MenuItem>
							<MenuItem value={"ASC"}>Latest</MenuItem>
						</Select>
					</FormControl>
				</div>

				<div className="flex flex-wrap">{loading ? null : renderProduct()}</div>
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

export default Products;
