import * as Preact from 'preact';

import './SelectGroup.scss';

export interface SelectGroupContextData {
	selected: boolean[];

	handleSelect(_: MouseEvent, ind: number, state?: boolean): void;
}

export const SelectGroupContext = Preact.createContext<SelectGroupContextData>({
	handleSelect: () => { /* No action for default context. */ },
	selected: []
});

interface Props {
	multi?: boolean;
	onSelectionChange?: (selected: number[]) => void;

	children?: Preact.ComponentChildren;
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
		
		this.state = {
			contextData: {
				handleSelect: this.handleSelect,
				selected: []
			}
		};
	}

	componentDidMount() {
		this.resetContextArray();

		window.addEventListener('keydown', this.keyDown);
		window.addEventListener('keyup', this.keyUp);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.keyDown);
		window.removeEventListener('keyup', this.keyUp);
	}

	componentDidUpdate(oldProps: Props) {
		let equal = true;

		const oldKeys = ((oldProps.children ? Array.isArray(oldProps.children) ?
			oldProps.children : [oldProps.children] : []) as Preact.VNode[]).map(child => child.key);
		const newKeys = ((this.props.children ? Array.isArray(this.props.children) ?
			this.props.children : [this.props.children] : []) as Preact.VNode[]).map(child => child.key);

		if (oldKeys.length !== newKeys.length) equal = false;
		if (equal) for (let i = 0; i < oldKeys.length; i++) if (oldKeys[i] !== newKeys[i]) equal = false;
		if (equal) return;

		this.resetContextArray();
	}

	render() {
		return (
			<SelectGroupContext.Provider value={this.state.contextData}>
				<ul class={'SelectGroup ' + (this.props.className ? this.props.className : '')} style={this.props.style}>{this.props.children}</ul>
			</SelectGroupContext.Provider>
		);
	}

	protected keyDown = (e: KeyboardEvent) => {
		if (e.key === 'Control') this.ctrl = true;
		if (e.key === 'Shift') this.shift = true;
	};

	protected keyUp = (e: KeyboardEvent) => {
		if (e.key === 'Control') this.ctrl = false;
		if (e.key === 'Shift') this.shift = false;
	};

	protected resetContextArray = () => {
		let selected: boolean[] = [];
		for (let i = 0; i < (this.props.children ? Array.isArray(this.props.children)
			? this.props.children.length : 1 : 0); i++) selected.push(false);

		this.setState({ contextData: { handleSelect: this.state.contextData.handleSelect, selected: selected }, lastSelected: undefined });
		if (this.props.onSelectionChange) this.props.onSelectionChange([]);
	};

	protected handleSelect = (_: MouseEvent, ind: number, state?: boolean) => {
		let contextData = {...this.state.contextData};
		
		if (!this.props.multi || !this.ctrl)
			contextData.selected = contextData.selected.map((v, i) => (i === ind ? v : false));

		if (this.props.multi && this.state.lastSelected !== undefined && this.shift) {
			let a = ind < this.state.lastSelected ? ind : this.state.lastSelected;
			let b = ind < this.state.lastSelected ? this.state.lastSelected : ind;
			for (let i = a; i <= b; i++) contextData.selected[i] = true;
		} else contextData.selected[ind] = (state !== undefined ? state : !contextData.selected[ind]);

		let lastSelected = (this.shift && this.state.lastSelected !== undefined) ? this.state.lastSelected : ind;

		if (this.props.onSelectionChange) this.props.onSelectionChange(contextData.selected.map((s, i) => (s ? i : -1)).filter(i => i !== -1));
		this.setState({ contextData: contextData, lastSelected: lastSelected });
	};
}
