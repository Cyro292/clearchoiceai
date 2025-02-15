import { NextResponse } from "next/server";
import { getTabs } from "@/services/tabService";

export async function GET(
	request: Request,
	{ params }: { params: { userId: string } }
) {
	const tabs = await getTabs(params.userId);

	return NextResponse.json(tabs);
}
