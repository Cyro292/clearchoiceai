import { Question } from "./Question";

export interface Tab {
	id: string;
	title: string;
	userId: string;
	description: string;
	textInput: string;
	urlInput: string;
	fileInput: string;
	questions: Question[];
	updatedAt?: string;
	createdAt?: string;
}
