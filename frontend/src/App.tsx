import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layouts/Header";
import Home from "./features/home/components/Home";
import Product from "./features/products/components/Product";
import Cart from "./features/cart/components/Cart";
import Checkout from "./features/checkout/Checkout";
import Register from "./features/auth/components/Register";
import Login from "./features/auth/components/Login";
import Profile from "./features/profile/components/Profile";
import PayByStripe from "./features/payment/components/PayByStripe";
import UserOrders from "./features/auth/components/UserOrders";
import PageNotFound from "./features/404/PageNotFound";

export default function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/product/:slug" element={<Product />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/checkout" element={<Checkout />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/profile" element={<Profile />} />
				<Route path='/pay/order' element={<PayByStripe />}/>
				<Route path='/user/orders' element={<UserOrders />}/>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
