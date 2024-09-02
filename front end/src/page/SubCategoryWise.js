import React, { useEffect, useMemo, useState, useTransition } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
	HiOutlineBarsArrowDown,
	HiOutlineAdjustmentsHorizontal,
} from "react-icons/hi2";
import CardVerticalLoading from "../components/CardVerticalLoading";
import CardVertical from "../components/CardVertical";
import { subCategoryOption } from "../dataset/subcategory";

const CategoryWise = () => {
	const params = useParams();
	const product = useSelector((state) => state.products.allProduct);
	const [categoryFilterWise, setCategoryFilterWise] = useState([]);
	const loadingNumber = new Array(15).fill(null);
	const [sortBy, setSortBy] = useState("");
	const [displaySortBy, setDisplaySortBy] = useState(false);
	const [isPending, startTransition] = useTransition();

	const categoryWiseProduct = product.filter(
		(el) =>
			el.category.toLowerCase() === params.category.toLowerCase() &&
			el.subcategory?.toLowerCase() === params.subcategory.toLowerCase(),
		[]
	);

	useEffect(() => {
		setCategoryFilterWise(categoryWiseProduct);
	}, [categoryWiseProduct[0]]);

	return (
		<div>
			<div className="h-9 lg:hidden">
				<div className="flex fixed w-full bg-slate-50 z-30">
					<div
						className="flex-1 flex justify-center items-center gap-3 py-2 border border-slate-700 text-lg"
						onClick={() => setDisplaySortBy(true)}>
						<HiOutlineBarsArrowDown />
						<p className="text-base font-medium">Sort</p>
					</div>
					<div className="flex-1 flex justify-center items-center gap-3 py-2 border border-slate-700 text-lg">
						<HiOutlineAdjustmentsHorizontal />
						<p className="text-base font-medium">Filter</p>
					</div>
				</div>
			</div>
			<div className="grid md:grid-cols-categorySearch ">
				<div className="shadow-md relative hidden lg:block">
					{/* category wise display here  */}
					<div className="">
						<div className=" ">
							{subCategoryOption.map((el) => {
								return (
									<Link
										key={el.value}
										to={
											"/category/" +
											params.category +
											"/subcategory/" +
											el.value
										}>
										<div className="flex gap-2 text-slate-800 py-2 px-3">
											<input
												type={"checkbox"}
												checked={el.value === params.subcategory}
											/>
											<label>{el.name}</label>
										</div>
									</Link>
								);
							})}
						</div>
					</div>
				</div>

				{/* filter result display here  */}
				<div className="p-2 md:p-4">
					<p className="text-slate-800 font-medium py-1 whitespace-nowrap">
						Search Results :{" "}
						<span className="text-sm md:text-base ">
							(Showing 1 – {categoryFilterWise.length} )
						</span>
					</p>

					<div className="grid grid-cols-autoVerticalCard  justify-items-center gap-5 ">
						{categoryFilterWise[0] && !isPending
							? categoryFilterWise.map((el) => {
									return (
										<CardVertical
											key={el._id}
											image={el.image[0]}
											id={el._id}
											title={el.title}
											category={el.category}
											price={el.price}
											sellPrice={el.sellPrice}
											description={el.description}
											brand={el.brand}
											city={el.city}
										/>
									);
							  })
							: loadingNumber.map((el, index) => {
									return <CardVerticalLoading key={index + "cartHorizontal"} />;
							  })}
					</div>

					{/* pagination page  */}
					{/* <div className="flex gap-4 my-5 py-2 justify-center items-center border-t border-b">
            <div className="min-w-[25px] min-h-[25px] font-semibold text-white flex justify-center items-center rounded-full bg-red-600 cursor-pointer">1</div>
            <div className="">2</div>
            <div className="">3</div>
            <div className="">4</div>
            <div className="">5</div>
            <div className="">6</div>
        </div> */}
				</div>
			</div>
		</div>
	);
};

export default CategoryWise;
