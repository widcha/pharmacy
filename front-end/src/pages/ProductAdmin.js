import React, { useEffect, useState } from 'react';
import {
    Button, 
    makeStyles,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    TextField
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import CardProduct from '../components/CardProduct';
import { fetchProductAction, fetchCategoryAction, addProductAction, fetchFilterProductAction } from '../redux/actions';

const ProductAdmin = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProductAction());
        dispatch(fetchCategoryAction());
    }, [dispatch]);
  
    let category = useSelector((state) => state.product.category);

    const useStyles = makeStyles((theme) => ({
        root: {
            minWidth: 700,
            backgroundColor: 'grey'
        },
        media: {
            height: 250,
            maxwidth: 350,
            width: 250,
            marginLeft: 25,
            float: 'left',
        },
        main: {
            paddingLeft: 25,
        },
        content: {
            float: "right",
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }));
    const classes = useStyles();

    const [showModal, setShowModal] = useState(false);
    const [newName, setName] = useState('');
    const [newPrice, setPrice] = useState(0);
    const [newVol, setVol] = useState(0);
    const [newDesc, setDesc] = useState('');
    const [pictName, setPictName] = useState('');
    const [selectedCategory, setCategory] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [pict, setPict] = useState();
    const [open, setOpen] = useState(false);
    const [openn, setOpenn] = useState(false);
    const [stock, setStock] = useState(0);
    const [searchWord, setSearch] = useState('');
    const [maxPrice, setMaxPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(0);

    const {product_list} = useSelector((state) => state.product);
    
    const handleOpen = () => {
        setOpen(true);
    }
    const handleOpenn = () => {
        setOpenn(true);
    }
    
    const searchBtn = () => {
        dispatch(fetchFilterProductAction({minPrice, maxPrice,searchWord}));
    }

    const uploadImg = (e) => {
        if(e.target.files[0]){
            setPictName(e.target.files[0].name)
            setPict(e.target.files[0])
        }
    }
    const handleChange = (e) => {
        setCategory(e.target.value);
    }
    const handleFilterCategory = (e) => {
        setFilterCategory(e.target.value);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleClosee = () => {
        setOpenn(false);
    }
    const renderProduct = () => {
        if(filterCategory){
            return product_list.filter((val) => val.product_category_id === filterCategory).map((val) => {
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
                )
            })
        }else{
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
                            cat={val.product_category_id}
                            image={val.product_image_path}
                        />
                    </div>
                )
            })
        }
    }
    const saveChange = () => {
        if(newName && newPrice && newVol && newDesc && selectedCategory && pict && stock){
            dispatch(addProductAction({newName, newPrice, newVol, stock, newDesc, selectedCategory, pict}));
        }else{
            Swal.fire({
                icon: 'warning',
                text: 'You need to fill everything'
            })
        }
        setPict();
        setPictName('');
        setCategory('');
        setShowModal(false);
    };
    
    return (
        <>
        {showModal ? (
              <>
                <div
                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          Add
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto" style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
                        <TextField
                            placeholder="Name"
                            label="Name"
                            id="name"
                            size="large"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            placeholder="Price"
                            label="Price"
                            id="price"
                            size="large"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <TextField
                            placeholder="Stock"
                            label="Stock"
                            id="stock"
                            size="large"
                            onChange={(e) => setStock(e.target.value)}
                        />
                        <TextField
                            placeholder="Volume"
                            label="Volume"
                            id="volume"
                            size="large"
                            onChange={(e) => setVol(e.target.value)}
                        />
                        <TextField
                            placeholder="Description"
                            label="Description"
                            id="description"
                            size="large"
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <FormControl>
                            <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="category"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                onChange={handleChange}
                            >
                            {category.map((val) => (
                                <MenuItem value={val.product_category_id}>
                                    {val.product_category}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            onChange={uploadImg}
                            multiple
                            type="file"
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="raised" component="span" className={classes.button} style={{ backgroundColor: 'grey' }} onClick={() => console.log("Ok")}>
                                Upload
                            </Button>
                            {pictName}
                        </label> 

                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                          className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={saveChange}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
        <div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="mt-2 mx-3">
                    <div style={{ marginLeft: '25px' }}>
                        {renderProduct()}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '275px', paddingTop: '17px', maxHeight: '50px', position: 'fixed', left: '78%' }}>
                    <Button style={{ backgroundColor: '#2F4F4F', color: 'white' }} onClick={() => setShowModal(true)}>
                        Add New Product
                    </Button>
                    <FormControl style={{ width: '275px' }}>
                        <InputLabel id="demo-controlled-open-select-label">Filter By Category</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="category"
                            open={openn}
                            onClose={handleClosee}
                            onOpen={handleOpenn}
                            onChange={handleFilterCategory}
                        >
                            <MenuItem value="">
                                All
                            </MenuItem>
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
                            style={{ width: '275px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: '10px' }}>
                        <TextField
                            placeholder="Min. Price"
                            label="Min. Price"
                            id="minprice"
                            onChange={(e) => setMinPrice(e.target.value) }
                        />
                        &nbsp;&nbsp;
                        <div style={{ paddingTop: '20px' }}>-</div>
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
                        style={{ backgroundColor: 'teal' }}
                    >
                        Search
                    </Button>
                </div>
            </div>
        </div>
        </>
    );
}


export default ProductAdmin;