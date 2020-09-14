import * as Preact from 'preact';

import './Modal.scss';

interface Props {
	onClose?: (_: MouseEvent) => void;
	children: JSX.Element[] | JSX.Element;
	className?: string;
	style?: any;
}

export default class Modal extends Preact.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.avoidClose = this.avoidClose.bind(this);
	}

	private avoidClose(e: MouseEvent): void {
		e.stopPropagation();
	}

	render() {
		return (
			<div className={"Modal" + (this.props.className ? " " + this.props.className : "") + (this.props.onClose ? " closes" : "")} 
				style={this.props.style} onClick={this.props.onClose}>
				<div className="Modal-CardWrap">
					<div className="Modal-Card" onClick={this.avoidClose}>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}
