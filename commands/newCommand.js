import inquirer from "inquirer";
import chalk from "chalk";
import path from "path";

import { pathHandler } from "../helpers/pathHandler.js";
import { createFrameworkFolder } from "../helpers/createFrameworkFolder.js";
import { templateHandler } from "../helpers/templateHandler.js";

const questions = [
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

export const newCommand = (context) => {
  context.program
    .command("qs:new")
    .description("create a new Quasar Studio Application inside an existing Quasar Studio Project")
    .action(async () => {
      if (!pathHandler.isProjectFolder()) return;
      console.log(chalk.green("Create a new Quasar Studio Application"));

      // Ask configuration questions
      const response = await inquirer.prompt(questions);

      try {
        // Paths
        const frameworkFolder = pathHandler.getAppFolderName(response.name);
        const frameworkPath = path.join(context.workingPath, frameworkFolder);

        // Create the framework folder
        console.log(chalk.blue("Create framework folder " + frameworkFolder));
        await createFrameworkFolder(context, frameworkPath, response.name, response.author, response.template);

        console.log(chalk.green("Completed succesfully"));
        console.log(chalk.green("use the command 'qstudio qs:use' to start using this new application "));
      } catch (error) {
        console.log(chalk.red(error));
      }
    });
};
