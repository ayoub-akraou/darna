import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	LockClosedIcon,
	EnvelopeIcon,
	EyeIcon,
	EyeSlashIcon,
	ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
        try {
            const res  = await login(data)
            const {token, user} = res.data.data;
            localStorage.setItem("token", token);
			navigate("/")
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
				<div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
					<div className="text-center mb-8">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
							<LockClosedIcon className="w-8 h-8 text-white" />
						</div>
						<h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
							Connexion
						</h2>
						<p className="text-gray-600 mt-2">Ravis de vous revoir !</p>
					</div>

					<div onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
									{...register("email", {
										required: "L'email est obligatoire",
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: "Email invalide",
										},
									})}
								/>
							</div>
							{errors.email && (
								<p className="text-sm text-red-500 mt-1.5 ml-1 flex items-center gap-1">
									<span>⚠</span> {errors.email.message}
								</p>
							)}
						</div>

						{/* PASSWORD */}
						<div className="group">
							<div className="flex items-center justify-between mb-2">
								<label className="font-semibold text-gray-700 text-sm">
									Mot de passe
								</label>
								<a
									href="#"
									className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
								>
									Mot de passe oublié ?
								</a>
							</div>
							<div className="relative">
								<LockClosedIcon className="w-5 h-5 absolute top-3.5 left-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
								<input
									type={showPassword ? "text" : "password"}
									className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all bg-gray-50 focus:bg-white"
									placeholder="••••••••"
									{...register("password", {
										required: "Le mot de passe est obligatoire",
										minLength: {
											value: 6,
											message: "Minimum 6 caractères",
										},
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

						{/* Remember me */}
						<div className="flex items-center">
							<input
								type="checkbox"
								id="remember"
								className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
								{...register("remember")}
							/>
							<label htmlFor="remember" className="ml-2 text-sm text-gray-700">
								Se souvenir de moi
							</label>
						</div>

						<button
							type="button"
							onClick={handleSubmit(onSubmit)}
							disabled={isLoading}
							className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-xl mt-6 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? (
								<>
									<svg
										className="animate-spin h-5 w-5"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									<span>Connexion...</span>
								</>
							) : (
								<>
									<span>Se connecter</span>
									<ArrowRightIcon className="w-5 h-5" />
								</>
							)}
						</button>

						<p className="text-center text-sm text-gray-600 mt-6">
							Vous n'avez pas de compte ?
							<Link to="/register" className="text-indigo-600 font-semibold hover:underline">
								S'inscrire
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
