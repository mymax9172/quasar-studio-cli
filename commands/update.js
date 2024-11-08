import chalk from "chalk";
import { spawn, execSync } from "child_process";

export const update = (context) => {
	context.program
		.command("update")
		.description("update Quasar Studio version")
		.action(async (options) => {
			// // if (!options.cli && !options.app) {
			// // 	console.log(chalk.red("Missing options: --app and/or --cli"));
			// // }
			// if (options.cli || !options.app) {
			// 	console.log(chalk.green("Updating Quasar Studio CLI ...."));
			// 	const npmProcess = spawn("npm ls cli", ["--link", "--global"], {
			// 		shell: true,
			// 		encoding: "utf8",
			// 	});

			// 	npmProcess.stdout.on("data", (chunk) => {
			// 		const info = chunk + "";

			// 		const cliPath = info.split(">")[1].trim();
			// 		const npmPath = info.split(String.fromCharCode(10))[0];
			// 		const fullPath = npmPath + "\\" + cliPath;

			// 		const gitProcess = spawn("git", ["pull"], {
			// 			shell: true,
			// 			cwd: fullPath,
			// 		});
			// 		gitProcess.stdout.on("data", (info) => {
			// 			console.log("Quasar Studio CLI", info + "");
			// 		});
			// 	});
			// }
			// if (options.app || !options.cli) {
			console.log(chalk.green("Updating Quasar Studio Application ...."));

			const gitProcess = spawn("git", ["pull"], {
				shell: true,
			});
			gitProcess.stdout.on("data", (info) => {
				console.log("Quasar Studio Application", info + "");
			});
			// }
		});
};

/*


*/
