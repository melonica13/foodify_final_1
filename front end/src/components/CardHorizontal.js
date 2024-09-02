import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import moment from "moment";

import { addItemCart } from "../redux/userSlice";
import sampleImage from "../assest/sampleImage.jpg";

const CardHorizontal = ({
	image,
	id,
	title,
	category,
	price,
	sellPrice,
	description,
	updatedAt,
	city,
}) => {
	const sellPriceUK =
		sellPrice &&
		sellPrice.toLocaleString("en-GB", {
			maximumFractionDigits: 2,
			style: "currency",
			currency: "GBP",
		});
	return (
		<Link to={`/product/${id}`}>
			<div className="w-full min-w-[280px] md:min-w-[320px] max-w-xs h-36 shadow rounded bg-white-300 cursor-pointer  gap-3 md:gap-1 flex my-1  px-3 py-2 md:py-0 md:px-0">
				<div className="min-w-[120px] min-h-[120px] md:min-w-[145px] md:min-h-[144px] h-32 w-32 p-1 md:px-1 md:py-1 bg-slate-200 rounded ">
					{image && (
						<img
							src={
								process.env.REACT_APP_SERVER_DOMAIN_GET_IMAGE + image ||
								sampleImage
							}
							className="w-full h-full hover:scale-105 transition-all"
						/>
					)}
				</div>
				<div className="w-full flex flex-col gap-1 justify-center md:px-3 md:py-3 pl-0">
					<h2 className="w-full font-medium text-slate-700 title text-lg my-0 min-h-[22px]">
						{title}
					</h2>
					<h2 className="text-base text-slate-400">
						{updatedAt ? moment(updatedAt).fromNow() : ""}
					</h2>
					<h2 className="text-base text-slate-400">{city}</h2>
					<h2 className="w-full text-slate-500 capitalize my-0">{category}</h2>
					<h2 className="w-full rounded flex gap-3">
						<span className="text-red-600 font-medium">{sellPriceUK} </span>
					</h2>
				</div>
			</div>
		</Link>
	);
};

export default CardHorizontal;
