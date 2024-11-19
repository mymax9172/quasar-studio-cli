import chalk from "chalk";

import { ioFramework } from "../../helpers/ioFramework.js";

export const language = (context) => {
	context.program
		.command("language")
		.description("manage supported language")
		.option(
			"-a, --add <isocode>",
			"add a new support language file for the given iso code"
		)
		.option(
			"-r, --remove <isocode>",
			"remove support language file for the given iso code"
		)
		.option("-ak, --addkey <key>", "add a key to all language files")
		.option("-rk, --remkey <key>", "remove a key to all language files")
		.action(async (options) => {
			if (options.add) {
				const isocode = options.add;

				const application = await ioFramework.getModule(
					"config/application",
					"application"
				);
				const languageTemplate = await ioFramework.getModule(
					"languages/en-US",
					"language"
				);

				try {
					// Check if the give isocode exists already
					if (application.languages.supported.includes(isocode))
						throw new Error("Language " + isocode + " already supported");

					// Create an empty language file
					await ioFramework.setModule(
						"languages/" + options.add,
						"language",
						languageTemplate
					);

					// Update the application file
					application.languages.supported.push(isocode);
					await ioFramework.setModule(
						"config/application",
						"application",
						application
					);

					console.log(
						chalk.green("Language for " + isocode + " has been created")
					);
				} catch (error) {
					console.log(chalk.red(error));
				}
			} else if (options.remove) {
				const isocode = options.remove;

				const application = await ioFramework.getModule(
					"config/application",
					"application"
				);

				try {
					// Check if the give isocode exists already
					if (!application.languages.supported.includes(isocode))
						throw new Error("Language " + isocode + " is not supported");

					// Update the application file
					application.languages.supported =
						application.languages.supported.filter((e) => e != isocode);
					await ioFramework.setModule(
						"config/application",
						"application",
						application
					);

					// Remove the file
					await ioFramework.removeFile("languages/" + isocode);

					console.log(
						chalk.green("Language for " + isocode + " has been removed")
					);
				} catch (error) {
					console.log(chalk.red(error));
				}
			} else if (options.addkey) {
				const application = await ioFramework.getModule(
					"config/application",
					"application"
				);

				application.languages.supported.forEach(async (isocode) => {
					const languageDefinition = await ioFramework.getModule(
						"languages/" + isocode,
						"language"
					);
					languageDefinition[options.addkey] = "";

					await ioFramework.setModule(
						"languages/" + isocode,
						"language",
						languageDefinition
					);
				});
			} else if (options.remkey) {
				const application = await ioFramework.getModule(
					"config/application",
					"application"
				);

				application.languages.supported.forEach(async (isocode) => {
					const languageDefinition = await ioFramework.getModule(
						"languages/" + isocode,
						"language"
					);
					delete languageDefinition[options.remkey];

					await ioFramework.setModule(
						"languages/" + isocode,
						"language",
						languageDefinition
					);
				});
			}
		});
};
