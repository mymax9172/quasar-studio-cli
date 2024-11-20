import chalk from "chalk";
import { versionHandler } from "../helpers/versionHandler.js";
import { ioFramework } from "../helpers/ioFramework.js";
import { pathHandler } from "../helpers/pathHandler.js";
import { spawnAsync } from "../helpers/spawnAsync.js";
import { packageHandler } from "../helpers/packageHandler.js";
import path from "path";

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

        // Retrieve which app is now running
        packageHandler.path = pathHandler.getClientFolder();
        const qsconfig = await packageHandler.get("dependencies.qsconfig");
        const name = qsconfig.split("/")[1].replace('"', "").replace(/\r?\n/g, "");

        ioFramework.path = path.join(context.workingPath, name);
        versionHandler.path = ioFramework.path;
        const application = await ioFramework.getModule("config/application", "application");
        let version = await versionHandler.getCurrentVersion();

        if (application.versioning === "auto") {
          versionHandler.path = ioFramework.path;
          if (options.major) version = await versionHandler.incrementMajor();
          else if (options.minor) version = await versionHandler.incrementMajor();
          else version = await versionHandler.incrementPatch();
        } else if (application.versioning === "date") {
          versionHandler.path = ioFramework.path;
          version = await versionHandler.updateDate(options.date);
        }

        console.log(chalk.green("New build released " + version.number + " (Build: " + version.build + ")"));
      } else {
        console.log(chalk.red(result.error));
      }
    });
};
