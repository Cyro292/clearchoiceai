import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface CreateCredentialsAccountInput {
	name: string;
	email: string;
	password: string;
	image?: string;
}

interface CreateUserInput {
	name?: string;
	email: string;
	password: string | null;
	image?: string; // Optional
	account: AccountType; // Make 'account' required
}

interface AccountType {
	provider: string;
	providerAccountId: string;
	type: string;
	providerType: string;
	refresh_token: string;
	access_token: string;
	expires_at: number;
	scope: string;
	id_token: string;
	session_state: string;
}

/**
 * Creates a new user with a hashed password.
 *
 * @param input - The user input containing name, email, and password.
 * @returns The created user object.
 */
export async function createUser(input: CreateCredentialsAccountInput) {
	const { name, email, password } = input;

	if (!prisma) {
		throw new Error("Failed to connect to database");
	}

	// Hash the password before storing it
	if (!password) {
		throw new Error("Password is required");
	}

	const hashedPassword = await hashPassword(password);

	// Create the user in the database
	const user = await prisma.user.create({
		data: {
			name: name,
			email: email,
			password: hashedPassword, // Store the hashed password
		},
	});

	return user;
}

export async function createUserWithProvider(input: CreateUserInput) {
	const { name, email, image, password, account } = input;
	const {
		provider,
		providerAccountId,
		type,
		providerType,
		refresh_token,
		access_token,
		expires_at,
		scope,
		id_token,
		session_state,
	} = account || {};

	if (!prisma) {
		throw new Error("Failed to connect to database");
	}

	let hashedPassword;
	if (password) {
		hashedPassword = hashPasswordSync(password);
	}

	const user = await prisma.user.create({
		data: {
			name: name,
			email: email,
			image: image,
			password: hashedPassword,
			accounts: {
				create: {
					provider: provider,
					type: type,
					providerAccountId: providerAccountId,
					providerType: providerType,
					refresh_token: refresh_token,
					access_token: access_token,
					expires_at: expires_at,
					scope: scope,
					id_token: id_token,
					session_state: session_state,
				},
			},
		},
	});

	return user;
}

export async function getUserByEmail(email: string) {
	const user = await prisma.user.findUnique({
		where: { email },
	});

	return user;
}

export async function checkPasswordWithUser(
	user: User | null,
	password: string
) {
	if (!user) {
		return false;
	}

	const isMatch = await bcrypt.compare(password, user.password || "");

	return isMatch;
}

export async function checkPassword(email: string, password: string) {
	const user = await getUserByEmail(email);
	if (!user) {
		return false;
	}

	const isMatch = await bcrypt.compare(password, user.password || "");

	return isMatch;
}

export async function hashPassword(password: string): Promise<string> {
	const saltRounds = 10; // You can adjust the number of salt rounds as needed
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	return hashedPassword;
}

export function hashPasswordSync(password: string): string {
	const saltRounds = 10;
	const hashedPassword = bcrypt.hashSync(password, saltRounds);
	return hashedPassword;
}
