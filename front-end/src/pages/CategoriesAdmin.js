import React, { useEffect, useState } from 'react';
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
    TextField
} from '@material-ui/core';
import {
    addNewCategoryAction,
    deleteCategoryAction,
    editCategoryAction,
    fetchCategoryAction,
    fetchProductAction
} from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const CategoriesAdmin = () => {
    const dispatch = useDispatch();
    const {category} = useSelector((state) => state.product);
    const {product_list} = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProductAction());
        dispatch(fetchCategoryAction());
    }, [dispatch]);

    const [product_category, setCategory] = useState('');
    const [idCat, setIdCat] = useState(0);
    const [clicked, setClick] = useState(false);
    const [addClick, setAddClick] = useState(false);

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    const toggle = (id) => {
        let catCheck = product_list.find((val) => val.product_category_id === id);
        if(catCheck){
            Swal.fire({
                icon: 'warning',
                title: "You can't delete this category!",
                text: "There's still some products in this category"
            })
        } else {
            Swal.fire({
                title: `Are you sure to delete this category?`,
                text: "You won't be able to revert this",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, deleted!'
            }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(deleteCategoryAction(id));
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                }
            })
        }
    }
    const editButton = (id) => {
        setClick(true);
        setIdCat(id);
        console.log(idCat);
        console.log(clicked);
    }
    const saveButton = (id) => {
        if(product_category){
            dispatch(editCategoryAction({id, product_category}))
            setClick(false);
        }
    };
    
    const saveAddBtn = (product_category) => {
        dispatch(addNewCategoryAction(product_category))
        setAddClick(false);
    };

    const cancelButton = () => {
        setClick(false);
        setAddClick(false);
    }
    return (
        <div>
            <div style={{ paddingTop: '10px' }}>
                <Button
                    style={{ backgroundColor: 'black', color: 'white' }}
                    onClick={()=> setAddClick(true)}
                >
                    Add New Category
                </Button>
            </div>
            {/* ADMIN DAPAT MELIHAT SEMUA CATEGORY */}
            <div style={{ display: 'flex', marginLeft: '210px' }}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                category.map((row,index) => (
                                    <TableRow key={row.product_category_id}>
                                        <TableCell>{index+1}</TableCell>
                                    {
                                        clicked && row.product_category_id === idCat ?
                                        (<>
                                        {/* ADMIN EDIT CATEGORY */}
                                            <TableCell>
                                            <TextField
                                                placeholder="Category Name"
                                                label="Category Name"
                                                id="category-name"
                                                defaultValue={row.product_category}
                                                size="small"
                                                onChange={(e) => setCategory(e.target.value)}
                                            />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    onClick={() => saveButton(row.product_category_id)}
                                                    style={{ backgroundColor: 'grey', color: 'black' }}
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    onClick={() => cancelButton(row.product_category_id)}
                                                    style={{ backgroundColor: 'red', color: 'white', marginLeft: '20px' }}
                                                >
                                                    Cancel
                                                </Button>
                                            </TableCell></>
                                        )
                                        :
                                        (   <>
                                            <TableCell>{row.product_category}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    onClick={() => editButton(row.product_category_id)}
                                                    style={{ backgroundColor: 'grey', color: 'black' }}
                                                >
                                                    Edit
                                                </Button>
                                                {/* ADMIN DELETE CATEGORY */}
                                                <Button
                                                    onClick={() => toggle(row.product_category_id)}
                                                    style={{ backgroundColor: 'red', color: 'white', marginLeft: '20px' }}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                            </>)
                                    }
                                    </TableRow>
                                ))
                            }
                            {
                                addClick ?
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <TextField
                                            placeholder="Category Name"
                                            label="Category Name"
                                            id="category-name"
                                            size="small"
                                            onChange={(e) => setCategory(e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            onClick={() => saveAddBtn(product_category)}
                                            style={{ backgroundColor: 'grey', color: 'black' }}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            onClick={cancelButton}
                                            style={{ backgroundColor: 'red', color: 'white', marginLeft: '20px' }}
                                        >
                                            Cancel
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                :
                                null
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
 
export default CategoriesAdmin;