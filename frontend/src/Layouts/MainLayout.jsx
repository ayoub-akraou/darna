import { Outlet, Link, useNavigate } from "react-router-dom";
import { HomeIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import LogoutBtn from "../components/Button/LogoutBtn.jsx";
import { useEffect } from "react";

export default function MainLayout() {
	const navigate = useNavigate();
	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/login");
		}
	}, [navigate]);

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Navigation Header */}
			<header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
				<nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
					<div className="flex items-center gap-8">
						<h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
							Tontine Manager
						</h1>
						<div className="hidden md:flex items-center gap-6">
							<Link
								to="/"
								className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors font-medium"
							>
								<HomeIcon className="w-5 h-5" />
								Tableau de bord
							</Link>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<button className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors">
							<Cog6ToothIcon className="w-5 h-5" />
							<span className="hidden sm:inline">Paramètres</span>
						</button>
						<LogoutBtn />
					</div>
				</nav>
			</header>

			{/* Main Content */}
			<main className="flex-1">
				<Outlet />
			</main>

			{/* Footer */}
			<footer className="border-t border-gray-200 bg-white py-6">
				<div className="max-w-7xl mx-auto px-6 text-center text-gray-600 text-sm">
					<p>&copy; 2025 Tontine Manager. Tous droits réservés.</p>
				</div>
			</footer>
		</div>
	);
}
