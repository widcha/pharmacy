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
} from '@material-ui/core';
import { api_url } from '../helpers';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { addStock, deleteProductAction } from '../redux/actions';
import ModalProduct from './ModalProduct';

const CardProduct = ({ idProd, name, price, stock, vol, stock_total, desc, cat, image }) => {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [showMod, setShowMod] = useState(false);
    let category = useSelector((state) => state.product.category);
    const catt = (category.filter((val) => val.product_category_id === cat))[0].product_category;

    const [changeStock, setChangeStock] = useState(1);

    const useStyles = makeStyles({
        root: {
            minWidth: 700,
            backgroundColor: '#D5F5EE'
        },
        media: {
            height: 250,
            maxwidth: 250,
            width: 250,
            marginLeft: 5,
            float: 'left',
        },
        main: {
            paddingLeft: 10,
        },
        content: {
            float: "right",
        },
    });
    const classes = useStyles();

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    const toggle = (id) => {
        Swal.fire({
            title: `Are you sure to delete ${name}?`,
            text: "You won't be able to revert this",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'teal',
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
                        Add New Stock
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
                        <div style={{ marginBottom: '30px' }}>
                            <h5 className="text-xl font-semibold">
                                {name}
                            </h5>
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
                        className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease", backgroundColor: 'teal' }}
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

        <ModalProduct
            categoryList={category}
            toggle={toggleModal}
            showModal={showModal}
            modalName="Edit Product"
            idProd={idProd}
            data={{name,price,stock,vol,desc,catt}}
        />
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={`${api_url}${image}`}
                    title={name}
                />
                <CardContent style={{ display: 'flex', flexDirection: 'row', width: '450px', justifyContent: 'space-between', height: '175px' }}>
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
                        <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: '3px',}}>
                            Description: {desc.substring(0,107)}...
                        </Typography>
                    </div>
                    <div style={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <CardActions style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ paddingTop: '10px', width: '100px' }}>
                                <Button size="small" onClick={() => setShowMod(true)} style={{ backgroundColor: '#0B5F07', color: 'white', width: '100px' }}>
                                    Add Stock
                                </Button>
                            </div>
                            <div style={{ paddingTop: '10px', width: '100px' }}>
                                <Button size="small" onClick={() => setShowModal(true)} style={{ backgroundColor: '#29AFBB', color: 'white', width: '100px' }}>
                                    Edit
                                </Button>
                            </div>
                            <div style={{ paddingTop: '10px', width: '100px' }}>
                                <Button size="small" style={{ backgroundColor: '#E8282C', color: 'white', width: '100px' }} onClick={() => toggle(idProd)}>
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