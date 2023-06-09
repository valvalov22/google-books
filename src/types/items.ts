export interface Items {
	totalItems: number;
	items: Book[];
}
export interface Book {
	id: string;
	volumeInfo: VolumeInfo;
}

export interface VolumeInfo {
	title: string;
	subtitle: string;
	authors: string[];
	categories: string[];
	description?: string;
	imageLinks: ImageLinks;
}

export interface ImageLinks {
	thumbnail: string;
	medium?: string;
	large?: string;
}