"use client";

import React, { useState, useEffect } from "react"; // Import useState for managing state
import { useSession } from "next-auth/react"; // Import useSession hook from next-auth

import { Textarea } from "@/components/ui/textarea"; // Import the Textarea component
import { Input } from "@/components/ui/input"; // Import the Input component from ShadCN or another library
import ItemList from "./components/QuestionList";
import Footer from "@/components/Footer";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import OutputCarousel from "./components/OutputCarousel";
import { set, useForm } from "react-hook-form"; // Import useForm from react-hook-form
import { useToast } from "@/hooks/use-toast";
import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Import Tabs components
import QuestionForm from "./components/QuestionForm"; // Import the updated QuestionForm
import ToggleMenu from "@/components/ToggleMenu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Question } from "@/types/Question"; // Import the Question type
import { Tab } from "@/types/Tab";
import { saveTab, getTabById } from "@/lib/api/tabService";

const ProductPage: React.FC = () => {
	const [inputType, setInputType] = useState("text"); // State to manage the selected input type
	const [pdfFile, setPdfFile] = useState<File | null>(null); // State to manage the uploaded PDF file
	const [isQuestionFormOpen, setIsQuestionFormOpen] = useState(false); // State to manage the dialog
	const [tab, setTab] = useState<Tab | null>(null); // State to manage the tab data
	const [loading, setLoading] = useState(true); // State to manage the loading state

	const { data: session, status } = useSession();
	const user = session?.user;
	const isAuthorized = status === "authenticated" && user;

	const { toast } = useToast();

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
		form.setValue("questions", updated);
	};

	const fetchTab = async () => {
		if (!loading) {
			return;
		}
		try {
			const tabId = "a";
			const serverTab = await getTabById(tabId);

			form.reset({
				title: serverTab.title,
				textInput: serverTab.textInput,
				linkInput: serverTab.urlInput,
				pdfInput: serverTab.fileInput,
				questions: serverTab.questions,
			});

			setTab(serverTab);
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to fetch tab.",
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTab();

		addSafeListeners();
	}, [tab, form.reset]);

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

	const handleSave = async () => {
		console.log(unsavedChanges());
		if (loading) {
			return;
		}

		if (!isAuthorized) {
			toast({
				variant: "destructive",
				title: "Not authorized",
				description: "Please login to save.",
			});
			return;
		}

		if (!unsavedChanges()) {
			toast({
				title: "No changes",
				description: "There are no changes to save.",
			});
			return;
		}

		try {
			const data = form.getValues();

			const tabBody: Tab = {
				id: tab?.id || "",
				title: data.title,
				description: "Description",
				userId: session?.user?.id,
				questions: data.questions,
				textInput: data.textInput,
				urlInput: data.linkInput,
				fileInput: data.pdfInput,
			};

			saveTab(tabBody).then((res) => setTab(res));

			form.reset(data);

			toast({
				title: "Success",
				description: "Your changes have been saved.",
			});
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error",
				description: error.message,
			});
		}
	};

	const handleSubmit = async (data) => {
		// Handle form submission based on the active tab

		// Add your submission logic here
		handleSave();
	};

	const handleQuestionSubmit = (newQuestion: Question) => {
		// Handle the submission of a new or updated question
		// This should be a separate process from the parent form submission
		if (newQuestion.id) {
			// Update existing question logic
			console.log("Update question:", newQuestion);
		} else {
			// Create new question logic
			console.log("Add new question:", newQuestion);
		}
		setIsQuestionFormOpen(false); // Close the dialog after submission
	};

	return (
		<>
			<SidebarProvider>
				<AppSidebar />
				<ToggleMenu />
				<div className="flex flex-col w-full bg-gradient-to-b bg-zinc-300">
					<div className="fixed top-2 left-2 flex items-center justify-center w-10 h-10 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300">
						<SidebarTrigger />
					</div>

					{loading && (
						<div className="flex items-center justify-center min-h-screen">
							<div className="text-center">
								<div className="loader"></div>
								<p>Loading...</p>
							</div>
						</div>
					)}

					<div className="min-h-screen px-28 py-8 pt-16 text-black">
						{!loading && (
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
																							Drag and drop your PDF here, or
																							click to upload.
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
																							href={URL.createObjectURL(
																								pdfFile
																							)}
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
						)}
						<OutputCarousel />
					</div>

					<Footer />

					{/* Render QuestionForm as a modal/dialog outside the parent form */}
					{isQuestionFormOpen && (
						<QuestionForm
							onSubmit={handleQuestionSubmit}
							onClose={() => setIsQuestionFormOpen(false)}
							// Pass additional props as needed
						/>
					)}
				</div>
			</SidebarProvider>
		</>
	);
};

export default ProductPage;
