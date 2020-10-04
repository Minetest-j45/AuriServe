import * as os from "os"
import * as path from "path"

function expandHome(p: string): string {
	if (p[0] == "~") return p.replace("~", os.homedir());
	else return p;
}

export default function resolvePath(p: string) {
	let resolved = expandHome(p);
	if (!path.isAbsolute(resolved)) resolved = path.join(
		// Ascend three levels up the tree... There should be a better way to do this.
		path.dirname(path.dirname(path.dirname(require.main!.filename))), resolved);
	return path.normalize(resolved);
}
