import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AboutUs } from "../components/AboutUs";
import ExtendedNavbar from "../components/ExtendedNavbar";
import { Hero } from "../components/Hero";
import { Content } from "../components/Content";
import { Step } from "../components/Steps";
import { fetchHighestProductPriceAction } from "../redux/actions";

const Landing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHighestProductPriceAction());
  }, [dispatch]);
  return (
    <div className="flex flex-col">
      <ExtendedNavbar />
      <Hero />
      <Content />
      <Step />
      <AboutUs />
    </div>
  );
};

export default Landing;
