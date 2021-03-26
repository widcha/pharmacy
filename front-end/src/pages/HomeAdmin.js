import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchCategoryAction, fetchProductAction} from "../redux/actions";

const HomeAdmin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductAction());
    dispatch(fetchCategoryAction());
  });
  return <div style={{marginTop: "15px"}}>Home</div>;
};

export default HomeAdmin;
