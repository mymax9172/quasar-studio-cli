import chalk from "chalk";
import { spawn } from "child_process";

export const test = (context) => {
	context.program
		.command("test")
		.description("run the dev instance of the web application")
		.action(async () => {
			console.log(chalk.green("Running the test web server"));

			const child = spawn("quasar dev", [], { shell: true });
			child.stdout.setEncoding("utf8");
			child.stdout.on("data", (chunk) => {
				console.log(chalk.blue(chunk));
			});
		});
};
