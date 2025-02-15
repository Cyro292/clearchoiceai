"use client";

import React, { useState, useEffect } from "react"; // Import useState for managing state
import { useSession } from "next-auth/react"; // Import useSession hook from next-auth
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form

import ItemList from "./QuestionList";
import QuestionForm from "./QuestionList";
import OutputCarousel from "./OutputCarousel";

import { Textarea } from "@/components/ui/textarea"; // Import the Textarea component
import { Input } from "@/components/ui/input"; // Import the Input component from ShadCN or another library
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Import Tabs components
import { Question } from "@/types/Question"; // Import the Question type
import { Tab } from "@/types/Tab";

interface TabFormProps {
	tab: Tab | null;
	onSubmit?: (data: any) => void;
	onSave?: (data: any) => void;
	onChange?: (data: any) => void;
}

const TabForm: React.FC<TabFormProps> = ({
	tab,
	onSubmit = () => {},
	onSave = () => {},
}: TabFormProps) => {
	const [inputType, setInputType] = useState("text"); // State to manage the selected input type
	const [pdfFile, setPdfFile] = useState<File | null>(null); // State to manage the uploaded PDF file
	const [isQuestionFormOpen, setIsQuestionFormOpen] = useState(false); // State to manage the dialog

	const { data: session, status } = useSession();
	const user = session?.user;
	const isAuthorized = status === "authenticated" && user;

	const form = useForm<{
		title: string;
		textInput: string;
		linkInput: string;
		pdfInput: string;
		questions: Question[];
	}>({
		defaultValues: {
			title: tab?.title, // Default value for title
			textInput: tab?.textInput, // Default value for text input
			linkInput: tab?.urlInput, // Default value for link input
			pdfInput: tab?.fileInput, // Default value for PDF input
			questions: tab?.questions, // Default value for questions
		},
		mode: "onBlur", // Validate on blur
		resolver: async (data) => {
			const errors: any = {};
			if (inputType === "text") {
				if (!data.textInput) {
					errors.textInput = { message: "Text input is required." };
				}
			} else if (inputType === "link") {
				if (!data.linkInput) {
					errors.linkInput = { message: "Link input is required." };
				} else if (!/^https?:\/\/.+/.test(data.linkInput)) {
					errors.linkInput = { message: "Link must be a valid URL." };
				}
			} else if (inputType === "pdf") {
				if (!pdfFile) {
					errors.pdfInput = { message: "PDF upload is required." };
				}
			}

			if (!data.title) {
				errors.title = { message: "Title is required." };
			}

			return { values: data, errors };
		},
	});

	const questions = form.watch("questions");
	function unsavedChanges() {
		return form.formState.isDirty;
	}

	const onQuestionsChange = (updated: Question[]) => {
		form.setValue("questions", updated, { shouldDirty: true });
	};

	const setFormData = () => {
		form.reset({
			title: tab?.title ?? "",
			textInput: tab?.textInput ?? "",
			linkInput: tab?.urlInput ?? "",
			pdfInput: tab?.fileInput ?? "",
			questions: tab?.questions ?? [],
		});
	};

	useEffect(() => {
		if (unsavedChanges()) {
			addSafeListeners();
		} else {
			removeSaveListeners();
		}
	}, [form.formState.isDirty]);

	useEffect(() => {
		setFormData();
	}, [tab]);

	const addSafeListeners = () => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "s") {
				handleSave();
				e.preventDefault();
			}
		};

		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			handleSave();
			e.preventDefault();
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	};

	const removeSaveListeners = () => {
		window.removeEventListener("keydown", () => {});
		window.removeEventListener("beforeunload", () => {});
	};

	const handleSave = async () => {
		if (!unsavedChanges()) {
			return;
		}

		const data = form.getValues();

		const newTab: Tab = {
			id: tab?.id ?? "",
			title: data.title,
			description: data.textInput,
			userId: user.id,
			textInput: data.textInput,
			urlInput: data.linkInput,
			fileInput: data.pdfInput,
			questions: data.questions,
		};

		onSave(newTab);
	};

	const handleSubmit = async (data) => {
		const newTab: Tab = {
			id: tab?.id ?? "",
			title: data.title,
			description: data.textInput,
			userId: user.id,
			textInput: data.textInput,
			urlInput: data.linkInput,
			fileInput: data.pdfInput,
			questions: data.questions,
		};

		onSubmit(newTab);
		onSave(newTab);
	};

	const handleQuestionSubmit = (newQuestion: Question) => {
		if (newQuestion.id) {
			// Update existing question logic
		} else {
			// Create new question logic
		}
		setIsQuestionFormOpen(false);
	};

	return (
		<div>
			<div className="min-h-screen px-28 py-8 pt-16 text-black">
				<div className="flex flex-col gap-10 bg-white px-8 py-6 rounded-md">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className="flex flex-col gap-6"
						>
							<div className="flex flex-col gap-8">
								<div className="flex flex-col">
									<FormField
										control={form.control}
										name="title"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														type="text"
														placeholder="Enter title here..."
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<div className="w-full h-px bg-gray-500"></div>
								</div>
								<div>
									<div>
										<h2 className="text-xl font-semibold mb-2"></h2>
										<Tabs defaultValue="text" className="w-full mb-4">
											<TabsList className="max-w-[400px] flex items-center">
												<TabsTrigger
													className="w-full"
													value="text"
													onClick={() => setInputType("text")}
												>
													Text
												</TabsTrigger>
												<TabsTrigger
													className="w-full"
													value="link"
													onClick={() => setInputType("link")}
												>
													Link
												</TabsTrigger>
												<TabsTrigger
													className="w-full"
													value="pdf"
													onClick={() => setInputType("pdf")}
												>
													PDF
												</TabsTrigger>
												<TabsTrigger
													className="w-full"
													value="webhook"
													onClick={() => setInputType("webhook")}
												>
													Webhook
												</TabsTrigger>
											</TabsList>
											<TabsContent value="text">
												<FormField
													control={form.control}
													name="textInput"
													render={({ field }) => (
														<FormItem>
															<FormControl>
																<Textarea
																	className="text-black"
																	placeholder="Type your text here..."
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</TabsContent>
											<TabsContent value="link">
												<FormField
													control={form.control}
													name="linkInput"
													render={({ field }) => (
														<FormItem>
															<FormControl>
																<Input
																	type="url"
																	className="text-black"
																	placeholder="Paste your link here..."
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</TabsContent>
											<TabsContent value="pdf">
												<FormField
													control={form.control}
													name="pdfInput"
													render={() => (
														<FormItem>
															<FormControl>
																<div className="border-2 border-dashed border-blue-500 p-4 text-center rounded-md relative">
																	{!pdfFile ? (
																		<>
																			<p className="text-gray-600 mb-2">
																				Drag and drop your PDF here, or click to
																				upload.
																			</p>
																			<input
																				type="file"
																				accept="application/pdf"
																				onChange={(e) => {
																					if (
																						e.target.files &&
																						e.target.files[0]
																					) {
																						setPdfFile(e.target.files[0]);
																					}
																				}}
																				className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
																				id="pdf-upload"
																			/>
																		</>
																	) : (
																		<div className="flex flex-col items-center">
																			<p className="text-blue-700 font-medium">
																				{pdfFile.name}
																			</p>
																			<a
																				href={URL.createObjectURL(pdfFile)}
																				target="_blank"
																				rel="noopener noreferrer"
																				className="text-blue-500 underline mt-2"
																			>
																				View PDF
																			</a>
																			<Button
																				type="button"
																				variant="secondary"
																				onClick={() => setPdfFile(null)}
																				className="mt-2 flex items-center space-x-2"
																			>
																				<TrashIcon className="h-5 w-5" />
																				<span>Remove</span>
																			</Button>
																		</div>
																	)}
																</div>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</TabsContent>
											<TabsContent value="webhook">
												<FormField
													control={form.control}
													name="linkInput"
													render={({ field }) => (
														<FormItem>
															<FormControl>
																<Input
																	type="url"
																	className="text-black"
																	placeholder="Paste your link here..."
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</TabsContent>
										</Tabs>
									</div>
									<div>
										<ItemList
											className=""
											items={questions}
											onItemsChange={onQuestionsChange}
										/>
									</div>
								</div>
								<div className="flex flex-col items-center w-full">
									<Button
										type="submit"
										className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 w-full text-xl font-bold py-2 px-4 rounded-lg flex items-center justify-center"
									>
										<span className="mr-2">🔄</span>{" "}
										{/* Emoji for the button */}
										Process
									</Button>
								</div>
							</div>
						</form>
					</Form>
				</div>
				<OutputCarousel />
			</div>
			{/* Render QuestionForm as a modal/dialog outside the parent form */}
			{isQuestionFormOpen && (
				<QuestionForm
					onSubmit={handleQuestionSubmit}
					onClose={() => setIsQuestionFormOpen(false)}
					// Pass additional props as needed
				/>
			)}
		</div>
	);
};

export default TabForm;
