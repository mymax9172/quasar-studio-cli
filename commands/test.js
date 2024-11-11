import chalk from "chalk";
import { spawn } from "child_process";

export const test = (context) => {
	context.program
		.command("test")
		.description("run the dev instance of the web application")
		.option("-b, --build", "use the latest built release")
		.action(async (options) => {
			if (options.build) {
				console.log(
					chalk.green("Running the test web server from distribution")
				);

				const child = spawn("quasar server", [], { shell: true });
				child.stdout.setEncoding("utf8");
				child.stdout.on("data", (chunk) => {
					console.log(chalk.blue(chunk));
				});
			} else {
				console.log(chalk.green("Running the test web server"));

				const child = spawn("quasar dev", [], { shell: true });
				child.stdout.setEncoding("utf8");
				child.stdout.on("data", (chunk) => {
					console.log(chalk.blue(chunk));
				});
			}
		});
};
