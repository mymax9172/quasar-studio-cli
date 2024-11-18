#!/usr/bin/env node

import * as fs from "fs";
import path from "path";

import { program } from "commander";
import chalk from "chalk"; // Colors
import inquirer from "inquirer"; // Questions and forms, confirmations
import ora from "ora"; // Waiting, spinning chars
import figlet from "figlet"; // Char opening

import { packageHandler } from "../helpers/packageHandler.js";
import { spawnAsync } from "../helpers/spawnAsync.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

import { init } from "../commands/init.js";
import { install } from "../commands/install.js";
import { test } from "../commands/test.js";
import { update } from "../commands/update.js";
import { build } from "../commands/build.js";
import { version } from "../commands/version.js";
import { language } from "../commands/language.js";

await (async function () {
  program.name("qstudio").version("0.1").description("Quasar Studio");

  let cwd = process.cwd();

  const context = {
    manifestVersion: "0.1.1",
    program,
    workingPath: cwd,
    clientPath: path.normalize(cwd + "/../client"),
    libPath: path.normalize(dirname(fileURLToPath(import.meta.url)) + "\\.."),
  };

  const result = await packageHandler.get("name");
  console.log("NAME: " + result.result);

  init(context);
  // install(context);
  test(context);
  // update(context);
  // build(context);
  // version(context);
  // language(context);

  console.log(chalk.yellow(figlet.textSync("Quasar Studio", { horizontalLayout: "standard" })));

  console.log(chalk.blue("Working path:", context.workingPath));
  console.log(chalk.blue("Library path:", context.libPath));
  console.log(chalk.blue("Client path:", context.clientPath));

  // Check if working path is a Quasar Application
  program.parse(process.argv);
})();
