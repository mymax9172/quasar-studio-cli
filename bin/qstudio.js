#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk"; // Colors
import inquirer from "inquirer"; // Questions and forms, confirmations
import ora from "ora"; // Waiting, spinning chars
import figlet from "figlet"; // Char opening

import { fileURLToPath } from "url";
import { dirname } from "path";

import { init } from "../commands/init.js";
import { test } from "../commands/test.js";
import { version } from "../commands/version.js";
import { language } from "../commands/language.js";

program.name("qstudio").version("1.0.0").description("Quasar Studio");

const context = {
	program,
	path: dirname(fileURLToPath(import.meta.url)) + "/..",
};

init(context);
test(context);
version(context);
language(context);

console.log(
	chalk.yellow(
		figlet.textSync("Quasar Studio", { horizontalLayout: "standard" })
	)
);

program.parse(process.argv);
