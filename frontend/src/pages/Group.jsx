import { useEffect, useState } from "react";
import {
	PlusIcon,
	UserGroupIcon,
	UsersIcon,
	BanknotesIcon,
	XCircleIcon,
} from "@heroicons/react/24/outline";

import CreateGroupForm from "../components/Form/CreateGroupForm.jsx";
import GroupCard from "../components/Card/GroupCard.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import {
	getCreatedGroups,
	getMemberedGroups,
	deleteGroup,
	getAllGroups,
	joinGroup,
} from "../api/groupApi";

export default function GroupsDashboard() {
	const [activeTab, setActiveTab] = useState("created");
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showDetailsModal, setShowDetailsModal] = useState(false);
	const [selectedGroup, setSelectedGroup] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [allGroups, setAllGroups] = useState([]);
	const [createdGroups, setCreatedGroups] = useState([]);
	const [memberedGroups, setMemberedGroups] = useState([]);

	useEffect(() => {
		async function fetchGroups() {
			try {
				const allGroups = await getAllGroups();
				const createdGroups = await getCreatedGroups();
				const memberedGroups = await getMemberedGroups();

				setAllGroups(allGroups.data.data);
				setCreatedGroups(createdGroups.data.data);
				setMemberedGroups(memberedGroups.data.data);
			} catch (error) {
				console.error("Error fetching groups:", error);
			}
		}
		fetchGroups();
	}, []);

	const frequencyLabels = {
		1: "Mensuel",
		2: "Bimensuel",
		3: "Trimestriel",
		4: "Annuel",
	};

	async function handleDeleteGroup(groupId) {
		try {
			const response = await deleteGroup(groupId);
			const updatedAllGroups = allGroups.filter((group) => group.id !== groupId);
			const updatedCreatedGroups = createdGroups.filter((group) => group.id !== groupId);
			const updatedMemberedGroups = memberedGroups.filter((group) => group.id !== groupId);

			setAllGroups(updatedAllGroups);
			setCreatedGroups(updatedCreatedGroups);
			setMemberedGroups(updatedMemberedGroups);
		} catch (error) {
			console.error("Error deleting group:", error);
		}
	}

	async function handleViewDetails(group) {
		setSelectedGroup(group);
		setShowDetailsModal(true);
	}

	async function handleJoinGroup(groupId) {
		try {
			await joinGroup(groupId);
			// Refresh groups after joining
			const allGroups = await getAllGroups();
			const memberedGroups = await getMemberedGroups();
			setAllGroups(allGroups.data.data);
			setMemberedGroups(memberedGroups.data.data);
		} catch (error) {
			console.error("Error joining group:", error);
		}
	}

	const filteredCreatedGroups = createdGroups.filter((g) =>
		g.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const filteredMemberedGroups = memberedGroups.filter((g) =>
		g.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
			{/* Header */}
			<Header setShowCreateModal={setShowCreateModal} />

			<div className="max-w-7xl mx-auto">
				{/* Tabs */}
				<Tabs
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					createdGroups={createdGroups}
					memberedGroups={memberedGroups}
					allGroups={allGroups}
				/>

				{/* Search */}
				<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

				{/* Groups Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{activeTab === "created" &&
						filteredCreatedGroups.map((group) => (
							<GroupCard
								key={group.id}
								group={group}
								frequencyLabels={frequencyLabels}
								handleViewDetails={handleViewDetails}
								handleDeleteGroup={handleDeleteGroup}
								isMine
							/>
						))}

					{activeTab === "membered" &&
						filteredMemberedGroups.map((group) => {
							return (
								<GroupCard
									key={group.id}
									group={group}
									frequencyLabels={frequencyLabels}
									handleViewDetails={handleViewDetails}
									withJoinButton={false}
								/>
							);
						})}

					{activeTab === "all" &&
						allGroups.map((group) => (
							<GroupCard
								key={group.id}
								group={group}
								frequencyLabels={frequencyLabels}
								handleViewDetails={handleViewDetails}
								handleJoinGroup={handleJoinGroup}
								isJoined={memberedGroups.some((g) => g.id == group.id)}
							/>
						))}
				</div>

				{/* Empty state */}
				{activeTab === "created" && filteredCreatedGroups.length === 0 && (
					<NoGroupsFound
						activeTab={activeTab}
						searchTerm={searchTerm}
						message={"Créez votre premier groupe pour commencer"}
					>
						<CreateGroupButton setShowCreateModal={setShowCreateModal} />
					</NoGroupsFound>
				)}
				{activeTab === "membered" && filteredMemberedGroups.length === 0 && (
					<NoGroupsFound
						activeTab={activeTab}
						searchTerm={searchTerm}
						message={"Rejoignez un groupe pour participer"}
					/>
				)}
				{activeTab === "all" && allGroups.length === 0 && (
					<NoGroupsFound
						activeTab={activeTab}
						searchTerm={searchTerm}
						// message={"Rejoignez un groupe pour participer"}
					/>
				)}
			</div>

			{/* Create Group Modal */}
			{showCreateModal && (
				<CreateGroupForm
					setAllGroups={setAllGroups}
					setCreatedGroups={setCreatedGroups}
					setShowCreateModal={setShowCreateModal}
					setMemberedGroups={setMemberedGroups}
				/>
			)}

			{/* Details Modal */}
			{showDetailsModal && selectedGroup && (
				<ShowGroupDetailsModal
					selectedGroup={selectedGroup}
					setShowDetailsModal={setShowDetailsModal}
					frequencyLabels={frequencyLabels}
				/>
			)}
		</div>
	);
}

function Header({ setShowCreateModal }) {
	return (
		<div className="max-w-7xl mx-auto mb-8">
			<div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					<div>
						<h1 className="text-4xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
							Mes Groupes
						</h1>
						<p className="text-gray-600">Gérez vos tontines et participations</p>
					</div>
					<CreateGroupButton setShowCreateModal={setShowCreateModal} />
				</div>
			</div>
		</div>
	);
}

function Tabs({ activeTab, setActiveTab, createdGroups, memberedGroups, allGroups }) {
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

function NoGroupsFound({ searchTerm, message, children }) {
	return (
		<div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-12 text-center">
			<UserGroupIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
			<h3 className="text-xl font-bold text-gray-800 mb-2">Aucun groupe trouvé</h3>
			<p className="text-gray-600 mb-6">
				{searchTerm ? "Aucun résultat pour votre recherche" : message}
			</p>
			{children}
		</div>
	);
}

function CreateGroupButton({ setShowCreateModal }) {
	return (
		<button
			onClick={() => setShowCreateModal(true)}
			className="inline-flex items-center gap-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg"
		>
			<PlusIcon className="w-5 h-5" />
			Créer un groupe
		</button>
	);
}

function ShowGroupDetailsModal({ selectedGroup, setShowDetailsModal, frequencyLabels }) {
	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
				<div className="flex items-start justify-between mb-6">
					<div>
						<h2 className="text-2xl font-bold text-gray-800">{selectedGroup.name}</h2>
						<p className="text-gray-600">Détails du groupe</p>
					</div>
					<button
						onClick={() => setShowDetailsModal(false)}
						className="text-gray-400 hover:text-gray-600 transition-colors"
					>
						<XCircleIcon className="w-8 h-8" />
					</button>
				</div>

				<div className="grid grid-cols-2 gap-4 mb-6">
					<div className="bg-indigo-50 p-4 rounded-xl">
						<div className="flex items-center gap-2 text-indigo-600 mb-1">
							<BanknotesIcon className="w-5 h-5" />
							<span className="text-sm font-semibold">Montant</span>
						</div>
						<p className="text-2xl font-bold text-gray-800">
							{selectedGroup.amount} MAD
						</p>
					</div>
					<div className="bg-purple-50 p-4 rounded-xl">
						<div className="flex items-center gap-2 text-purple-600 mb-1">
							<UsersIcon className="w-5 h-5" />
							<span className="text-sm font-semibold">Membres</span>
						</div>
						<ul className="font-bold text-gray-800 font-medium">
							{selectedGroup.members.map((member) => {
								return <li key={member.id}>{member.name}</li>;
							})}
						</ul>
					</div>
				</div>

				<div className="space-y-4">
					<div className="bg-gray-50 p-4 rounded-xl">
						<p className="text-sm text-gray-600">Fréquence</p>
						<p className="font-semibold text-gray-800">
							{frequencyLabels[selectedGroup.frequency]}
						</p>
					</div>
					<div className="bg-gray-50 p-4 rounded-xl">
						<p className="text-sm text-gray-600">Statut</p>
						<p className="font-semibold text-gray-800">
							{selectedGroup.acceptMembers ? "Ouvert aux nouveaux membres" : "Fermé"}
						</p>
					</div>
				</div>

				<button
					onClick={() => setShowDetailsModal(false)}
					className="w-full mt-6 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
				>
					Fermer
				</button>
			</div>
		</div>
	);
}
