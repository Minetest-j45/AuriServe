import * as Preact from 'preact';

import './DimensionTransition.sass';

interface Props {
	mode?: 'width' | 'height' | 'all';
	duration?: number;

	style?: any;
	children?: Preact.ComponentChildren;
}

interface State {
	dimensions?: {x: number; y: number};
}

export default class DimensionTransition extends Preact.Component<Props, State> {
	private ref: Preact.RefObject<HTMLDivElement>;
	private observer?: MutationObserver;

	constructor(props: Props) {
		super(props);
		this.state = {};
		this.ref = Preact.createRef();

		this.handleContentChanged = this.handleContentChanged.bind(this);
	}

	componentDidMount() {
		this.observer = new MutationObserver(this.handleContentChanged);
		this.observer.observe(this.ref.current!, { attributes: true, childList: true, subtree: true });
		this.handleContentChanged();
	}

	componentWillUnmount() {
		this.observer?.disconnect();
	}

	render() {
		let appliedOuterStyles: any = {};
		if (this.props.mode !== 'height') appliedOuterStyles.width = this.state.dimensions?.x;
		if (this.props.mode !== 'width') appliedOuterStyles.height = this.state.dimensions?.y;

		let appliedInnerStyles: any = { width: 'min-content', height: 'min-content' };
		if (this.props.mode === 'height') appliedInnerStyles.width = 'auto';
		if (this.props.mode === 'width') appliedInnerStyles.height = 'auto';

		return <div className="DimensionTransition" style={Object.assign(appliedOuterStyles, this.props.style, {
			transition: `width ${(this.props.duration || 300) / 1000}s, height ${(this.props.duration || 300) / 1000}s`})}>
			<div className="DimensionTransition-Inner" style={appliedInnerStyles} ref={this.ref}>
				{this.props.children}
			</div>
		</div>;
	}

	private handleContentChanged() {
		const elem = this.ref.current!;
		this.setState({ dimensions: { x: elem.offsetWidth, y: elem.offsetHeight }});
	}
}
