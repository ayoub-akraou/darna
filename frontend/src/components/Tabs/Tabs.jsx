import { UserGroupIcon, UsersIcon } from "@heroicons/react/24/outline";

export default function Tabs({
	activeTab,
	setActiveTab,
	createdGroups,
	memberedGroups,
	allGroups,
}) {
	return (
		<div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-2 mb-6 flex gap-2">
			<button
				onClick={() => setActiveTab("all")}
				className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
					activeTab === "all"
						? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-md"
						: "text-gray-600 hover:bg-gray-100"
				}`}
			>
				<UsersIcon className="w-5 h-5" />
				Toutes ({allGroups.length})
			</button>
			<button
				onClick={() => setActiveTab("created")}
				className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
					activeTab === "created"
						? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-md"
						: "text-gray-600 hover:bg-gray-100"
				}`}
			>
				<UserGroupIcon className="w-5 h-5" />
				Mes créations ({createdGroups.length})
			</button>
			<button
				onClick={() => setActiveTab("membered")}
				className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
					activeTab === "membered"
						? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-md"
						: "text-gray-600 hover:bg-gray-100"
				}`}
			>
				<UsersIcon className="w-5 h-5" />
				Mes participations ({memberedGroups.length})
			</button>
		</div>
	);
}