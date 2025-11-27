import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar({ searchTerm, setSearchTerm }) {
	return (
		<div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-4 mb-6">
			<div className="relative">
				<MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
				<input
					type="text"
					placeholder="Rechercher un groupe..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
				/>
			</div>
		</div>
	);
}