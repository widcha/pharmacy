// import React from 'react';

// const ModalProduct = () => {
//     const [showModal, setShowModal] = useState(false);
//     const [newName, setName] = useState('');
//     const [newPrice, setPrice] = useState(0);
//     const [newVol, setVol] = useState(0);
//     const [newDesc, setDesc] = useState('');
//     const [pictName, setPictName] = useState('');
//     const [selectedCategory, setCategory] = useState('');
//     const [pict, setPict] = useState();
//     const [open, setOpen] = useState(false);
//     const [stock, setStock] = useState(0);

//     return (
//         <>
//         {
//         showModal ? (
//             <>
//               <div
//                 className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
//               >
//                 <div className="relative w-auto my-6 mx-auto max-w-3xl">
//                   {/*content*/}
//                   <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//                     {/*header*/}
//                     <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
//                       <h3 className="text-3xl font-semibold">
//                         Add
//                       </h3>
//                       <button
//                         className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//                         onClick={() => setShowModal(false)}
//                       >
//                         <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
//                           ×
//                         </span>
//                       </button>
//                     </div>
//                     {/*body*/}
//                     <div className="relative p-6 flex-auto" style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
//                       <TextField
//                           placeholder="Name"
//                           label="Name"
//                           id="name"
//                           size="large"
//                           onChange={(e) => setName(e.target.value)}
//                       />
//                       <TextField
//                           placeholder="Price"
//                           label="Price"
//                           id="price"
//                           size="large"
//                           onChange={(e) => setPrice(e.target.value)}
//                       />
//                       <TextField
//                           placeholder="Stock"
//                           label="Stock"
//                           id="stock"
//                           size="large"
//                           onChange={(e) => setStock(e.target.value)}
//                       />
//                       <TextField
//                           placeholder="Volume"
//                           label="Volume"
//                           id="volume"
//                           size="large"
//                           onChange={(e) => setVol(e.target.value)}
//                       />
//                       <TextField
//                           placeholder="Description"
//                           label="Description"
//                           id="description"
//                           size="large"
//                           onChange={(e) => setDesc(e.target.value)}
//                       />
//                       <FormControl>
//                           <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
//                           <Select
//                               labelId="demo-controlled-open-select-label"
//                               id="category"
//                               open={open}
//                               onClose={handleClose}
//                               onOpen={handleOpen}
//                               onChange={handleChange}
//                           >
//                           {category.map((val) => <MenuItem value={val.product_category_id}>{val.product_category}</MenuItem>)}
//                           </Select>
//                       </FormControl>
//                       <input
//                           accept="image/*"
//                           className={classes.input}
//                           style={{ display: 'none' }}
//                           id="raised-button-file"
//                           onChange={uploadImg}
//                           multiple
//                           type="file"
//                       />
//                       <label htmlFor="raised-button-file">
//                           <Button variant="raised" component="span" className={classes.button} style={{ backgroundColor: 'grey' }} onClick={() => console.log("Ok")}>
//                               Upload
//                           </Button>
//                           {pictName}
//                       </label> 

//                     </div>
//                     {/*footer*/}
//                     <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
//                       <button
//                         className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
//                         type="button"
//                         style={{ transition: "all .15s ease" }}
//                         onClick={() => setShowModal(false)}
//                       >
//                         Close
//                       </button>
//                       <button
//                         className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
//                         type="button"
//                         style={{ transition: "all .15s ease" }}
//                         onClick={saveChange}
//                       >
//                         Save Changes
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
//             </>
//           ) : null}
//         </>
//     );
// }
 
// export default ModalProduct;