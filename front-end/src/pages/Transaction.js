import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTransactionDetails } from "../redux/actions";

export const Transaction = () => {
	const dispatch = useDispatch();
	const { user_id } = useSelector((state) => state.user);
	const { transaction_list } = useSelector((state) => state.transaction);
	useEffect(() => {
		dispatch(fetchUserTransactionDetails(user_id));
	}, [dispatch, user_id]);

	const renderList = () => {
		return transaction_list((val) => {
			return <div></div>;
		});
	};
	return (
		<div className="container flex m-auto p-auto">
			<div>
				<label className="font-semibold text-gray-800 text-xl">
					TRANSACTION LIST
				</label>
				<div className="font-semibold text-gray-700 rounded-xl shadow border p-10"></div>
			</div>
		</div>
	);
};
