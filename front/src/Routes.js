import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./styles/App.css";
import Home from "./pages/Home";
import Category from "./pages/Category";

import Header from "./components/header";

function Switchs() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/category" element={<Category />} />
			</Routes>
		</Router>
	);
}

export default Switchs;
