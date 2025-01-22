"use client";

import React, { useState } from "react"; // Import useState for managing state
import { Textarea } from "@/components/ui/textarea"; // Import the Textarea component
import { Input } from "@/components/ui/input"; // Import the Input component from ShadCN or another library
import ItemList from "./components/QuestionList";
import Footer from "@/components/Footer";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import OutputCarousel from "./components/OutputCarousel";
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form
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

const ProductPage: React.FC = () => {
	const [inputType, setInputType] = useState("text"); // State to manage the selected input type
	const [pdfFile, setPdfFile] = useState<File | null>(null); // State to manage the uploaded PDF file
	const [isQuestionFormOpen, setIsQuestionFormOpen] = useState(false); // State to manage the dialog

	const form = useForm({
		defaultValues: {
			username: "", // Set default value for username
			textInput: "", // Default value for text input
			linkInput: "", // Default value for link input
			pdfInput: "", // Default value for PDF input
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
			return { values: data, errors };
		},
	});

	const handleSubmit = (data: any) => {
		// Handle form submission based on the active tab
		if (inputType === "text") {
			console.log("Text input submitted:", data.textInput);
		} else if (inputType === "link") {
			console.log("Link input submitted:", data.linkInput);
		} else if (inputType === "pdf") {
			console.log("PDF input submitted:", pdfFile);
		}

		console.log("Form submitted:", data);
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
				<div className="flex flex-col w-full bg-gradient-to-b bg-zinc-300">
					<div className="fixed top-2 left-2 flex items-center justify-center w-10 h-10 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300">
					<SidebarTrigger />
					</div>

					<ToggleMenu />

					<div className="min-h-screen px-28 py-8 pt-16 text-black">
						<div className="flex flex-col gap-10 bg-white px-8 py-6 rounded-md">
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(handleSubmit)}
									className="flex flex-col gap-6"
								>
									<div className="flex flex-col gap-8">
										<div className="flex flex-col">
											<h2 className="text-2xl font-bold text-purple-600">
												ClearChoice AI
											</h2>

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
												<ItemList className="" />
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
