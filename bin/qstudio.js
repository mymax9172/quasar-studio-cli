#!/usr/bin/env node

import * as fs from "fs";
import path from "path";

import { program } from "commander";
import chalk from "chalk"; // Colors
import inquirer from "inquirer"; // Questions and forms, confirmations
import ora from "ora"; // Waiting, spinning chars
import figlet from "figlet"; // Char opening

import { packageHandler } from "../helpers/packageHandler.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

import { initCommand } from "../commands/initCommand.js";
import { newCommand } from "../commands/newCommand.js";
import { useCommand } from "../commands/useCommand.js";
import { testCommand } from "../commands/testCommand.js";
import { updateCommand } from "../commands/updateCommand.js";
import { versionCommand } from "../commands/versionCommand.js";
import { buildCommand } from "../commands/buildCommand.js";

await (async function () {
  const context = {
    manifestVersion: "0.1.1",
    program,
    workingPath: process.cwd(),
    libPath: path.normalize(dirname(fileURLToPath(import.meta.url)) + "\\.."),
  };

  packageHandler.path = context.libPath;
  const pkgVersion = (await packageHandler.get("version")).result.toString().replaceAll('"', "");
  program.name("qstudio").version(pkgVersion).description("Quasar Studio");

  // General commands
  initCommand(context);
  updateCommand(context);

  // App top level commands
  newCommand(context);
  useCommand(context);
  testCommand(context);
  buildCommand(context);

  // App configuration commands
  versionCommand(context);

  console.log(chalk.yellow(figlet.textSync("Quasar Studio", { horizontalLayout: "standard" })));
  // console.log(chalk.blue("Working path:", context.workingPath));
  // console.log(chalk.blue("Library path:", context.libPath));
  // console.log(chalk.blue("Client path:", context.clientPath));

  // Check if working path is a Quasar Application
  program.parse(process.argv);
})();
