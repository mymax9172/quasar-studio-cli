import inquirer from "inquirer";
import chalk from "chalk";
import path from "path";
import * as fs from "fs";

import { pathHandler } from "../helpers/pathHandler.js";
import { spawnAsync } from "../helpers/spawnAsync.js";

export const useCommand = (context) => {
  context.program
    .command("qs:use [name]")
    .description("use an existing Quasar Studio Application")

    .action(async (name) => {
      if (!pathHandler.isProjectFolder()) return;
      console.log(chalk.green("Use an existing Quasar Studio Application"));

      if (!name) {
        // Ask question about which app to use
        const response = await inquirer.prompt([
          {
            type: "list",
            name: "name",
            message: "Select one of the existing Quasar Studio Application",
            choices: pathHandler.getAllApps(),
          },
        ]);
        name = response.name;
      }

      // Check if given name exists as app
      const frameworkFolder = pathHandler.getAppFolderName(name);
      const type = pathHandler.getFolderType(path.join(context.workingPath, frameworkFolder));
      if (type != "app") {
        console.log(chalk.red("Application <" + name + "> does not exist"));
        return;
      }

      try {
        // Paths
        const clientPath = pathHandler.getClientFolder();

        // Register the npm package into the Quasar Studio Client
        console.log(chalk.blue("Update Quasar Studio Client packages with " + frameworkFolder + " package"));
        const result = await spawnAsync("npm i qsconfig@file:../" + frameworkFolder, { cwd: clientPath }, true);
        if (result.code != 0) throw new Error(result.error);

        console.log(chalk.green("Completed succesfully"));
      } catch (error) {
        console.log(chalk.red(error));
      }
    });
};
