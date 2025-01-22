import * as React from "react";

import { SearchForm } from "@/components/search-form";
import {
	Sidebar,
	SidebarTrigger,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
	navMain: [
		{
			title: "Getting Started",
			url: "#",
			items: [
				{
					title: "Installation",
					url: "#",
				},
				{
					title: "Project Structure",
					url: "#",
				},
			],
		},
		{
			title: "Building Your Application",
			url: "#",
			items: [
				{
					title: "Routing",
					url: "#",
				},
				{
					title: "Data Fetching",
					url: "#",
					isActive: true,
				},
				{
					title: "Rendering",
					url: "#",
				},
				{
					title: "Caching",
					url: "#",
				},
				{
					title: "Styling",
					url: "#",
				},
				{
					title: "Optimizing",
					url: "#",
				},
				{
					title: "Configuring",
					url: "#",
				},
				{
					title: "Testing",
					url: "#",
				},
				{
					title: "Authentication",
					url: "#",
				},
				{
					title: "Deploying",
					url: "#",
				},
				{
					title: "Upgrading",
					url: "#",
				},
				{
					title: "Examples",
					url: "#",
				},
			],
		},
		{
			title: "API Reference",
			url: "#",
			items: [
				{
					title: "Components",
					url: "#",
				},
				{
					title: "File Conventions",
					url: "#",
				},
				{
					title: "Functions",
					url: "#",
				},
				{
					title: "next.config.js Options",
					url: "#",
				},
				{
					title: "CLI",
					url: "#",
				},
				{
					title: "Edge Runtime",
					url: "#",
				},
			],
		},
		{
			title: "Architecture",
			url: "#",
			items: [
				{
					title: "Accessibility",
					url: "#",
				},
				{
					title: "Fast Refresh",
					url: "#",
				},
				{
					title: "Next.js Compiler",
					url: "#",
				},
				{
					title: "Supported Browsers",
					url: "#",
				},
				{
					title: "Turbopack",
					url: "#",
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between m-2 mb-0">
						<h1 className="text-2xl font-bold text-black">History</h1>
						<SidebarTrigger />
					</div>
					<SearchForm />
				</div>
			</SidebarHeader>
			<SidebarContent>
				{/* We create a SidebarGroup for each parent. */}
				{data.navMain.map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{item.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild isActive={item.isActive}>
											<a href={item.url}>{item.title}</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
