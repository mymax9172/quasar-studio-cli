import { ioFramework } from "./ioFramework.js";

export async function updateFramework(context, fromVersion, toVersion) {
	const key = fromVersion + ">" + toVersion;

	switch (key) {
		case "0.1.0>0.1.1":
			console.log("update fake");
			break;

		default:
			break;
	}
}
