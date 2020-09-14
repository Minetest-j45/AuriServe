import * as Preact from "preact";

import './SelectGroup.scss'

export interface SelectGroupContextData {
	handleSelect(_: MouseEvent, ind: number, state?: boolean): void;
	selected: boolean[];
}

export const SelectGroupContext = Preact.createContext<SelectGroupContextData>({
	handleSelect: () => {},
	selected: [],
}); 

interface Props {
	multi?: boolean;
	onSelectionChange?: (selected: number[]) => void;

	children: JSX.Element[];
	className?: string;
	style?: any;
}

interface State {
	contextData: SelectGroupContextData;
	lastSelected?: number;
}

export default class SelectGroup extends Preact.Component<Props, State> {
	private ctrl: boolean = false;
	private shift: boolean = false;

	constructor(props: any) {
		super(props);

		this.handleSelect = this.handleSelect.bind(this);
		this.keyDown = this.keyDown.bind(this);
		this.keyUp = this.keyUp.bind(this);

		this.state = {
			contextData: {
				handleSelect: this.handleSelect,
				selected: []
			}
		};
	}

	componentDidMount() {
		this.resetContextArray();

		window.addEventListener("keydown", this.keyDown);
		window.addEventListener("keyup", this.keyUp);
	}

	componentWillUnmount() {
		window.removeEventListener("keydown", this.keyDown);
		window.removeEventListener("keyup", this.keyUp);
	}

	keyDown(e: KeyboardEvent) {
		if (e.key == 'Control') this.ctrl = true;
		if (e.key == 'Shift') this.shift = true;
	}

	keyUp(e: KeyboardEvent) {
		if (e.key == 'Control') this.ctrl = false;
		if (e.key == 'Shift') this.shift = false;
	}

	componentDidUpdate(oldProps: Props) {
		let equal = true;

		const oldKeys = oldProps.children.map(child => child.key);
		const newKeys = this.props.children.map(child => child.key);

		if (oldKeys.length != newKeys.length) equal = false;
		if (equal) for (let i = 0; i < oldKeys.length; i++) if (oldKeys[i] != newKeys[i]) equal = false;
		if (equal) return;

		this.resetContextArray();
	}

	private resetContextArray() {
		let selected: boolean[] = [];
		for (let i = 0; i < this.props.children.length; i++) selected.push(false);
		this.setState({ contextData: { handleSelect: this.state.contextData.handleSelect, selected: selected }, lastSelected: undefined });
		if (this.props.onSelectionChange) this.props.onSelectionChange([]);
	}

	private handleSelect(_: MouseEvent, ind: number, state?: boolean) {
		let contextData = {...this.state.contextData};
		
		if (!this.props.multi || !this.ctrl)
			contextData.selected = contextData.selected.map((v, i) => (i == ind ? v : false));

		if (this.props.multi && this.state.lastSelected !== undefined && this.shift) {
			let a = ind < this.state.lastSelected ? ind : this.state.lastSelected;
			let b = ind < this.state.lastSelected ? this.state.lastSelected : ind;
			for (let i = a; i <= b; i++) contextData.selected[i] = true;
		}
		else contextData.selected[ind] = (state !== undefined ? state : !contextData.selected[ind]);

		let lastSelected = (this.shift && this.state.lastSelected !== undefined) ? this.state.lastSelected : ind;

		if (this.props.onSelectionChange) this.props.onSelectionChange(contextData.selected.map((s, i) => (s ? i : -1)).filter(i => i != -1));
		this.setState({ contextData: contextData, lastSelected: lastSelected });
	}

	render() {
		return (
			<SelectGroupContext.Provider value={this.state.contextData}>
				<ul className={"SelectGroup " + (this.props.className ? this.props.className : "")} style={this.props.style}>{this.props.children}</ul>
			</SelectGroupContext.Provider>
		);
	}
}
