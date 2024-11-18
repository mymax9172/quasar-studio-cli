import chalk from "chalk";
import { ioFramework } from "../helpers/ioFramework.js";
import { updateFramework } from "../helpers/updateFramework.js";
import { spawnAsync } from "../helpers/spawnAsync.js";
import { checkWorkingPath } from "../helpers/checkWorkingPath.js";

export const update = (context) => {
  context.program
    .command("update")
    .description("update Quasar Studio Application and Framework package")
    .action(async () => {
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
        console.log(chalk.green("Framework package up to date."));
      } else {
        // Update the framework folder
        console.log(chalk.yellow("Upgrading the Framework package to the version " + currentManifestVersion));
        await updateFramework(context, appManifestVersion, currentManifestVersion);
      }
    });
};

/*


*/
