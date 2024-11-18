import inquirer from "inquirer";
import * as fs from "fs/promises";
import chalk from "chalk";
import { spawnAsync } from "../helpers/spawnAsync.js";
import { packageHandler } from "../helpers/packageHandler.js";

const confirmQuestion = [
  {
    type: "confirm",
    name: "confirm",
    message: "A framework folder already exists.\nPlease confirm you want to create a new one and delete the exiting one",
    default: false,
  },
];

const questions = [
  {
    type: "input",
    name: "name",
    message: "Application name",
    validate: (value = "") => (value && value.length > 0) || "Pass a valid application name",
  },
  {
    type: "input",
    name: "folder",
    message: "Folder name",
    validate: (value = "") => (value && value.length > 0) || "Pass a valid folder name",
    default: (answers) => answers.name,
  },
  {
    type: "author",
    name: "author",
    message: "Author",
  },
];

export const init = (context) => {
  context.program
    .command("init")
    .description("create a new Quasar Studio Application")
    .action(async () => {
      const gitRepo = "mymax9172/quasar-studio";

      // Ask configuration questions
      const response = await inquirer.prompt(questions);

      try {
        const rootPath = context.workingPath + "/" + response.folder;
        const frameworkPath = rootPath + "/framework";
        const clientPath = rootPath + "/client";

        // Create the folder root
        await fs.mkdir(rootPath);

        // Create the framework folder
        await fs.cp(context.libPath + "/templates/framework", frameworkPath, {
          recursive: true,
        });

        // NPM init of the framework folder
        let result = await spawnAsync("npm init -y ", { cwd: frameworkPath });
        if (result.code != 0) throw new Error(result.error);

        // Change NPM package properties
        packageHandler.path = frameworkPath;
        await packageHandler.set("name", response.name);
        if (response.author) await packageHandler.set("author", response.author);
        await packageHandler.set("version", "0.0.1");

        // Clone the quasar studio folder
        result = await spawnAsync("git clone https://github.com/" + gitRepo + ".git client", { cwd: rootPath });
        if (result.code != 0) throw new Error(result.error);

        // Add the framework reference to the client package
        result = await spawnAsync("npm i qsconfig@file:../framework", { cwd: clientPath });
        if (result.code != 0) throw new Error(result.error);
      } catch (error) {
        console.log(chalk.red(error));
      }

      // // Check if the framework directory exists
      // try {
      //   await fs.stat(context.workingPath + "/framework");

      //   const response = await inquirer.prompt(confirmQuestion);
      //   if (!response.confirm) return;

      //   // Remove the existing folder
      //   await fs.rm(context.workingPath + "/framework", { recursive: true });
      // } catch (error) {}

      // try {
      //   // Create the folder structure
      //   await fs.cp(context.libPath + "/templates/framework", context.workingPath + "/framework", {
      //     recursive: true,
      //   });

      //   console.log(chalk.green("Framework folder created"));
      // } catch (error) {
      //   console.log(chalk.red(error));
      // }
    });
};
