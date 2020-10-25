import * as Preact from 'preact';

import './Modal.sass';

interface Props {
	onClose?: (_: MouseEvent) => void;
	children?: Preact.VNode | Preact.VNode[];
	className?: string;
	style?: any;
}

export default class Modal extends Preact.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.avoidClose = this.avoidClose.bind(this);
	}

	componentDidMount() {
		document.getElementsByTagName('body')[0].style.overflow = 'hidden';
	}

	componentWillUnmount() {
		document.getElementsByTagName('body')[0].style.overflow = '';
	}

	render() {
		return (
			<div className={'Modal' + (this.props.className ? ' ' + this.props.className : '') + (this.props.onClose ? ' closes' : '')}
				style={this.props.style} onClick={this.props.onClose}>
				<div className="Modal-CardWrap">
					<div className="Modal-Card" onClick={this.avoidClose}>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}

	private avoidClose(e: MouseEvent): void {
		e.stopPropagation();
	}
}
