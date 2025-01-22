"use client"; // Ensure this is a Client Component

import ToggleMenu from "@/components/ToggleMenu"; // Importing the NavMenu component
import { Button } from "@/components/ui/button"; // Importing the Button component from ShadCN
import ProductFeatures from "@/app/components/ProductFeatures";
import PricingSection from "@/app/components/PricingSection";
import ReviewSection from "@/app/components/ReviewSection";
import VideoSection from "@/app/components/VideoSection";
import Footer from "@/components/Footer";

export default function Home() {
	return (
		<div>
			<div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
				<ToggleMenu />
				<h1 className="text-5xl font-extrabold mb-4 text-center">
					Hello, welcome to ClearChoice AI!
				</h1>
				<p className="text-lg mb-8 text-center">
					We're glad to have you here. Explore our features and get started!
				</p>
				<Button
					className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-blue-600 hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
					onClick={() => alert("Get started with ClearChoice AI!")}
				>
					Get Started
				</Button>
			</div>

			<ProductFeatures />

			<VideoSection />

			<PricingSection />

			<ReviewSection />

			<Footer />
		</div>
	);
}
