import { Tab } from "@/types/Tab";
import { SidebarItemProps } from "@/app/product/components/app-sidebar";

export default function createTimeTabList(
	tabList: Tab[],
	selectedId: string = ""
): SidebarItemProps[] {
	// Helper function to check if date is today
	const isToday = (date: Date) => {
		const today = new Date();
		return date.toDateString() === today.toDateString();
	};

	// Helper function to check if date is yesterday
	const isYesterday = (date: Date) => {
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		return date.toDateString() === yesterday.toDateString();
	};

	// Helper function to check if date is within last week
	const isLastWeek = (date: Date) => {
		const lastWeek = new Date();
		lastWeek.setDate(lastWeek.getDate() - 7);
		return date >= lastWeek;
	};

	// Helper function to check if date is within last month
	const isLastMonth = (date: Date) => {
		const lastMonth = new Date();
		lastMonth.setMonth(lastMonth.getMonth() - 1);
		return date >= lastMonth;
	};

	// Organize tabs into time periods
	const organizedTabs = tabList.reduce((acc: any, tab: Tab) => {
		const updatedDate = new Date(tab.updatedAt || new Date());

		if (isToday(updatedDate)) {
			if (!acc.today) acc.today = [];
			acc.today.push(tab);
		} else if (isYesterday(updatedDate)) {
			if (!acc.yesterday) acc.yesterday = [];
			acc.yesterday.push(tab);
		} else if (isLastWeek(updatedDate)) {
			if (!acc.lastWeek) acc.lastWeek = [];
			acc.lastWeek.push(tab);
		} else if (isLastMonth(updatedDate)) {
			if (!acc.lastMonth) acc.lastMonth = [];
			acc.lastMonth.push(tab);
		} else {
			if (!acc.older) acc.older = [];
			acc.older.push(tab);
		}
		return acc;
	}, {});

	const serverUserTabs = [
		{
			title: "Today",
			url: "#",
			items:
				organizedTabs.today?.map((tab: Tab) => ({
					id: tab.id,
					title: tab.title,
					url: `?id=${tab.id}`,
					userId: tab.userId,
					isActive: false,
					description: tab.description,
					updatedAt: tab.updatedAt,
				})) || [],
		},
		{
			title: "Yesterday",
			url: "#",
			items:
				organizedTabs.yesterday?.map((tab: Tab) => ({
					id: tab.id,
					title: tab.title,
					userId: tab.userId,
					url: `/product?id=${tab.id}`,
					isActive: false,
					description: tab.description,
					updatedAt: tab.updatedAt,
				})) || [],
		},
		{
			title: "Last Week",
			url: "#",
			items:
				organizedTabs.lastWeek?.map((tab: Tab) => ({
					id: tab.id,
					title: tab.title,
					userId: tab.userId,
					url: `/product?id=${tab.id}`,
					isActive: false,
					description: tab.description,
					updatedAt: tab.updatedAt,
				})) || [],
		},
		{
			title: "Last Month",
			url: "#",
			items:
				organizedTabs.lastMonth?.map((tab: Tab) => ({
					id: tab.id,
					title: tab.title,
					userId: tab.userId,
					url: `/product?id=${tab.id}`,
					isActive: false,
					description: tab.description,
					updatedAt: tab.updatedAt,
				})) || [],
		},
		{
			title: "Older",
			url: "#",
			items:
				organizedTabs.older?.map((tab: Tab) => ({
					id: tab.id,
					title: tab.title,
					userId: tab.userId,
					url: `/product?id=${tab.id}`,
					isActive: false,
					description: tab.description,
					updatedAt: tab.updatedAt,
				})) || [],
		},
	].filter((group) => group.items.length > 0);

	return serverUserTabs;
}
