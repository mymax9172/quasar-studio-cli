import { spawnAsync } from "./spawnAsync.js";

export const packageHandler = {
  path: null,

  async get(key) {
    const command = "npm pkg get " + key;
    return await spawnAsync(command, { cwd: this.path });
  },

  async set(key, value) {
    const command = "npm pkg set " + key + "=" + value;
    return await spawnAsync(command, { cwd: this.path });
  },
};
