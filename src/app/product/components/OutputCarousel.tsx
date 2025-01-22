import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"; // Adjust the import path as necessary
import { Textarea } from "@/components/ui/textarea"; // Import Textarea component

const OutputCarousel: React.FC = () => {
	return (
		<Carousel>
			<CarouselContent>
				<CarouselItem>
					<div className="flex flex-col gap-10 bg-white px-10 py-8 rounded-md mt-8 text-black">
						<h2 className="text-xl font-semibold mb-2">Output Section</h2>
						<Textarea
							className="h-40 bg-white"
							placeholder="Output 1..."
							readOnly
						/>
					</div>
				</CarouselItem>
				<CarouselItem>
					<div className="flex flex-col gap-10 bg-white px-10 py-8 rounded-md mt-8 text-black">
						<h2 className="text-xl font-semibold mb-2">Output Section</h2>
						<Textarea
							className="h-40 bg-white"
							placeholder="Output 2..."
							readOnly
						/>
					</div>
				</CarouselItem>
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
};

export default OutputCarousel;