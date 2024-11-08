import * as fs from "fs/promises";

export const ioFramework = {
	async getModule(fullname, name) {
		const filename =
			"file://" + process.cwd() + "/framework/" + fullname + ".mjs";
		const module = await import(filename);
		return module[name];
	},

	async setModule(fullname, name, content) {
		const filename = process.cwd() + "/framework/" + fullname + ".mjs";
		const text =
			"export const " + name + " = " + JSON.stringify(content, null, 3);
		await fs.writeFile(filename, text);
	},

	async removeFile(fullname) {
		const filename = process.cwd() + "/framework/" + fullname + ".mjs";
		await fs.rm(filename);
	},
};
