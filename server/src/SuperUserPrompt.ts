import log4js from "log4js"
const logger = log4js.getLogger()

import Database from "./Database";

export default class SuperUserPrompt {
	constructor(db: Database) {
		console.log("AIGHT HERE WE GO ");
		const prompt = require("prompt");
		prompt.start();
		prompt.message = "";
		prompt.delimiter = "";

		prompt.get([{
			name: "username",
			description: "Please enter a username:",
			message: "Username must be between 3 and 32 characters long.",
			pattern: /^\w{3,32}$/g,
			required: true
		}, {
			name: "password",
			description: "Please enter a password:",
			message: "Password must be at least 8 characters long.",
			pattern: /.{8,}/g,
			required: true,
			hidden: true,
			replace: "*"
		}, {
			name: "erase",
			description: "Erase other Superusers? Type 'yes' to confirm:",
			required: false
		}], async (err: string, result: {username: string, password: string, erase: string}) => {
				prompt.stop();

				if (err) {
					logger.fatal("Failed to create a superuser.\n %s", err);
					process.exit(1);
				}

				if (result.erase.toLowerCase() == "yes") db.deleteSuperAccounts();
				try {
					await db.createAccount(result.username, result.password, true);
					logger.info("Created new superuser account %s.", result.username);
				}
				catch (e) {
					logger.info("Failed to create new superuser account %s.\n %s", result.username, e);
					process.exit(1);
				}
		});
	}
}
