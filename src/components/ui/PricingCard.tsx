import React from "react";
import { Button } from "./button"; // Import the Button component

interface PricingCardProps {
	plan: string;
	price: string;
	features: string[];
	buttonText: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
	plan,
	price,
	features,
	buttonText,
}) => {
	return (
		<div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center transition-transform transform hover:scale-110">
			<div className="flex-grow">
				<h2 className="text-2xl font-bold text-black mb-4">{plan}</h2>
				<p className="text-3xl font-semibold text-black mb-6">{price}</p>
				<ul className="list-disc list-inside mb-6 text-black">
					{features.map((feature, index) => (
						<li key={index} className="text-lg">
							{feature}
						</li>
					))}
				</ul>
			</div>
			<Button
				className="w-full bg-white text-purple-600 text-bold rounded-md px-6 py-3 transition duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50"
				onClick={() => alert(`You selected the ${plan} plan!`)} // Example action
			>
				{buttonText}
			</Button>
		</div>
	);
};

export default PricingCard;
