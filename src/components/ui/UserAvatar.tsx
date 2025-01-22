"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function UserAvatar() {
	const { data: session, status } = useSession();
	const user = session?.user;

	if (status === "loading") {
		return null;
	}

	return (
		<>
			{user ? (
				<div className="flex items-center gap-2">
					<Button
						onClick={() => signOut()}
						className="ml-2 text-sm text-gray-300 hover:text-white"
					>
						Sign Out
					</Button>
					<Avatar className="text-black">
						<AvatarImage
							src={user.image || "/default-avatar.png"}
							alt={user.email || "User"}
						/>
						<AvatarFallback>
							{user.email?.charAt(0).toUpperCase() || "U"}
						</AvatarFallback>
					</Avatar>
				</div>
			) : (
				<Button
					onClick={() => signIn()}
					className="text-white bg-blue-600 rounded-md px-3 py-2 transition duration-200"
				>
					Login
				</Button>
			)}
		</>
	);
}
