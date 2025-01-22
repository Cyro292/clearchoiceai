"use client";

import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import QuestionCard from "./QuestionCard";
import { Dialog } from "@/components/ui/dialog";
import QuestionForm from "./QuestionForm";
import { Question } from "@/types/Question";

const ItemList: React.FC<{ className?: string }> = ({ className }) => {
	const [items, setItems] = useState<Question[]>([]);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [formKey, setFormKey] = useState<number>(0); // Unique key for QuestionForm

	const addItem = (question: Question) => {
		setItems([...items, question]);
		setIsDialogOpen(false);
	};

	const editItem = (index: number, question: Question) => {
		const updatedItems = [...items];
		updatedItems[index] = question;
		setItems(updatedItems);
		setIsDialogOpen(false);
	};

	const deleteItem = (index: number) => {
		setItems(items.filter((_, i) => i !== index));
	};

	const openAddDialog = () => {
		setEditingIndex(null);
		setFormKey((prevKey) => prevKey + 1); // Increment to force remount
		setIsDialogOpen(true);
	};

	const openEditDialog = (index: number) => {
		setEditingIndex(index);
		setIsDialogOpen(true);
	};

	const handleDelete = () => {
		if (editingIndex !== null) {
			deleteItem(editingIndex);
			setEditingIndex(null);
			setIsDialogOpen(false);
		}
	};

	return (
		<div className={`${className}`}>
			<div className="flex">
				{/* Dialog for Adding/Editing Questions */}
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<QuestionForm
						key={formKey} // Add key prop to force remount
						question={editingIndex !== null ? items[editingIndex] : undefined}
						onSubmit={
							editingIndex !== null ? (q) => editItem(editingIndex, q) : addItem
						}
						onClose={() => setIsDialogOpen(false)}
						onDelete={editingIndex !== null ? handleDelete : undefined}
					/>
				</Dialog>

				{/* List of Questions */}
				<div className="flex">
					<TransitionGroup className="flex flex-wrap w-full">
						{items.map((item, index) => (
							<CSSTransition key={index} timeout={300} classNames="fade">
								<QuestionCard
									question={item}
									onOpenEdit={() => openEditDialog(index)}
									onDelete={() => deleteItem(index)}
									onEdit={(q) => editItem(index, q)}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
				{/* Add Button */}
				<div
					className="m-2 p-4 rounded-md flex items-center justify-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 border-2 border-dashed border-black"
					onClick={openAddDialog}
				>
					<span className="text-black text-3xl">+</span>
				</div>
			</div>
		</div>
	);
};

export default ItemList;
