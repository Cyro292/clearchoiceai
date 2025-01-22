"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

const questionTypes = [
	{ value: "multichoice", label: "Multiple Choice" },
	{ value: "text", label: "Text" },
	{ value: "email", label: "Email" },
	{ value: "number", label: "Number" },
	{ value: "url", label: "URL" },
	{ value: "telephone", label: "Telephone" },
	{ value: "date", label: "Date" },
];

interface QuestionTypeSelectorProps {
	value: string;
	onChange: (value: string) => void;
}

const QuestionTypeSelector: React.FC<QuestionTypeSelectorProps> = ({
	value,
	onChange,
}) => {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{value
						? questionTypes.find((type) => type.value === value)?.label
						: "Select question type..."}
					<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search type..." className="h-9" />
					<CommandList>
						<CommandEmpty>No type found.</CommandEmpty>
						<CommandGroup>
							{questionTypes.map((type) => (
								<CommandItem
									key={type.value}
									value={type.value}
									onSelect={(currentValue) => {
										onChange(currentValue === value ? "" : currentValue);
										setOpen(false);
									}}
								>
									{type.label}
									<CheckIcon
										className={cn(
											"ml-auto h-4 w-4",
											value === type.value ? "opacity-100" : "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default QuestionTypeSelector;
