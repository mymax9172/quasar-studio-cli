import templates from "../templates/index.js";

export const templateHandler = {
  path: ".",

  getFrameworkTemplateNames() {
    return templates.frameworks.map((e) => e.name);
  },

  getFrameworkTemplatePath(name) {
    return templates.frameworks.find((e) => e.name === name).path;
  },

  getLanguageTemplate() {
    return templates.language;
  },
};
