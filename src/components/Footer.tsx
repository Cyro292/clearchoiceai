import React from "react";

const Footer: React.FC = () => {
	return (
		<footer className="bg-black text-white py-4">
			<div className="container mx-auto text-center p-10">
				<p className="text-sm">
					&copy; {new Date().getFullYear()} ClearChoice AI. All rights reserved.
				</p>
				<p className="text-sm">
					<a href="/privacy" className="text-white hover:underline">Privacy Policy</a> | 
					<a href="/terms" className="text-white hover:underline"> Terms of Service</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;