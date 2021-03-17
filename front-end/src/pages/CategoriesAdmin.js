import React, { useEffect, useState } from 'react';
import {
    Button,
<<<<<<< Updated upstream
    makeStyles,
    Paper,
=======
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Paper,
    Select,
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    const {category} = useSelector((state) => state.product);
=======
    const category = useSelector((state) => state.product.category);
>>>>>>> Stashed changes
    const {product_list} = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProductAction());
        dispatch(fetchCategoryAction());
    }, [dispatch]);

    const [product_category, setCategory] = useState('');
    const [idCat, setIdCat] = useState(0);
    const [clicked, setClick] = useState(false);
    const [addClick, setAddClick] = useState(false);
<<<<<<< Updated upstream
=======
    const [searchWord, setSearch] = useState('');
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
        console.log(idCat);
        console.log(clicked);
=======
>>>>>>> Stashed changes
    }
    const saveButton = (id) => {
        if(product_category){
            dispatch(editCategoryAction({id, product_category}))
            setClick(false);
        }
    };
<<<<<<< Updated upstream
    
    const saveAddBtn = (product_category) => {
        dispatch(addNewCategoryAction(product_category))
        setAddClick(false);
    };

=======
    const searchBtn = () => {
        const a = `?search=${searchWord}`;
        dispatch(fetchCategoryAction(a))
    }
    
    const saveAddBtn = (product_category) => {
        if(product_category){
            dispatch(addNewCategoryAction(product_category))
            setAddClick(false);
        }else{
            Swal.fire({
                icon: 'warning',
                title: "Can't add a blank category",
                text: 'You need to fill category name!'
            })
        }
    };
    const [filterCategory, setFilterCategory] = useState('');
    const [openn, setOpenn] = useState(false);

    const handleFilterCategory = (e) => {
        setFilterCategory(e.target.value);
    };
    const handleOpenn = () => {
        setOpenn(true);
    }
    const handleClosee = () => {
        setOpenn(false);
    };
>>>>>>> Stashed changes
    const cancelButton = () => {
        setClick(false);
        setAddClick(false);
    }
<<<<<<< Updated upstream
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
=======
    
    const renderRow = () => {
        let newCat;
        if(filterCategory){
            newCat = category.filter((val) => val.product_category_id === filterCategory);
        }else{
            newCat = category;
        }
        return (
            newCat.map((row,index) => (
                <TableRow key={row.product_category_id}>
                    <TableCell>{index+1}</TableCell>
                {
                    clicked && row.product_category_id === idCat && addClick === false ?
                    (<>
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
                                disabled={addClick}
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={() => toggle(row.product_category_id)}
                                style={{ backgroundColor: 'red', color: 'white', marginLeft: '20px' }}
                                disabled={addClick}
                            >
                                Delete
                            </Button>
                        </TableCell>
                        </>)
                }
                </TableRow>
            ))
        )
    };
    const renderNewRow = () => {
        return (
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
        )
    }
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex' }}>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
                                // ADMIN MENAMBAH CATEGORY
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
=======
                            {renderRow()}
                            {renderNewRow()}
>>>>>>> Stashed changes
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
<<<<<<< Updated upstream
=======
            <div style={{ display: 'flex', flexDirection: 'column', width: '275px', paddingTop: '17px', maxHeight: '50px', position: 'fixed', left: '78%' }}>
                <Button
                    style={{ backgroundColor: 'black', color: 'white' }}
                    onClick={()=> setAddClick(true)}
                >
                    Add New Category
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
                        <MenuItem value="">All</MenuItem>
                    {category.map((val) => <MenuItem value={val.product_category_id}>{val.product_category}</MenuItem>)}
                    </Select>
                </FormControl>
                <div>
                    <TextField
                        placeholder="Search..."
                        label="Search"
                        id="search"
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: '275px', paddingBottom: '10px' }}
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
>>>>>>> Stashed changes
        </div>
    );
}
 
export default CategoriesAdmin;