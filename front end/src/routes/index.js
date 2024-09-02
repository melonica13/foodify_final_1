import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/ProtectedRoute";
import Chats from "../components/Chats";
import SubCategoryWise from "../page/SubCategoryWise";
import CategoryWise from "../page/CategoryWise";
import Home from "../page/Home";
import Product from "../page/Product";
import ProductSearch from "../page/ProductSearch";
import Profile from "../page/Profile";
import SignIn from "../page/SignIn";
import SignUp from "../page/SignUp";
import Upload from "../page/Upload";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index element={<Home />} />
			<Route path="/signin" element={<SignIn />} />
			<Route path="/signup" element={<SignUp />} />
			<Route
				path="/profile"
				element={
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				}
			/>
			<Route path="/chats" element={<Chats />} />
			<Route path="/upload" element={<Upload />} />
			<Route path="/product/:id" element={<Product />} />
			<Route path="/search" element={<ProductSearch />} />
			<Route path="/category/:category" element={<CategoryWise />} />
			<Route
				path="/category/:category/subcategory/:subcategory"
				element={<SubCategoryWise />}
			/>
		</Route>
	)
);

export default router;
