import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./styles/App.css";

import Home from "./pages/Home";
import Category from "./pages/Category";
import Login from "./pages/Login";
import Join from "./pages/Join";
import MyPage from "./pages/MyPage";

import Header from "./components/header";

function Switchs() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/category" element={<Category />} />
				<Route path="/login" element={<Login />} />
				<Route path="/join" element={<Join />} />
				<Route path="/mypage" element={<MyPage />} />
			</Routes>
		</Router>
	);
}

export default Switchs;
