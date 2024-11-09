import chalk from "chalk";

import { ioFramework } from "../helpers/ioFramework.js";

export const version = (context) => {
	context.program
		.command("version")
		.description("manage application versioning")
		.option("-i, --increment", "increment minor release")
		.action(async (options) => {
			const application = await ioFramework.getModule(
				"config/application",
				"application"
			);

			if (options.increment) {
				if (application.versioning.type != "manual") {
					console.log(
						chalk.red(
							"Versioning type is not manual, cannot change it using this command"
						)
					);
					return;
				}

				const parts = application.versioning.version.number.split(".");
				application.versioning.version.number =
					parts[0] + "." + (Number(parts[1]) + 1);

				const now = new Date();
				application.versioning.version.build =
					"" +
					now.getFullYear() +
					(now.getMonth() + 1) +
					now.getDay() +
					"." +
					now.getHours() +
					now.getMinutes() +
					now.getSeconds();

				try {
					await ioFramework.setModule(
						"config/application",
						"application",
						application
					);
					console.log(
						chalk.green(
							"Application.mjs has been updated, version " +
								application.versioning.version.number +
								" and build " +
								application.versioning.version.build
						)
					);
				} catch (error) {
					console.log(chalk.red(error));
				}
			} else {
				console.log(
					chalk.green(
						"Current version: " +
							application.versioning.version.number +
							" (build " +
							application.versioning.version.build +
							")"
					)
				);
			}
		});
};
