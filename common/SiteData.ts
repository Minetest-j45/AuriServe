export interface MediaItem {
	name: string;
	path: string;
	ext: string; 

	dimensions?: {x: number, y: number};

	uploadDate: number;
	uploadUser: string;
	
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
