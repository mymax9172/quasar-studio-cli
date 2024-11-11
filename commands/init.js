import inquirer from "inquirer";
import * as fs from "fs/promises";
import chalk from "chalk";

const confirmQuestion = [
	{
		type: "confirm",
		name: "confirm",
		message:
			"A framework folder already exists.\nPlease confirm you want to create a new one and delete the exiting one",
		default: false,
	},
];

export const init = (context) => {
	context.program
		.command("init")
		.description(
			"initialize the framework folder for a new Quasar Studio Application"
		)
		.action(async () => {
			// Check if the framework directory exists
			try {
				await fs.stat(context.workingPath + "/framework");

				const response = await inquirer.prompt(confirmQuestion);
				if (!response.confirm) return;

				// Remove the existing folder
				await fs.rm(context.workingPath + "/framework", { recursive: true });
			} catch (error) {}

			try {
				// Create the folder structure
				await fs.cp(
					context.libPath + "/templates/framework",
					context.workingPath + "/framework",
					{
						recursive: true,
					}
				);

				console.log(chalk.green("Framework folder created"));
			} catch (error) {
				console.log(chalk.red(error));
			}
		});
};
