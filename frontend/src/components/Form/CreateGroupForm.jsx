import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createGroup } from "../../api/groupApi";
import { toast } from "sonner";
export default function CreateGroupForm({ setShowCreateModal }) {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const handleCreateGroup = async (data) => {
		try {
			const res = await createGroup(data);
			console.log(res);
			toast.success("Groupe créé avec succès");
			setShowCreateModal(false);
		} catch (error) {
			console.log(error)
			toast.error("Une erreur est survenue");
		}
	};

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
				<h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
					Créer un nouveau groupe
				</h2>
				<form onSubmit={handleSubmit(handleCreateGroup)}>
					<div className="space-y-4">
						<div>
							<div>
								<label
									htmlFor="name"
									className="block mb-2 font-semibold text-gray-700 text-sm"
								>
									Nom du groupe
								</label>
								<input
									{...register("name", { required: "Nom du groupe est requis" })}
									type="text"
									name="name"
									id="name"
									// required
									minLength={5}
									maxLength={20}
									placeholder="Ex: Famille Alami"
									className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
								/>
							</div>
							{errors.name && (
								<p className="text-sm font-medium mt-0.5 text-red-500">
									{errors.name.message}
								</p>
							)}
						</div>

						<div>
							<div>
								<label
									htmlFor="amount"
									className="block mb-2 font-semibold text-gray-700 text-sm"
								>
									Montant (MAD)
								</label>
								<input
									{...register("amount", { required: "Montant est requis" })}
									type="number"
									name="amount"
									required
									min={100}
									max={10000}
									defaultValue={1000}
									className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
								/>
							</div>
							{errors.amount && (
								<p className="text-sm font-medium mt-0.5 text-red-500">
									{errors.amount.message}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="frequency"
								className="block mb-2 font-semibold text-gray-700 text-sm"
							>
								Fréquence
							</label>
							<select
								defaultValue={1}
								{...register("frequency", { required: "Fréquence est requise" })}
								name="frequency"
								id="frequency"
								className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
							>
								<option selected value="1">
									Mensuel
								</option>
								<option value="2">bimestriel</option>
								<option value="3">Trimestriel</option>
							</select>
						</div>
						{errors.frequency && (
							<p className="text-sm font-medium mt-0.5 text-red-500">
								{errors.frequency.message}
							</p>
						)}
					</div>

					<div className="flex gap-3 mt-6">
						<button
							type="button"
							onClick={() => setShowCreateModal(false)}
							className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
						>
							Annuler
						</button>
						<button
							type="submit"
							className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
						>
							Créer
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
