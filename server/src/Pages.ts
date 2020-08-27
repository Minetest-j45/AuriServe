import Server from "./Server";
import Elements from "./Elements";
import PagesRouter from "./router/PagesRouter";

export default class Pages {
	elements = new Elements();
	
	private router = new PagesRouter(this.server, this.elements);

	constructor(private server: Server) {}

	async init() {		
		this.router.init();
	}
}
