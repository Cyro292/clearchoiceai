import { PrismaClient } from "@prisma/client";
import { Tab } from "@/types/Tab";

const prisma = new PrismaClient();

type CreateTabInput = Omit<Tab, "id">;

export async function createTab(input_tab: CreateTabInput) {
	const { title, description, userId } = input_tab;

	const data = {
		questions: input_tab.questions,
		textInput: input_tab.textInput,
		urlInput: input_tab.urlInput,
		fileInput: input_tab.fileInput,
	};

	const jsonData = JSON.stringify(data);
	const slug = title.toLowerCase().replace(/ /g, "-");

	const tab = await prisma.tab.create({
		data: {
			id: slug,
			title: title,
			description: description,
			userId: userId,
			data: jsonData,
		},
	});

	return tab;
}

export async function getTabs(userId: string) {
	const tabs = await prisma.tab.findMany({
		where: {
			userId: userId,
		},
	});

	return tabs;
}

export async function tabExists(id: string) {
	const tab = await prisma.tab.findUnique({
		where: {
			id: id,
		},
	});

	return tab !== null;
}

export async function tabExistsWithTitle(title: string, userId: string) {
	const tab = await prisma.tab.findFirst({
		where: {
			title: title,
			userId: userId,
		},
	});

	return tab !== null;
}

export async function getTabById(id: string) {
	const tab = await prisma.tab.findUnique({
		where: {
			id: id,
		},
	});

	return tab;
}

export async function updateTab(tab: Partial<Tab> & { id: string }) {
	const { id, title, description, questions, textInput, urlInput, fileInput } =
		tab;

	const data: any = {};
	if (questions !== undefined) data.questions = questions;
	if (textInput !== undefined) data.textInput = textInput;
	if (urlInput !== undefined) data.urlInput = urlInput;
	if (fileInput !== undefined) data.fileInput = fileInput;

	const jsonData = JSON.stringify(data);

	const updatedTab = await prisma.tab.update({
		where: {
			id: id,
		},
		data: {
			...(title !== undefined && { title }),
			...(description !== undefined && { description }),
			...(Object.keys(data).length > 0 && { data: jsonData }),
		},
	});

	return updatedTab;
}
