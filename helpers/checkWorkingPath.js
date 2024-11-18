import * as fs from "fs";
import chalk from "chalk";

export function checkWorkingPath(context) {
  if (!context.workingPath.endsWith("\\framework")) {
    console.log(chalk.red("For this command use qstudio CLI only in a Quasar Studio framework  folder, this folder is not ok: " + context.workingPath));
    return false;
  }
  return true;
}
