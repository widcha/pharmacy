import React, { useState } from 'react';
import { 
    Button, 
    Card, 
    CardActions, 
    CardActionArea, 
    CardContent,
    CardMedia,
    makeStyles,
    Typography,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    TextField
} from '@material-ui/core';
import { api_url } from '../helpers';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { addStock, deleteProductAction, editProductAction } from '../redux/actions';

const CardProduct = ({ idProd, name, price, stock, vol, stock_total, desc, cat, image }) => {
    const dispatch = useDispatch();

    //state untuk tiap input
    const [showModal, setShowModal] = useState(false);
    const [showMod, setShowMod] = useState(false);
    const [newName, setName] = useState('');
    const [newPrice, setPrice] = useState(0);
    const [newVol, setVol] = useState(0);
    const [newDesc, setDesc] = useState('');
    const [pictName, setPictName] = useState('');
    const [pict, setPict] = useState();

    const [changeStock, setChangeStock] = useState(1);

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
    }));
    const classes = useStyles();

    let category = useSelector((state) => state.product.category);
    let catt = (category.filter((val) => val.product_category_id === cat))[0].product_category;

    //for selecting category
    const [selectedCategory, setCategory] = useState('');
    const handleChange = (e) => {
        setCategory(e.target.value);
    }
    
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => {
        setName(name);
        setPrice(price);
        setVol(vol);
        setDesc(desc);
        setCategory(catt);
        setOpen(true);
    }

    const uploadImg = (e) => {
        if(e.target.files[0]){
            setPictName(e.target.files[0].name)
            setPict(e.target.files[0])
        }
    }

    const handleClose = () => {
        setOpen(false);
    }
    const toggle = (id) => {
        Swal.fire({
            title: `Are you sure to delete ${id} this product?`,
            text: "You won't be able to revert this",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteProductAction(id));
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    }
    //add new stock
    const saveChangeStock = (id) => {
        dispatch(addStock({id, changeStock}));
        setChangeStock(1);
        setShowMod(false);
    }
    const saveChange = (id) => {
        if(newName && newPrice && newVol && newDesc && selectedCategory){
            dispatch(editProductAction({id, newName, newPrice, newVol, newDesc, selectedCategory, pict}));
        }else{
            Swal.fire({
                icon: 'warning',
                text: 'You need to fill everything'
            })
        }
        setPict();
        setPictName('');
        setShowModal(false);
    };
    return (
        <>
        {showMod ? (
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
                        Edit
                    </h3>
                    <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowMod(false)}
                    >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                        </span>
                    </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto" style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
                        <div>
                            {name}
                        </div>
                        <div>
                            <Button disabled={changeStock===1} onClick={() => setChangeStock(changeStock-1)}>
                                -
                            </Button>
                                {changeStock}
                            <Button onClick={() => setChangeStock(changeStock+1)}>
                                +
                            </Button>
                        </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                    <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={() => setShowMod(false)}
                    >
                        Close
                    </button>
                    <button
                        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={() => saveChangeStock(idProd)}
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
                          Edit
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
                            defaultValue={name}
                            size="large"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            placeholder="Price"
                            label="Price"
                            id="price"
                            defaultValue={price}
                            size="large"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <TextField
                            placeholder="Volume"
                            label="Volume"
                            id="volume"
                            defaultValue={vol}
                            size="large"
                            onChange={(e) => setVol(e.target.value)}
                        />
                        <TextField
                            placeholder="Description"
                            label="Description"
                            id="description"
                            defaultValue={desc}
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
                            {category.map((val) => <MenuItem value={val.product_category_id}>{val.product_category}</MenuItem>)}
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
                          onClick={() => saveChange(idProd)}
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
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={`${api_url}${image}`}
                    title={name}
                />
                <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '175px' }}>
                    <div>
                        <Typography gutterBottom variant="h5" component="h2" style={{ marginTop: '3px'}}>
                            {name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: '3px'}}>
                            Price: Rp. {price.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: '3px'}}>
                            Category: {catt}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: '3px'}}>
                            Stock(per bottle) : {stock}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: '3px'}}>
                            Volume per bottle(ml/gr): {vol}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: '3px'}}>
                            Total Stock(ml/gr): {stock_total}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: '3px'}}>
                            Description: {desc}
                        </Typography>
                    </div>
                    <div style={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <CardActions style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ paddingTop: '10px', width: '100px' }}>
                                <Button size="small" onClick={() => setShowMod(true)} style={{ backgroundColor: 'black', color: 'white', width: '100px' }}>
                                    Add Stock
                                </Button>
                            </div>
                            <div style={{ paddingTop: '10px', width: '100px' }}>
                                <Button size="small" onClick={() => setShowModal(true)} style={{ backgroundColor: 'blue', color: 'white', width: '100px' }}>
                                    Edit
                                </Button>
                            </div>
                            <div style={{ paddingTop: '10px', width: '100px' }}>
                                <Button size="small" style={{ backgroundColor: 'red', color: 'white', width: '100px' }} onClick={() => toggle(idProd)}>
                                    Delete
                                </Button>
                            </div>
                        </CardActions>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    </>
    );
}

export default CardProduct;