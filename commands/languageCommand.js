import chalk from "chalk";
import path from "path";
import { ioFramework } from "../helpers/ioFramework.js";
import { templateHandler } from "../helpers/templateHandler.js";
import { pathHandler } from "../helpers/pathHandler.js";
import { languageHandler } from "../helpers/languageHandler.js";

export const languageCommand = (context) => {
  context.program
    .command("app:language")
    .description("manage supported language")
    .option("-a, --add <isocode>", "add a new support language file for the given iso code")
    .option("-r, --remove <isocode>", "remove support language file for the given iso code")
    .option("-ak, --addkey <key>", "add a key to all language files")
    .option("-rk, --remkey <key>", "remove a key from all language files")
    .action(async (options) => {
      if (!pathHandler.isAppFolder()) return;

      ioFramework.path = context.workingPath;
      languageHandler.path = context.workingPath;

      const list = languageHandler.getAllLanguageCodes();

      if (options.add) {
        const isocode = options.add;

        try {
          // Check if the give isocode exists already
          if (list.includes(isocode)) throw new Error("Language " + isocode + " already supported");

          const languageTemplate = await import("file://" + path.join(context.libPath, templateHandler.getLanguageTemplate()));

          // Create an empty language file
          await ioFramework.setModule("languages/" + options.add, "language", languageTemplate.language);

          console.log(chalk.green("Language for " + isocode + " has been created"));
        } catch (error) {
          console.log(chalk.red(error));
        }
      } else if (options.remove) {
        const isocode = options.remove;

        try {
          // Check if the give isocode exists already
          if (!list.includes(isocode)) throw new Error("Language " + isocode + " is not supported");

          // Remove the file
          await ioFramework.removeFile("languages/" + isocode);

          console.log(chalk.green("Language for " + isocode + " has been removed"));
        } catch (error) {
          console.log(chalk.red(error));
        }
      } else if (options.addkey) {
        list.forEach(async (isocode) => {
          const languageDefinition = await ioFramework.getModule("languages/" + isocode, "language");
          languageDefinition[options.addkey] = "";

          await ioFramework.setModule("languages/" + isocode, "language", languageDefinition);
        });
      } else if (options.remkey) {

        list.forEach(async (isocode) => {
          const languageDefinition = await ioFramework.getModule("languages/" + isocode, "language");
          delete languageDefinition[options.remkey];

          await ioFramework.setModule("languages/" + isocode, "language", languageDefinition);
        });
      } else {
        console.log(chalk.blue("Supported languages: " + list));
      }
    });
};
