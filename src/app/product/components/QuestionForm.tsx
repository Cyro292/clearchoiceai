"use client";

import React, { useState, useEffect } from "react";
import {
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import QuestionTypeSelector from "./QuestionTypeSelector";
import { Question } from "@/types/Question";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import { TrashIcon } from "@radix-ui/react-icons";

interface QuestionFormProps {
	question?: Question;
	onSubmit: (question: Question) => void;
	onClose: () => void;
	onDelete?: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
	question,
	onSubmit,
	onClose,
	onDelete,
}) => {
	const [name, setName] = useState<string>("");
	const [type, setType] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [choices, setChoices] = useState<string[]>([""]);
	const [isSingleChoice, setIsSingleChoice] = useState<boolean>(false);
	const [useRange, setUseRange] = useState<boolean>(false);
	const [range, setRange] = useState<{ min: number; max: number }>({
		min: 0,
		max: 100,
	});

	// State for handling validation errors
	const [errors, setErrors] = useState<{
		name?: string;
		type?: string;
		choices?: string;
		range?: string;
		description?: string;
	}>({});

	useEffect(() => {
		if (question) {
			setName(question.name);
			setType(question.type);
			setDescription(question.description || "");
			setChoices(question.choices || [""]);
			setIsSingleChoice(question.isSingleChoice || false);
			setRange(question.range || { min: 0, max: 100 });
			setUseRange(question.useRange || false);
		} else {
			// Reset all fields to default empty states
			setName("");
			setType("");
			setDescription("");
			setChoices([""]);
			setIsSingleChoice(false);
			setRange({ min: 0, max: 100 });
			setUseRange(false);
			setErrors({});
		}
	}, [question]);

	const handleChoiceChange = (index: number, value: string) => {
		const updatedChoices = [...choices];
		updatedChoices[index] = value;
		setChoices(updatedChoices);

		if (!updatedChoices.some((choice) => choice.trim() === "")) {
			setChoices([...updatedChoices, ""]);
		}
	};

	const addChoice = () => {
		setChoices((prevChoices) => [...prevChoices, ""]);
	};

	const removeChoice = (index: number) => {
		const updatedChoices = choices.filter((_, i) => i !== index);
		setChoices(updatedChoices.length > 0 ? updatedChoices : [""]);
	};

	const validateForm = (): boolean => {
		const newErrors: {
			name?: string;
			type?: string;
			choices?: string;
			range?: string;
			description?: string;
		} = {};

		// Check if name is not empty and has at least 1 distinct letter
		const distinctLetters = new Set(
			name.replace(/[^a-zA-Z]/g, "").toLowerCase()
		);
		if (!name.trim()) {
			newErrors.name = "Question name is required.";
		} else if (distinctLetters.size < 1) {
			newErrors.name = "Question name must contain at least 1 distinct letter.";
		}

		// Check if type is selected
		if (!type.trim()) {
			newErrors.type = "Question type is required.";
		}

		// If type is multichoice, validate choices
		if (type === "multichoice") {
			const nonEmptyChoices = choices.filter((choice) => choice.trim() !== "");
			if (nonEmptyChoices.length < 2) {
				newErrors.choices = "At least two choices are required.";
			} else {
				// Ensure each choice has at least 1 distinct letter
				nonEmptyChoices.forEach((choice, index) => {
					const letters = new Set(
						choice.replace(/[^a-zA-Z]/g, "").toLowerCase()
					);
					if (letters.size < 1) {
						newErrors.choices = `Choice ${
							index + 1
						} must contain at least 1 distinct letter.`;
					}
				});

				// Ensure all choices are unique
				const choiceSet = new Set(
					nonEmptyChoices.map((choice) => choice.toLowerCase())
				);
				if (choiceSet.size !== nonEmptyChoices.length) {
					newErrors.choices = "All choices must be unique.";
				}
			}
		}

		// If type is number and useRange is true, validate range
		if (type === "number" && useRange) {
			if (range.min >= range.max) {
				newErrors.range = "Minimum value must be less than maximum value.";
			}
		}

		setErrors(newErrors);

		// Return true if no errors
		return Object.keys(newErrors).length === 0;
	};

	const handleFormSubmit = () => {
		if (validateForm()) {
			const filteredChoices = choices.filter((choice) => choice.trim() !== "");
			const newQuestion: Question = {
				name,
				type,
				...(type === "multichoice" && {
					choices: filteredChoices,
					isSingleChoice,
				}),
				...(type === "number" && useRange && { range }), // Include range only if useRange is true
				description, // Include description even if it's in advanced settings
				...(type === "number" && { useRange }), // Include useRange flag
			};
			onSubmit(newQuestion);
		}
	};

	return (
		<DialogContent className="p-6 bg-white rounded-xl shadow-lg max-h-[80vh] overflow-y-auto">
			<div className="flex flex-col gap-12">
				<div className="flex flex-col gap-4">
					<DialogHeader>
						<DialogTitle className="text-2xl font-semibold text-black">
							{question ? "Edit Question" : "Add Question"}
						</DialogTitle>
						<DialogDescription className="text-black">
							Please enter the details of your question below.
						</DialogDescription>
					</DialogHeader>

					{/* Question Name */}
					<div className="flex flex-col">
						<label className="mb-1 text-black font-medium">Question Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className={`p-3 border rounded-md focus:outline-none focus:ring-2 ${
								errors.name
									? "border-red-500 focus:ring-red-400"
									: "border-blue-300 focus:ring-blue-400"
							}`}
							placeholder="Enter question name"
							required
						/>
						{errors.name && (
							<span className="text-red-500 text-sm mt-1">{errors.name}</span>
						)}
					</div>

					{/* Question Type Selector */}
					<div className="flex flex-col">
						<label className="mb-1 text-black font-medium">Question Type</label>
						<QuestionTypeSelector value={type} onChange={setType} />
						{errors.type && (
							<span className="text-red-500 text-sm mt-1">{errors.type}</span>
						)}
					</div>

					{/* Conditional Rendering Based on Question Type */}
					{type === "multichoice" && (
						<div className="flex flex-col">
							<label className="mb-2 text-black font-medium">Choices</label>
							{choices.map((choice, index) => (
								<div key={index} className="flex items-center mb-2">
									<input
										type="text"
										value={choice}
										onChange={(e) => handleChoiceChange(index, e.target.value)}
										className={`flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 ${
											errors.choices
												? "border-red-500 focus:ring-red-400"
												: "border-blue-300 focus:ring-blue-400"
										}`}
										placeholder={`Choice ${index + 1}`}
										required
									/>
									<button
										type="button"
										onClick={() => removeChoice(index)}
										className="ml-2 text-red-500 hover:text-red-700"
										aria-label="Remove choice"
										tabIndex={-1}
									>
										<TrashIcon className="h-5 w-5" />
									</button>
								</div>
							))}
							{errors.choices && (
								<span className="text-red-500 text-sm mt-1">
									{errors.choices}
								</span>
							)}
						</div>
					)}

					{/* Advanced Settings */}
					<Accordion type="single" collapsible>
						<AccordionItem value="advanced">
							<AccordionTrigger className="text-black">
								Advanced Settings
							</AccordionTrigger>
							<AccordionContent className="bg-slate-200 p-4 rounded-md">
								{/* Description */}
								<div className="flex flex-col mb-4">
									<label className="mb-1 text-black font-medium">
										Description
									</label>
									<textarea
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										className={`p-3 border rounded-md focus:outline-none focus:ring-2 ${
											errors.description
												? "border-red-500 focus:ring-red-400"
												: "border-blue-300 focus:ring-blue-400"
										}`}
										placeholder="Enter question description"
										rows={3}
									></textarea>
									{errors.description && (
										<span className="text-red-500 text-sm mt-1">
											{errors.description}
										</span>
									)}
								</div>

								{/* Conditional Fields Based on Question Type */}
								{type === "multichoice" && (
									<div className="flex flex-col mb-4">
										<label className="inline-flex items-center text-blue-700 font-medium">
											<input
												type="checkbox"
												checked={isSingleChoice}
												onChange={(e) => setIsSingleChoice(e.target.checked)}
												className="form-checkbox h-5 w-5 text-blue-600"
											/>
											<span className="ml-2">Allow only single choice</span>
										</label>
									</div>
								)}

								{type === "number" && (
									<div className="flex flex-col mb-4">
										<label className="inline-flex items-center text-black font-medium">
											<input
												type="checkbox"
												checked={useRange}
												onChange={(e) => setUseRange(e.target.checked)}
												className="form-checkbox h-5 w-5 text-blue-600"
											/>
											<span className="ml-2">Use Range</span>
										</label>
									</div>
								)}

								{/* Render Range Inputs Only if useRange is True */}
								{type === "number" && useRange && (
									<div className="flex flex-col mb-4">
										<label className="text-black font-medium mb-2">
												Number Range
										</label>
										<div className="flex space-x-4">
											<div className="flex flex-col">
												<label className="mb-1">Minimum</label>
												<input
													type="number"
													value={range.min}
													onChange={(e) =>
														setRange({ ...range, min: Number(e.target.value) })
													}
													className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${
														errors.range
															? "border-red-500 focus:ring-red-400"
															: "border-blue-300 focus:ring-blue-400"
													}`}
													placeholder="Min"
												/>
											</div>
											<div className="flex flex-col">
												<label className="mb-1">Maximum</label>
												<input
													type="number"
													value={range.max}
													onChange={(e) =>
														setRange({ ...range, max: Number(e.target.value) })
													}
													className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${
														errors.range
															? "border-red-500 focus:ring-red-400"
															: "border-blue-300 focus:ring-blue-400"
													}`}
													placeholder="Max"
												/>
											</div>
										</div>
										{errors.range && (
											<span className="text-red-500 text-sm mt-1">
												{errors.range}
											</span>
										)}
									</div>
								)}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>

				{/* Dialog Footer */}
				<DialogFooter className="flex justify-end gap-4">
					{question && (
						<button
							type="button"
							onClick={onDelete}
							className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
						>
							<TrashIcon className="h-5 w-5 mr-2" />
							Delete
						</button>
					)}
					<div className="flex space-x-2">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
						>
							Cancel
						</button>
						<button
							type="button"
							onClick={handleFormSubmit}
							className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
						>
							<span>{question ? "Update" : "Add"}</span>
						</button>
					</div>
				</DialogFooter>
			</div>
		</DialogContent>
	);
};

export default QuestionForm;
