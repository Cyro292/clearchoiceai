"use client"; // Ensure this is a Client Component

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import UserAvatar from "@/components/ui/UserAvatar";

const components: { title: string; href: string; description: string }[] = [
	{
		title: "Alert Dialog",
		href: "/docs/primitives/alert-dialog",
		description:
			"A modal dialog that interrupts the user with important content and expects a response.",
	},
	{
		title: "Hover Card",
		href: "/docs/primitives/hover-card",
		description:
			"For sighted users to preview content available behind a link.",
	},
	{
		title: "Progress",
		href: "/docs/primitives/progress",
		description:
			"Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
	},
	{
		title: "Scroll-area",
		href: "/docs/primitives/scroll-area",
		description: "Visually or semantically separates content.",
	},
	{
		title: "Tabs",
		href: "/docs/primitives/tabs",
		description:
			"A set of layered sections of content—known as tab panels—that are displayed one at a time.",
	},
	{
		title: "Tooltip",
		href: "/docs/primitives/tooltip",
		description:
			"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
	},
];

export default function NavMenu() {
	return (
		<nav className="fixed top-0 right-0 w-full bg-black z-20">
			<div className="flex items-center px-16 justify-center">
				<NavigationMenu className="w-full ml-auto mr-auto">
					<NavigationMenuList className="flex justify-end space-x-4 p-4 max-w-full gap-6">
						<NavigationMenuItem>
							<NavigationMenuTrigger className="text-white bg-transparent rounded-md px-4 py-2 transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
								Getting Started
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
									<ListItem href="/" title="Home">
										Go back to the homepage.
									</ListItem>
									<ListItem href="/product" title="Porduct">
										The product itself.
									</ListItem>
									<ListItem href="/docs/installation" title="Installation">
										How to install dependencies and structure your app.
									</ListItem>
									<ListItem
										href="/docs/primitives/typography"
										title="Typography"
									>
										Styles for headings, paragraphs, lists...etc.
									</ListItem>
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuTrigger className="text-white bg-transparent hover:bg-blue-600 rounded-md px-3 py-2 transition duration-200">
								Components
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
									{components.map((component) => (
										<ListItem
											key={component.title}
											title={component.title}
											href={component.href}
										>
											{component.description}
										</ListItem>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<Link href="/docs" legacyBehavior passHref>
								<NavigationMenuLink className="text-white hover:bg-blue-600 rounded-md px-3 py-2 transition duration-200">
									Documentation
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<div>
					<UserAvatar />
				</div>
			</div>
		</nav>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white",
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none text-black">
						{title}
					</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
