import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import sampleImage from "../assest/sampleImage.jpg";

import moment from "moment";

const CardVertical = ({
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
		<Link
			to={`/product/${id}`}
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			className="block justify-self-center">
			<div className="w-full min-w-[280px] max-w-[280px]  shadow rounded bg-white-300  cursor-pointer  gap-1 flex flex-col my-1">
				<div className="min-w-[130px] min-h-[160px]  max-h-[160px]   bg-slate-200 h-full p-4 flex justify-center items-center">
					{image && (
						<img
							src={
								process.env.REACT_APP_SERVER_DOMAIN_GET_IMAGE + image ||
								sampleImage
							}
							className="h-full max-w-[140px] max-h-[140px] mix-blend-multiply hover:scale-105 transition-all"
						/>
					)}
				</div>
				<div className="w-full flex flex-col gap-3 justify-center p-5">
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

export default CardVertical;
