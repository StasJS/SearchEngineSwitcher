/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const firefoxPath = fs.readFileSync(".firefox-location", "utf8");

const runConfig =
	firefoxPath && fs.lstatSync(firefoxPath).isFile()
		? {
				firefox: firefoxPath,
		  }
		: undefined;

module.exports = {
	run: runConfig,
	sourceDir: "build/",
};
