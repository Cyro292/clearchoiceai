import React from "react";
import ReviewCard from "../../components/ui/ReviewCard";

const reviews = [
	{
		name: "Alice Johnson",
		review:
			"This product has changed my life! Highly recommend it to everyone.",
		rating: 5,
	},
	{
		name: "Bob Smith",
		review: "Great features and easy to use. I love it!",
		rating: 4,
	},
	{
		name: "Charlie Brown",
		review:
			"Good value for money, but there are some features that could be improved.",
		rating: 3,
	},
	{
		name: "Diana Prince",
		review: "Excellent customer service and a fantastic product overall.",
		rating: 5,
	},
];

const ReviewSection: React.FC = () => {
	return (
		<section className="bg-gradient-to-r p-14 pb-28 from-blue-500 to-purple-600 text-white">
			<h2 className="text-3xl font-bold text-center mb-8">
				What Our Users Say
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto text-black">
				{reviews.map((review, index) => (
					<ReviewCard
						key={index}
						name={review.name}
						review={review.review}
						rating={review.rating}
					/>
				))}
			</div>
		</section>
	);
};

export default ReviewSection;
