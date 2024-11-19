import chalk from "chalk";
import { ioFramework } from "../helpers/ioFramework.js";
import { versionHandler } from "../helpers/versionHandler.js";
import { pathHandler } from "../helpers/pathHandler.js";

export const versionCommand = (context) => {
  context.program
    .command("app:version")
    .description("manage application versioning")
    .option("-M, --major", "increment major release")
    .option("-m, --minor", "increment minor release")
    .option("-p, --patch", "increment patch")
    .option("-r, --reset", "reset version to 0.0.1 build 0")
    .action(async (options) => {
      if (!pathHandler.isAppFolder()) return;

      ioFramework.path = context.workingPath;
      versionHandler.path = ioFramework.path;

      // No options, return the current version
      if (JSON.stringify(options) === "{}") {
        const version = await versionHandler.getCurrentVersion();
        console.log(chalk.green("Current version: " + version.number + " (build " + version.build + ")"));
      } else {
        const application = await ioFramework.getModule("config/application", "application");

        if (application.versioning != "manual") {
          console.log(chalk.red("Versioning type is not manual, cannot change it using this command"));
          return;
        }

        let version;
        if (options.major) version = await versionHandler.incrementMajor();
        else if (options.minor) version = await versionHandler.incrementMinor();
        else if (options.patch) version = await versionHandler.incrementPatch();
        else if (options.reset) version = await versionHandler.reset();

        console.log(chalk.green("Version updated to " + version.number + " (Build: " + version.build + ")"));
      }
    });
};
