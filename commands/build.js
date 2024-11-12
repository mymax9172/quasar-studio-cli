import chalk from "chalk";
import { spawn } from "child_process";
import { versionHandler } from "../helpers/versions.js";

export const build = (context) => {
	context.program
		.command("build")
		.description("build a new release of the web application")
		.option(
			"-m, --major <key>",
			"increment the major release if versioning is auto, otherwise only the minor release is updated"
		)
		.action(async (options) => {
			console.log(chalk.green("Building...."));

			const child = spawn("quasar build", [], { shell: true });
			child.stdout.setEncoding("utf8");
			child.stdout.on("data", (chunk) => {
				console.log(chalk.blue(chunk));
			});

			child.on("close", (code) => {
				console.log(chalk.green("Building process completed."));
			});

			if (options.major) {
				if (application.versioning.type != "auto") {
					console.log(
						chalk.red(
							"Versioning type is not auto, cannot change it using this command"
						)
					);
					return;
				}
				await versionHandler.incrementMajor();
			} else await versionHandler.incrementMinor;
		});
};
