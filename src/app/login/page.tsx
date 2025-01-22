"use client"; // This makes the component a Client Component

import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa"; // Import icons from react-icons
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ToggleMenu from "@/components/ToggleMenu";
import { useRouter } from "next/navigation";

const LoginPage = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const oldCallbackUrl = searchParams.get("callbackUrl") || "/";
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleCredentialsSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await signIn("credentials", {
			redirect: false,
			email,
			password,
			callbackUrl: oldCallbackUrl,
		});

		if (res?.error) {
			setError(res.error);
		} else {
			// Redirect or handle success
			router.push(oldCallbackUrl);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
			<ToggleMenu />
			<div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
				<h2 className="text-2xl font-bold text-center mb-6">Login</h2>
				<form onSubmit={handleCredentialsSignIn} className="flex flex-col">
					<div className="flex flex-col space-y-4">
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
					</div>
					{error && <p className="text-red-500">{error}</p>}
					<div className="flex flex-col sm:flex-row justify-center items-center space-y-1 sm:space-y-0 sm:space-x-2 mt-0 pt-0">
						<Button
							type="button" // Explicitly set type to button
							variant="link"
							className="text-xs text-blue-600 hover:text-blue-800 transition duration-200 py-1"
							onClick={() => router.push("/forgot-password")}
						>
							Forgot Password?
						</Button>
						<div className="hidden sm:block w-px h-4 bg-gray-300"></div>
						<Button
							type="button" // Explicitly set type to button
							variant="link"
							className="text-xs text-blue-600 hover:text-blue-800 transition duration-200 py-1"
							onClick={() => router.push("/signup")}
						>
							Create new account
						</Button>
					</div>
					<button
						type="submit" // Ensure this is the only submit button
						className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-200 mt-6"
						onClick={handleCredentialsSignIn}
					>
						Login with Credentials
					</button>
				</form>
				<div className="my-4 flex items-center justify-center">
					<div className="border-t border-gray-300 flex-grow"></div>
					<span className="px-3 text-gray-500 bg-white">or</span>
					<div className="border-t border-gray-300 flex-grow"></div>
				</div>
				<div className="mt-4 flex flex-col space-y-2">
					<button
						onClick={() => signIn("google", { callbackUrl: oldCallbackUrl })}
						className="w-full bg-red-600 text-white font-bold py-2 rounded-md hover:bg-red-700 transition duration-200"
						type="button" // Ensure it's not a submit button
					>
						<div className="flex items-center justify-center">
							Login with Google
							<FaGoogle className="ml-2 w-5 h-5" />
						</div>
					</button>
					<button
						onClick={() => signIn("github", { callbackUrl: oldCallbackUrl })}
						className="w-full bg-gray-800 text-white font-bold py-2 rounded-md hover:bg-gray-700 transition duration-200"
						type="button" // Ensure it's not a submit button
					>
						<div className="flex items-center justify-center">
							Login with GitHub
							<FaGithub className="ml-2 w-5 h-5" />
						</div>
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
