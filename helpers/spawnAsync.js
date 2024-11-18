import chalk from "chalk";
import { spawn } from "child_process";

export async function spawnAsync(command, options) {
  let child = spawn(command, [], { shell: true, ...options });
  child.stdout.setEncoding("utf8");
  let result;
  let error;

  return new Promise((resolve) => {
    child.stdout.on("data", (data) => {
      result = data.toString();
      console.log(chalk.blue(data));
    });

    child.stderr.on("data", (data) => {
      error = data.toString();
      console.log(chalk.red(error));
    });

    child.on("exit", (code) => {
      if (code === 0)
        resolve({
          code,
          result,
        });
      else
        resolve({
          code,
          error,
        });
    });
  });
}
