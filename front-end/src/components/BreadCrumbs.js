import { Breadcrumbs, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export const BreadCrumbs = ({ name }) => {
	function handleClick(event) {
		event.preventDefault();
		console.info("You clicked a breadcrumb.");
	}
	return (
		<Breadcrumbs aria-label="breadcrumb" className="flex justify-end ">
			<Link
				to="/"
				className="border-b-2 hover:border-gray-600 transition duration-300"
			>
				Home
			</Link>
			<Link
				to="/product"
				className="border-b-2 hover:border-gray-600 transition duration-300"
			>
				Product
			</Link>
			<Typography color="textPrimary">{name}</Typography>
		</Breadcrumbs>
	);
};
