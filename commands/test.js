import chalk from "chalk";
import { spawnAsync } from "../helpers/spawnAsync.js";
import { checkWorkingPath } from "../helpers/checkWorkingPath.js";

export const test = (context) => {
  context.program
    .command("test")
    .description("run the dev instance of the web application")
    .action(async () => {
      if (!checkWorkingPath(context)) return;

      console.log(chalk.green("Running test web server"));
      console.log(context.clientPath);

      await spawnAsync("quasar dev", { cwd: context.clientPath });
    });
};
