import chalk from "chalk";
import * as fs from "fs";
import path from "path";

export const pathHandler = {
  getCurrentFolder() {
    return process.cwd();
  },

  getProjectFolder() {
    if (this.isProjectFolder()) return process.cwd();
    if (this.isAppFolder()) return path.join(currentDirectory, "..");
    return "";
  },

  getClientFolder() {
    if (this.isProjectFolder()) return path.join(process.cwd(), "client");
    if (this.isAppFolder()) return path.join(process.cwd(), "..", "client");
    return "";
  },

  getAppFolder() {
    if (this.isProjectFolder()) return "";
    if (this.isAppFolder()) return process.cwd();
  },

  getAppFolderName(name) {
    return "app-" + name.toString().toLowerCase().replaceAll(" ", "_");
  },

  getAppName(folderName) {
    return folderName.split("-")[1];
  },

  isAnyFolder() {
    if (this.isProjectFolder() || this.isAppFolder()) {
      console.log(chalk.red("For this command use QStudio CLI outside an existing Project"));
      return false;
    }
    return true;
  },

  isAppFolder() {
    const currentDirectory = process.cwd();
    if (!this.getFolderName(currentDirectory).startsWith("app-")) {
      console.log(chalk.red("For this command use QStudio CLI only in a Quasar Studio app folder (starts with app-)"));
      return false;
    }
    return true;
  },

  isProjectFolder() {
    const currentDirectory = process.cwd();
    const clientDirectory = path.join(currentDirectory, "client");
    if (!fs.existsSync(clientDirectory)) {
      console.log(chalk.red("For this command use QStudio CLI only within a Quasar Studio project folder (contains client and at least one app folder)"));
      return false;
    }
    return true;
  },

  getFolderType(fullPath) {
    if (!fs.existsSync(fullPath)) return "none";

    // Check if it is project folder
    const clientDirectory = path.join(fullPath, "client");
    if (fs.existsSync(clientDirectory)) return "project";

    // Check if it is an app folder
    const dirname = this.getFolderName(fullPath);
    if (dirname.startsWith("app-")) return "app";
    else return "any";
  },

  getAllApps() {
    const result = [];
    const projectFolder = this.getProjectFolder();
    if (projectFolder.length > 0) {
      fs.readdirSync(projectFolder).forEach((file) => {
        const name = path.join(projectFolder, file);
        if (fs.statSync(name).isDirectory() && this.getFolderType(name) === "app") {
          result.push(this.getAppName(file));
        }
      });
    }
    return result;
  },

  getAllAppFolders() {
    const result = [];
    const projectFolder = this.getProjectFolder();
    if (projectFolder.length > 0) {
      fs.readdirSync(projectFolder).forEach((file) => {
        const name = path.join(projectFolder, file);
        if (fs.statSync(name).isDirectory() && this.getFolderType(name) === "app") {
          result.push(name);
        }
      });
    }
    return result;
  },

  getFolderName(fullPath) {
    return fullPath.split(path.sep).pop();
  },

  exists(path) {
    return fs.existsSync(path);
  },
};
