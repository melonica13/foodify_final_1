const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		title: String,
		description: String,
		brand: String,
		image: Array,
		sellPrice: Number,
		category: String,
		subcategory: String,
		quantity: Number,
		pickuptime: String,
		username: String,
		uid: String,
		pickup: String,
		city: String,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("product", productSchema);
