import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoCloudUpload } from "react-icons/go";
import { MdOutlineAddCircleOutline, MdOutlineDelete } from "react-icons/md";
import { categoryOption } from "../dataset/category";
import { subCategoryOption } from "../dataset/subcategory";
import { cityOptions } from "../dataset/city";

const Upload = () => {
	const user = useSelector((state) => state.user);

	const imageRef = useRef();
	const [data, setData] = useState({
		title: "",
		description: "",
		pickuptime: "",
		quantity: 1,
		image: [],
		sellPrice: "",
		category: "",
		subcategory: "",
	});

	const handleUplaod = (e) => {
		e.stopPropagation();
		imageRef.current.click();
	};

	const handleUploadImage = useCallback(
		async (e) => {
			e.stopPropagation();
			const file = await e.target.files[0];

			const fromData = new FormData();
			fromData.append("image", file);
			if (file) {
				const uploadServer = await fetch(
					`${process.env.REACT_APP_SERVER_DOMAIN}/upload/image`,
					{
						method: "POST",
						body: fromData,
					}
				);
				const dataRes = await uploadServer.json();
				console.log(fromData);
				console.log(dataRes);

				//save to useState
				setData((preve) => {
					return {
						...preve,
						image: [...preve.image, dataRes.fileName],
					};
				});
			}
		},
		[data]
	);

	console.log(data);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(data);

		const { title, image, category } = data;

		if (title && image[0] && category) {
			data.uid = localStorage.getItem("@oo_uid");
			data.username = user.data.firstName;

			const res = await fetch(
				`${process.env.REACT_APP_SERVER_DOMAIN}/product/save`,
				{
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);
			const fetchData = await res.json();

			setData({ image: [], quantity: 1 });
			alert("posted!");
			window.location.href = "/";
			return;
		}

		alert("Please fill all the details!");
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleDeleteImage = (e) => {
		e.stopPropagation();
		setData((preve) => {
			return {
				...preve,
				image: [],
			};
		});
	};

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setData((preve) => {
			return {
				...preve,
				[name]: value,
			};
		});
	};

	useLayoutEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	return (
		<div className="max-w-md w-full m-auto  p-3 ">
			<div className="p-4 bg-white shadow-md rounded">
				<form onSubmit={handleSubmit}>
					<label htmlFor="title">
						Title<span className="text-red-600">*</span> :{" "}
					</label>
					<input
						type={"text"}
						id="title"
						className="bg-slate-100 w-full py-1 px-2 rounded outline-none border"
						name="title"
						value={data.title}
						onChange={handleOnChange}
						required
					/>

					<label htmlFor="description">Description : </label>
					<textarea
						className="w-full bg-slate-100 resize-none rounded border outline-none px-2 py-1"
						rows={3}
						id="description"
						name="description"
						value={data.description}
						required
						onChange={handleOnChange}></textarea>

					<label htmlFor="pickuptime">
						Pick Up Time<span className="text-red-600">*</span> :{" "}
					</label>
					<input
						type={"text"}
						id="pickuptime"
						placeholder="Working Days 12pm to 4pm"
						className="bg-slate-100 w-full py-1 px-2 rounded outline-none border"
						name="pickuptime"
						value={data.pickuptime}
						onChange={handleOnChange}
						required
					/>

					<label htmlFor="quantity">Quantity : </label>
					<input
						type={"number"}
						min={1}
						id="quantity"
						className="bg-slate-100 w-full py-1 px-2 rounded outline-none border"
						name="quantity"
						value={data.quantity}
						onChange={handleOnChange}
						required
					/>

					<label htmlFor="category">
						Category<span className="text-red-600">*</span> :
					</label>
					<select
						id="category"
						className="w-full bg-slate-100 p-1 border rounded outline-none"
						name="category"
						value={data.category}
						required
						onChange={handleOnChange}>
						<option className="p-5">select a category </option>
						{categoryOption.map((el) => {
							return (
								<option
									className="p-5 rounded-none"
									key={el.id}
									value={el.value}>
									{el.name}
								</option>
							);
						})}
					</select>

					{data.category !== "food" ? (
						<div>
							<label htmlFor="category">
								Subcategory<span className="text-red-600">*</span> :
							</label>
							<select
								id="subcategory"
								className="w-full bg-slate-100 p-1 border rounded outline-none"
								name="subcategory"
								value={data.subcategory}
								required
								onChange={handleOnChange}>
								<option className="p-5">select a subcategory </option>
								{subCategoryOption.map((el) => {
									return (
										<option
											className="p-5 rounded-none"
											key={el.id}
											value={el.value}>
											{el.name}
										</option>
									);
								})}
							</select>
						</div>
					) : null}

					{/* upload image section  */}
					<div
						className="border h-40 cursor-pointer bg-slate-100 my-2 flex justify-center items-center text-6xl text-slate-800 relative"
						required
						onClick={handleUplaod}>
						{data.image[0] ? (
							<>
								<img
									src={
										process.env.REACT_APP_SERVER_DOMAIN_GET_IMAGE +
										data.image[data.image.length - 1]
									}
									className="h-full"
									alt="product"
								/>
								<div
									className="absolute bottom-0 right-0 text-2xl py-1 px-2 rounded-t-full rounded-l-full text-white bg-red-600 hover:bg-red-700"
									onClick={handleDeleteImage}>
									<MdOutlineDelete />
								</div>
								<div
									className="absolute bottom-0 left-0 text-2xl py-1 px-2 rounded-t-full rounded-r-full text-white bg-red-600 hover:bg-red-700"
									onClick={handleUplaod}>
									<MdOutlineAddCircleOutline />
								</div>
							</>
						) : (
							<GoCloudUpload />
						)}
					</div>
					<label htmlFor="imageProduct">
						<input
							type={"file"}
							id="imageProduct"
							className="hidden"
							name="image"
							accept="image/*"
							onChange={handleUploadImage}
							ref={imageRef}
							required
						/>
					</label>

					{/* list of image upload  */}
					{data.image[0] && (
						<>
							<p className="text-xs">
								Minimum image one<span className="text-red-600">*</span> and
								Maximum image four<span className="text-red-600">*</span>
							</p>
							<div className="flex gap-2 my-3">
								{data.image.map((el, index) => {
									return (
										<div
											className="w-16 h-16 border object-fit hover:bg-slate-200 rounded"
											key={"image1" + index}>
											<img
												src={process.env.REACT_APP_SERVER_DOMAIN_GET_IMAGE + el}
												className="w-full h-full"
											/>
										</div>
									);
								})}
							</div>
						</>
					)}

					{data.subcategory === "buy" ? (
						<div className="flex flex-col md:flex-row md:items-center md:gap-3">
							<label htmlFor="sellPrice" className="whitespace-nowrap">
								Sell Price<span className="text-red-600">*</span> :{" "}
							</label>
							<input
								type={"number"}
								id="sellPrice"
								className="bg-slate-100 w-full py-1 px-2 rounded outline-none border"
								min={0}
								pattern="[0-9]*"
								required
								name="sellPrice"
								value={data.sellPrice}
								onChange={handleOnChange}
							/>
						</div>
					) : null}

					<label htmlFor="category">
						City<span className="text-red-600">*</span> :
					</label>
					<select
						id="city"
						className="w-full bg-slate-100 p-1 border rounded outline-none"
						name="city"
						value={data.city}
						required
						onChange={handleOnChange}>
						<option className="p-5">select a city </option>
						{cityOptions.map((el) => {
							return (
								<option
									className="p-5 rounded-none"
									key={el.id}
									value={el.value}>
									{el.name}
								</option>
							);
						})}
					</select>

					<label htmlFor="pickup">Pickup Address : </label>
					<textarea
						className="w-full bg-slate-100 resize-none rounded border outline-none px-2 py-1"
						rows={3}
						id="pickup"
						name="pickup"
						value={data.pickup}
						required
						onChange={handleOnChange}></textarea>

					<div className="flex justify-center mt-4">
						<button
							type="submit"
							className="bg-red-600 hover:bg-red-700 px-5 py-1 font-semibold rounded text-white">
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Upload;
