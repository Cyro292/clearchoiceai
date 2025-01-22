import React from "react";
import { Question } from "@/types/Question"; // Import the Question interface
import { TrashIcon, ChevronRightIcon } from "@radix-ui/react-icons"; // Import additional icons
import { Pencil1Icon } from "@radix-ui/react-icons";
import clsx from "clsx"; // Utility for conditionally joining classNames

interface QuestionCardProps {
	question: Question; // Use the updated Question interface
	onDelete: () => void; // Function to handle delete action
	onEdit: (question: Question) => void; // Function to handle edit action
	onOpenEdit: () => void; // Function to open edit mode
}

const QuestionCard: React.FC<QuestionCardProps> = ({
	question,
	onDelete,
	onOpenEdit,
}) => {
	// Dynamic styling based on question type
	const typeStyles = {
		multichoice: "border-blue-500",
		number: "border-green-500",
		text: "border-purple-500",
		telephone: "border-gray-500",
		email: "border-red-500",
		url: "border-orange-500",
		date: "border-yellow-500",
	};

	return (
		<div
			className={clsx(
				"m-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer relative",
				typeStyles[question.type] || "border-gray-300",
				"border-l-4",
				"min-w-[200px]" // Sets a minimum width
			)}
			onClick={onOpenEdit}
		>
			{/* Header Section */}
			<div className="flex justify-between items-start">
				<div>
					<h3 className="text-xl font-semibold text-gray-800">
						{question.name}
					</h3>
					<span
						className={clsx(
							"text-sm font-medium mt-1 inline-block px-2 py-1 rounded-full",
							{
								"bg-blue-100 text-blue-800": question.type === "multichoice",
								"bg-green-100 text-green-800": question.type === "number",
								"bg-purple-100 text-purple-800": question.type === "text",
								"bg-gray-100 text-gray-800": question.type === "telephone",
								"bg-red-100 text-red-800": question.type === "email",
								"bg-orange-100 text-orange-800": question.type === "url",
								"bg-yellow-100 text-yellow-800": question.type === "date",
							}
						)}
					>
						{question.type.charAt(0).toUpperCase() + question.type.slice(1)}
					</span>
					{question.isSingleChoice && (
						<span className="inline-block mt-2 text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
							Single Choice
						</span>
					)}
					{question.range && (
						<span className="inline-block mt-2 text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
							Range: {question.range.min} - {question.range.max}
						</span>
					)}
				</div>
				{/* Action Buttons */}
				<div className="flex space-x-2">
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation(); // Prevent triggering onOpenEdit
							onDelete();
						}}
						className="text-red-500 hover:text-red-700 transition-colors duration-200"
						aria-label="Delete question"
					>
						<TrashIcon className="h-5 w-5" />
					</button>
				</div>
			</div>

			{/* Conditional Rendering Based on Question Type */}
			{question.type === "multichoice" && question.choices && (
				<div className="mt-4">
					<p className="text-sm font-medium text-gray-700 mb-2">Choices:</p>
					<p>{question.choices.join(", ")}</p>
				</div>
			)}

			{question.type === "number" && question.useRange && question.range && (
				<div className="mt-4">
					<p className="text-sm font-medium text-gray-700 mb-2">Range:</p>
					<div className="flex space-x-4">
						<div>
							<span className="text-gray-500 text-xs">Min:</span>
							<p className="text-gray-800 font-semibold">
								{question.range.min}
							</p>
						</div>
						<div>
							<span className="text-gray-500 text-xs">Max:</span>
							<p className="text-gray-800 font-semibold">
								{question.range.max}
							</p>
						</div>
					</div>
				</div>
			)}

			{/* Footer with Chevron */}
			<div className="absolute bottom-4 right-4">
				<ChevronRightIcon className="h-5 w-5 text-gray-400" />
			</div>
		</div>
	);
};

export default QuestionCard;
