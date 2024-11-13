import chalk from "chalk";
import { spawn } from "child_process";
import { versionHandler } from "../helpers/versions.js";
import { ioFramework } from "../helpers/ioFramework.js";

export const build = (context) => {
	context.program
		.command("build")
		.description("build a new release of the web application")
		.option(
			"-m, --major <key>",
			"increment the major release if versioning is auto, otherwise only the minor release is updated"
		)
		.option(
			"-d, --date <date>",
			"use a given date for the version instead of the current date"
		)
		.action(async (options) => {
			console.log(chalk.green("Building...."));

			const child = spawn("quasar build", [], { shell: true });
			child.stdout.setEncoding("utf8");
			child.stdout.on("data", (chunk) => {
				console.log(chalk.blue(chunk));
			});

			child.on("close", async (code) => {
				console.log(chalk.green("Building process completed."));

				const application = await ioFramework.getModule(
					"config/application",
					"application"
				);

				if (application.versioning.type === "auto") {
					if (options.major) await versionHandler.incrementMajor();
					else await versionHandler.incrementMinor();
				} else if (application.versioning.type === "date") {
					await versionHandler.updateDate(options.date);
				}
			});
		});
};
