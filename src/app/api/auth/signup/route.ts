import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/services/userService";

export async function POST(req: NextRequest) {
	try {
		const { name, email, password } = await req.json();

		if (!email || !password) {
			console.error("Missing fields:", { name, email, password });
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		const user = await createUser({
			name: name,
			email: email,
			password: password,
		});

		return NextResponse.json(
			{ message: "User created successfully", user },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Signup error:", error);
		return NextResponse.json(
			{ error: "An error occurred during signup" },
			{ status: 500 }
		);
	}
}
