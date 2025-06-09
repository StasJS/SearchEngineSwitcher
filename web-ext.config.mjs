import * as fs from "node:fs"
const firefoxPath = fs.existsSync('.firefox-location') && fs.readFileSync(".firefox-location", "utf8") || undefined;

const runConfig =
	firefoxPath && fs.lstatSync(firefoxPath).isFile()
		? {
			firefox: firefoxPath,
		}
		: undefined;

export default {
	run: runConfig,
	sourceDir: "build/",
	verbose: true
}
