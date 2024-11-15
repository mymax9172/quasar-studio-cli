export const application = {
  manifestVersion: "0.1.0",
  name: "MyBlog",

  title: "PragramticEngineer",

  credits: {
    author: "Massimiliano Agostinoni",
    copyright: "MIT",
  },

  versioning: {
    type: "auto",
    version: {
      number: "0.1",
      build: 0,
    },
  },

  languages: {
    default: "en-US",
    supported: ["en-US"],
  },

  layouts: {
    default: "main",
    templates: ["main"],
  },

  themes: {
    configurable: false,
    default: "main",
    templates: ["main"],
  },

  entitlements: [],

  storyboard: {
    home: "home-page",
    pages: ["home-page"],
  },
};
