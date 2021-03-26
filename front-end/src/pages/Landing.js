import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ExtendedNavbar from "../components/ExtendedNavbar";
import { fetchHighestProductPriceAction } from "../redux/actions";

const Landing = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchHighestProductPriceAction());
	}, [dispatch]);
	return (
		<div className="flex flex-col">
			<ExtendedNavbar />
			<div className="font-bold text-blue-500 justify-items-center justify-center text-2xl text-center">
				Landing
			</div>
		</div>
	);
};

export default Landing;
