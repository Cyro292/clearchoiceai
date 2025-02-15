import { Tab } from "@/types/Tab";

export async function saveTab(tabBody: Partial<Tab>): Promise<Tab> {
	const body = JSON.stringify(tabBody);

	const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
	const url = `${baseUrl}/tab/save`;

	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: body,
	});

	if (!response.ok) throw new Error("Save failed");

	return response.json();
}

export async function getTabById(id: string): Promise<Tab> {
	const encodedId = encodeURIComponent(id);
	const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
	const url = `${baseUrl}/tab/${encodedId}`;

	const response = await fetch(url);

	if (!response.ok) throw new Error("Tab not found");

	const body = await response.json();

	const data = JSON.parse(body.data);

	const tab: Tab = {
		id: body.id,
		title: body.title,
		userId: body.userId,
		description: body.description,
		textInput: data.textInput,
		urlInput: data.urlInput,
		fileInput: data.fileInput,
		questions: data.questions,
	};

	return tab;
}

export async function getTabList(userId: string): Promise<Tab[]> {
	const encodedUserId = encodeURIComponent(userId);
	const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
	const url = `${baseUrl}/tab/list/${encodedUserId}`;

	const response = await fetch(url);

	const body = await response.json();
	return body.map((tab: any) => ({
		id: tab.id,
		title: tab.title,
		userId: tab.userId,
		description: tab.description,
		updatedAt: tab.updatedAt,
	}));
}
