import React, { useEffect } from "react";
import { ProdDetail } from "../components/ProdDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByIdAction } from "../redux/actions";
import { CircularProgress } from "@material-ui/core";

export const ProductDetail = (props) => {
	const dispatch = useDispatch();
	const { product, loading } = useSelector((state) => state.product);
	useEffect(() => {
		const id = props.location.search.split("=")[1];
		dispatch(fetchProductByIdAction(id));
	}, [dispatch, props.location.search]);
	if (Object.keys(product).length === 0) {
		return (
			<div className="flex items-center justify-center h-screen">
				<CircularProgress color="primary" value="progress" />
			</div>
		);
	}
	return (
		<>
			{loading ? (
				<div className="flex h-screen m-auto">
					<CircularProgress />
				</div>
			) : (
				<div className="flex flex-auto flex-col items-center">
					<div>
						<ProdDetail
							img={product.product_image_path}
							name={product.product_name}
							desc={product.product_desc}
							price={product.product_price}
							pricePerGram={product.product_price / product.product_vol}
							stock={product.product_stock_total}
							vol={product.product_vol}
							category={product.Product_Category.product_category}
							idx={product.product_id}
						/>
					</div>
				</div>
			)}
		</>
	);
};
