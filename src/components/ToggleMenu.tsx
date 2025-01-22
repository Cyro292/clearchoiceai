import React, { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline"; // Ensure Heroicons is installed
import NavMenu from "./NavMenu";

const ToggleMenu: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				aria-label="Toggle menu"
				className="fixed top-4 right-4 z-30 flex items-center justify-center w-10 h-10 rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
				onClick={() => setIsOpen(!isOpen)}
			>
				{!isOpen ? (
					<MenuIcon className="w-6 h-6" />
				) : (
					<XIcon className="w-6 h-6" />
				)}
			</button>

			{/* Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-30"
					onClick={() => setIsOpen(false)}
				></div>
			)}

			{/* Animated Menu */}
			<div
				className={`fixed top-0 left-0 right-0 bg-black text-white shadow-lg z-30 transform ${
					isOpen ? "translate-y-0" : "-translate-y-full"
				} transition-transform duration-300 ease-in-out`}
			>
				<div className="flex items-center justify-center h-16">
					{" "}
					{/* Adjusted Height and Centering */}
					<NavMenu />
				</div>
			</div>
		</>
	);
};

export default ToggleMenu;
