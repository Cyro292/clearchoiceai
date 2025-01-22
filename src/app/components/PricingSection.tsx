import React from "react";
import PricingCard from "../../components/ui/PricingCard";

const pricingOptions = [
	{
		plan: "Basic",
		price: "$10/month",
		features: ["Feature 1", "Feature 2", "Feature 3"],
		buttonText: "Choose Basic",
	},
	{
		plan: "Standard",
		price: "$20/month",
		features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
		buttonText: "Choose Standard",
	},
	{
		plan: "Premium",
		price: "$30/month",
		features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
		buttonText: "Choose Premium",
	},
	{
		plan: "Enterprise",
		price: "Contact Us",
		features: ["Custom Features", "Dedicated Support"],
		buttonText: "Inquire Now",
	},
];

const PricingSection: React.FC = () => {
	return (
		<section className="pt-12 pb-28 bg-black">
			<h2 className="text-3xl font-bold text-center mb-16 text-white">
				Pricing Plans
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
				{pricingOptions.map((option, index) => (
					<PricingCard
						key={index}
						plan={option.plan}
						price={option.price}
						features={option.features}
						buttonText={option.buttonText}
					/>
				))}
			</div>
		</section>
	);
};

export default PricingSection;
