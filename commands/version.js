import chalk from "chalk";

import { ioFramework } from "../helpers/ioFramework.js";
import { versionHandler } from "../helpers/versions.js";

export const version = (context) => {
	context.program
		.command("version")
		.description("manage application versioning")
		.option("-i, --increment", "increment minor release")
		.option("-I, --Increment", "increment major release")
		.action(async (options) => {
			const application = await ioFramework.getModule(
				"config/application",
				"application"
			);

			if (options.increment) versionHandler.incrementMinor();
			else if (options.Increment) versionHandler.incrementMajor();

			console.log(
				chalk.green(
					"Current version: " +
						application.versioning.version.number +
						" (build " +
						application.versioning.version.build +
						")"
				)
			);
		});
};
