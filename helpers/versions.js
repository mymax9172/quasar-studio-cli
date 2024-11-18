import { ioFramework } from "./ioFramework.js";
import chalk from "chalk";

export const versionHandler = {
  path: null,

  createBuildNumber() {
    const now = new Date();

    return (
      "" +
      now.getFullYear() +
      (now.getMonth() + 1).toString().padStart(2, "0") +
      now.getDate().toString().padStart(2, "0") +
      "." +
      now.getHours().toString().padStart(2, "0") +
      now.getMinutes().toString().padStart(2, "0") +
      now.getSeconds().toString().padStart(2, "0")
    );
  },

  async incrementMinor() {
    ioFramework.path = this.path;

    const application = await ioFramework.getModule("config/application", "application");

    const parts = application.versioning.version.number.split(".");
    application.versioning.version.number = parts[0] + "." + (Number(parts[1]) + 1);

    application.versioning.version.build = this.createBuildNumber();

    try {
      await ioFramework.setModule("config/application", "application", application);
      console.log(chalk.green("Application.mjs has been updated, version " + application.versioning.version.number + " and build " + application.versioning.version.build));
    } catch (error) {
      console.log(chalk.red(error));
    }
    return;
  },

  async incrementMajor() {
    ioFramework.path = this.path;

    const application = await ioFramework.getModule("config/application", "application");

    const parts = application.versioning.version.number.split(".");
    application.versioning.version.number = Number(parts[0]) + 1 + ".0";

    application.versioning.version.build = this.createBuildNumber();

    try {
      await ioFramework.setModule("config/application", "application", application);
      console.log(chalk.green("Application.mjs has been updated, version " + application.versioning.version.number + " and build " + application.versioning.version.build));
    } catch (error) {
      console.log(chalk.red(error));
    }
    return;
  },

  async updateDate(date) {
    ioFramework.path = this.path;

    const application = await ioFramework.getModule("config/application", "application");

    let period;
    if (date) period = new Date(date);
    else period = new Date();

    application.versioning.version.number = period.getFullYear().toString().substring(2) + "." + (period.getMonth() + 1).toString().padStart(2, "0");

    application.versioning.version.build = this.createBuildNumber();

    try {
      await ioFramework.setModule("config/application", "application", application);
      console.log(chalk.green("Application.mjs has been updated, version " + application.versioning.version.number + " and build " + application.versioning.version.build));
    } catch (error) {
      console.log(chalk.red(error));
    }
    return;
  },
};
