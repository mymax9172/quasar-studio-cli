export const application = {
	manifestVersion: "0.1.0",
	name: "Name of the application",

	title: "Title of the application",
	credits: {
		author: "Author name",
		copyright: "MIT",
	},
	versioning: {
		type: "manual",
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
		default: "default",
		templates: ["default"],
	},
	themes: {
		configurable: false,
		default: "default",
		templates: ["default"],
	},
	entitlements: [],
	storyboard: {
		home: "home-page",
		pages: ["home-page"],
	},
};
