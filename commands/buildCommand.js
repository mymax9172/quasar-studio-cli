import chalk from "chalk";
import { versionHandler } from "../helpers/versionHandler.js";
import { ioFramework } from "../helpers/ioFramework.js";
import { pathHandler } from "../helpers/pathHandler.js";
import { spawnAsync } from "../helpers/spawnAsync.js";

export const buildCommand = (context) => {
  context.program
    .command("qs:build")
    .description("build a new release of the web application")
    .option("-M, --major", "increment the major release (only if versioning is auto)")
    .option("-m, --minor", "increment the minor release (only if versioning is auto)")
    .option("-d, --date <date>", "use a given date for the version instead of the current date")
    .action(async (options) => {
      if (!pathHandler.isProjectFolder()) return;

      console.log(chalk.green("Building a new release"));

      const result = await spawnAsync("quasar build", { cwd: pathHandler.getClientFolder() });

      if (result.code === 0) {
        console.log(chalk.green("Building process completed."));

        ioFramework.path = context.workingPath;
        const application = await ioFramework.getModule("config/application", "application");
        let version = await versionHandler.getCurrentVersion();

        if (application.versioning.type === "auto") {
          versionHandler.path = ioFramework.path;
          if (options.major) version = await versionHandler.incrementMajor();
          else if (options.minor) version = await versionHandler.incrementMajor();
          else version = await versionHandler.incrementPatch();
        } else if (application.versioning.type === "date") {
          versionHandler.path = ioFramework.path;
          version = await versionHandler.updateDate(options.date);
        }

        console.log(chalk.green("New build released " + version.number + " (Build: " + version.build + ")"));
      } else {
        console.log(chalk.red(result.error));
      }
    });
};
