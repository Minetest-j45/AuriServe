/**
* Convert an arbitrary string into an alphanumeric identifier.
* Throws if the passed in value isn't a string, or identifier generated is empty.
*
* @param {string} str - The string to be sanitized.
*/

export default function sanitize(str: string) {
	if (typeof str != "string" || str.length < 1) throw "Name must not be empty.";
	const sanitized = str.toLowerCase().replace(/[ -]/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
	if (sanitized.length == 0) throw "Name must include at least one alphanumeric character.";
	return sanitized;
}
