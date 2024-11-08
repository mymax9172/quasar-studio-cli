#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk"; // Colors
import inquirer from "inquirer"; // Questions and forms, confirmations
import ora from "ora"; // Waiting, spinning chars
import figlet from "figlet"; // Char opening

import { fileURLToPath } from "url";
import { dirname } from "path";

import { init } from "../commands/init.mjs";
import { version } from "../commands/version.mjs";
import { language } from "../commands/language.mjs";

program.name("qstudio").version("1.0.0").description("Quasar Studio");

const context = {
	program,
	path: dirname(fileURLToPath(import.meta.url)) + "/..",
};

init(context);
version(context);
language(context);

console.log(
	chalk.yellow(
		figlet.textSync("Quasar Studio", { horizontalLayout: "standard" })
	)
);

program.parse(process.argv);
