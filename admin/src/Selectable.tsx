import * as Preact from 'preact';

import ClickHandler, { ClickHandlerCallbacks } from './ClickHandler';
import { SelectGroupContext } from './SelectGroup';

interface Props {
	ind: number;
	doubleClickSelects?: boolean;
	callbacks?: ClickHandlerCallbacks;

	children: JSX.Element[];
	class?: string;
	style?: any;
}

export default class Selectable extends Preact.Component<Props, {}> {
	private clickHandler: ClickHandler = new ClickHandler({});

	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {
		this.updateCallbacks();
	}

	componentDidUpdate(oldProps: Props) {
		if (oldProps.callbacks === this.props.callbacks) return;
		this.updateCallbacks();
	}

	render() {
		let selected = this.context.selected[this.props.ind];

		return (
			<SelectGroupContext.Consumer>{_ =>
				<button
					class={ 'Selectable ' + (this.props.class ? this.props.class : '') + (selected ? ' selected' : '')}
					style={this.props.style}
					onMouseUp={this.clickHandler.handleMouseUp}>
					{this.props.children}
				</button>
			}</SelectGroupContext.Consumer>
		);
	}

	private updateCallbacks() {
		let callbacks = Object.assign({}, this.props.callbacks);

		if (!callbacks.onClick) callbacks.onClick = e => this.context.handleSelect(e, this.props.ind);
		else {
			let clickCallback = callbacks.onClick;
			callbacks.onClick = e => {
				this.context.handleSelect(e, this.props.ind);
				clickCallback(e);
			};
		}
		
		if (callbacks.onDoubleClick && this.props.doubleClickSelects) {
			let doubleClickCallback = callbacks.onDoubleClick;
			callbacks.onDoubleClick = e => {
				this.context.handleSelect(e, this.props.ind, true);
				doubleClickCallback(e);
			};
		}

		this.clickHandler = new ClickHandler(callbacks);
	}
}

Selectable.contextType = SelectGroupContext;
