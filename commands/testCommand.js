import chalk from "chalk";
import { spawnAsync } from "../helpers/spawnAsync.js";
import { pathHandler } from "../helpers/pathHandler.js";

export const testCommand = (context) => {
  context.program
    .command("qs:test")
    .description("run the dev instance of the web application")
    .action(async () => {
      if (!pathHandler.isProjectFolder()) return;

      console.log(chalk.green("Running test web server"));

      await spawnAsync("quasar dev", { cwd: pathHandler.getClientFolder() });

      console.log(chalk.green("Test web server stopped"));
    });
};
