const ProductModel = require("../../models/product");

module.exports = saveProduct = async (req, res) => {
	console.log(req.body);
	try {
		const data = await ProductModel(req.body);
		const save = await data.save();
		res.send(data);
	} catch (err) {
		res.send({ message: err });
	}
};
