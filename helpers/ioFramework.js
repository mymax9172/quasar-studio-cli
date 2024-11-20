import * as fs from "fs/promises";
import path from "path";

export const ioFramework = {
  path: ".",

  async getModule(fullname, name) {
    const filename = "file://" + path.join(this.path, fullname + ".mjs");
    //console.log("Reading " + filename);
    const module = await import(filename);
    return module[name];
  },

  async setModule(fullname, name, content) {
    const filename = this.path + "/" + fullname + ".mjs";
    const text = "export const " + name + " = " + JSON.stringify(content, null, 3);
    await fs.writeFile(filename, text);
  },

  async removeFile(fullname) {
    const filename = this.path + "/" + fullname + ".mjs";
    await fs.rm(filename);
  },
};
