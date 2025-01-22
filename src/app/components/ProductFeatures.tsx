import React from "react";
import FeatureCard from "../../components/ui/FeatureCard";

const features = [
	{
		title: "Feature One",
		description: "Description of feature one.",
		icon: <span>🌟</span>, // Replace with an actual icon or image
	},
	{
		title: "Feature Two",
		description: "Description of feature two.",
		icon: <span>🚀</span>, // Replace with an actual icon or image
	},
	{
		title: "Feature Three",
		description: "Description of feature three.",
		icon: <span>🔒</span>, // Replace with an actual icon or image
	},
	{
		title: "Feature Four",
		description: "Description of feature four.",
		icon: <span>⚙️</span>, // Replace with an actual icon or image
	},
];

const ProductFeatures: React.FC = () => {
	return (
		<section className="py-12 bg-gray-100">
			<h2 className="text-3xl font-bold text-center mb-8">
				Our Product Features
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
				{features.map((feature, index) => (
					<FeatureCard
						key={index}
						title={feature.title}
						description={feature.description}
						icon={feature.icon}
					/>
				))}
			</div>
		</section>
	);
};

export default ProductFeatures;
