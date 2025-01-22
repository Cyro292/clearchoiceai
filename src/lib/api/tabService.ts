import { Tab } from "@/types/Tab";

export async function saveTab(tabBody: Partial<Tab>): Promise<Tab> {
	const body = JSON.stringify(tabBody);

	const response = await fetch("/api/tab/save", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: body,
	});

	if (!response.ok) throw new Error("Save failed");

	return response.json();
}

export async function getTabById(id: string): Promise<Tab> {
	const response = await fetch(`/api/tab/${id}`);

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
