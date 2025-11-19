import { useNavigate } from "react-router-dom";
import { logout } from "../../api/authApi";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

export default function LogoutBtn() {
	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			const response = await logout();
			localStorage.removeItem("token");
			navigate("/login");
			toast.success("Logout successful");
		} catch (error) {
			console.log(error);
			toast.error("Logout failed");
		}
	};
	return (
		<button
			onClick={handleLogout}
			className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
		>
			<ArrowRightOnRectangleIcon className="w-5 h-5" />
			<span className="hidden sm:inline">Logout</span>
		</button>
	);
}
