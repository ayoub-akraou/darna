import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import BanknotesIcon from "@heroicons/react/24/outline/BanknotesIcon";
import ClockIcon from "@heroicons/react/24/outline/ClockIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import CheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

export default function GroupCard({
	group,
	frequencyLabels,
	handleViewDetails,
	handleDeleteGroup,
	isMine,
}) {
	return (
		<div
			key={group._id}
			className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all"
		>
			<div className="flex items-start justify-between mb-4">
				<div className="flex-1">
					<h3 className="text-xl font-bold text-gray-800 mb-1">{group.name}</h3>
					{isMine && (
						<span className="inline-flex items-center gap-1 text-sm text-indigo-600 font-semibold bg-indigo-50 px-3 py-1 rounded-full">
							<UserGroupIcon className="w-4 h-4" />
							Administrateur
						</span>
					)}
				</div>
			</div>

			<div className="space-y-3 mb-4">
				<div className="flex items-center gap-2 text-gray-700">
					<BanknotesIcon className="w-5 h-5 text-indigo-600" />
					<span className="font-semibold">{group.amount} MAD</span>
				</div>
				<div className="flex items-center gap-2 text-gray-700">
					<ClockIcon className="w-5 h-5 text-purple-600" />
					<span>{frequencyLabels[group.frequency]}</span>
				</div>
				<div className="flex items-center gap-2 text-gray-700">
					<UsersIcon className="w-5 h-5 text-pink-600" />
					<span>{group.members} membres</span>
				</div>
			</div>

			<div className="flex items-center gap-2 mb-4">
				{group.acceptMembers ? (
					<span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
						<CheckCircleIcon className="w-4 h-4" />
						Ouvert
					</span>
				) : (
					<span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
						<XCircleIcon className="w-4 h-4" />
						Fermé
					</span>
				)}
				<span className="text-xs text-gray-500">Cycle {group.cycles.length + 1}</span>
			</div>

			<div className="flex gap-2">
				<button
					onClick={() => handleViewDetails(group)}
					className="flex-1 flex items-center justify-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-xl font-semibold hover:bg-indigo-200 transition-all"
				>
					<EyeIcon className="w-4 h-4" />
					Voir
				</button>
				{isMine && (
					<button
						onClick={() => handleDeleteGroup(group.id)}
						className="flex items-center justify-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-xl font-semibold hover:bg-red-200 transition-all"
					>
						<TrashIcon className="w-4 h-4" />
					</button>
				)}
			</div>
		</div>
	);
}
