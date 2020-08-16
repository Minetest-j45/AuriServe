export interface MediaItem {
	name: string;
	size: number;
}

export interface SiteData {
	domain: string;
	sitename: string;

	media: {
		usage: number;
		capacity: number;

		items: MediaItem[];
	}
}
