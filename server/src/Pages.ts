import Server from "./Server";
import PagesRouter from "./router/PagesRouter";

export default class Pages {	
	private router = new PagesRouter(this.server);

	constructor(private server: Server) {}

	async init() {		
		this.router.init();
	}
}
