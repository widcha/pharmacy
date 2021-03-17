import axios from 'axios';
import { api_url } from '../../helpers';

const linkk = `${api_url}/product`;

export const fetchCategoryAction = (a) => {
    return async(dispatch) => {
        try {
            let response;
            if(a){
                response = await axios.get(`${api_url}/category${a}`);
            } else {
                response = await axios.get(`${api_url}/category`);
            }
            dispatch({ type: "FETCH_CATEGORY", payload: response.data });
        } catch (err) {
            dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err.message });
        }
    }
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
    }
}

export const fetchFilterProductAction = ({minPrice, maxPrice, searchWord}) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "FETCH_PRODUCT_START" });
            let newLink = `${linkk}?`;

            if(minPrice&&maxPrice&&searchWord){
                newLink += `minPrice=${minPrice}&maxPrice=${maxPrice}&search=${searchWord}`;
            }

            else if(minPrice&&maxPrice){
                newLink += `minPrice=${minPrice}&maxPrice=${maxPrice}`;
            }
            else if(minPrice&&searchWord){
                newLink += `minPrice=${minPrice}&search=${searchWord}`;
            }
            else if(maxPrice&&searchWord){
                newLink += `maxPrice=${maxPrice}&search=${searchWord}`;
            }

            else if(searchWord){
                newLink += `search=${searchWord}`;
            }
            else if(maxPrice){
                newLink += (`maxPrice=${maxPrice}`);
            }
            else if(minPrice){
                newLink += (`minPrice=${minPrice}`);
            }
            let response = await axios.get(`${newLink}`)

            dispatch({ type: "FETCH_PRODUCT_SUCCESS", payload: response.data });
        } catch (err) {
            dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
        }
    }
};

export const fetchProductAction = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: "FETCH_PRODUCT_START" });
            const response = await axios.get(linkk);
            dispatch({ type: "FETCH_PRODUCT_SUCCESS", payload: response.data });
        } catch (err) {
            dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
        }
    }
};

export const addNewCategoryAction = (product_category) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "FETCH_PRODUCT_START" });
            await axios.post(`${api_url}/category`, {product_category});
            dispatch(fetchCategoryAction());
        } catch (err) {
            dispatch ({ type: "FETCH_PRODUCT_FAILED", payload: "Failed to add new category "+ err.message });
        }
    }
}

export const addProductAction = ({newName, newPrice, newVol, stock, newDesc, selectedCategory, pict}) => {
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
                stock
            });
            
            formData.append("image", pict);
            formData.append("data", val);

            const headers = {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            };

            await axios.post(`${linkk}`, formData, headers);
            dispatch(fetchProductAction());
        } catch (err) {
            dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
        }
    }
}

export const addStock = ({ id, changeStock }) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "FETCH_PRODUCT_START" });
            await axios.patch(`${linkk}/stock/${id}`,{
                product_stock: parseInt(changeStock)
            });
            dispatch(fetchProductAction());
        } catch (err) {
            dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
        }
    }
}

export const editCategoryAction = ({id, product_category}) => {
    return async(dispatch) => {
        try {
            dispatch({ type: 'FETCH_PRODUCT_START' });
            await axios.patch(`${api_url}/category/${id}`, {product_category})
            dispatch(fetchCategoryAction());
        } catch (err) {
            dispatch({ type: "FETCH_PRODUCT_FAILED", payload: 'Failed to edit Category ' + err.message })
        }
    }
}

export const editProductAction = ({ id, newName, newPrice, newVol, newStock, newDesc, selectedCategory, pict }) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "FETCH_PRODUCT_START" });
            
            let formData = new FormData();
            const val = JSON.stringify({
                newName,
                newPrice,
                newVol,
                newStock,
                newDesc,
                selectedCategory
            });
            
            formData.append("image", pict);
            formData.append("data", val);

            const headers = {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            };
            await axios.patch(`${linkk}/${id}`, formData, headers);
            dispatch(fetchProductAction());
        } catch (err) {
            dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
        }
    }
}

export const deleteCategoryAction = (id) => {
    return async(dispatch) => {
        try {
            dispatch({ type: "FETCH_PRODUCT_START" });
            await axios.delete(`${api_url}/category/${id}`);
            dispatch(fetchCategoryAction());
        } catch (err) {
            dispatch({ type: "FETCH_PRODUCT_FAILED", payload: 'Failed to delete category' + err.message });
        }
    }
}

export const deleteProductAction = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: "FETCH_PRODUCT_START" });
            await axios.delete(`${linkk}/${id}`);
            dispatch(fetchProductAction());
        } catch (err) {
            dispatch({ type: "FETCH_PRODUCT_FAILED", payload: err });
        }
    }
}