import moment from 'moment';

const tiers: string[] = ['B', 'KB', 'MB', 'GB'];

export function bytes(bytes: number): string {
	bytes = Math.round(bytes);

	let tier = 0;
	while (bytes > 800 && tier < tiers.length - 1) {
		tier++;
		bytes /= 1024;
	}

	return Math.ceil(bytes) + " " + tiers[tier];
}

export function vector(v: {x: number, y: number}, suffix?: string): string {
	return `${v.x}×${v.y} ${suffix || ""}`;
}

export function date(date: number) {
	let d = new Date(date);
	if (Date.now() - +d < 1000 * 60 * 60 * 24 * 3) return moment(date).fromNow();
	else if (d.getFullYear() == new Date().getFullYear()) return "on " + moment(date).format("MMMM Do");
	else return "on " + moment(date).format("MMMM Do, YYYY");
}

export function cleanName(name: string, len?: number) {
	//@ts-ignore
	let cleanName = name.substr(0, name.lastIndexOf('.')).replace(/[_-]+/g, ' ').split(' ').map(([firstChar, ...rest]) =>
		firstChar.toUpperCase() + rest.join('').toLowerCase()).join(' ');
	if (len && cleanName.length > len) cleanName = cleanName.substr(0, len);
	return cleanName;
}