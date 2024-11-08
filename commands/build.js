import chalk from "chalk";
import { spawn } from "child_process";

export const build = (context) => {
	context.program
		.command("build")
		.description("build a new release of the web application")
		.action(async () => {
			console.log(chalk.green("Building...."));

			const child = spawn("quasar build", [], { shell: true });
			child.stdout.setEncoding("utf8");
			child.stdout.on("data", (chunk) => {
				console.log(chalk.blue(chunk));
			});

			child.on("close", (code) => {
				//console.log(`child process exited with code ${code}`);
				console.log(chalk.green("Building process completed."));
			});
		});
};
