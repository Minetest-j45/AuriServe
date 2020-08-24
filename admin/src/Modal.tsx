import * as React from 'react';

import './Modal.scss';

interface Props {
	onClose?: (_: React.SyntheticEvent) => void;
	children: JSX.Element[] | JSX.Element;
	className?: string;
	style?: any;
}

export default class Modal extends React.PureComponent<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.avoidClose = this.avoidClose.bind(this);
	}

	private avoidClose(e: React.SyntheticEvent): void {
		e.stopPropagation();
	}

	render() {
		return (
			<div className={"Modal" + (this.props.className ? " " + this.props.className : "") + (this.props.onClose ? " closes" : "")} 
				style={this.props.style} onClick={this.props.onClose}>
				<div className="MediaModal-CardWrap">
					<div className="MediaModal-Card" onClick={this.avoidClose}>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}
