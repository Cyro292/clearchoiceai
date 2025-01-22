import React, { useState, useEffect } from "react";

const VideoSection: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true); // State to track loading status
	const [isVisible, setIsVisible] = useState(false); // State to control visibility of the video

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setIsLoading(false); // Set loading to false when the video is ready
			setIsVisible(true); // Set video to visible after 2 seconds
		}, 500);

		return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
	}, []);

	return (
		<section className="relative w-full h-screen overflow-hidden bg-slate-100">
			<div
				className={`absolute inset-0 flex justify-center items-center transition-opacity duration-1000 ${
					isVisible ? "opacity-100" : "opacity-0"
				}`}
			>
				{isLoading ? (
					<div className="text-center">Loading...</div> // Loading indicator
				) : (
					<div className="w-full p-12 items-center justify-center">
						{/* Added padding here */}
						<h2 className="text-3xl font-bold text-center absolute top-1/3 left-1/2 transform -translate-x-1/2 z-10 bg-white rounded-full px-4 py-2 shadow-md text-black">
							Watch Our Product in Action
						</h2>
						{/* Container with Aspect Ratio */}
						<div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
							<iframe
								className="w-full h-full"
								src="https://www.youtube.com/embed/hXD8itTKdY0?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&rel=0&loop=1&playlist=hXD8itTKdY0"
								title="YouTube video player"
								allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								style={{ pointerEvents: "none" }} // Removed objectFit to prevent stretching
							></iframe>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default VideoSection;
