import { ioFramework } from "./ioFramework.js";
import chalk from "chalk";

export const versionHandler = {
	async incrementMinor() {
		const application = await ioFramework.getModule(
			"config/application",
			"application"
		);

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
		return;
	},

	async incrementMajor() {
		const application = await ioFramework.getModule(
			"config/application",
			"application"
		);

		if (application.versioning.type != "manual") {
			console.log(
				chalk.red(
					"Versioning type is not manual, cannot change it using this command"
				)
			);
			return;
		}

		const parts = application.versioning.version.number.split(".");
		application.versioning.version.number = Number(parts[0]) + 1 + ".0";

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
		return;
	},
};
