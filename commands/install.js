import chalk from "chalk";
import { spawn } from "child_process";

export const install = (context) => {
	context.program
		.command("install")
		.description("install all npm libraries")
		.action(async (options) => {
			console.log(chalk.green("Installing npm packages"));

			const child = spawn("npm install", [], { shell: true });
			child.stdout.setEncoding("utf8");
			child.stdout.on("data", (chunk) => {
				console.log(chalk.blue(chunk));
			});
		});
};
