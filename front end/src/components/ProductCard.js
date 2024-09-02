import React, { memo, useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import { isLoading } from "../redux/loadingSlice";
import { initiateChat } from "../utility/firebase";

import sampleImage from "../assest/sampleImage.jpg";

const ProductCard = ({ product }) => {
	const [isMagnified, setIsMagnified] = useState(false);
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);

	const c_uid = localStorage.getItem("@oo_uid");

	const [imageCursorPosition, setImageCursorPosition] = useState({
		x: 0,
		y: 0,
	});
	const handleMouseEnter = () => {
		setIsMagnified(true);
	};
	const handleMouseLeave = () => {
		setIsMagnified(false);
	};
	const handleMouseMove = (e) => {
		const { left, top, width, height } = e.target.getBoundingClientRect();
		const x = (e.clientX - left) / width;
		const y = (e.clientY - top) / height;
		setImageCursorPosition({ x, y });
		console.log(left, top, width, height);
	};

	const [productImage, setProductImage] = useState(
		process.env.REACT_APP_SERVER_DOMAIN_GET_IMAGE + product.image[0]
	);
	useEffect(() => {
		setProductImage(
			process.env.REACT_APP_SERVER_DOMAIN_GET_IMAGE + product.image[0]
		);
	}, [product]);

	const handleMouseEnterProduct = useCallback(
		(imgName) => {
			setProductImage(process.env.REACT_APP_SERVER_DOMAIN_GET_IMAGE + imgName);
		},
		[product]
	);

	const handleRequest = async () => {
		try {
			dispatch(isLoading(true));
			// await initiateChat(
			// 	product.uid,
			// 	c_uid,
			// 	"I writing to request the Item you posted: " + product.title
			// );

			await initiateChat(
				product.uid,
				c_uid,
				"I writing to request the Item you posted: " + product.title,
				product.username,
				user.data.firstName
			);

			window.location.href = "/chats";
		} catch (error) {
			alert("Something went wrong!");
		} finally {
			dispatch(isLoading(false));
		}
	};

	const sellPrice = product.sellPrice
		? product.sellPrice.toLocaleString("en-GB", {
				maximumFractionDigits: 0,
				style: "currency",
				currency: "GBP",
		  })
		: 0;

	return (
		<div className="md:flex w-full max-w-6xl md:h-auto gap-2 relative ">
			<div className="md:w-1/2 min-h-[300px] min-w-[300px] max-h-96 max-w-sm bg-slate-100 rounded p-3 sticky flex justify-center items-center">
				<img
					src={productImage || sampleImage}
					className="h-full max-h-[300px] md:max-h-[350px] cursor-crosshair mix-blend-multiply md:object-scale-down "
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					onMouseMove={handleMouseMove}
					loading="lazy"
				/>
			</div>
			<div className="flex md:flex-col gap-3  md:justify-start items-center  my-2 md:-order-1 max-h-96 overflow-scroll scrollbar-none">
				{product.image.map((el) => {
					return (
						<div
							className={`w-16 md:w-20 h-16 md:h-20 bg-slate-200 rounded cursor-pointer flex items-center justify-center p-1 ${
								productImage ===
								process.env.REACT_APP_SERVER_DOMAIN_GET_IMAGE + el
									? "border-2 border-red-500"
									: ""
							}`}>
							<img
								key={el}
								src={
									process.env.REACT_APP_SERVER_DOMAIN_GET_IMAGE + el ||
									sampleImage
								}
								className="h-full mix-blend-multiply object-scale-down"
								onMouseEnter={() => handleMouseEnterProduct(el)}
								onClick={() => handleMouseEnterProduct(el)}
								loading="lazy"
							/>
						</div>
					);
				})}
			</div>
			<div className="md:w-1/2 lg:ml-4 relative">
				{/* isMagnified display image  */}
				{isMagnified && (
					<div className="min-h-[300px] w-full h-full min-w-[500px] bg-slate-100 rounded  absolute left-0 shadow-md overflow-hidden drop-shadow hidden lg:block transition-all max-h-96 max-w-sm">
						<div
							className="w-full h-full bg-slate-400  bg-no-repeat mix-blend-multiply"
							style={{
								background: `url(${productImage})`,
								backgroundRepeat: "no-repeat",
								backgroundPosition: `${imageCursorPosition.x * 100}% ${
									imageCursorPosition.y * 100
								}%`,
							}}></div>
					</div>
				)}

				<div className="py-3">
					<h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
						{product.title}
					</h2>
					<h2 className="text-base text-slate-400">
						{product.updatedAt ? moment(product.updatedAt).fromNow() : ""}
					</h2>
					<h2 className="text-base text-slate-400">By {product.username}</h2>
					<p className="text-base text-slate-400 uppercase">
						{product.category}
					</p>
					<p className="text-base mt-2 uppercase">{product.description}</p>
					<div className="leading-[0] my-5">
						<p className="text-base mt-2 leading-[1]">Pick Up Time:</p>
						<p className="text-base mt-2 leading-[1]">{product.pickuptime}</p>
					</div>

					{sellPrice ? (
						<div className="flex gap-3 my-2 items-center">
							<p className="font-bold text-xl md:text-2xl lg:text-3xl text-red-600">
								{sellPrice}
							</p>
						</div>
					) : null}

					{product.subcategory === "free" ? (
						<div className="flex gap-3 my-2 items-center">
							<p className="font-bold text-xl md:text-2xl lg:text-3xl text-red-600">
								Giving Away
							</p>
						</div>
					) : null}

					<div className="flex gap-3 my-3">
						{user.data?._id ? (
							<button
								onClick={handleRequest}
								className="w-full max-w-[130px] py-1 border-2 px-3 rounded border-red-600 hover:border-red-700 font-medium text-red-600 hover:text-red-700 text-medium">
								Request
							</button>
						) : (
							<button
								onClick={() => {
									window.location.href = "/signin";
								}}
								className="w-full max-w-[130px] py-1 border-2 px-3 rounded border-red-600 hover:border-red-700 font-medium text-red-600 hover:text-red-700 text-medium">
								Login To Request
							</button>
						)}
					</div>

					<div>
						<p className="text-slate-700 font-semibold">Description : </p>
						<p>{product.description}</p>
					</div>

					<div>
						<p className="my-2 text-slate-700 font-semibold">
							Pickup Address :{" "}
						</p>
						<p>{product.pickup}</p>
					</div>
					<div>
						<p className="my-2 text-slate-700 font-semibold">City : </p>
						<p>{product.city}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(ProductCard);
