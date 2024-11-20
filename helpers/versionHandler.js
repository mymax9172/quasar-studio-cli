import { ioFramework } from "./ioFramework.js";
import chalk from "chalk";

export const versionHandler = {
  path: null,

  async getCurrentVersion() {
    ioFramework.path = this.path;
    return await ioFramework.getModule("config/version", "version");
  },

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

  async reset() {
    ioFramework.path = this.path;

    const version = {
      number: "0.0.1",
      build: "0",
    };

    try {
      await ioFramework.setModule("config/version", "version", version);
      return version;
    } catch (error) {
      console.log(chalk.red(error));
    }
    return;
  },

  async incrementMajor() {
    ioFramework.path = this.path;

    const version = await ioFramework.getModule("config/version", "version");
    const parts = version.number.split(".");
    version.number = Number(parts[0]) + 1 + ".0.0";
    version.build = this.createBuildNumber();

    try {
      await ioFramework.setModule("config/version", "version", version);
      return version;
    } catch (error) {
      console.log(chalk.red(error));
    }
    return;
  },

  async incrementMinor() {
    ioFramework.path = this.path;

    const version = await ioFramework.getModule("config/version", "version");
    const parts = version.number.split(".");
    version.number = parts[0] + "." + (Number(parts[1]) + 1) + ".0";
    version.build = this.createBuildNumber();

    try {
      await ioFramework.setModule("config/version", "version", version);
      return version;
    } catch (error) {
      console.log(chalk.red(error));
    }
    return;
  },

  async incrementPatch() {
    ioFramework.path = this.path;

    const version = await ioFramework.getModule("config/version", "version");
    const parts = version.number.split(".");
    version.number = parts[0] + "." + parts[1] + "." + (Number(parts[2]) + 1);
    version.build = this.createBuildNumber();

    try {
      await ioFramework.setModule("config/version", "version", version);
      return version;
    } catch (error) {
      console.log(chalk.red(error));
    }
    return;
  },

  async updateDate(date) {
    ioFramework.path = this.path;

    const version = await ioFramework.getModule("config/version", "version");

    let period;

    if (date) period = new Date(date);
    else period = new Date();
    if (isNaN(period.getTime())) period = new Date();

    version.number = period.getFullYear().toString().substring(2) + "." + (period.getMonth() + 1).toString().padStart(2, "0");
    version.build = this.createBuildNumber();

    try {
      await ioFramework.setModule("config/version", "version", version);
      return version;
    } catch (error) {
      console.log(chalk.red(error));
    }
    return;
  },
};
