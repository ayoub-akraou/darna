import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
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
			</Routes>
		</Router>
		</>
	);
}

export default App;
