import * as fs from "fs/promises";

export const ioFramework = {
	workingPath: process.cwd(),

	async getModule(fullname, name) {
		const filename =
			"file://" + this.workingPath + "/framework/" + fullname + ".mjs";
		//this.workingPath + "/framework/" + fullname + ".mjs";
		const module = await import(filename);
		return module[name];
	},

	async setModule(fullname, name, content) {
		const filename = this.workingPath + "/framework/" + fullname + ".mjs";
		const text =
			"export const " + name + " = " + JSON.stringify(content, null, 3);
		await fs.writeFile(filename, text);
	},

	async removeFile(fullname) {
		const filename = this.workingPath + "/framework/" + fullname + ".mjs";
		await fs.rm(filename);
	},
};
