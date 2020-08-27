import Server from "./Server";
import AdminRouter from "./router/AdminRouter";
import SuperUserPrompt from "./SuperUserPrompt";

export default class Admin {
	private router = new AdminRouter(this.server);

	constructor(private server: Server) {}

	async init() {
		if (this.server.conf.super) new SuperUserPrompt(this.server.db);

		this.router.init();
	}
}
