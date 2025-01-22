import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { checkPasswordWithUser, getUserByEmail } from "@/services/userService";

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60,
	},
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "email@example.com",
				},
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				if (!credentials?.email) {
					throw new Error("Email is required.");
				}

				const user = await getUserByEmail(credentials.email);

				if (!user) {
					throw new Error("User not found.");
				}

				const isValidPassword = await checkPasswordWithUser(
					user,
					credentials.password
				);
				if (!isValidPassword) {
					throw new Error("Invalid password.");
				}

				return user;
			},
		}),
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		GitHub({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.image = user.image;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id;
				session.user.email = token.email;
				session.user.image = token.image;
			}
			return session;
		},
	},
	pages: {
		signIn: "/login",
		signOut: "/signout",
	},
};
