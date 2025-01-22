"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ToggleMenu from "@/components/ToggleMenu";

const SignupPage = () => {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password }),
			});

			const data = await res.json();

			if (!res.ok) {
				setError(data.message || "Something went wrong.");
			} else {
				setSuccess("Signup successful! Redirecting to login...");
				setTimeout(() => {
					router.push("/login");
				}, 2000);
			}
		} catch (err) {
			console.error("Signup error:", err);
			setError("An unexpected error occurred.");
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
			<ToggleMenu />
			<div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
				<h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
				<form onSubmit={handleSignup} className="flex flex-col">
					<div className="flex flex-col space-y-4">
						<input
							type="text"
							placeholder="Name (optional)"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="border p-2 rounded"
						/>
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="border p-2 rounded"
						/>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="border p-2 rounded"
						/>
						<input
							type="password"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							className="border p-2 rounded"
						/>
					</div>
					{error && <p className="text-red-500 mt-2">{error}</p>}
					{success && <p className="text-green-500 mt-2">{success}</p>}
					<button
						type="submit"
						className="w-full bg-green-600 text-white font-bold py-2 rounded-md hover:bg-green-700 transition duration-200 mt-6"
					>
						Sign Up
					</button>
				</form>
				<div className="my-4 flex items-center justify-center">
					<div className="border-t border-gray-300 flex-grow"></div>
					<span className="px-3 text-gray-500 bg-white">or</span>
					<div className="border-t border-gray-300 flex-grow"></div>
				</div>
				<div className="mt-4 flex flex-col space-y-2">
					{/* You can add social signup buttons here if needed */}
				</div>
				<div className="text-center mt-4">
					<span className="text-sm">
						Already have an account?{" "}
						<button
							className="text-blue-600 hover:text-blue-800"
							onClick={() => router.push("/login")}
						>
							Login
						</button>
					</span>
				</div>
			</div>
		</div>
	);
};

export default SignupPage;
