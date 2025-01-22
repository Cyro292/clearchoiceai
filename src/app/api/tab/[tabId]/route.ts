import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: { tabId: string } }
) {
	const tab = await prisma.tab.findUnique({
		where: { id: params.tabId },
	});
	return NextResponse.json(tab);
}
