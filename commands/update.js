import chalk from "chalk";
import { spawn } from "child_process";
import { ioFramework } from "../helpers/ioFramework.js";
import { updateFramework } from "../helpers/updateFramework.js";
import { spawnAsync } from "../helpers/spawnAsync.js";
import { checkWorkingPath } from "../helpers/checkWorkingPath.js";

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

      if (!checkWorkingPath(context)) return;

      // Quasar Studio Application template
      console.log(chalk.green("Updating Quasar Studio Application ...."));

      // Update the client application
      await spawnAsync("git pull", { cwd: context.clientPath });

      // Check if framework folder is updated
      ioFramework.path = context.workingPath;
      const application = await ioFramework.getModule("config/application", "application");
      const appManifestVersion = application.manifestVersion;
      const currentManifestVersion = context.manifestVersion;
      if (appManifestVersion === currentManifestVersion) {
        console.log(chalk.green("Framework folder up to date."));
      } else {
        // Update the framework folder
        console.log(chalk.yellow("Upgrading the framework folder to the version " + currentManifestVersion));
        await updateFramework(context, appManifestVersion, currentManifestVersion);
      }
    });
};

/*


*/
