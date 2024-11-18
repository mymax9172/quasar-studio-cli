import * as fs from "fs/promises";

export const ioFramework = {
  path: null,

  async getModule(fullname, name) {
    const filename = "file://" + this.path + "/" + fullname + ".mjs";
    //this.workingPath + "/framework/" + fullname + ".mjs";
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
