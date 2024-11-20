import { spawnAsync } from "./spawnAsync.js";

export const packageHandler = {
  path: null,

  async get(key) {
    const command = "npm pkg get " + key;
    const result = await spawnAsync(command, { cwd: this.path }, true);
    if (result.code != 0) throw new Error(result.error);
    else return result.result;
  },

  async set(key, value) {
    const command = "npm pkg set " + key + "=" + value;
    const result = await spawnAsync(command, { cwd: this.path }, true);
    if (result.code != 0) throw new Error(result.error);
    else return result.result;
  },
};
