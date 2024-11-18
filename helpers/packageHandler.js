import { spawnAsync } from "./spawnAsync.js";
import chalk from "chalk";

export const packageHandler = {
  path: null,

  async get(key) {
    return await spawnAsync("npm pkg get " + key, { cwd: this.path });
  },

  async set(key, value) {
    const command = "npm pkg set " + key + "=" + value;

    return await spawnAsync(command, { cwd: this.path });
  },
};
