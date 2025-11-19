import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import GroupsDashboard from "./pages/Group.jsx";
import MainLayout from "./Layouts/MainLayout.jsx";
import { Toaster } from "sonner";

function App() {
	return (
		<>
			<Toaster />
			<Router>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/" element={<MainLayout />}>
						<Route index element={<GroupsDashboard />} />
					</Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
