import inquirer from "inquirer";
import * as fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import { spawnAsync } from "../helpers/spawnAsync.js";

import { createFrameworkFolder } from "../helpers/createFrameworkFolder.js";
import { pathHandler } from "../helpers/pathHandler.js";
import { templateHandler } from "../helpers/templateHandler.js";

const questions = [
  {
    type: "input",
    name: "folder",
    message: "Quasar Studio Project folder name",
    validate: (value = "") => (value && value.length > 0) || "Pass a valid folder name",
    default: "QSProject",
  },
  {
    type: "input",
    name: "name",
    message: "Application name",
    validate: (value = "") => (value && value.length > 0) || "Pass a valid application name",
  },
  {
    type: "list",
    name: "template",
    message: "Select one of the existing Quasar Studio Application",
    default: "empty",
    choices: templateHandler.getFrameworkTemplateNames(),
  },
  {
    type: "author",
    name: "author",
    message: "Author",
  },
];

export const initCommand = (context) => {
  context.program
    .command("init")
    .description("create a new Quasar Studio Project and a new Quasar Studio Application")
    .action(async () => {
      if (!pathHandler.isAnyFolder) return;

      console.log(chalk.green("Initialize a new Quasar Studio Project"));

      // Quasar Studio Repository
      const gitRepo = "mymax9172/quasar-studio";

      // Ask configuration questions
      const response = await inquirer.prompt(questions);

      try {
        // Paths
        const frameworkFolder = pathHandler.getAppFolderName(response.name);
        const rootPath = path.join(context.workingPath, response.folder);
        const frameworkPath = path.join(rootPath, frameworkFolder);
        const clientPath = path.join(rootPath, "client");

        // Create the folder root
        console.log(chalk.blue("Create folder " + rootPath));
        await fs.mkdir(rootPath);

        // Create the framework folder
        console.log(chalk.blue("Create framework folder " + frameworkPath));
        await createFrameworkFolder(context, frameworkPath, response.name, response.author, response.template);

        // Clone the quasar studio folder
        console.log(chalk.blue("Cloning Quasar Studio Client"));
        let result = await spawnAsync("git clone https://github.com/" + gitRepo + ".git client", { cwd: rootPath });
        if (result.code != 0) throw new Error(result.error);

        // Add the framework reference to the client package
        console.log(chalk.blue("Update Quasar Studio Client packages with the new App"));
        result = await spawnAsync("npm i qsconfig@file:../" + frameworkFolder, { cwd: clientPath });
        if (result.code != 0) throw new Error(result.error);

        console.log(chalk.green("Completed succesfully"));
      } catch (error) {
        console.log(chalk.red(error));
      }
    });
};
