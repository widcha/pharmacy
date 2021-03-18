import axios from "axios";
import { api_url } from "../../helpers";

const linkk = `${api_url}/product`;

export const fetchCategoryAction = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`${api_url}/category`);
			dispatch({ type: "FETCH_CATEGORY", payload: response.data });
		} catch (err) {
			dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err.message });
		}
	};
};

export const fetchProductByIdAction = (id) => {
	return async (dispatch) => {
		try {
			dispatch({ type: "FETCH_PRODUCT_START" });
			const response = await axios.get(`${linkk}/${id}`);
			dispatch({ type: "FETCH_PRODUCT_BY_ID_SUCCESS", payload: response.data });
		} catch (err) {
			dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err.message });
		}
	};
};

export const fetchProductAction = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: "FETCH_PRODUCT_START" });
			const response = await axios.get(linkk);
			console.log(response.data);
			dispatch({ type: "FETCH_PRODUCT_SUCCESS", payload: response.data });
		} catch (err) {
			dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
		}
	};
};

export const addProductAction = ({
	newName,
	newPrice,
	newVol,
	stock,
	newDesc,
	selectedCategory,
	pict,
}) => {
	return async (dispatch) => {
		try {
			dispatch({ type: "FETCH_PRODUCT_START" });

			let formData = new FormData();
			const val = JSON.stringify({
				newName,
				newPrice,
				newVol,
				newDesc,
				selectedCategory,
				stock,
			});

			formData.append("image", pict);
			formData.append("data", val);

			const headers = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			await axios.post(`${linkk}`, formData, headers);
			dispatch(fetchProductAction());
		} catch (err) {
			dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
		}
	};
};

export const addStock = ({ id, changeStock }) => {
	return async (dispatch) => {
		try {
			dispatch({ type: "FETCH_PRODUCT_START" });
			await axios.patch(`${linkk}/stock/${id}`, {
				product_stock: parseInt(changeStock),
			});
			dispatch(fetchProductAction());
		} catch (err) {
			dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
		}
	};
};

export const editProductAction = ({
	id,
	newName,
	newPrice,
	newVol,
	newDesc,
	selectedCategory,
	pict,
}) => {
	return async (dispatch) => {
		try {
			dispatch({ type: "FETCH_PRODUCT_START" });

			let formData = new FormData();
			const val = JSON.stringify({
				newName,
				newPrice,
				newVol,
				newDesc,
				selectedCategory,
			});

			formData.append("image", pict);
			formData.append("data", val);

			const headers = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};
			await axios.patch(`${linkk}/${id}`, formData, headers);
			dispatch(fetchProductAction());
		} catch (err) {
			dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
		}
	};
};

export const deleteProductAction = (id) => {
	return async (dispatch) => {
		try {
			dispatch({ type: "FETCH_PRODUCT_START" });
			console.log("cekcekDELETEE");
			await axios.delete(`${linkk}/${id}`);
			dispatch(fetchProductAction());
		} catch (err) {
			dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
		}
	};
};

export const sortProductAction = (str, idx) => {
	return async (dispatch) => {
		try {
			dispatch({ type: "FETCH_PRODUCT_START" });
			if (idx) {
				const sort_res = await axios.get(
					`${linkk}/sort?order=${str}&id=${idx}`
				);
				dispatch({ type: "FETCH_PRODUCT_SUCCESS", payload: sort_res.data });
			} else {
				const sort_res = await axios.get(`${linkk}/sort?order=${str}`);
				dispatch({ type: "FETCH_PRODUCT_SUCCESS", payload: sort_res.data });
			}
		} catch (err) {
			dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
		}
	};
};

export const fetchProductCategoryAction = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: "FETCH_PRODUCT_START" });

			const cat_response = await axios.get(`${linkk}/categories`);
			dispatch({
				type: "FETCH_CATEGORY",
				payload: cat_response.data,
			});
		} catch (err) {
			dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
		}
	};
};

export const fetchProductsByCategoryAction = (idx) => {
	return async (dispatch) => {
		try {
			dispatch({ type: "FETCH_PRODUCT_START" });

			const prd_cat_res = await axios.get(
				`${linkk}/categories?category=${idx}`
			);
			dispatch({
				type: "FETCH_PRODUCT_SUCCESS",
				payload: prd_cat_res.data,
			});
		} catch (err) {
			dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
		}
	};
};

export const fetchHighestProductPriceAction = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: "FETCH_PRODUCT_START" });
			const max_price = await axios.get(`${linkk}?highest_price=true`);
			// console.log(max_price.data[0].maxPrice);
			dispatch({
				type: "FETCH_PRODUCT_MAXPRICE",
				payload: max_price.data[0].maxPrice,
			});
		} catch (err) {
			dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
		}
	};
};

export const fetchProductsFilteredByPrice = (from, to, category) => {
	return async (dispatch) => {
		try {
			dispatch({ type: "FETCH_PRODUCT_START" });

			const price_filter = await axios.get(
				`${linkk}?price_from=${from}&price_to=${to}&category=${category}`
			);
			dispatch({
				type: "FETCH_PRODUCT_SUCCESS",
				payload: price_filter.data,
			});
		} catch (err) {
			dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
		}
	};
};

export const searchProductAction = (name) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "FETCH_PRODUCT_START" });
      const response = await axios.get(`${linkk}/search?search=${name}`);
      dispatch({ type: "FETCH_PRODUCT_SUCCESS", payload: response.data });
    } catch (err) {
      dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
    }
  };
};
