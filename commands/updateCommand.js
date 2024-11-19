import chalk from "chalk";
import { ioFramework } from "../helpers/ioFramework.js";
import { updateFramework } from "../helpers/updateFramework.js";
import { spawnAsync } from "../helpers/spawnAsync.js";
import { pathHandler } from "../helpers/pathHandler.js";

export const updateCommand = (context) => {
  context.program
    .command("qs:update")
    .description("update Quasar Studio Client and all applications")
    .action(async () => {
      if (!pathHandler.isProjectFolder()) return;

      // Quasar Studio Application template
      console.log(chalk.green("Updating Quasar Studio Application ...."));

      // Update the client application
      console.log(chalk.blue("Update Quasar Studio Client"));
      await spawnAsync("git pull", { cwd: pathHandler.getClientFolder() });

      // Check if all app folders are updated
      const appFolders = pathHandler.getAllAppFolders();
      for (let i = 0; i < appFolders.length; i++) {
        ioFramework.path = appFolders[i];

        const application = await ioFramework.getModule("config/application", "application");
        const appManifestVersion = application.manifestVersion;
        const currentManifestVersion = context.manifestVersion;
        if (appManifestVersion === currentManifestVersion) {
          console.log(chalk.blue("Application " + application.name + " package up to date"));
        } else {
          // Update the framework folder
          console.log(chalk.blue("Upgrading the application " + application.name + " package to the version " + currentManifestVersion));
          await updateFramework(context, appManifestVersion, currentManifestVersion);
        }
      }

      console.log(chalk.green("Completed succesfully"));
    });
};

/*


*/
