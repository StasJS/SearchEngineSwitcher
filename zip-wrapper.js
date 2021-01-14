/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const zipdir = require("zip-dir");
const yargs = require("yargs");
const micromatch = require("micromatch");
const path = require("path");

const argv = yargs(process.argv.slice(2))
	.option("in", { type: "string" })
	.option("out", { type: "string" })
	.option("exclude", { type: "array" }).argv;

console.log(argv.in);
console.log(argv.out);
console.log(argv.exclude);

zipdir(argv.in, {
	saveTo: argv.out,
	filter: (p) => {
		const relativePath = path.relative(".", p);
		console.log(relativePath);
		const shouldExclude = micromatch.isMatch(relativePath, argv.exclude);
		if (shouldExclude) {
			console.log(`Skipping ${p}`);
		} else {
			console.log(`Including ${p}`);
		}
		return !shouldExclude;
	}
});
