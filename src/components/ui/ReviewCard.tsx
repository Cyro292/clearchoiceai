import React from "react";

interface ReviewCardProps {
	name: string;
	review: string;
	rating: number; // Assuming a rating out of 5
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, review, rating }) => {
	return (
		<div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
			<div className="flex flex-col items-center mb-4">
				<h3 className="text-lg font-bold ml-2">{name}</h3>
				<div className="text-yellow-500">
					{Array.from({ length: rating }, (_, index) => (
						<span key={index} className="text-xl">
							★
						</span>
					))}
					{Array.from({ length: 5 - rating }, (_, index) => (
						<span key={index} className="text-xl text-gray-300">
							★
						</span>
					))}
				</div>
			</div>
			<p className="text-gray-600">{review}</p>
		</div>
	);
};

export default ReviewCard;
