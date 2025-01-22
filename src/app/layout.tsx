import "@/styles/globals.css";
import SessionWrapper from "@/components/sessionWrapper";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
	title: "ClearChoice AI",
	description: "ClearChoice AI",
	icons: {
		icon: "./IconClearChoicesAI.ico",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = getServerSession({ authOptions });

	return (
		<html lang="en">
			<body>
				<SessionWrapper session={session}>{children}</SessionWrapper>
				<Toaster />
			</body>
		</html>
	);
}
