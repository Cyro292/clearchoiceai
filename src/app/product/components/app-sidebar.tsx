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
import { useEffect } from "react";

interface AppSidebarProps {
	onSelect?: (item: SidebarItemProps) => void;
	items: SidebarItemProps[];
}

export interface SidebarItemProps {
	id?: string;
	title: string;
	url: string;
	description?: string;
	isActive: boolean;
	udpatedAt?: string;
	items?: SidebarItemProps[];
}

export function AppSidebar({
	items,
	onSelect,
	...props
}: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {
	const handleSelect = (item: SidebarItemProps) => {
		item.isActive = true;
		items.forEach((parent) => {
			parent.items?.forEach((child) => {
				if (child.id !== item.id) {
					child.isActive = false;
				}
			});
		});
		onSelect?.(item);
	};

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
				{items.map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{(item.items ?? []).map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											asChild
											isActive={item.isActive}
											onClick={() => handleSelect?.(item)}
										>
											<p>{item.title}</p>
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
