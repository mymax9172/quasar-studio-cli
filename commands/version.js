import chalk from "chalk";
import { ioFramework } from "../helpers/ioFramework.js";
import { versionHandler } from "../helpers/versions.js";
import { checkWorkingPath } from "../helpers/checkWorkingPath.js";

export const version = (context) => {
  context.program
    .command("version")
    .description("manage application versioning")
    .option("-i, --increment", "increment minor release")
    .option("-I, --Increment", "increment major release")
    .action(async (options) => {
      if (!checkWorkingPath(context)) return;

      ioFramework.path = context.workingPath;
      const application = await ioFramework.getModule("config/application", "application");

      if (options.increment) {
        if (application.versioning.type != "manual") {
          console.log(chalk.red("Versioning type is not manual, cannot change it using this command"));
          return;
        }

        versionHandler.path = ioFramework.path;
        await versionHandler.incrementMinor();
      } else if (options.Increment) {
        if (application.versioning.type != "manual") {
          console.log(chalk.red("Versioning type is not manual, cannot change it using this command"));
          return;
        }

        versionHandler.path = ioFramework.path;
        await versionHandler.incrementMajor();
      }

      console.log(chalk.green("Current version: " + application.versioning.version.number + " (build " + application.versioning.version.build + ")"));
    });
};
