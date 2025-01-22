"use client"; // Ensure this is a Client Component

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import UserAvatar from "@/components/ui/UserAvatar";

export default function NavMenu() {
	return (
		<nav className="fixed top-0 right-0 w-full bg-black z-20">
			<div className="flex items-center px-16 justify-center">
				<NavigationMenu className="w-full ml-auto mr-auto">
					<NavigationMenuList className="flex justify-end space-x-4 p-4 max-w-full gap-6">
						<NavigationMenuItem>
							<Link href="/" legacyBehavior passHref>
								<NavigationMenuLink className="text-white hover:bg-blue-600 rounded-md px-3 py-2 transition duration-200">
									Home
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<Link href="/product" legacyBehavior passHref>
								<NavigationMenuLink className="text-white hover:bg-blue-600 rounded-md px-3 py-2 transition duration-200">
									Product
								</NavigationMenuLink>
							</Link>
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
