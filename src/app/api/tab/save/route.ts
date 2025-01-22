import {
	createTab,
	updateTab,
	tabExistsWithTitle,
	getTabById,
} from "@/services/tabService";
import { Tab } from "@/types/Tab";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const tab: Partial<Tab> = await req.json();

	if (!tab || !tab.title || !tab.userId) {
		throw new Error("Invalid tab data");
	}

	if (!tab.id || tab.id === "") {
		const exists = await tabExistsWithTitle(tab.title, tab.userId);

		if (exists) {
			throw new Error("Tab with title already exists");
		}

		const new_tab = await createTab(tab as Tab);
		return NextResponse.json(new_tab);
	}
	const new_tab = await updateTab(tab as Partial<Tab> & { id: string });
	return NextResponse.json(new_tab);
}

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const tab = await getTabById(params.id);
	return NextResponse.json(tab);
}
