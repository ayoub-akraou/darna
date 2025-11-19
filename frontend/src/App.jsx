import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import GroupsDashboard from "./pages/Group.jsx";
import DashBordLayout from "./Layouts/DashBordLayout.jsx";
import { Toaster } from "sonner";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
		<Toaster />
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/" element={<DashBordLayout />}>
					<Route index element={<GroupsDashboard />} />
				</Route>
			</Routes>
		</Router>
		</>
	);
}

export default App;
