import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	LockClosedIcon,
	UserIcon,
	EnvelopeIcon,
	PhoneIcon,
	BanknotesIcon,
	EyeIcon,
	EyeSlashIcon,
} from "@heroicons/react/24/outline";

import {register as registerApi} from "../../api/authApi";
import { Link } from "react-router-dom";

export default function Register() {
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const response = await registerApi(data)
		} catch (error) {
			console.error(error)
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
			{/* Decorative elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
			</div>

			<div className="w-full max-w-md relative">
				<div className="bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-white/20">
					<div className="text-center mb-4">
						<div className="flex justify-center items-center gap-2">
							<div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg">
								<UserIcon className="w-6 h-6 text-white" />
							</div>
							<h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
								Créer un compte
							</h2>
						</div>
						<p className="text-gray-600 mt-2">Rejoignez-nous en quelques instants</p>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						{/* NAME */}
						<div className="group">
							<label className="block mb-2 font-semibold text-gray-700 text-sm">
								Nom complet
							</label>
							<div className="relative">
								<UserIcon className="w-5 h-5 absolute top-3.5 left-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
								<input
									type="text"
									className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all bg-gray-50 focus:bg-white"
									placeholder="Jean Dupont"
									{...register("name", { required: "Le nom est obligatoire" })}
								/>
							</div>
							{errors.name && (
								<p className="text-sm text-red-500 mt-1.5 ml-1 flex items-center gap-1">
									<span>⚠</span> {errors.name.message}
								</p>
							)}
						</div>

						{/* EMAIL */}
						<div className="group">
							<label className="block mb-2 font-semibold text-gray-700 text-sm">
								Email
							</label>
							<div className="relative">
								<EnvelopeIcon className="w-5 h-5 absolute top-3.5 left-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
								<input
									type="email"
									className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all bg-gray-50 focus:bg-white"
									placeholder="jean@exemple.com"
									{...register("email", { required: "L'email est obligatoire" })}
								/>
							</div>
							{errors.email && (
								<p className="text-sm text-red-500 mt-1.5 ml-1 flex items-center gap-1">
									<span>⚠</span> {errors.email.message}
								</p>
							)}
						</div>

						{/* PHONE */}
						<div className="group">
							<label className="block mb-2 font-semibold text-gray-700 text-sm">
								Téléphone
							</label>
							<div className="relative">
								<PhoneIcon className="w-5 h-5 absolute top-3.5 left-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
								<input
									type="tel"
									className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all bg-gray-50 focus:bg-white"
									placeholder="0612345678"
									{...register("phone", {
										required: "Le numéro est obligatoire",
										pattern: { value: /^[0-9]+$/, message: "Numéro invalide" },
									})}
								/>
							</div>
							{errors.phone && (
								<p className="text-sm text-red-500 mt-1.5 ml-1 flex items-center gap-1">
									<span>⚠</span> {errors.phone.message}
								</p>
							)}
						</div>

						{/* RIB */}
						<div className="group">
							<label className="block mb-2 font-semibold text-gray-700 text-sm">
								RIB
							</label>
							<div className="relative">
								<BanknotesIcon className="w-5 h-5 absolute top-3.5 left-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
								<input
									type="number"
									className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all bg-gray-50 focus:bg-white font-mono text-sm"
									placeholder="24 chiffres"
									maxLength="24"
									{...register("rib", {
										required: "Le RIB est obligatoire",
										pattern: {
											value: /^[0-9]{24}$/,
											message: "Le RIB doit contenir exactement 24 chiffres",
										},
									})}
								/>
							</div>
							{errors.rib && (
								<p className="text-sm text-red-500 mt-1.5 ml-1 flex items-center gap-1">
									<span>⚠</span> {errors.rib.message}
								</p>
							)}
						</div>

						{/* PASSWORD */}
						<div className="group">
							<label className="block mb-2 font-semibold text-gray-700 text-sm">
								Mot de passe
							</label>
							<div className="relative">
								<LockClosedIcon className="w-5 h-5 absolute top-3.5 left-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
								<input
									type={showPassword ? "text" : "password"}
									className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all bg-gray-50 focus:bg-white"
									placeholder="••••••••"
									{...register("password", {
										required: "Le mot de passe est obligatoire",
									})}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-4 top-3.5 text-gray-400 hover:text-indigo-600 transition-colors"
								>
									{showPassword ? (
										<EyeSlashIcon className="w-5 h-5" />
									) : (
										<EyeIcon className="w-5 h-5" />
									)}
								</button>
							</div>
							{errors.password && (
								<p className="text-sm text-red-500 mt-1.5 ml-1 flex items-center gap-1">
									<span>⚠</span> {errors.password.message}
								</p>
							)}
						</div>

						<button
							type="submit"
							className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-xl mt-6"
						>
							S'inscrire
						</button>

						<p className="text-center text-sm text-gray-600 mt-4">
							Vous avez déjà un compte ?{" "}
							<Link to="/login" className="text-indigo-600 font-semibold hover:underline">
								Se connecter
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}
