"use client";

import React, { useState, useEffect, use } from "react"; // Import useState for managing state
import { useSession } from "next-auth/react"; // Import useSession hook from next-auth
import Footer from "@/components/Footer";
import ToggleMenu from "@/components/ToggleMenu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Tab } from "@/types/Tab";
import { saveTab, getTabById } from "@/lib/api/tabService";
import { useSearchParams, useRouter } from "next/navigation";
import TabForm from "./components/TabForm";
import { useToast } from "@/hooks/use-toast";
import { getTabList } from "@/lib/api/tabService";
import { SidebarItemProps } from "./components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import createTimeTabList from "@/lib/tabUtils";
import { set } from "react-hook-form";

const ProductPage: React.FC = () => {
	const [tab, setTab] = useState<Tab | null>(null); // State to manage the tab data
	const [loading, setLoading] = useState(false); // State to manage the loading state
	const [userTabs, setUserTabs] = useState<SidebarItemProps[]>([]);
	const { data: session, status } = useSession();
	const searchParams = useSearchParams();
	const router = useRouter();
	const { toast } = useToast();

	const isAuthorized = status === "authenticated";
	const user = session?.user;

	const fetchTab = async () => {
		try {
			const tabId = searchParams.get("id");

			if (!tabId) {
				setTab(null);
				return;
			}

			if (!isAuthorized) {
				return;
			}

			const serverTab = await getTabById(tabId);
			setTab(serverTab);
		} catch (error) {
			console.error("Failed to fetch tab.", error);
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to fetch tab.",
			});
		}
	};

	const fetchUserTabs = async () => {
		if (!isAuthorized) {
			return;
		}

		try {
			const userId = user?.id;

			if (!userId) {
				console.error("No user id");
				return;
			}

			const response = await getTabList(userId);

			const serverUserTabs = createTimeTabList(response, tab?.id);

			setUserTabs(serverUserTabs);
		} catch (error) {
			console.error("Failed to fetch user history.", error);
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to user history.",
			});
		}
	};

	const changeTabPage = (tabId?: string) => {
		window.dispatchEvent(new Event("beforeunload"));
		if (!tabId) {
			router.push("/product");
		} else {
			router.push(`/product?id=${tabId}`);
		}
		window.dispatchEvent(new Event("unloadPage"));
	};

	const handleChangeTab = (item: SidebarItemProps) => {
		changeTabPage(item.id);
	};

	const handleSave = async (data: Tab) => {
		try {
			await saveTab(data);
			await fetchUserTabs();
			setTab(data);

			toast({
				title: "Success",
				description: "Your changes have been saved.",
			});
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error",
				description: error.message,
			});
		}
	};

	useEffect(() => {
		const initializePage = async () => {
			try {
				await Promise.all([fetchTab(), fetchUserTabs()]);
			} catch (error) {
				console.error("Error initializing page:", error);
			}
		};

		initializePage();
	}, [status, user]);

	useEffect(() => {
		const initializePage = async () => {
			try {
				await Promise.all([fetchTab()]);
			} catch (error) {
				console.error("Error initializing page:", error);
			}
		};

		initializePage();
	}, [searchParams]);

	return (
		<>
			{loading && (
				<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-90 z-50">
					<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
				</div>
			)}
			{!loading && (
				<SidebarProvider>
					<AppSidebar items={userTabs} onSelect={handleChangeTab} />
					<ToggleMenu />
					<div className="flex flex-col w-full bg-gradient-to-b bg-zinc-300">
						<div className="fixed top-2 left-2 flex items-center justify-center w-10 h-10 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300">
							<SidebarTrigger />
						</div>

						<TabForm tab={tab} onSave={handleSave} />

						<Footer />
					</div>
					<Button
						onClick={() => changeTabPage()}
						className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0"
						size="icon"
						variant="default"
					>
						<Plus className="h-6 w-6" />
					</Button>
				</SidebarProvider>
			)}
		</>
	);
};

export default ProductPage;
