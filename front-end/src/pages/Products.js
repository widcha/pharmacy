import React, { useEffect, useState } from "react";
import CardProductUser from "../components/CardProductUser";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchHighestProductPriceAction,
	fetchProductAction,
	fetchProductByUserAction,
	fetchProductCategoryAction,
	fetchProductsByCategoryAction,
	sortProductAction,
} from "../redux/actions/productAction";
import {
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
} from "@material-ui/core";
import PriceSlider from "../components/PriceSlider";

const Products = () => {
	const useStyles = makeStyles((theme) => ({
		formControl: {
			minWidth: 120,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
	}));
	const classes = useStyles();
	const [categorySelected, setCategorySelected] = useState("");
	const [categorySelectedIndex, setCategorySelectedIndex] = useState(0);

	const [perPage] = useState(10);
	const [page, setPage] = useState(0);
	const from = page * perPage;
	const to = (page + 1) * perPage;
	const dispatch = useDispatch();
	const {
		product_list,
		loading,
		category,
		product_price_highest,
	} = useSelector((state) => state.product);
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
		dispatch(fetchProductByUserAction());
		dispatch(fetchProductCategoryAction());
		dispatch(fetchHighestProductPriceAction());
	}, [dispatch]);

	const handlePageClick = (e) => {
		const selectedPage = e.selected;
		setPage(selectedPage);
	};

	const handleChange = (e) => {
		setCategorySelected(e.target.value);
		dispatch(sortProductAction(e.target.value, categorySelectedIndex));
	};
	const renderCategories = () => {
		return category.map((val) => {
			return (
				<label
					onClick={() => handleProductsByCategory(val.product_category_id)}
					className="cursor-pointer text-gray-700 hover:text-black hover:bg-gray-100 transition duration-300 rounded-sm"
				>
					{val.product_category}
				</label>
			);
		});
	};

	const handleProductsByCategory = (idx) => {
		dispatch(fetchProductsByCategoryAction(idx));
		setCategorySelectedIndex(idx);
	};
	const renderAllProducts = () => {
		dispatch(fetchProductAction());
		setCategorySelectedIndex(null);
	};

	return (
		<div className="flex flex-row items-start justify-items-auto">
			<div className="mt-10 ml-5 w-28 space-y-3 flex flex-col">
				<div className="w-max space-y-3 flex flex-col mb-5">
					<label className="text-lg font-bold">Categories</label>

					<label
						className="cursor-pointer text-gray-700 hover:text-black hover:bg-gray-100 transition duration-300 rounded-sm"
						onClick={renderAllProducts}
					>
						All Products
					</label>
					{renderCategories()}
				</div>
				<div className="border-t-2 border-gray-300 w-max pt-5">
					<label className="text-lg font-bold ">Filter By:</label>

					<PriceSlider
						max_price={product_price_highest}
						category_id={categorySelectedIndex}
					/>
				</div>
			</div>
			<div className="flex flex-col mx-2 justify-center justify-items-center items-start w-full">
				<div className="flex flex-row items-center justify-between w-full">
					<div className="ml-32 flex justify-center justify-items-center items-center mt-5">
						<FormControl className={classes.formControl}>
							<InputLabel style={{ color: "black" }}>SORT BY</InputLabel>
							<Select value={categorySelected} onChange={handleChange}>
								<MenuItem value={"DESC"}>Newest</MenuItem>
								<MenuItem value={"ASC"}>Latest</MenuItem>
							</Select>
						</FormControl>
					</div>
					<div className="flex-row pt-8 pr-32">
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
				<div className="flex flex-wrap justify-center w-full">
					{loading ? null : renderProduct()}
				</div>
			</div>
		</div>
	);
};

export default Products;
