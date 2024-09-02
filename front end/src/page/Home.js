import React, { useEffect, useRef, useState } from "react";
import Rounded from "../components/Rounded";
import ImageSlide from "../components/ImageSlide";
import HorizontalCardSlide from "../components/HorizontalCardSlide";
import CardHorizontal from "../components/CardHorizontal";
import CardVertical from "../components/CardVertical";
import { useSelector } from "react-redux";
import CardHorizontalLoading from "../components/CardHorizontalLoading";
import CardVerticalLoading from "../components/CardVerticalLoading";
import RoundedLoading from "../components/RoundedLoading";
import ImageSlideLoading from "../components/ImageSlideLoading";

import { categoryOption } from "../dataset/category";

const Home = () => {
	const categoryLoading = new Array(13).fill(null);
	const allproduct = useSelector((state) => state.products.allProduct);
	const user = useSelector((state) => state.user);

	const product = allproduct.filter((p) => p.city === user.data.city);

	const loadingNumber = new Array(15).fill(null);
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	const nonFoodProducts = product.filter(
		(el) => el.category.toLowerCase() === "fruits/vegetable",
		[]
	);
	const foodProducts = product.filter(
		(el) => el.category.toLowerCase() === "food",
		[]
	);

	const productAllCategoryList = [
		...new Set([...product.map((el) => el.category)]),
	].sort();

	let productAllCategoryOneProduct = [];

	for (let i = 0; i < productAllCategoryList.length; i++) {
		productAllCategoryOneProduct.push(
			product.filter(
				(el) =>
					el.category.toLowerCase() === productAllCategoryList[i].toLowerCase()
			)[0]
		);
	}

	return (
		<div className="p-1">
			<div className="p-2 flex flex-row items-baseline gap-4 overflow-scroll scrollbar-none scroll-smooth duration-150">
				{categoryOption.map((el, index) => {
					return <Rounded key={index} image={el.imguri} category={el.value} />;
				})}
			</div>

			<HorizontalCardSlide heading="Fruits/Vegetable" category="fruits/vegetable">
				{nonFoodProducts[0]
					? nonFoodProducts.map((el) => {
							return (
								<CardHorizontal
									key={el._id}
									image={el.image[0]}
									id={el._id}
									title={el.title}
									category={el.category}
									price={el.price}
									sellPrice={el.sellPrice}
									description={el.description}
									updatedAt={el.updatedAt}
									city={el.city}
								/>
							);
					  })
					: loadingNumber.map((el, index) => {
							return <CardHorizontalLoading key={index + "cartHorizontal"} />;
					  })}
			</HorizontalCardSlide>
			<HorizontalCardSlide heading="Food Items" category="food">
				{foodProducts[0]
					? foodProducts.map((el) => {
							return (
								<CardHorizontal
									key={el._id}
									image={el.image[0]}
									id={el._id}
									title={el.title}
									category={el.category}
									price={el.price}
									sellPrice={el.sellPrice}
									description={el.description}
									brand={el.brand}
									updatedAt={el.updatedAt}
									city={el.city}
								/>
							);
					  })
					: loadingNumber.map((el, index) => {
							return <CardHorizontalLoading key={index + "cartHorizontal"} />;
					  })}
			</HorizontalCardSlide>

			<div className="my-5"></div>
		</div>
	);
};

export default Home;
