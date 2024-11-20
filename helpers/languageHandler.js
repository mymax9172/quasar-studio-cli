import path from "path";
import * as fs from "fs";
import { ioFramework } from "./ioFramework.js";

export const languageHandler = {
  path: null,

  getAllLanguageCodes() {
    const result = [];
    const fullPath = path.join(this.path, "languages");
    const files = fs.readdirSync(fullPath);
    for (let i = 0; i < files.length; i++) {
      if (files[i] != "index.js") {
        result.push(files[i].split(".")[0]);
      }
    }
    return result;
  },

  async getAllLanguages() {
    const fullPath = path.join(this.path, "languages");
    console.log(fullPath);
    const files = fs.readdirSync(fullPath);
    for (let i = 0; i < files.length; i++) {
      if (files[i] != "index.js") {
        const language = ioFramework.getModule(files[i], "language");
      }
    }
  },
};
