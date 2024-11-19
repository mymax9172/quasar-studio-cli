import * as fs from "fs/promises";
import path from "path";

import { spawnAsync } from "./spawnAsync.js";
import { packageHandler } from "./packageHandler.js";
import { templateHandler } from "./templateHandler.js";

export async function createFrameworkFolder(context, frameworkPath, name, author, templateName = "empty") {
  // Create the framework folder
  const templatePath = path.join(context.libPath, templateHandler.getFrameworkTemplatePath(templateName));
  await fs.cp(templatePath, frameworkPath, {
    recursive: true,
  });

  // NPM init of the framework folder
  let result = await spawnAsync("npm init -y ", { cwd: frameworkPath });
  if (result.code != 0) throw new Error(result.error);

  // Change NPM package properties
  packageHandler.path = frameworkPath;
  await packageHandler.set("name", name);
  if (author) await packageHandler.set("author", author);
  await packageHandler.set("version", "0.0.1");
}
